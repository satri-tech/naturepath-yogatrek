
import CreateServicesForm from "@/components/forms/admin/Services/CreateServicesForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const CreatePage = () => {
  return (
    <main className=" dark:bg-black/85 bg-white p-4 md:p-5 rounded-md">
      <Pageheading title={"Create New Service"} />
      <div className="">
        <CreateServicesForm />
      </div>
    </main>
  );
};

export default CreatePage;
