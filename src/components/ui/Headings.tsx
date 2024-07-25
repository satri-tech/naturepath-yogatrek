import { petrona } from "@/app/layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Headings = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="max-w-lg mx-auto mb-8">
      <h1
        className={cn(
          `relative text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center ${petrona.className}`,
          className
        )}
      >
        {children}
        <span>
          {/* <Image
            src="/assets/underline.png"
            alt="underline"
            width={400}
            height={100}
            quality={100}
            className="w-full h-auto absolute -bottom-10 left-0 right-0"
          /> */}
        </span>
      </h1>
    </div>
  );
};

export default Headings;
