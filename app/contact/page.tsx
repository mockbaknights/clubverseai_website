import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? Want to see a demo? We're here to help.
          </p>
        </div>

        <div className="space-y-16">
          {/* Schedule a Demo */}
          <section className="border-b border-gray-900 pb-16">
            <h2 className="text-4xl font-semibold mb-6 text-white">Schedule a Demo</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              See ClubVerse in action. We'll show you how it works, answer your questions, and help you understand if it's the right fit for your club.
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <p className="text-gray-300 mb-4">Send us an email to schedule:</p>
              <a 
                href="mailto:demo@clubverse.com" 
                className="text-2xl font-medium text-orange-500 hover:text-orange-400 transition-colors"
              >
                demo@clubverse.com
              </a>
            </div>
          </section>

          {/* General Inquiries */}
          <section className="border-b border-gray-900 pb-16">
            <h2 className="text-4xl font-semibold mb-6 text-white">General Inquiries</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Questions about features, pricing, or how ClubVerse works? We're happy to help.
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <p className="text-gray-300 mb-4">Email us at:</p>
              <a 
                href="mailto:hello@clubverse.com" 
                className="text-2xl font-medium text-orange-500 hover:text-orange-400 transition-colors"
              >
                hello@clubverse.com
              </a>
            </div>
          </section>

          {/* Enterprise */}
          <section className="pb-16">
            <h2 className="text-4xl font-semibold mb-6 text-white">Enterprise</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Large clubs with custom needs? Let's talk about how we can build something perfect for you.
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <p className="text-gray-300 mb-4">Contact our enterprise team:</p>
              <a 
                href="mailto:enterprise@clubverse.com" 
                className="text-2xl font-medium text-orange-500 hover:text-orange-400 transition-colors"
              >
                enterprise@clubverse.com
              </a>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-16 border-t border-gray-900 text-center">
          <p className="text-gray-400 mb-6">
            We typically respond within 24 hours.
          </p>
          <Link
            href="/"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

