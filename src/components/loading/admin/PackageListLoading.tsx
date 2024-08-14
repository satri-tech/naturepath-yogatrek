import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Image from "next/image";

export default function PackageListLoading() {
  return (
    <div className=" skeleton !overflow-hidden">
      <TableHeader className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        <TableRow>
          <TableHead className=" w-[100px] sm:table-cell hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            <span className="">Image</span>
          </TableHead>
          <TableHead className=" w-[175px] hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Name
          </TableHead>
          <TableHead className=" md:table-cell hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Package Duration
          </TableHead>
          <TableHead className=" md:table-cell hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Pricing
          </TableHead>
          {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
          <TableHead>
            <span className="">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(3)
          .fill("*")
          .map((_, id) => (
            <TableRow
              key={id}
              className="hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent"
            >
              <TableCell className="hidden sm:table-cell hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <Image
                  alt="trekking"
                  className="aspect-square rounded-md object-cover opacity-0"
                  height="64"
                  src="/trekking.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <span className=" w-[175px] inline-block">
                  Everest Base Camp Trek - 15 Days
                </span>
                <br />
                {/* <span className="text-xs font-light inline-block w-[175px]">{pac.slug}</span> */}
              </TableCell>
              <TableCell className="hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <p className=" w-[125px]"></p>
                <span>3n/2d</span>
              </TableCell>
              <TableCell className="hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <span className=" inline-block w-[175px]">
                  Shared: <span className="  font-medium">$ 200</span>{" "}
                  <span className=" line-through  font-medium">$ 200</span>
                </span>
                <br />
                <span>
                  Private: <span className="  font-medium">$ 200</span>{" "}
                  <span className=" line-through  font-medium">$ 200</span>
                </span>
              </TableCell>
              <TableCell className="flex gap-2 items-center hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <span>22</span>
                <span>22</span>

                <span>22</span>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </div>
  );
}
