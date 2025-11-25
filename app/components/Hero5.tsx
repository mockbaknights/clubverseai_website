import Link from "next/link";

export default function Hero5() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
          AI-Powered. API-First. Club-Focused.
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
        Experience the perfect fusion of artificial intelligence and robust API infrastructure designed exclusively for club management
      </p>
      <Link
        href="/contact"
        className="mt-8 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
      >
        Request Demo
      </Link>
    </div>
  );
}

