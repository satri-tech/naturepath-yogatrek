import AllBookingform from "@/components/forms/Client/BookingForm2";
import Headings from "@/components/ui/Headings";
import { Badge } from "@/components/ui/badge";
import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";
import Breadcrumbs from "@/layouts/breadcrumbs";
import Image from "next/image";
import React from "react";

const BookingPage = () => {
  return (
    <main className="dark:text-text-dark">
      <section>
        <Topbanner
          title="Get your bookings"
          description="Secure your spot on a transformative journey that combines the peace of yoga with the adventure of trekking through breathtaking natural landscapes."
        />

      </section>
      <PageWrapper className="dark:text-text-dark section-padding">
        <div className="px-0 relative w-full h-full ">
          <div className="grid items-center h-full w-full text-primary ">
            <div className="flex flex-col items-center">
              <div className=" w-full">
                <AllBookingform />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </main>
  );
};

export default BookingPage;
