import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export default function TeamMemberCardLoading() {
  return (
    <Card className=" w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] flex gap-2 flex-col p-4 lg:p-5 skeleton ">
      <div className=" object-center rounded-md object-cover w-full h-[200px] md:h-[225px] xl:h-[250px] hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent" />
      <div className=" flex flex-col hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        <h1 className=" font-semibold lg:text-lg">Name here</h1>
        <h6 className=" text-sm  font-medium">Position</h6>
      </div>
      <div className=" w-full hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        <Button className=" w-full hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
          View profile
        </Button>
      </div>
    </Card>
  );
}
