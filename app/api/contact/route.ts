import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_KEY);

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
  
  return request.ip || "unknown";
}

/**
 * Send WhatsApp message via WhatsApp Cloud API
 */
async function sendWhatsAppMessage(
  message: string,
  phoneNumber: string
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.error("WhatsApp credentials not configured");
    return { success: false, error: "WhatsApp not configured" };
  }

  try {
    // WhatsApp Cloud API endpoint
    const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phoneNumber.replace(/\D/g, ""), // Remove non-digits
        type: "text",
        text: {
          body: message,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", data);
      return { success: false, error: data.error?.message || "WhatsApp send failed" };
    }

    return { success: true };
  } catch (error: any) {
    console.error("WhatsApp send error:", error);
    return { success: false, error: error.message || "WhatsApp request failed" };
  }
}

/**
 * Send email via Resend
 */
async function sendEmail(
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  const clubEmail = process.env.CLUB_EMAIL || "hello@clubverse.com";

  try {
    const { data, error } = await resend.emails.send({
      from: "ClubVerse Contact <contact@clubverse.com>",
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

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message || "Email send failed" };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Email send error:", error);
    return { success: false, error: error.message || "Email request failed" };
  }
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email, message, name, phone, honeypot } = body;

    // Validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Honeypot check - if this field is filled, it's a bot
    if (honeypot) {
      // Silently fail for bots
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

    // Get WhatsApp number from environment
    const whatsappNumber = process.env.MY_WHATSAPP_NUMBER;
    if (!whatsappNumber) {
      console.warn("MY_WHATSAPP_NUMBER not set, skipping WhatsApp notification");
    }

    // Format message for WhatsApp
    const whatsappMessage = `New contact form submission:\n\n` +
      `Name: ${sanitizedName || "Not provided"}\n` +
      `Email: ${sanitizedEmail}\n` +
      (sanitizedPhone ? `Phone: ${sanitizedPhone}\n` : "") +
      `\nMessage:\n${sanitizedMessage}`;

    // Send both email and WhatsApp in parallel
    const [emailResult, whatsappResult] = await Promise.allSettled([
      sendEmail(sanitizedName, sanitizedEmail, sanitizedMessage, sanitizedPhone),
      whatsappNumber
        ? sendWhatsAppMessage(whatsappMessage, whatsappNumber)
        : Promise.resolve({ success: true }),
    ]);

    // Check results
    const emailSuccess = emailResult.status === "fulfilled" && emailResult.value.success;
    const whatsappSuccess =
      !whatsappNumber ||
      (whatsappResult.status === "fulfilled" && whatsappResult.value.success);

    // Log errors but don't fail the request if at least one succeeded
    if (emailResult.status === "rejected") {
      console.error("Email promise rejected:", emailResult.reason);
    }
    if (whatsappResult.status === "rejected") {
      console.error("WhatsApp promise rejected:", whatsappResult.reason);
    }

    // If both failed, return error
    if (!emailSuccess && !whatsappSuccess) {
      return NextResponse.json(
        {
          error:
            "Failed to send your message. Please try again or email us directly.",
        },
        { status: 500 }
      );
    }

    // Success - at least one notification was sent
    return NextResponse.json({
      success: true,
      message: "Message sent! We'll reply on WhatsApp.",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

