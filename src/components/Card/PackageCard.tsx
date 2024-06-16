import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const PackageCard = () => {
  return (
    <Link href={'/packages/test-title'}>
    <div className="relative">
      <div className=" bg-primary mt-4 grid absolute top-0 -right-2 z-20 p-3 rounded-tl-xl">
        <span className="text-secondary text-xs text-center ">Starts at </span>
        <span className="ml-2 text-lg font-bold text-white "> 1310 $</span>
        <span className="text-xs text-center line-through  text-secondary">
          1800 ${" "}
        </span>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <Image
            src={
              "https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg"
            }
            alt="Everest Base Camp"
            className="w-full h-72 object-cover brightness-75 hover:scale-105 transition-all duration-500"
            width={500}
            height={500}
            quality={100}
          />
          <Badge className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs">
            4D / 3N
          </Badge>
          <h2 className="absolute bottom-4 left-1 text-xl font-semibold text-white">
            Everest Base Camp Trek - 14 Days
          </h2>
        </div>
        <div className="p-4">
          <p className="line-clamp-4 text-center text-gray-700 px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            accusantium accusamus quo quis, facilis illo, eum neque iusto soluta
            vero modi quaerat in dolorem error placeat fugit? Asperiores,
            voluptatibus natus fuga facere omnis eligendi sit unde libero error
            recusandae animi laudantium. Inventore, sint! Eos minus dicta
            impedit? Recusandae, maxime iure!
          </p>
          <div className=" flex gap-2 mt-4">
            <Button variant={"default"} className="w-full py-2 px-4 ">
              Book Now
            </Button>
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
