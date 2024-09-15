import React from "react";
import GalleryCardLoading from "./GalleryCardLoading";

export default function GalleriesLoading() {
  return (
    <section className=" flex flex-col  gap-4 ">
      <div className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
        {Array.from({ length: 4 })
          .fill("*")
          .map((_, index) => {
            return <GalleryCardLoading key={index} />;
          })}
      </div>
    </section>
  );
}
