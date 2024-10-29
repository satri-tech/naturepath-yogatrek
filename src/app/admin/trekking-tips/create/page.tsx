import CreateTrekkingTipForm from "@/components/forms/admin/Trekking-tips/CreateTrekkingTipForm";
import Pageheading from "@/layouts/admin/Pageheading";
import React from "react";

const CreateTrekkingTipPage = async () => {
  return (
    <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md ">
      <Pageheading title={"Create New Trekking Tip"} />
      <div className="">
        <CreateTrekkingTipForm />
      </div>
    </main>
  );
};

export default CreateTrekkingTipPage;
