'use client'
import SignUpForm from "@/components/forms/SignUpForm";
import React from "react";
import Image from "next/image";

const SignUppage = () => {
  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="container px-6 mx-auto">
        <div
          className="flex flex-col text-center md:text-left md:flex-row max-w-3xl lg:max-w-4xl
        xl:max-w-[950px] h-screen justify-center md:justify-between mx-auto items-center"
        >
          <Image
            src={"/auth/meditation.png"}
            alt={"login image meditation"}
            className="w-full h-[215px] sm:h-[250px] md:h-[315px]  lg:h-[350px] xl:h-[400px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] object-cover group-hover/parent:scale-105 transition-all duration-500 hidden md:block"
            width={500}
            height={500}
            quality={100}
          />
          {/* <div className="flex flex-col w-full">
          <div>
          <span className="text-7xl">&#129496;</span>
          </div>
          <h1 className="text-5xl text-gray-800 font-bold">Welcome </h1>
          <p className="w-5/12 mx-auto md:mx-0 text-gray-500"></p>
        </div> */}
          <div className="w-full md:w-[400px] lg:w-[450px] mx-auto md:mx-0">
            <div className="bg-white max-w-md lg:p-10 p-5 mx-auto md:mx-0 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left mb-2">
                Sign Up
              </h2>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUppage;
