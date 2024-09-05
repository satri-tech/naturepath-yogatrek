import CreateGalleryForm from "@/components/forms/admin/Galleries/CreateGalleryForm";

import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const CreateGalleriesPage = () => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Create New Gallery"} />
      <div className="">
        <CreateGalleryForm />
      </div>
    </main>
  );
};

export default CreateGalleriesPage;
