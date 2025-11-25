import Link from "next/link";

export default function Hero5b() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-red-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          AI-Powered. API-First. Club-Focused.
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
        Experience the perfect fusion of artificial intelligence and robust API infrastructure designed exclusively for club management
      </p>
      <Link
        href="/contact"
        className="mt-8 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
      >
        Request Demo
      </Link>
    </div>
  );
}

