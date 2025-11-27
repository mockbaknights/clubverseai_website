import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29 /mo",
    fee: "1.9% + $0.10",
    limits: "Up to 1,000 members",
  },
  {
    name: "Growth",
    price: "$99 /mo",
    fee: "1.4% + $0.10",
    limits: "Up to 5,000 members",
  },
  {
    name: "Pro",
    price: "$249 /mo",
    fee: "0.9% + $0.10",
    limits: "Unlimited members",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple base fee + transparent processing.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/60 shadow-2xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr className="text-left text-sm uppercase tracking-wide text-gray-400 bg-gray-900/40">
                <th className="px-6 py-5 font-semibold">Plan</th>
                <th className="px-6 py-5 font-semibold">Monthly Base</th>
                <th className="px-6 py-5 font-semibold">ClubVerse Fee</th>
                <th className="px-6 py-5 font-semibold">Member Limits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900 text-lg">
              {plans.map((plan) => (
                <tr key={plan.name} className="hover:bg-gray-900/40 transition-colors">
                  <td className="px-6 py-6 font-semibold text-white">
                    <div>{plan.name}</div>
                  </td>
                  <td className="px-6 py-6 text-gray-200">{plan.price}</td>
                  <td className="px-6 py-6 text-gray-200">{plan.fee}</td>
                  <td className="px-6 py-6 text-gray-300">{plan.limits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If Stripe is integrated, additional Stripe processing fees apply per transaction.
          </p>
        </div>

        <div className="text-center pt-12 border-t border-gray-900 mt-16 space-y-6">
          <p className="text-gray-400">
            Includes GameTime API integration, automated billing, and QuickBooks sync.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3 text-white hover:border-gray-500 transition-colors text-lg font-medium"
          >
            Talk to us
          </Link>
          <p className="text-gray-500 text-sm">
            Need help choosing? We'll guide you to the right plan.
          </p>
        </div>
      </div>
    </div>
  );
}
