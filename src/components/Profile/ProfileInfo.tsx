import Image from "next/image";
import React from "react";

const ProfileInfo = ({
  name,
  email,
  emailVerified,
  role,
}: {
  name: string;
  email: string;
  emailVerified: string;
  role: string;
}) => {
  return (
    <div className="p-6 bg-white text-black shadow-lg rounded-lg mb-6 flex items-center space-x-6">
      <Image
        width={400}
        height={400}
        src="instructor.jpg"
        alt="Alina"
        className="w-32 h-32 rounded-full object-cover shadow-md"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">Hello, I&apos;m Ghimiray</h1>
        <h2 className="text-xl font-semibold mb-4">Yoga Instructor</h2>
        <p className="text-gray-700 mb-4">
          Welcome to a journey of self-discovery and holistic well-being through
          yoga. My name is Ghimiray, and I am dedicated to instructing yoga
          perfectly, guiding you to find balance, strength, and peace within
          yourself. Join me to master the art of yoga with precision and care.
        </p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
          Get in Touch
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
