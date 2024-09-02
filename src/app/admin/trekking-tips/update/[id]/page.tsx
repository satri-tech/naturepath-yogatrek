import UpdatePackageForm from "@/components/forms/admin/Package/UpdatePackageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import { getServiceslist } from "@/lib/actions.ts/service";
import React, { Suspense } from "react";

const TrekkingTip = async ({ id }: { id: string }) => {
  const service = await getServiceslist();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${id}`,
      { next: { tags: [`Package-${id}`] } }
    );
    const data = await response.json();
    console.log("package", data.data);
    return <UpdatePackageForm packages={data.data} service={service} />;
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
          <TrekkingTip id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default CreatePage;
