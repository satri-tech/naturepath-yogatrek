import React, { Suspense } from "react";
import Image from "next/image";
import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";

export default async function GalleryPageSingle({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const fetchGalleryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery?id=${id}`,
        { next: { tags: [`Gallery-${id}`], revalidate: 200 } }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      return null;
    }
  };

  const data = await fetchGalleryData();

  if (!data || !data.data) {
    return (
      <PageWrapper className="section-padding">
        <p>Error loading gallery data.</p>
      </PageWrapper>
    );
  }

  const { thumbnail, title, galleryPhotos } = data.data;

  return (
    <>
      <Suspense fallback={<p>Loading top banner...</p>}>
        <Topbanner img_url={thumbnail} title={title} />
      </Suspense>
      <PageWrapper className="section-padding">
        <Suspense fallback={<p>Loading gallery...</p>}>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {galleryPhotos.map((photo: string, i: number) => (
              <div
                key={i}
                className="overflow-hidden w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))] xl:w-[calc(25%_-_(48px_/_4))] relative rounded-md group"
              >
                <Image
                  src={photo}
                  alt={`gallery-pic-${i}`}
                  className="w-full h-[200px] md:h-[225px] lg:h-[250px] xl:h-[275px] object-cover group-hover:scale-105 transition-all duration-500"
                  width={250}
                  height={800}
                  quality={100}
                />
              </div>
            ))}
          </div>
        </Suspense>
      </PageWrapper>
    </>
  );
}
