import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-white hover:text-orange-500 transition-colors">
            ClubVerse
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full text-sm font-medium transition-all duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

