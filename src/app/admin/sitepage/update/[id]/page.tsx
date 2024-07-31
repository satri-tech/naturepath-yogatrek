import UpdateSitePageForm from "@/components/forms/admin/SitePages/UpdateSitePageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import React, { Suspense } from "react";

const Pages = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage?id=${id}`,
      { next: { tags: [`Page-${id}`] } ,cache: 'no-store' }
    );
    const data = await response.json();
    console.log("page",data)
    return <UpdateSitePageForm meta={data.data} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const UpdateMetaPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Pageheading title={"Update Service"} />
      <div className="max-w-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Pages id={params.id} />
        </Suspense>
      </div>
    </>
  );
};

export default UpdateMetaPage;
