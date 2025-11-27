import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-24">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white leading-tight">
            Everything a modern private club needs. Nothing it doesn't.
          </h1>
        </div>

        <div className="space-y-32">
          {/* Financial Correctness Engine */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Financial Correctness Engine</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              The core that makes everything else possible.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Atomic balanceCents — mathematically provable accuracy</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Idempotent billing runs with nextBillingDate tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Perfect mid-cycle proration (upgrade, downgrade, cancel)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>One-time Stripe + manual payments (cash, e-transfer, cheque)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Real credits on overpayment — no more "we'll mail a cheque"</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Reconciliation endpoint + full test suite</span>
              </li>
            </ul>
          </section>

          {/* Member & Account Management */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Member & Account Management</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              Built for real families and real clubs.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Individual, family, corporate accounts</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Flexible membership types (anniversary or first-of-month)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Parent-child access controls</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Complete transaction history per member/account</span>
              </li>
            </ul>
          </section>

          {/* Automated Billing */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Automated Billing</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              Set it once. Sleep forever.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Recurring membership fees + add-ons</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Weekly, monthly, quarterly, annual cycles</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Automatic nextBillingDate advancement</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Bulletproof run-once-per-period guarantee</span>
              </li>
            </ul>
          </section>

          {/* Accounting Integration */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Accounting Integration</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              QuickBooks Online, Xero, and others.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>OAuth connection</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>GL account + department mapping</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Scheduled or on-demand exports</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Full audit trail</span>
              </li>
            </ul>
          </section>

          {/* API-First Architecture */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">API-First Architecture</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              The platform is the API.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>RESTful endpoints for everything</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Webhooks for real-time sync</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Works with any court booking system (GameTime, CourtReserve, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Build your own member portal or staff tools</span>
              </li>
            </ul>
          </section>

          {/* Staff Roles & Permissions */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Staff Roles & Permissions</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              Granular control. No more "everyone is admin".
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Pre-built roles + custom overrides</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Secure session handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <span>Full activity logging</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-32 pt-20 border-t border-gray-900 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white leading-tight">
            Clubverse isn't another tool.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
            It's the last billing and membership system you'll ever need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
          >
            Request Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
