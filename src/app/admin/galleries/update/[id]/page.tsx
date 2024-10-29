import UpdateGalleryForm from "@/components/forms/admin/Galleries/UpdateGalleryForm";
import Pageheading from "@/layouts/admin/Pageheading";
import CustomError from "@/layouts/error/Error";

const UpdateGalleryPage = async ({ params }: { params: { id: string } }) => {
  let galleryData = null;

  try {
    // Fetch gallery data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery?id=${params.id}`,
      { next: { tags: [`Gallery-${params.id}`], revalidate: 100 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch gallery");
    }

    const { data } = await response.json();
    galleryData = data;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return <CustomError status={404} message="Gallery not found" />;
  }

  return (
    <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title="Update Gallery" />
      {galleryData ? (
        <UpdateGalleryForm gallery={galleryData} />
      ) : (
        <CustomError status={404} message="Gallery not found" />
      )}
    </main>
  );
};

export default UpdateGalleryPage;
