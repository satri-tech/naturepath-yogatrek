"use client";
// import Testimonial from '@/components/Card/Testimonial';
// import { TestimonialData } from '@/lib/type/testimonial';
import { DotIcon, MoveLeft, MoveRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TestimonialWithUser } from "./Testimonials";
import StarRating from "../ui/Rating";
import Image from "next/image";
import { petrona } from "@/app/layout";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";

function TestimonialsCarousel({
  testimonial = [],
}: {
  testimonial: TestimonialWithUser[];
}) {
  const slides = testimonial;
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 8000);
  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  // const prevSlide = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  // const nextSlide = () => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
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

  // const goToSlide = (slideIndex: React.SetStateAction<number>) => {
  //   setCurrentIndex(slideIndex);
  // };

  return (
    <div className="container flex flex-col  lg:flex-row">
      <div className="lg:w-1/2 w-full  grid items-center content-center space-y-0.5 text-center lg:text-start">
        <div>
          <h2
            className={`text-2xl sm:text-3xl font-bold uppercase text-primary lg:mb-4 lg:w-[500px] ${petrona.className}`}
          >
            Checkout what our customers want to say.
          </h2>
          {/* <p className="text-muted-foreground text-xl my-10">
            Voices of Hope, Stories of Strength
            <br />
          </p> */}
        </div>
        <div className="hidden lg:flex gap-2 ">
          <div className="text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveLeft onClick={goToPrevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveRight onClick={goToNextSlide} size={30} />
          </div>
        </div>
      </div>
      <div className="h-auto lg:w-1/2 w-full m-auto md:my-auto mx-auto lg:mx-10 py-4 px-4 relative group">
        <Slider ref={sliderRef} className="" {...settings}>
          {slides.map((item, index) => (
            <div
              className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 py-4 mb-2 px-4 lg:px-5 relative overflow-hidden shadow-xl ${
                index === currentIndex ? "" : "hidden"
              }
             
            `}
              // ${
              //   index % 2 == 0
              //     ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
              //     : "bg-gradient-to-r from-orange-400 to-red-500"
              // }
              key={item.id}
            >
              <div>
                <div className="flex flex-1 mb-3 gap-2 flex-col items-center">
                  <Image
                    src={
                      item.user.image ??
                      `https://randomuser.me/api/portraits/men/${index}.jpg`
                    }
                    alt={item.user.firstName}
                    width={50}
                    height={50}
                    quality={100}
                    className="w-20 h-20 rounded-full mr-3"
                  />
                  <div
                    className={`flex flex-col items-center text-lg ${petrona.className} font-semibold`}
                  >
                    {item.user.firstName}&nbsp;{item.user.lastName}
                    <StarRating rating={item.rating} />
                  </div>
                </div>
                <p className="mb-3 bold text-center text-black/85">
                  {item.comment}
                </p>

                {/*quote*/}
                <div className=" p-6 bg-gradient-to-tr from-primary to-primary/35 absolute top-0 right-0 rounded-bl-[40px]">
                  <FaQuoteRight className=" text-3xl text-white" />
                </div>
              </div>
            </div>
          ))}

          {/*remove this later after more than 1 testimonial*/}
          {slides.map((item, index) => (
            <div
              className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 py-4 mb-2 px-4 lg:px-5 relative overflow-hidden shadow-xl ${
                index === currentIndex ? "" : "hidden"
              }
             
            `}
              // ${
              //   index % 2 == 0
              //     ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
              //     : "bg-gradient-to-r from-orange-400 to-red-500"
              // }
              key={item.id}
            >
              <div>
                <div className="flex flex-1 mb-3 gap-2 flex-col items-center">
                  <Image
                    src={
                      item.user.image ??
                      `https://randomuser.me/api/portraits/men/${index}.jpg`
                    }
                    alt={item.user.firstName}
                    width={50}
                    height={50}
                    quality={100}
                    className="w-20 h-20 rounded-full mr-3"
                  />
                  <div
                    className={`flex flex-col items-center text-lg ${petrona.className} font-semibold`}
                  >
                    {item.user.firstName}&nbsp;{item.user.lastName}
                    <StarRating rating={item.rating} />
                  </div>
                </div>
                <p className="mb-3 bold text-center text-black/85">
                  {item.comment}
                </p>

                {/*quote*/}
                <div className=" p-6 bg-gradient-to-tr from-primary to-primary/35 absolute top-0 right-0 rounded-bl-[40px]">
                  <FaQuoteRight className=" text-3xl text-white" />
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Left Arrow */}
        <div className="lg:hidden block">
          <div className="hidden  group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveLeft onClick={goToPrevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="hidden  group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MoveRight onClick={goToNextSlide} size={30} />
          </div>
        </div>

        {/* <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <DotIcon />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
