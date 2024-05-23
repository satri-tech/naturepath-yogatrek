
import CreateServicesForm from "@/components/forms/admin/Services/CreateServicesForm";
import AddTeamForm from "@/components/forms/admin/Team/AddTeamForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const AddPage = () => {
  return (
    <>
      <Pageheading title={"Add New Member"} />

      <div className="max-w-lg">
        <AddTeamForm />
      </div>
    </>
  );
};

export default AddPage;
