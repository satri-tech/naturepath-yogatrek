import CreateBookingForm from "@/components/forms/admin/Booking/CreateBookingForm";
import CreatePackageForm from "@/components/forms/admin/Package/CreatePackageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import { getServiceslist } from "@/lib/actions.ts/service";
import React from "react";

const CreatePage = async () => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Create New Package"} />
      <div className="">
        <CreateBookingForm />
      </div>
    </main>
  );
};

export default CreatePage;
