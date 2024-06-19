import React from "react";
import BookingBox from "@/components/Package/BookingBox";
const Hero = () => {
  return (
    <div className="container px-0 relative w-full h-[100vh] -translate-y-20 -z-10">
      <div className="grid items-center h-full w-full text-white ">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between container max-w-6xl mt-28 lg:mt-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">
              Unleash Your Inner Peace,<br/> Yoga Journeys in the Himalayas
            </h1>
            <div>
              {/* <button>Our Work</button> <b />
              <button>Our Story</button> */}
            </div>
          </div>

          <div className="grid sm:grid-cols gap-5">
            {/* <div className="bg-green-500 text-white p-2"> */}
              <h2 className="text-center">Don&apos;t Miss-out!</h2>
              <div className="my-6">
                <BookingBox />
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      <video
        src="https://res.cloudinary.com/dqyzr8bp3/video/upload/v1716565094/video1_wpw0kr.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 w-full h-full object-cover brightness-50 -z-20"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-primary/80"/>
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
