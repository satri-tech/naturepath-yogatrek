import UpdatePackageForm from "@/components/forms/admin/Package/UpdatePackageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import CustomError from "@/layouts/error/Error";
import { getServiceslist } from "@/lib/actions.ts/service";
import React, { Suspense } from "react";

const CreatePage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch services list
    const service = await getServiceslist();

    // Fetch package data by ID
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${params.id}`,
      { next: { tags: [`Package-${params.id}`] } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch package");
    }

    const data = await response.json();
    const packageData = data.data;

    return (
      <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <Pageheading title="Update Package" />
        <div className="">
          <UpdatePackageForm packages={packageData} service={service} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching package:", error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default CreatePage;
