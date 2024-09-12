import UpdateBookingForm from "@/components/forms/admin/Booking/UpdateBookingForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import React, { Suspense } from "react";

const Booking = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getbooking?id=${id}`,
      { next: { tags: [`Booking-${id}`] } }
    );
    const data = await response.json();
    return <UpdateBookingForm booking={data.data} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const CreatePage = async ({ params }: { params: { id: string } }) => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Update Package"} />
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Booking id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default CreatePage;
