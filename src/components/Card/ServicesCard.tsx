import Image from "next/image";
import React from "react";

const ServicesCard = ({name, id}:{name:string, id:number}) => {
  return (
    <div className="relative shadow-md  cursor-pointer overflow-hidden">
      <Image
        src={`https://picsum.photos/200/300?random=${id} `}
        alt="Img by Meriç Dağlı https://unsplash.com/@meric"
        className="w-full h-auto object-cover brightness-50 hover:scale-105 hover:brightness-100 transition-all duration-500"
        width={250}
        height={800}
        quality={100}
      />
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg">
        <h1 className="text-2xl font-semibold">{name}</h1>
      </div>
    </div>
  );
};

export default ServicesCard;
