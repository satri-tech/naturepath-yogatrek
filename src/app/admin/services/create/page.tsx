
import CreateServicesForm from "@/components/forms/admin/Services/CreateServicesForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const CreatePage = () => {
  return (
    <>
      <Pageheading title={"Create New Service"} />

      <div className="max-w-lg">
        <CreateServicesForm />
      </div>
    </>
  );
};

export default CreatePage;
