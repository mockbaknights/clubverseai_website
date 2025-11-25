export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">Talk to ClubVerse</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tell us about your club. We'll show you exactly how ClubVerse fits.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500 uppercase mb-6">
          Most clubs hear back the same day (usually within an hour)
        </div>

        <form className="bg-gray-950/60 border border-gray-900 rounded-3xl p-10 shadow-2xl">
          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Your email
              </label>
              <input
                type="email"
                required
                placeholder="john@westside-tennis.com"
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Tell us about your club
              </label>
              <textarea
                required
                rows={5}
                placeholder="We have 8 courts, ~650 members, ready to modernize our membership + billing."
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Optional name */}
            <div className="text-sm text-gray-500">
              <label className="block mb-2">Your name (optional)</label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              Send message → reply in &lt;2 hours
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

