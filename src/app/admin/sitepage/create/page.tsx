
import CreateServicesForm from "@/components/forms/admin/Services/CreateServicesForm";
import CreatePageForm from "@/components/forms/admin/SitePages/CreateSitePageForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const CreatePage = () => {
  return (
    <>
      <Pageheading title={"Create Site Page"} />
      <div className="max-w-lg">
        <CreatePageForm />
      </div>
    </>
  );
};

export default CreatePage;
