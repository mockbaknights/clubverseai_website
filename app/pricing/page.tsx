import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$79 /month",
    fee: "1.9% + 30¢",
    save: undefined,
    bestFor: "Small clubs just getting started",
    limits: "Up to 500 active members",
  },
  {
    name: "Growth",
    price: "$199 /month",
    fee: "1.5% + 30¢",
    save: "you save 21%",
    bestFor: "Growing clubs with steady revenue",
    limits: "Up to 2,000 members",
  },
  {
    name: "Pro",
    price: "$399 /month",
    fee: "1.0% + 30¢",
    save: "you save 47%",
    bestFor: "Large or high-volume clubs",
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
            Final pricing table that converts beautifully. Simple base fee + transparent transaction pricing.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/60 shadow-2xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr className="text-left text-sm uppercase tracking-wide text-gray-500">
                <th className="px-6 py-5 font-semibold">Plan</th>
                <th className="px-6 py-5 font-semibold">Monthly Base Fee</th>
                <th className="px-6 py-5 font-semibold">Transaction Fee</th>
                <th className="px-6 py-5 font-semibold">Best For</th>
                <th className="px-6 py-5 font-semibold">Key Limits</th>
                <th className="px-6 py-5 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900 text-lg">
              {plans.map((plan) => (
                <tr key={plan.name} className="hover:bg-gray-900/40 transition-colors">
                  <td className="px-6 py-6 font-semibold text-white">
                    <div>{plan.name}</div>
                  </td>
                  <td className="px-6 py-6 text-gray-200">{plan.price}</td>
                  <td className="px-6 py-6 text-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span>{plan.fee}</span>
                      {plan.save && <span className="text-sm text-orange-500">({plan.save})</span>}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-gray-300">{plan.bestFor}</td>
                  <td className="px-6 py-6 text-gray-300">{plan.limits}</td>
                  <td className="px-6 py-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-gray-700 px-5 py-2 text-sm font-medium text-white hover:border-gray-500 transition-colors"
                    >
                      Talk to us
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-12 border-t border-gray-900 mt-16">
          <p className="text-gray-400 mb-4">
            Includes GameTime API integration, automated billing, and QuickBooks sync.
          </p>
          <p className="text-gray-500 text-sm">
            Need help choosing? <Link href="/contact" className="text-orange-500 hover:text-orange-400">Contact us</Link> and we'll guide you to the right plan.
          </p>
        </div>
      </div>
    </div>
  );
}

