import Link from "next/link";

export default function Hero1c() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          API + AI = Club Management Reinvented
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
        Transform your club operations with intelligent automation and seamless integrations
      </p>
      <Link
        href="/contact"
        className="mt-8 px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-full text-lg font-medium transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
      >
        Get Started
      </Link>
    </div>
  );
}

