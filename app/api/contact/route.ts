import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 requests per minute per IP

/**
 * Simple rate limiting by IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // New or expired record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();
  
  // Fallback if no IP headers found
  return "unknown";
}

/**
 * Send email via Resend
 * Initialize Resend lazily to avoid build-time errors
 */
async function sendEmail(
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  const resendKey = process.env.RESEND_KEY;
  const clubEmail = process.env.CLUB_EMAIL || "hello@clubverse.com";

  console.log("=== SEND EMAIL DEBUG ===");
  console.log("RESEND_KEY exists:", !!resendKey);
  console.log("Sending to:", clubEmail);
  console.log("From email:", process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev");

  if (!resendKey) {
    console.error("RESEND_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  // Initialize Resend only when needed (not at module level)
  const resend = new Resend(resendKey);

  try {
    // Use Resend's default domain if clubverse.com isn't verified
    // You can change this to your verified domain in Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    console.log("Calling Resend API...");
    const { data, error } = await resend.emails.send({
      from: `ClubVerse Contact <${fromEmail}>`,
      to: [clubEmail],
      replyTo: email,
      subject: `New Contact Form: ${name || "No name"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent from ClubVerse contact form</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name || "Not provided"}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}

---
Sent from ClubVerse contact form
      `,
    });

    console.log("Resend response - data:", JSON.stringify(data, null, 2));
    console.log("Resend response - error:", JSON.stringify(error, null, 2));

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      // Return more detailed error for debugging
      return { 
        success: false, 
        error: error.message || JSON.stringify(error) || "Email send failed" 
      };
    }

    if (!data || !data.id) {
      console.error("Resend returned no data or email ID");
      return {
        success: false,
        error: "Email send failed - no confirmation from email service"
      };
    }

    console.log("Email sent successfully! Email ID:", data.id);
    return { success: true };
  } catch (error: any) {
    console.error("Email send error:", error);
    return { 
      success: false, 
      error: error.message || error.toString() || "Email request failed" 
    };
  }
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  console.log("=== CONTACT FORM REQUEST ===");
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    console.log("Client IP:", clientIP);
    if (!checkRateLimit(clientIP)) {
      console.log("Rate limit exceeded for IP:", clientIP);
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email, message, name, phone, website, honeypot } = body; // Check both 'website' and 'honeypot' for compatibility
    const honeypotValue = website || honeypot; // Support both field names
    console.log("Form data received:", { email, hasMessage: !!message, name, phone, hasHoneypot: !!honeypotValue });

    // Validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Honeypot check - if this field is filled, it's a bot
    if (honeypotValue) {
      console.log("Honeypot triggered - bot detected, not sending email. Honeypot value:", honeypotValue);
      // Silently fail for bots (return success so they don't know it failed)
      return NextResponse.json({ success: true });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic)
    const sanitizedName = (name || "").trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 255);
    const sanitizedPhone = phone ? phone.trim().slice(0, 20) : undefined;
    const sanitizedMessage = message.trim().slice(0, 5000);

    // Send email
    const emailResult = await sendEmail(
      sanitizedName,
      sanitizedEmail,
      sanitizedMessage,
      sanitizedPhone
    );

    if (!emailResult.success) {
      // Log the actual error for debugging in Vercel logs
      console.error("Email send failed:", emailResult.error);
      
      // Return a user-friendly message, but log the real error
      return NextResponse.json(
        {
          error: emailResult.error || "Failed to send your message. Please try again or email us directly.",
        },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json({
      success: true,
      message: "Message sent! We'll reply soon.",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
