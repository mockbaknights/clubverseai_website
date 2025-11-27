import Hero2Orange from "./components/Hero2-Orange";
import ClubTypesGallery from "./components/ClubTypesGallery";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <Hero2Orange />
      </section>

      {/* Club Types Gallery */}
      <ClubTypesGallery />

      {/* Club Management Rebuilt Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Heading */}
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 md:mb-12 text-white leading-[1.05] tracking-tight">
              Club Management Rebuilt From First Principles
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto mb-6 leading-relaxed">
              Most club systems were built in the 90s and have been apologising ever since.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
              We started from zero with one rule:
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white max-w-4xl mx-auto mb-6 leading-tight">
              Billing must be mathematically impossible to get wrong.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Everything else followed.
            </p>
          </div>

          {/* The Final Verdict Section */}
          <div className="mb-32 md:mb-40">
            <div className="text-center mb-16">
              <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
                The result is the only platform on Earth that ships with this guarantee:
              </p>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
                The Final Verdict
              </h3>
              <p className="text-sm md:text-base text-gray-500 italic">
                (these are not marketing bullets — they're engineering facts)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Account.balanceCents = single source of truth
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Every money movement is atomic — no race conditions, ever
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Billing runs are fully idempotent — cannot double-charge
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Every member has a tracked nextBillingDate — no fee ever missed
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Mid-cycle upgrades/downgrades are calculated to the cent, instantly
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Overpayments become real credits (negative balance = handled correctly)
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Reconciliation endpoint proves zero drift on demand
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                  Full automated test suite locks correctness forever
                </p>
              </div>
            </div>
          </div>

          {/* Trust and Precision Section */}
          <div className="text-center mb-24 md:mb-32">
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Private clubs run on trust and precision.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We removed the part where software gets in the way.
            </p>
          </div>

          {/* Platform Statement */}
          <div className="text-center mb-24 md:mb-32">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-10 leading-relaxed">
              Tennis • Golf • Pickleball • Padel • Curling • Yacht • Country • Multi-sport
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-4xl mx-auto">
              One platform. One source of truth. Zero excuses.
            </p>
          </div>
        </div>
      </section>

      {/* API-first Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 md:mb-12 text-white leading-tight">
              API-first from day one
          </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
              Every feature you see is an API endpoint underneath.
          </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
              Connect your court system, POS, access control, or build your own front-end.
              </p>
            <p className="text-base md:text-lg text-gray-500 italic max-w-3xl mx-auto">
              (GameTime, TouchBistro, Lightspeed, Square, Stripe — they all just work.)
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 md:mb-12 text-white leading-tight max-w-4xl mx-auto">
            Ready to retire the old system (and the monthly reconciliation panic)?
          </h2>
          <div className="flex justify-center mt-10 md:mt-12">
            <Link
              href="/contact"
              className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-lg md:text-xl font-medium transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 inline-flex items-center gap-3 hover:scale-105"
            >
              Request Demo
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
