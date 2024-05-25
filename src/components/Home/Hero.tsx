import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="container px-0 relative w-full h-[100vh] -translate-y-20 -z-10">
      <div className="grid items-center h-full w-full text-white ">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between container max-w-6xl mt-28 lg:mt-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">deep blue cinematics</h1>
            <div>
              <button>our work</button>
              <button>our story</button>
            </div>
          </div>
          <div className="bg-primary bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40 max-w-xs">
            <h1 className="text-4xl font-semibold leading-9 text-white text-center">
              Don’t miss out!
            </h1>
            <p className="text-base leading-normal text-center text-white mt-6">
              Subscribe to your newsletter to stay in the loop. Our newsletter
              is sent once in <br />a week on every friday so subscribe to get
              latest news and updates.
            </p>
            <div className="sm:border border-white flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0">
              <input
                className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white"
                placeholder="Email Address"
              />
              <button className="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <video
        src="https://res.cloudinary.com/dqyzr8bp3/video/upload/v1716565094/video1_wpw0kr.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 w-full h-full object-cover brightness-50 -z-10"
      />
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
