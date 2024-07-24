import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Package } from "@prisma/client";
import { petrona } from "@/app/layout";

const PackageCard = ({ packages }: { packages: Package }) => {
  return (
    <Link href={`/packages/${packages.slug}`}>
      <div className="relative">
        <div
          className={` bg-white mt-4 grid absolute top-0 -right-2 z-20 p-3 px-5 rounded-tl-xl rounded-br-xl text-primary border border-primary text-center ${petrona.className}`}
        >
          <span className=" text-xs text-center ">Starts at </span>
          <span className="text-xl font-extrabold mt-1">
            {" "}
            {packages.SharingOffer}
          </span>
          <span className=" text-center line-through">
            {packages.PrivatePrice}{" "}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <Image
              src={packages.image}
              alt={packages.title}
              className="w-full h-72 object-cover brightness-75 hover:scale-105 transition-all duration-500"
              width={500}
              height={500}
              quality={100}
            />
            <Badge className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 text-xs">
              {packages.Duration}
            </Badge>
            <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
              {packages.title}
            </h2>
          </div>
          <div className="p-4">
            <p
              className="line-clamp-4 text-gray-700 px-2"
              dangerouslySetInnerHTML={{ __html: packages.description }}
            />

            <div className=" flex gap-2 mt-4">
              <Link href={`/packages/${packages.slug}`} className="w-full">
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
    </Link>
  );
};

export default PackageCard;
