import { petrona } from "@/app/fonts";
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
    <h1
      className={cn(
        `relative text-2xl sm:text-3xl lg:text-4xl font-bold text-center `,
        className
      )}
    >
      {children}
      <span>
      </span>
    </h1>
  );
};

export default Headings;
