"use client";

import Image from "next/image";
import { useRef } from "react";

const clubTypes = [
  {
    name: "Tennis Clubs",
    image: "/images/clubs/tennis.jpg", // Replace with your image: tennis.jpg
    description: "Court booking, programs, and member management",
  },
  {
    name: "Golf Clubs",
    image: "/images/clubs/golf.jpg", // Replace with your image: golf.jpg
    description: "Tee times, tournaments, and membership tracking",
  },
  {
    name: "Pickleball",
    image: "/images/clubs/pickleball.jpg", // Replace with your image: pickleball.jpg
    description: "Court reservations and league management",
  },
  {
    name: "Padel Clubs",
    image: "/images/clubs/padel.jpg", // Replace with your image: padel.jpg
    description: "Modern court booking and member services",
  },
  {
    name: "Curling Clubs",
    image: "/images/clubs/curling.jpg", // Replace with your image: curling.jpg
    description: "Ice time management and event scheduling",
  },
  {
    name: "Multi-Sport Clubs",
    image: "/images/clubs/multi-sport.jpg", // Replace with your image: multi-sport.jpg
    description: "Complete facility management across all sports",
  },
];

export default function ClubTypesGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Scroll by 400px
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

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

        {/* Horizontal scrolling container with navigation */}
        <div className="relative">
          {/* Left arrow button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700 hover:border-gray-600 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right arrow button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700 hover:border-gray-600 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
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
        </div>
      </div>
    </section>
  );
}

