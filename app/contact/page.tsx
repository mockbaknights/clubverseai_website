"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    phone: "",
    honeypot: "", // Hidden field for spam protection
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success!
      setStatus({
        type: "success",
        message: data.message || "Message sent! We'll reply on WhatsApp.",
      });

      // Reset form
      setFormData({
        email: "",
        message: "",
        name: "",
        phone: "",
        honeypot: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Talk to ClubVerse
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tell us about your club. We'll show you exactly how ClubVerse fits.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500 uppercase mb-6">
          Most clubs hear back the same day (usually within an hour)
        </div>

        {/* Success Message */}
        {status.type === "success" && (
          <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-lg text-green-400 font-medium">
              {status.message}
            </p>
          </div>
        )}

        {/* Error Message */}
        {status.type === "error" && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-3xl p-6 text-center">
            <p className="text-lg text-red-400 font-medium">
              {status.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-950/60 border border-gray-900 rounded-3xl p-10 shadow-2xl">
          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Honeypot field - hidden from users, bots will fill it */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Your email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@westside-tennis.com"
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Tell us about your club
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="We have 8 courts, ~650 members, ready to modernize our membership + billing."
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isSubmitting}
              />
            </div>

            {/* Optional name and phone in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm text-gray-500">
                <label className="block mb-2">Your name (optional)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-sm text-gray-500">
                <label className="block mb-2">Your phone (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              {isSubmitting
                ? "Sending..."
                : "Send message → reply in <2 hours"}
            </button>
          </div>
        </form>

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-black/20 border border-gray-900 rounded-3xl p-6 text-center text-sm text-gray-500">
            Prefer email? Reach us at{" "}
            <a href="mailto:hello@clubverse.com" className="text-orange-500 hover:text-orange-400 font-medium">
              hello@clubverse.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
