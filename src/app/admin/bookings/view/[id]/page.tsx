import PackageDetailss from "@/components/Package/PackageDetails";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Error from "@/layouts/error/Error";
import { Booking, Package } from "@prisma/client";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const fetchPackage = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${id}`,
      { next: { tags: [`Package-${id}`], revalidate: 600 } }
    );
    const { data }: { data: Package[] } = await response.json();

    const pckg = data.find((pckg) => pckg.id == id);

    return pckg;
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function GetBooking({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getbooking?id=${id}`,
      { next: { tags: [`Booking-${id}`] } }
    );
    const { data: booking }: { data: Booking } = await response.json();

    const {
      id: bookingId,
      fullname,
      email,
      phone,
      country,
      roomPreferences,
      noofPerson,
      bookingDate,
      packageId,
    } = booking as Booking;

    const packageBooked = await fetchPackage(packageId);

    return (
      <main className=" dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">Booked by:</h2>
          <h1 className="text-lg lg:text-xl mb-6">{fullname}</h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">Email:</h2>
          <h1 className="text-lg lg:text-xl mb-6">{email}</h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">Phone number:</h2>
          <h1 className="text-lg lg:text-xl mb-6">{phone}</h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">
            Room preference:
          </h2>
          <h1 className="text-lg lg:text-xl mb-6">{roomPreferences}</h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">No Of Person:</h2>
          <h1 className="text-lg lg:text-xl mb-6">{noofPerson}</h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">Booked Date:</h2>
          <h1 className="text-lg lg:text-xl mb-6">
            {bookingDate.toString().split("T")[0]}
          </h1>
        </div>

        <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold mb-6">Package booked:</h2>
          <h1 className="text-lg lg:text-xl font-medium mb-6">
            {packageBooked?.title}
          </h1>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
}

const PackageViewPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback="Loading...">
      <GetBooking id={params.id} />
    </Suspense>
  );
};

export default PackageViewPage;
