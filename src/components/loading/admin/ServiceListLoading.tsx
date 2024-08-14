import DeleteButton from "@/components/ui/deleteButton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateButton from "@/components/ui/updateButton";
import ViewButton from "@/components/ui/viewButton";
import React from "react";
import Image from "next/image";

export default function ServiceListLoading() {
  return (
    <div className=" !overflow-hidden skeleton">
      <TableHeader className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        <TableRow className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
          <TableHead className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Service
          </TableHead>
          <TableHead className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Thumbnail
          </TableHead>
          <TableHead className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(3)
          .fill("*")
          .map((_, id) => (
            <TableRow
              className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent"
              key={id}
            >
              <TableCell>
                <div className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                  Trek and Tours
                </div>
                {/* <div className="hidden text-sm text-muted-foreground md:inline">
                      {Item.id}
                    </div> */}
              </TableCell>
              <TableCell className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <Image
                  alt={"Trek and Tours"}
                  className="aspect-square rounded-md object-cover opacity-0"
                  height="48"
                  src={"/trekking.jpg"}
                  width="48"
                />
              </TableCell>
              <TableCell className="flex gap-2 items-center  hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
                <button className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent cursor-none">
                  2
                </button>

                <button className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent cursor-none">
                  24
                </button>
                <button className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent cursor-none">
                  23
                </button>

                {/* </form> */}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </div>
  );
}
