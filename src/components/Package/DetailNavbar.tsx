"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const DetailNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        setIsVisible(false); // Scroll down
      } else {
        setIsVisible(true); // Scroll up
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <nav
      className={`bg-gray-800 text-white sticky  w-full z-10 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link href="#highlight" className="py-5 px-3 hover:bg-gray-700">
              Highlights
            </Link>
            <Link href="#overview" className="py-5 px-3 hover:bg-gray-700">
              Overview
            </Link>
            <Link href="#itinerary" className="py-5 px-3 hover:bg-gray-700">
              Itinerary
            </Link>
            <Link href="#included" className="py-5 px-3 hover:bg-gray-700">
              Included/Excluded
            </Link>
            <Link href="#reviews" className="py-5 px-3 hover:bg-gray-700">
              Reviews
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DetailNavbar;
