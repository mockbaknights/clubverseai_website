"use client";

import Image from "next/image";

const clubTypes = [
  {
    name: "Tennis Clubs",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=600&fit=crop",
    description: "Court booking, programs, and member management",
  },
  {
    name: "Golf Clubs",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
    description: "Tee times, tournaments, and membership tracking",
  },
  {
    name: "Pickleball",
    image: "https://images.unsplash.com/photo-1622163642991-c9b6c8b9c8f1?w=800&h=600&fit=crop",
    description: "Court reservations and league management",
  },
  {
    name: "Padel Clubs",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    description: "Modern court booking and member services",
  },
  {
    name: "Curling Clubs",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    description: "Ice time management and event scheduling",
  },
  {
    name: "Multi-Sport Clubs",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
    description: "Complete facility management across all sports",
  },
];

export default function ClubTypesGallery() {
  return (
    <section className="py-24 px-4 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            Built for Every Club
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From tennis to golf, pickleball to curling—ClubVerse works for clubs of all types.
          </p>
        </div>

        {/* Horizontal scrolling container */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {clubTypes.map((club, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 md:w-96 group cursor-pointer"
                >
                  <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <Image
                      src={club.image}
                      alt={club.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 320px, 384px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {club.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint gradient on the right */}
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>

        {/* Scroll hint text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            ← Scroll to see more →
          </p>
        </div>
      </div>
    </section>
  );
}

