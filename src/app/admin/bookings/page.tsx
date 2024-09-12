import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import BookingList from "@/components/admin/bookings/BookingList";

const PackagePage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>List of booking.</CardDescription>
          </div>
          <Link href={"/admin/bookings/create"}>
            <Button variant={"default"}>Add New Booking</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <BookingList />
      </CardContent>
    </Card>
  );
};

export default PackagePage;
