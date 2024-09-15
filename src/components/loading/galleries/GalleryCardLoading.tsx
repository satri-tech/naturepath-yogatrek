import React from "react";

export default function GalleryCardLoading() {
  return (
    <div className=" overflow-hidden  w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] relative rounded-md group skeleton">
      <div className="w-full h-[200px] md:h-[225px] lg:h-[250px] xl:h-[2750x] object-cover  group-hover:scale-105  transition-all duration-500 hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent" />

      <h4 className="  absolute bottom-4 left-4 lg:bottom-5 lg:left-5 line-clamp-1 font-extrabold text-lg lg:text-xl z-10 hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        Title of gallery
      </h4>
      <div className="  absolute z-[5] top-0 bottom-0 left-0 right-0 transition-all duration-300 hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent"></div>
    </div>
  );
}
