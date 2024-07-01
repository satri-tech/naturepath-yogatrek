import React, { Suspense } from "react";
import ServicesCard from "../Card/ServicesCard";
import Headings from "../ui/Headings";
import Image from "next/image";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";

const ServicesList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: [`ServicesCollection`], revalidate: 100 } }
    );
    const data = await response.json();
    return (
      <div className="flex flex-col md:flex-row  overflow-hidden">
        {data.data.map((item: Service, index: number) => (
          <div
            className="group relative w-full h-[10rem] md:flex-1 md:h-[25rem] hover:h-[25rem] md:hover:scale-x-110 md:hover:z-50 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform"
            key={index}
          >
            <div className=" relative w-full h-full ">
              <Image
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full brightness-90"
                width={1024}
                height={1024}
                quality={100}
              />
            </div>
            <div className="group-hover:opacity-100 absolute bottom-0 left-0 right-0 h-36 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition duration-300 ease-in-out transform ">
              <h1 className="text-2xl font-semibold text-center">
                {item.title}
              </h1>
              <p
                className="text-lg font-medium text-center px-6"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const Services = () => {
  return (
    <div className="mt-20">
      <Headings>Our Services</Headings>
      <Suspense fallback={<p>Loading...</p>}>
        <ServicesList />
      </Suspense>
    </div>
  );
};

export default Services;
