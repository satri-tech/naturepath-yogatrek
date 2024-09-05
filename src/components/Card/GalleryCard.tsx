import { Gallery } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function GalleryCard({ gallery }: { gallery: Gallery }) {
  const {id, title, galleryPhotos, thumbnail } = gallery;

  return (
    <Link
      href={`/gallery/${id}`}
      className=" overflow-hidden  w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] relative rounded-md group"
    >
      <Image
        src={thumbnail}
        alt={title}
        className="w-full h-[200px] md:h-[225px] lg:h-[250px] xl:h-[2750x] object-cover  group-hover:scale-105  transition-all duration-500"
        width={250}
        height={800}
        quality={100}
      />

      <h4 className=" text-white absolute bottom-4 left-4 lg:bottom-5 lg:left-5 line-clamp-1 font-extrabold text-lg lg:text-xl z-10">
        {title}
      </h4>
      <div className="bg-primary/45 group-hover:bg-primary/30 absolute z-[5] top-0 bottom-0 left-0 right-0 transition-all duration-300"></div>
    </Link>
  );
}
