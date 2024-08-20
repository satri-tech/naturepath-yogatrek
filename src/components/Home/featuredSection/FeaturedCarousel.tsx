"use client";
import { DotIcon, MoveLeft, MoveRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import { Package } from "@prisma/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ featuredlist }: { featuredlist: Package[] }) {
  const slides = featuredlist;

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay speed (ms)
    arrows: false,
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentIndex(currentIndex == slides.length - 1 ? 0 : currentIndex + 1);
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentIndex(currentIndex == 0 ? slides.length - 1 : currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full m-auto px-4 relative group">
      <Slider
        // style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        ref={sliderRef}
        className=" rounded-2xl bg-center bg-cover duration-500"
        {...settings}
      >
        {slides.map((item: Package, index: number) => (
          <div
            className={` rounded-2xl bg-center bg-cover text-white duration-500 pb-6 lg:pb-8 sm:px-4 ${
              index === currentIndex ? "" : "hidden"
            }`}
            key={item.id}
          >
            <FeaturedCard data={item} numb={index} />
          </div>
        ))}
      </Slider>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <MoveLeft onClick={goToPrevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <MoveRight onClick={goToNextSlide} size={30} />
      </div>
      <div className="flex gap-3 top-4 justify-center items-center py-2">
        {slides.map((slides, slideIndex: number) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${currentIndex == slideIndex ? " after:content-normal after:w-4 after:h-4  after:absolute relative after:border-2 after:border-primary after:transform after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-sm" : "opacity-50"} w-2 h-2 bg-primary rounded-sm
            `}
          >
            {/* <DotIcon className={`${currentIndex==slideIndex?"":""} `} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
