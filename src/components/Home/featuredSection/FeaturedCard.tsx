import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedCard = ({data, numb}:{data:Package, numb:number}) => {
  return (
    <div className="min-w-screen min-h-screen flex items-center px-5 lg:px-10 overflow-hidden relative">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-14 py-4 mb-10 md:mb-0">
            <div className="relative">
              <Image
                src={data.image}
                className="w-full relative z-10 h-[350px] object-cover object-center"
                alt={data.title}
                // layout="responsive"
                width={500}
                height={500} // Adjusted height to maintain the landscape aspect ratio
                quality={100}
                
              />
              <div className="border-[3px] border-secondary absolute -top-5 -bottom-5 -left-5 -right-5 md:-top-10 md:-bottom-10 md:-left-10 md:-right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">
               {data.title}{numb}
              </h1>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: data.description }} />
            
                <Link
                  href={`/packages/${data.slug}`}
                  className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                >
                  MORE <i className="mdi mdi-arrow-right"></i>
                </Link>
       
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline"></span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {data.SharingOffer}
                </span>
                <span className="text-2xl leading-none align-baseline line-through text-primary">
                  {data.SharingPrice}
                </span>
              </div>
              <div className="inline-block align-bottom">
                <Link  href={`/packages/${data.slug}`}>
                
                <Button className=" hover:opacity-100 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
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
