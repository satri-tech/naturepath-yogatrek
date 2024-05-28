import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = ({status, message}:{status:number, message:string}) => {
  return (
    <div className="w-full h-[70vh] grid items-center justify-center">
      <div className="grid items-center justify-center">
        <h3 className="text-7xl text-center font-bold mb-3 tracking-wider">{status}</h3>
        <span className="text-7xl text-center">&#128543;</span>
        <h4 className="text-xl text-center font-medium tracking-wide mt-3">{message}</h4>
        <Link href={"/"} className="mx-auto">
        <Button className="mt-4 ">Go back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
