import UpdatePackageForm from "@/components/forms/admin/Package/UpdatePackageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import CustomError from "@/layouts/error/Error";
import { getServiceslist } from "@/lib/actions.ts/service";

const UpdatePackagePage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch the services list
    const service = await getServiceslist();

    // Fetch the package data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${params.id}`,
      { next: { tags: [`Package-${params.id}`] } }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }

    const data = await response.json();

    // Check if package data exists
    if (!data.data) {
      return <CustomError status={404} message="Package not found" />;
    }

    // Render the form with fetched package and service data
    return (
      <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <Pageheading title={"Update Package"} />
        <UpdatePackageForm packages={data.data} service={service} />
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default UpdatePackagePage;
