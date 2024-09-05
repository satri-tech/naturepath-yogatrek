import UpdateGalleryForm from "@/components/forms/admin/Galleries/UpdateGalleryForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import React, { Suspense } from "react";

const UpdateGallery = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery?id=${id}`,
      { next: { tags: [`Gallery-${id}`], revalidate: 100 } }
    );
    const data = await response.json();
    const gallery = data.data;
    // console.log("gallery: ", gallery);

    return <UpdateGalleryForm gallery={gallery} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const UpdateGalleryPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Update Service"} />
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateGallery id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default UpdateGalleryPage;
