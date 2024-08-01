import React, { ReactNode } from "react";

export default function DashSectionHeading({ children, className }: { children: ReactNode, className?: string }) {
  return <h2 className=" text-lg font-semibold md:text-xl">{children}</h2>;
}
