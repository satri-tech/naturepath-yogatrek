"use client";
import { DotIcon, MoveLeft, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import { Package } from "@prisma/client";

function Carousel({ featuredlist }: { featuredlist: Package[] }) {
  const slides = featuredlist;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full m-auto py-4 px-4 relative group bg-primary">
      <div
        // style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >
        {slides.map((item: Package, index: number) => (
          <div
            className={`w-full h-full rounded-2xl bg-center bg-cover text-white duration-500 py-4 sm:px-4 ${
              index === currentIndex ? "" : "hidden"
            }`}
            key={item.id}
          >
            <FeaturedCard data={item} numb={index}/>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <MoveLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <MoveRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slides, slideIndex: number) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <DotIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
