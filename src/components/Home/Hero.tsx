import React from "react";
import BookingBox from "@/components/Package/BookingBox";
import { petrona } from "@/app/layout";
import Image from "next/image";
import { Button } from "../ui/button";
const Hero = () => {
  return (
    <div className="px-0 relative w-full h-[100vh] -translate-y-20 -z-10">
      <div className="grid items-center h-full w-full text-white">
        <div className="flex flex-col lg:flex-row lg:justify-between container max-w-7xl mt-28 lg:mt-10">
          <div className="flex flex-col gap-6 md:gap-8 xl:gap-10">
            <div className=" flex flex-col gap-1">
              <span className=" text-sm lg:text-base font-medium">
                Explore the Art of Yoga with Us
              </span>
              <h1
                className={`text-3xl md:text-4xl xl:text-5xl font-extrabold sm:max-w-[500px] md:max-w-[550px] lg:max-w-[650px] ${petrona.className}`}
              >
                Fuel Your Mind, Body, and Soul with{" "}
                <span className=" text-secondary">Love</span>
              </h1>
            </div>
            <div>
              <Button className=" uppercase">Book Now</Button>
            </div>
          </div>

          {/* <div className="grid sm:grid-cols gap-5"> */}
          {/* <div className="bg-green-500 text-white p-2"> */}
          {/* <h2 className="text-center">Don&apos;t Miss-out!</h2>
            <div className="my-6">
              <BookingBox />
            </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
      {/* <video
        src="https://res.cloudinary.com/dqyzr8bp3/video/upload/v1716565094/video1_wpw0kr.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 w-full h-full object-cover brightness-50 -z-20"
      /> */}

      <Image
        src={"/Hero/hero4.jpg"}
        alt="hero-img"
        width={1024}
        height={1024}
        className="absolute top-0 w-full h-full object-cover brightness-[85%] -z-20"
      />

      {/*leafs*/}
      <Image
        src={"/Hero/leaf.png"}
        alt="hero-img"
        width={1024}
        height={1024}
        className="absolute bottom-12 right-8 w-28 h-28  md:right-10 md:w-32 md:h-32 xl:bottom-14 xl:right-12 xl:w-40 xl:h-40 object-cover z-20 object-center"
      />

      <Image
        src={"/Hero/leaf.png"}
        alt="hero-img"
        width={1024}
        height={1024}
        className="absolute bottom-10 right-32 w-16 h-16 md:bottom-8  md:right-36 md:w-20 md:h-20 xl:bottom-8  xl:right-44 xl:w-24 xl:h-24 object-cover z-20 object-center"
      />

      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-primary/30" />
      {/* <Image
        src="/hero/Image.jpeg"
        alt="hero image"
        width={1024}
        height={1024}
        quality={100}

        // autoPlay
        // muted
        // loop
        className="absolute top-0 w-full h-full object-cover brightness-50 -z-10"
      /> */}
      {/* <div className="absolute top-0 w-full h-full object-cover bg-red-500 brightness-50 -z-10"></div> */}
    </div>
  );
};

export default Hero;
