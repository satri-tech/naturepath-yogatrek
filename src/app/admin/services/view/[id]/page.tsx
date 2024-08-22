import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import { Suspense } from "react";
import Image from "next/image";

async function GetService({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: [`ServicesCollection`], revalidate: 100 } }
    );
    const { data }: { data: Service[] } = await response.json();

    const service = data.find((service) => service.id == id);
    const { title, description, image } = service as Service;

    return (
      <main className=" dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-5">{title}</h1>
        <Image
          width={400}
          height={400}
          src={image}
          alt={`service img`}
          className="w-full h-[200px] md:h-[215px] xl:h-[230px]  object-cover rounded-md"
        />
        <p
          className=" dark:text-text-dark mt-3 lg:mt-5"
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
}

const ServiceViewPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback="Loading...">
      <GetService id={params.id} />
    </Suspense>
  );
};

export default ServiceViewPage;
