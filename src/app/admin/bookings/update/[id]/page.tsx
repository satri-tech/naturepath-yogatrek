import UpdateBookingForm from "@/components/forms/admin/Booking/UpdateBookingForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import React, { Suspense } from "react";

const CreatePage = async ({ params }: { params: { id: string } }) => {
  let bookingData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getbooking?id=${params.id}`,
      { next: { tags: [`Booking-${params.id}`] } }
    );
    const data = await response.json();
    bookingData = data.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title="Update Package" />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {bookingData ? (
            <UpdateBookingForm booking={bookingData} />
          ) : (
            <Error status={404} message="Bad request" />
          )}
        </Suspense>
      </div>
    </main>
  );
};

export default CreatePage;
