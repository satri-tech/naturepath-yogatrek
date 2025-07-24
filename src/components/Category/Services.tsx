import React from "react";
import Headings from "../ui/Headings";
import Image from "next/image";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";

const Services = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: ["ServicesCollection"], revalidate: 100 } }
    );
    const data = await response.json();

    return (
      <section className="section-padding dark:text-text-dark flex flex-col gap-8 lg:gap-12">
        <Headings>Our Services</Headings>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-[500px]  overflow-hidden shadow-2xl">
          {data.data.map((item: Service, index: number) => (
            <div
              className="group relative flex-1 cursor-pointer transition-all duration-700 ease-out hover:flex-[2] overflow-hidden"
              key={index}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full transition-all duration-700 ease-out group-hover:scale-110"
                  width={1024}
                  height={1024}
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
                {/* Title - Always visible */}
                <h3 className="text-white text-xl lg:text-2xl font-bold mb-3 transition-transform duration-500 ease-out group-hover:scale-105">
                  {item.title}
                </h3>

                {/* Description Container - Fixed height to prevent layout shift */}
                <div className="h-24 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 transform translate-y-full transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <p
                      className="text-white/90 text-sm lg:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>

                {/* Decorative Line Container - Fixed height */}
                <div className="h-2 mt-2 relative">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-white/60 to-white/30 transition-all duration-500 ease-out delay-200 group-hover:w-full" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden grid gap-6">
          {data.data.map((item: Service, index: number) => (
            <div
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              key={index}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  width={1024}
                  height={1024}
                  quality={100}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="transform transition-all duration-300 group-hover:translate-y-0">
                  <h3 className="text-white text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p
                    className="text-white/90 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>

                {/* Glassmorphism accent */}
              </div>

              {/* Floating Action Indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    return <Error status={404} message="Bad request" />;
  }
};

export default Services;