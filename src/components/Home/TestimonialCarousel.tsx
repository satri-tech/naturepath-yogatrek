"use client";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import React, { useRef, useState } from "react";
import { TestimonialWithUser } from "./Testimonials";
import StarRating from "../ui/Rating";
import Image from "next/image";
import Slider from "react-slick";
import { petrona } from "@/app/fonts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function TestimonialsCarousel({
  testimonial = [],
}: {
  testimonial: TestimonialWithUser[];
}) {
  const slides = testimonial;
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  // Conditional settings based on number of slides
  const settings = {
    dots: false,
    infinite: slides.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: slides.length > 1,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const goToPrevSlide = () => {
    if (sliderRef.current && slides.length > 1) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current && slides.length > 1) {
      sliderRef.current.slickNext();
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current && slides.length > 1) {
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  };

  // Single testimonial render
  const renderSingleTestimonial = (item: TestimonialWithUser, index: number = 0) => (
    <Card className="border bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <CardContent className="p-6 lg:p-12">
        <div className="space-y-8">
          {/* Quote Icon */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Quote className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
            "{item.comment}"
          </blockquote>

          {/* User Info */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <div className="relative">
              <Image
                src={
                  item.user.image ??
                  `https://randomuser.me/api/portraits/men/${index}.jpg`
                }
                alt={`${item.user.firstName} ${item.user.lastName}`}
                width={64}
                height={64}
                quality={100}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
              />
            </div>

            <div className="text-center lg:text-left">
              <div className={`text-lg font-semibold text-foreground ${petrona.className}`}>
                {item.user.firstName} {item.user.lastName}
              </div>
              <div className="mt-2">
                <StarRating rating={item.rating} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // If there's only one testimonial, render it without the slider
  if (slides.length === 1) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Header Section */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground lg:text-xl">
                Real experiences from people who trust our service
              </p>
            </div>
          </div>

          {/* Single Testimonial */}
          <div className="flex items-center">
            {renderSingleTestimonial(slides[0], 0)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Header Section */}
        <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground lg:text-xl">
              Real experiences from people who trust our service
            </p>
          </div>

          {/* Navigation Controls */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevSlide}
                className="h-12 w-12 rounded-full border-2 border-muted-foreground/20 bg-background transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextSlide}
                className="h-12 w-12 rounded-full border-2 border-muted-foreground/20 bg-background transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative flex flex-col items-center space-y-6">
          <div className="w-full">
            <Slider ref={sliderRef} {...settings}>
              {slides.map((item, index) => (
                <div key={item.id} className="px-1">
                  {renderSingleTestimonial(item, index)}
                </div>
              ))}
            </Slider>
          </div>

          {/* Navigation Dots - Below the carousel */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-primary w-3"
                    : "bg-slate-400 hover:bg-muted-foreground/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Mobile Navigation Arrows */}
          {slides.length > 1 && (
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevSlide}
                className="absolute left-2 top-1/4 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextSlide}
                className="absolute right-2 top-1/4 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;