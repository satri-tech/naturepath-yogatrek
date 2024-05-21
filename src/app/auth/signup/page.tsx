'use client'
import SignUpForm from "@/components/forms/SignUpForm";
import React from "react";

const SignUppage = () => {
  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
    <div className="container px-6 mx-auto">
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div className="flex flex-col w-full">
          <div>
          <span className="text-7xl">&#129496;</span>
          </div>
          <h1 className="text-5xl text-gray-800 font-bold">Welcome </h1>
          <p className="w-5/12 mx-auto md:mx-0 text-gray-500"></p>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
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
