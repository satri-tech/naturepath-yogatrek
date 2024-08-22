import UpdateServicesForm from "@/components/forms/admin/Services/UpdateServicesForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import React, { Suspense } from "react";

const UpdateService = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService?id=${id}`,
      { next: { tags: [`Service-${id}`], revalidate: 100 } }
    );
    const data = await response.json();
    const service = data.data;
    // console.log("service: ", service);

    return <UpdateServicesForm services={service} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const UpdateServicePage = ({ params }: { params: { id: string } }) => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Update Service"} />
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateService id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default UpdateServicePage;
