import { ReactNode } from "react";
import { Badge } from "./badge";

export default function Pending({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant={"outline"}
      className=" bg-yoga-orange/10 text-yoga-orange dark:text-yoga-orange/90 dark:bg-yoga-orange/20"
    >
      {children}
    </Badge>
  );
}
