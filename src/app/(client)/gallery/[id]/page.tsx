import React, { Suspense } from "react";
import Image from "next/image";
import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";

const TopBannerDynamic = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery?id=${id}`,
      { next: { tags: [`Gallery-${id}`], revalidate: 200 } }
    );
    const data = await response.json();

    const { thumbnail, title } = data.data;

    return <Topbanner img_url={thumbnail} title={title} />;
  } catch (error) {
    console.log(error);
    return <p>Loading top banner...</p>;
  }
};

const Gallery = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery?id=${id}`,
      { next: { tags: [`Gallery-${id}`], revalidate: 200 } }
    );
    const data = await response.json();

    const { galleryPhotos } = data.data;

    return (
      <div className="flex  flex-wrap gap-3 md:gap-4">
        {galleryPhotos.map((photo: string, i: number) => {
          return (
            <div
              className=" overflow-hidden  w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] relative rounded-md group"
              key={i}
            >
              <Image
                src={photo}
                alt={`gallery-pic-${i}`}
                className="w-full h-[200px] md:h-[225px] lg:h-[250px] xl:h-[2750x] object-cover  group-hover:scale-105  transition-all duration-500"
                width={250}
                height={800}
                quality={100}
              />
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <p>Loading gallery...</p>;
  }
};

export default function GalleryPageSingle({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Suspense fallback={<p>Loading top banner...</p>}>
        <TopBannerDynamic id={params.id} />
      </Suspense>
      <PageWrapper className=" section-padding">
        <Suspense fallback={<p>Loading gallery...</p>}>
          <Gallery id={params.id} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
