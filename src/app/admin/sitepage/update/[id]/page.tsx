import UpdateSitePageForm from "@/components/forms/admin/SitePages/UpdateSitePageForm";
import Pageheading from "@/layouts/admin/Pageheading";
import CustomError from "@/layouts/error/Error";

const UpdateMetaPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetching the page metadata using the provided ID
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage?id=${params.id}`,
      { next: { tags: [`Page-${params.id}`] }, cache: "no-store" }
    );

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch page data");
    }

    const data = await response.json();

    // Handle case where data is not found
    if (!data.data) {
      return <CustomError status={404} message="Page not found" />;
    }

    // Render the form with the fetched metadata
    return (
      <main className="p-4 md:p-5 rounded-md shadow-md">
        <Pageheading title={"Update Service"} />
        <div className="max-w-lg">
          <UpdateSitePageForm meta={data.data} />
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default UpdateMetaPage;
