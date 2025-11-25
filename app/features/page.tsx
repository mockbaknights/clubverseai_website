import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">Features</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Everything you need to run a modern club. Built with precision. Designed for scale.
          </p>
        </div>

        <div className="space-y-24">
          {/* Member Management */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">Member Management</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Complete control over your membership base. Individual accounts. Family accounts. Corporate accounts. All in one place.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Flexible membership types with custom billing cycles</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Family relationship tracking and access controls</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Member search, profiles, and transaction history</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Parent-child access permissions</span>
              </li>
            </ul>
          </section>

          {/* Automated Billing */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">Automated Billing</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Set it once. It runs forever. Bulletproof billing runs with idempotency guarantees. Never double-charge. Never miss a payment.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Recurring membership fees on any cycle</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Custom recurring fees for court access, programs, and more</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Automatic billing run tracking and reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Next billing date tracking for every member</span>
              </li>
            </ul>
          </section>

          {/* Transaction Management */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">Transaction Management</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Every transaction. Every source. One system. Connect with TouchBistro, Lightspeed, Square, Stripe, GameTime, or your own systems.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Multi-source transaction tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Department-based categorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Tax calculation and handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Complete transaction history per member</span>
              </li>
            </ul>
          </section>

          {/* GameTime Integration */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">GameTime Integration</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              ClubVerse speaks GameTime natively. Court bookings, registrations, and waitlists flow straight into your member records and billing engine.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Real-time API connection between GameTime and ClubVerse</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Sync bookings, registrations, and attendance into member profiles</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Automatically generate fees from GameTime programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Keep membership status, billing, and access perfectly aligned with on-court activity</span>
              </li>
            </ul>
          </section>

          {/* QuickBooks Integration */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">QuickBooks Integration</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Automatic journal entries. Scheduled exports. GL account mapping. Your accounting, automated.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>OAuth-based QuickBooks Online connection</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Automated journal entry exports</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>GL account and department mapping</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Scheduled or on-demand exports</span>
              </li>
            </ul>
          </section>

          {/* API-First Architecture */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">API-First Architecture</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Every feature is an API endpoint. Build custom integrations. Connect your tools. Extend the platform.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>RESTful API for all operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Member search, list, and management endpoints</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Transaction and billing automation APIs</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Role-based access control and permissions</span>
              </li>
            </ul>
          </section>

          {/* Staff & Permissions */}
          <section>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">Staff & Permissions</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Granular control. Role-based access. Staff, managers, admins. Each with exactly the permissions they need.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Multiple user roles: staff, manager, admin, and more</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Granular permission overrides</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span>Secure authentication and session management</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-900 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-white">Ready to see it in action?</h2>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

