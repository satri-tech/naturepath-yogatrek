
import CreateServicesForm from "@/components/forms/admin/Services/CreateServicesForm";
import AddTeamForm from "@/components/forms/admin/Team/AddTeamForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const AddPage = () => {
  return (
    <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Add New Member"} />

      <div className="">
        <AddTeamForm />
      </div>
    </main>
  );
};

export default AddPage;
