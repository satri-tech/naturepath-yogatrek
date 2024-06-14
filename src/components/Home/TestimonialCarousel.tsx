"use client";
// import Testimonial from '@/components/Card/Testimonial';
// import { TestimonialData } from '@/lib/type/testimonial';
import { DotIcon, MoveLeft, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { TestimonialWithUser } from "./Testimonials";
import StarRating from "../ui/Rating";
import Image from "next/image";

function TestimonialsCarousel({
  testimonial,
}: {
  testimonial: TestimonialWithUser[];
}) {
  const slides = testimonial;

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
    <div className="container flex flex-col  lg:flex-row">
      <div className="lg:w-1/2 w-full  grid items-center content-center space-y-0.5 text-center lg:text-start">
        <div>
          <h2 className="text-3xl font-bold tracking-wide my-4 text-primary">
            Checkout what our well wisher want to say...
          </h2>
          <p className="text-muted-foreground text-xl my-10">
            Voices of Hope, Stories of Strength
            <br />
          </p>
        </div>
        <div className="hidden lg:flex gap-2 ">
          <div className="text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="    text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveRight onClick={nextSlide} size={30} />
          </div>
        </div>
      </div>
      <div className="max-w-lg h-auto lg:w-1/2 w-full m-auto md:my-auto mx-auto lg:mx-10 py-4 px-4 relative group">
        {slides.map((item, index) => (
          <div
            className={`w-full h-full rounded-2xl bg-center bg-cover text-white duration-500 py-4 sm:px-4 ${
              index === currentIndex ? "" : "hidden"
            } ${
                index % 2 == 0
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "bg-gradient-to-r from-orange-400 to-red-500"
              }`}
            key={item.id}
          >
            <div>
              <div className="flex flex-1 mb-3 gap-2">
                <Image
                  src={
                    item.user.image ??
                    `https://randomuser.me/api/portraits/men/${index}.jpg`
                  }
                  alt={item.user.firstName}
                  width={50}
                  height={50}
                  quality={100}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="grid">
                  <StarRating rating={item.rating} />
                  {item.user.firstName}&nbsp;{item.user.lastName}
                </div>
              </div>
              <p className="mb-3 text-sm bold">{item.comment}</p>
            </div>
          </div>
        ))}

        {/* Left Arrow */}
        <div className="lg:hidden block">
          <div className="hidden  group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="hidden  group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveRight onClick={nextSlide} size={30} />
          </div>
        </div>

        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
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
    </div>
  );
}

export default TestimonialsCarousel;
