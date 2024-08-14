import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function RecentBookingsTable() {
  return (
    <div className=" !overflow-hidden">
      <TableHeader className=" hover:!bg-transparent border-transparent bg-transparent text-transparent dark:text-transparent">
        <TableRow className=" hover:!bg-transparent border-transparent">
          <TableHead className=" hover:!bg-transparent bg-transparent text-transparent dark:text-transparent">
            Customer
          </TableHead>
          <TableHead className=" hover:!bg-transparent bg-transparent text-transparent dark:text-transparent">
            Type
          </TableHead>
          <TableHead className=" hover:!bg-transparent bg-transparent text-transparent dark:text-transparent">
            Status
          </TableHead>
          <TableHead className=" hover:!bg-transparent bg-transparent text-transparent dark:text-transparent">
            Date
          </TableHead>
          <TableHead className=" hover:!bg-transparent bg-transparent text-transparent dark:text-transparent text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" overflow-hidden">
        <TableRow className=" hover:!bg-transparent border-transparent text-transparent dark:text-transparent">
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className=" text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="">Sale</TableCell>
          <TableCell className="">
            <span>Booked</span>
          </TableCell>
          <TableCell className="">
            <span className=" inline-block w-[125px]">2023-06-23</span>
          </TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow className=" hover:!bg-transparent border-transparent text-transparent dark:text-transparent">
          <TableCell>
            <div className="font-medium">Olivia Smith</div>
            <div className=" text-sm text-muted-foreground md:inline">
              olivia@example.com
            </div>
          </TableCell>
          <TableCell className="">Refund</TableCell>
          <TableCell className="">
            <span>Cancelled</span>
          </TableCell>
          <TableCell className="">2023-06-24</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow className=" hover:!bg-transparent border-transparent text-transparent dark:text-transparent">
          <TableCell>
            <div className="font-medium">Noah Williams</div>
            <div className=" text-sm text-muted-foreground md:inline">
              noah@example.com
            </div>
          </TableCell>
          <TableCell className="">Subscription</TableCell>
          <TableCell className="">
            <span>Booked</span>
          </TableCell>
          <TableCell className="">2023-06-25</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow className=" hover:!bg-transparent border-transparent text-transparent dark:text-transparent">
          <TableCell>
            <div className="font-medium">Emma Brown</div>
            <div className=" text-sm text-muted-foreground md:inline">
              emma@example.com
            </div>
          </TableCell>
          <TableCell className="">Sale</TableCell>
          <TableCell className="">
            <span>Booked</span>
          </TableCell>
          <TableCell className="">2023-06-26</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableBody>
    </div>
  );
}
