import Hero2Orange from "./components/Hero2-Orange";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <Hero2Orange />
      </section>

      {/* Features Overview */}
      <section className="py-32 px-4 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
              Everything you need.<br />Nothing you don't.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete platform for modern club management. Built for scale. Designed for simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Member Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Individual, family, and corporate accounts. Flexible membership types. Automated billing that just works.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Smart Billing</h3>
              <p className="text-gray-400 leading-relaxed">
                Automated recurring fees. Multiple billing cycles. Bulletproof tracking. Never miss a payment.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Seamless Integration</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect to GameTime court booking & registration. Sync with QuickBooks. One API. Infinite possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GameTime Integration Section */}
      <section className="py-32 px-4 border-t border-gray-900">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">GameTime + ClubVerse</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Court booking + registration meets billing + finance
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GameTime is the definitive platform for court booking, program registration, and waitlists. ClubVerse plugs directly into the GameTime API so every booking, registration, and payment flows into member records, billing runs, and accounting.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-white">Bi-directional API</h3>
              <p className="text-gray-400">
                Sync member profiles, access levels, and billing status between GameTime and ClubVerse automatically.
              </p>
            </div>
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-white">Program Revenue</h3>
              <p className="text-gray-400">
                Convert GameTime program registrations into transactions and recurring fees with zero manual entry.
              </p>
            </div>
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-white">Financial Alignment</h3>
              <p className="text-gray-400">
                Match on-court activity with billing, accounting, and member access in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            See how ClubVerse can transform your club operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              Request Demo
            </Link>
            <Link
              href="/features"
              className="px-8 py-4 border border-gray-800 hover:border-gray-700 text-white rounded-full text-lg font-medium transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
