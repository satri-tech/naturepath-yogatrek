import UpdateServicesForm from "@/components/forms/admin/Services/UpdateServicesForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";

const fetchService = async (id: string): Promise<Service | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService?id=${id}`,
    { next: { tags: [`Service-${id}`], revalidate: 100 } }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.data;
};

const UpdateServicePage = async ({ params }: { params: { id: string } }) => {
  const service = await fetchService(params.id);

  if (!service) {
    return <Error status={404} message="Bad request" />;
  }

  return (
    <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title="Update Service" />
      <UpdateServicesForm services={service} />
    </main>
  );
};

export default UpdateServicePage;
