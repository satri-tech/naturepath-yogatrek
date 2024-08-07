import { ReactNode } from "react";
import { Badge } from "./badge";

export default function Danger({children}:{children:ReactNode}) {
  return (
    <Badge
      variant={"outline"}
      className=" bg-yoga-red/10 text-yoga-red dark:text-yoga-red/90 dark:bg-yoga-red/20"
    >
      {children}
    </Badge>
  );
}
