"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Package } from "@prisma/client";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { petrona } from "@/app/fonts";

const PackageCard = ({ packages }: { packages: Package }) => {
  return (
    <div className="relative">
      {/* <div
          className={` bg-white mt-4 grid absolute top-0 -right-2 z-10 p-3 px-5 rounded-tl-xl rounded-br-xl text-primary border border-primary text-center ${petrona.className}`}
        >
          <span className=" text-xs text-center ">Starts at </span>
          <span className="text-xl font-extrabold mt-1">
            {" "}
            {packages.SharingOffer}
          </span>
          <span className=" text-center line-through">
            {packages.PrivatePrice}{" "}
          </span>
        </div> */}
      <div className="bg-white dark:bg-black-dark dark:text-text-dark rounded-lg shadow-md overflow-hidden group/parent">
        <div className="relative overflow-hidden">
          <Image
            src={packages.image}
            alt={packages.title}
            className="w-full h-[215px] sm:h-[250px] md:h-[300px] object-cover group-hover/parent:scale-105 transition-all duration-500 dark:brightness-[75%]"
            width={500}
            height={500}
            quality={100}
          />
          {/* <Badge className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 text-xs">
              {packages.Duration}
            </Badge> */}
          {/* <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
              {packages.title}
            </h2> */}
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className=" flex items-center gap-1">
            <IoLocationOutline size={18} className=" text-primary" /> Nepal
          </div>

          <div className=" flex justify-between gap-8">
            <Link href={`/packages/${packages.id}`}>
              <h2 className="text-xl font-semibold group-hover/parent:text-primary transition-all duration-500">
                {packages.title}
              </h2>
            </Link>

            <div className={` flex flex-col ${petrona.className}`}>
              <span className="text-3xl font-extrabold text-primary">
                {packages.SharingOffer}{" "}
              </span>
              <span className="text-lg text-center line-through text-red-500">
                {packages.PrivatePrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LuCalendarDays size={18} className=" " />
            <span>{packages.Duration}</span>
          </div>
          {/* <p
              className="line-clamp-4 text-gray-700 px-2"
              dangerouslySetInnerHTML={{ __html: packages.description }}
            /> */}

          <div className=" flex gap-2 mt-4">
            <Link href={`/packages/${packages.id}`} className="w-full">
              <Button variant={"default"} className="w-full py-2 px-4 ">
                Book Now
              </Button>
            </Link>
            {/* <Button variant={"secondary"} className="w-full py-2 px-4 ">
              Learn More
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
