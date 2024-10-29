import CustomError from "@/layouts/error/Error";
import { Gallery } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";

const ServiceViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch gallery data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery`,
      { next: { tags: [`GalleriessCollection`], revalidate: 100 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch gallery");
    }

    const { data }: { data: Gallery[] } = await response.json();
    const gallery = data.find((gallery) => gallery.id === params.id);

    if (!gallery) {
      return <CustomError status={404} message="Gallery not found" />;
    }

    const { title, thumbnail, galleryPhotos } = gallery;

    return (
      <main className="dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-5">{title}</h1>
        <div className="flex flex-col gap-4">
          <Image
            width={400}
            height={400}
            src={thumbnail}
            alt="Service image"
            className="w-full h-[200px] md:h-[215px] xl:h-[230px] object-cover rounded-md"
          />

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Gallery collection</h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {galleryPhotos.map((photo: string, i: number) => (
                <div
                  className="overflow-hidden w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] relative rounded-md group"
                  key={i}
                >
                  <Image
                    src={photo}
                    alt={`Gallery pic ${i}`}
                    className="w-full h-[200px] md:h-[225px] lg:h-[250px] xl:h-[275px] object-cover group-hover:scale-105 transition-all duration-500"
                    width={250}
                    height={800}
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default ServiceViewPage;
