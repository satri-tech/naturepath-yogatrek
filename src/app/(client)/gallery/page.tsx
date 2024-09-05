"use client";

import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";
import React, { useEffect, useState } from "react";
import Error from "@/layouts/error/Error";
import GalleryCard from "@/components/Card/GalleryCard";
import { Gallery } from "@prisma/client";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  // const session = useSession();

  const fetchGalleries = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery`,
        { next: { tags: [`GalleriesCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      setGalleries(data.data);
      console.log("galleries: ", data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <main className="dark:text-text-dark">
      <section>
        <Topbanner title="Glimpse of past events" />
      </section>

      <PageWrapper className="section-padding">
        {galleries && galleries.length > 0 ? (
          <div className=" flex  flex-wrap gap-3 md:gap-4">
            {galleries.map((gallery) => {
              return <GalleryCard gallery={gallery} key={gallery.id} />;
            })}
          </div>
        ) : (
          <p>Loading galleries ....</p>
        )}
      </PageWrapper>
    </main>
  );
}
