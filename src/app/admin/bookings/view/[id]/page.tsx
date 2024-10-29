import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PackageDetailss from "@/components/Package/PackageDetails";
import Error from "@/layouts/error/Error";
import { Booking, Package } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";

const PackageViewPage = async ({ params }: { params: { id: string } }) => {
  let bookingData: Booking | null = null;
  let packageData: Package | null = null;

  try {
    // Fetch the booking data
    const bookingResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getbooking?id=${params.id}`,
      { next: { tags: [`Booking-${params.id}`] } }
    );
    const { data: booking } = await bookingResponse.json();
    bookingData = booking;

    if (bookingData) {
      // Fetch the package data
      const packageResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${bookingData.packageId}`,
        {
          next: { tags: [`Package-${bookingData.packageId}`], revalidate: 600 },
        }
      );
      const { data: packages } = await packageResponse.json();
      packageData = packages.find(
        (pkg: Package) => pkg.id === bookingData?.packageId
      );
    }
  } catch (error) {
    console.log(error);
  }

  if (!bookingData) {
    return <Error status={404} message="Booking not found" />;
  }

  return (
    <main className="dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Booked by:</h2>
        <h1 className="text-lg lg:text-xl mb-6">{bookingData.fullname}</h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Email:</h2>
        <h1 className="text-lg lg:text-xl mb-6">{bookingData.email}</h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Phone number:</h2>
        <h1 className="text-lg lg:text-xl mb-6">{bookingData.phone}</h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Room preference:</h2>
        <h1 className="text-lg lg:text-xl mb-6">
          {bookingData.roomPreferences}
        </h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">No Of Person:</h2>
        <h1 className="text-lg lg:text-xl mb-6">{bookingData.noofPerson}</h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Booked Date:</h2>
        <h1 className="text-lg lg:text-xl mb-6">
          {new Date(bookingData.bookingDate).toLocaleDateString()}
        </h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Package booked:</h2>
        <h1 className="text-lg lg:text-xl font-medium mb-6">
          {packageData?.title || "Package details unavailable"}
        </h1>
      </div>
    </main>
  );
};

export default PackageViewPage;
