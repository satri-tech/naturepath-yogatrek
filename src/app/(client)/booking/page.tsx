import AllBookingform from "@/components/forms/Client/BookingForm2";
import Bookingform from "@/components/forms/Client/Bookingform";
import Headings from "@/components/ui/Headings";
import { Badge } from "@/components/ui/badge";
import Topbanner from "@/layouts/Topbanner";
import Breadcrumbs from "@/layouts/breadcrumbs";
import Image from "next/image";
import React from "react";

const BookingPage = () => {
  return (
    <div>
      <div className="px-0 relative w-full h-full -translate-y-20 z-10 -mb-20">
        {/* <Image
          src="https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg"
          alt="hero image"
          width={2048}
          height={2048}
          className="absolute top-0 w-full h-full object-cover  -z-20"
        /> */}
        {/* <div className="bg-indigo-700/85 absolute top-0 bottom-0 left-0 right-0 -z-10"></div> */}

        <div className="grid items-center h-full w-full text-primary ">
          <div className="flex flex-col items-center mt-20">
            <Badge className="bg-white">
              <Breadcrumbs />
            </Badge>
            <Headings className="">Get your bookings</Headings>
            <div className=" w-full p-4  mb-10 z-50">
              <AllBookingform />
            </div>
          </div>
        </div>
      </div>
      {/* <Topbanner title='Get your Booking instantly'/> */}
    </div>
  );
};

export default BookingPage;
