import CustomError from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import Image from "next/image";

const ServiceViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch all services
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: [`ServicesCollection`], revalidate: 100 } }
    );

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const { data }: { data: Service[] } = await response.json();

    // Find the specific service by ID
    const service = data.find((service) => service.id === params.id);

    // Handle case where service is not found
    if (!service) {
      return <CustomError status={404} message="Service not found" />;
    }

    const { title, description, image } = service;

    return (
      <main className="dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-5">{title}</h1>
        <Image
          width={400}
          height={400}
          src={image}
          alt={`Image of ${title}`}
          className="w-full h-[200px] md:h-[215px] xl:h-[230px] object-cover rounded-md"
        />
        <p
          className="dark:text-text-dark mt-3 lg:mt-5"
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default ServiceViewPage;
