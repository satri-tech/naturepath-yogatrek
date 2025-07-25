import Image from "next/image";
import React from "react";
import Breadcrumbs from "./breadcrumbs";
import Headings from "@/components/ui/Headings";
import { Badge } from "@/components/ui/badge";

const Topbanner = ({
  title,
  img_url = "https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg",
  description = "Discover our journey, values, and mission behind blending the serenity of yoga with the thrill of trekking through nature’s untouched beauty.",
  excludeId
}: {
  title: string;
  img_url?: string;
  description?: string
  excludeId?: boolean;
}) => {
  return (
    <div className="px-0 relative w-full h-[200px] sm:h-[225px] md:h-[250px] lg:h-[275px] xl:h-[300px]">
      <div className="grid items-center h-full w-full text-white dark:text-text-dark">
        <div className="flex flex-col items-center gap-3 z-10 text-center px-4">
          <Headings>{title}</Headings>

          {/* Description below the title */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-4xl">
            {description}
          </p>
        </div>
      </div>

      <Image
        src={img_url}
        alt="hero image"
        width={2048}
        height={2048}
        className="absolute top-0 w-full h-full object-cover r brightness-[85%] dark:brightness-[35%]"
      />
      <div className="bg-primary/50 absolute top-0 bottom-0 left-0 right-0 z-[5]"></div>
    </div>
  );
};

export default Topbanner;
