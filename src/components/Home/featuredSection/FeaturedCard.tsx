"use client";

import { petrona } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedCard = ({ data, numb }: { data: Package; numb: number }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(data.description);
  }, [data.description]);

  return (
    <div className="flex items-center px-4 lg:px-8 relative">
      <div className="w-full max-w-7xl rounded-2xl bg-white border shadow-sm hover:shadow-lg transition-all duration-500 p-6 md:p-8 lg:p-12 mx-auto text-gray-800 dark:bg-gray-900 dark:text-gray-100 relative overflow-hidden group">

        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

        {/* Featured badge */}
        <div className="absolute -top-2 -right-2 z-20">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
            Featured #{numb}
          </div>
        </div>

        <div className="md:flex items-center gap-8 lg:gap-12 relative z-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="relative group/image">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={data.image}
                  className="w-full h-[280px] lg:h-[320px] xl:h-[380px] object-cover object-center dark:brightness-90 transform group-hover/image:scale-105 transition-transform duration-700"
                  alt={data.title}
                  width={600}
                  height={400}
                  quality={95}
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Decorative border */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

              {/* Price badge on image */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-md">
                <div className={`flex items-center gap-2`}>
                  <span className="text-lg font-bold text-primary">{data.SharingOffer}</span>
                  <span className="text-sm line-through text-red-500">{data.SharingPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="font-bold uppercase text-2xl lg:text-3xl xl:text-4xl leading-tight group-hover:text-primary transition-colors duration-300 tracking-wide">
                {data.title}
              </h1>

              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base line-clamp-4"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <Link
                href={`/packages/${data.id}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium border-b border-primary/30 hover:border-primary transition-colors duration-200 pb-1 group/link"
              >
                <span>Read More</span>
                <svg
                  className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Pricing and CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">

              {/* Desktop Pricing Display */}
              <div className={`hidden sm:flex flex-col items-start `}>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-bold text-primary leading-none">
                    {data.SharingOffer}
                  </span>
                  <span className="text-xl text-red-500 line-through leading-none">
                    {data.SharingPrice}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wide">
                  Special Offer
                </span>
              </div>

              {/* CTA Button */}
              <div className="w-full sm:w-auto">
                <Link href={`/packages/${data.id}`} className="block w-full sm:w-auto">
                  <Button className="w-full sm:w-auto px-8 py-3 font-semibold text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group/button">
                    <svg
                      className="w-5 h-5 mr-2 transform group-hover/button:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m.4 8l-1-3H17M7 13L5.4 5M7 13h10v7H7v-7zm10 0v7m-5-7v7" />
                    </svg>
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features/Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                ⭐ Popular Choice
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                ✓ Best Value
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;