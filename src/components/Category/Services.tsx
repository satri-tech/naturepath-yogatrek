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
      <div className="flex flex-col lg:flex-row  overflow-hidden">
        {data.data.map((item: Service, index: number) => (
          <div
            className="group group/parent relative w-full h-[10rem] lg:flex-1 lg:h-[25rem] hover:h-[25rem] cursor-pointer transition-all duration-300 ease-in-out transform"
            key={index}
          >
            <div className=" relative w-full h-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full brightness-90 lg:group-hover/parent:scale-110 lg:overflow-hidden lg:group-hover/parent:z-50 transition-all duration-300 ease-in-out transform"
                width={1024}
                height={1024}
                quality={100}
              />
            </div>
            <div className="group-hover:opacity-100 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition duration-300 ease-in-out transform ">
              <h1 className="text-xl font-bold px-6">
                {item.title}
              </h1>
              <p
                className=" text-sm px-6 pt-4"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return <Error status={404} message="Bad request" />;
  }
};

const Services = () => {
  return (
    <section className="section-padding">
      <Headings>Our Services</Headings>
      <Suspense fallback={<p>Loading...</p>}>
        <ServicesList />
      </Suspense>
    </section>
  );
};

export default Services;
