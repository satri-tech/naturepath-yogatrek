import React from "react";
import ServicesCard from "../Card/ServicesCard";
import Headings from "../ui/Headings";
import Image from "next/image";

const Services = () => {
  return (
    <div className="mt-20">
      <Headings>Our Services</Headings>
      <div className="flex flex-col md:flex-row ">
        {[
          "Yoga sessions",
          "Meditation program",
          "Trek & Tours",
          "Accomodations",
          "Yoga sessions",
          "Meditation program",
          "Trek & Tours",
          "Accomodations",
        ].map((item, index) => (
          <div className="group relative w-full h-[10rem] md:w-60 md:h-auto hover:h-[25rem] md:hover:w-96 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform" key={index}>
            <div className=" relative w-full h-full ">
              <Image
                src={`https://picsum.photos/200/300?random=${index}`}
                alt={item}
                className="object-cover w-full h-full"
                width={1024}
                height={1024}
                quality={100}
              />
            </div>
            <div className="group-hover:opacity-100 absolute bottom-0 left-0 right-0 h-14 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition duration-300 ease-in-out transform ">
              <h1 className="text-2xl font-semibold">{item}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
