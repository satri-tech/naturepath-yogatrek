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
    // Set the description after the component mounts
    setDescription(data.description);
  }, [data.description]);

  return (
    <div className=" flex items-center px-5 lg:px-10 relative ">
      <div className="w-full max-w-6xl rounded bg-white shadow-md p-10 lg:p-20 mx-auto text-gray-800 dark:bg-black-dark dark:text-text-dark relative md:text-left group">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-14 py-4 mb-10 md:mb-0">
            <div className="relative">
              <Image
                src={data.image}
                className="w-full relative z-10 h-[250px] lg:h-[300px] xl:h-[350px] object-cover object-center dark:brightness-[75%] rounded-md"
                alt={data.title}
                // layout="responsive"
                width={500}
                height={500} // Adjusted height to maintain the landscape aspect ratio
                quality={100}
              />
              <div className="border-[3px] border-secondary dark:border-secondary/75 absolute -top-5 -bottom-5 -left-5 -right-5 md:-top-10 md:-bottom-10 md:-left-10 md:-right-10 z-0 rounded-md"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10 flex flex-col gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9">
            <div className="">
              <h1 className="font-bold uppercase text-2xl mb-5 group-hover:text-primary transition-all duration-300">
                {data.title}
                {numb}
              </h1>
              <p
                className="text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <Link
                href={`/packages/${data.id}`}
                className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
              >
                MORE <i className="mdi mdi-arrow-right"></i>
              </Link>
            </div>
            <div className={` flex items-center justify-between gap-4`}>
              <div
                className={`flex flex-col items-start  ${petrona.className}`}
              >
                <span className="font-extrabold text-5xl leading-none align-baseline text-primary">
                  {data.SharingOffer}{" "}
                </span>
                <span className="text-2xl leading-none line-through text-red-500">
                  {data.SharingPrice}
                </span>
              </div>
              <div className="inline-block align-middle">
                <Link href={`/packages/${data.slug}`}>
                  <Button className=" px-10 py-2 font-semibold">
                    <i className="mdi mdi-cart -ml-2 mr-2"></i> BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
