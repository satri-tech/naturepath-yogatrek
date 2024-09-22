import AllBookingform from "@/components/forms/Client/BookingForm2";
import { Package } from "@prisma/client";
import React from "react";

const BookingComponent = async () => {
  let packageList;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    packageList = data.data;
  } catch (error) {
    console.log(error);
    packageList = [];
  } finally {
    return (
      <div className="">
        <AllBookingform />
      </div>
    );
  }
};

export default BookingComponent;
