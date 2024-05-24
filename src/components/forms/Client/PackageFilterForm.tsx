"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

import React, { useState } from "react";

const PackageFilterForm = () => {
  const [isFiltered, setIsFiltered] = useState();
  function handlechange(value: string): void {
    console.log("Function not implemented.");
  }


  return (
    <div className="max-w-xl">
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        //   value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        //   onChange={(event) =>
        //     table.getColumn("title")?.setFilterValue(event.target.value)
        //   }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <div className="max-w-fit">

      <Select onValueChange={handlechange}>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="Package type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hello">Yoga</SelectItem>
          <SelectItem value="m@google.com">Treking</SelectItem>
          <SelectItem value="m@support.com">Spa</SelectItem>
        </SelectContent>
      </Select>
      </div>
      {isFiltered && (
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
    </div>
  );
};

export default PackageFilterForm;
