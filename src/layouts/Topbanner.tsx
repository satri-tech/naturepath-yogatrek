import Image from "next/image";
import React from "react";
import Breadcrumbs from "./breadcrumbs";
import Headings from "@/components/ui/Headings";
import { Badge } from "@/components/ui/badge";

const Topbanner = ({ title }: { title: string }) => {
  return (
    <div className="px-0 relative w-full h-[55vh] -translate-y-20">
      <div className="grid items-center h-full w-full text-white dark:text-text-dark">
        <div className="flex flex-col items-center gap-3">
          <Badge className=" " variant={"default"}>
            <Breadcrumbs />
          </Badge>
          <Headings className="">{title}</Headings>
        </div>
      </div>
      <Image
        src="https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg"
        alt="hero image"
        width={2048}
        height={2048}
        className="absolute top-0 w-full h-full object-cover -z-20 r brightness-[85%] dark:brightness-[35%]"
      />
      <div className="bg-primary/50 absolute top-0 bottom-0 left-0 right-0 -z-10"></div>
    </div>
  );
};

export default Topbanner;
