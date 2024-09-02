import CreatePackageForm from "@/components/forms/admin/Package/CreatePackageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import { getServiceslist } from "@/lib/actions.ts/service";
import React from "react";

const CreatePage = async () => {
  const service = await getServiceslist();

  return (
    <main className=" ">
      <Pageheading title={"Create New Package"} />
      <div className="">
        <CreatePackageForm service={service} />
      </div>
    </main>
  );
};

export default CreatePage;
