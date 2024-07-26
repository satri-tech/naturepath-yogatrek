import UpdateServicesForm from "@/components/forms/admin/Services/UpdateServicesForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import React, { Suspense } from "react";

const Service = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService?id=${id}`,
      { next: { tags: [`Service-${id}`], revalidate: 100 } }
    );
    const data = await response.json();
    console.log(data);
    return <UpdateServicesForm services={data.data} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const UpdateServicePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Pageheading title={"Update Service"} />
      <div className="max-w-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Service id={params.id} />
        </Suspense>
      </div>
    </>
  );
};

export default UpdateServicePage;
