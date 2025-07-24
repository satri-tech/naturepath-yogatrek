"use client";

import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";
import React, { useEffect, useState } from "react";
import Error from "@/layouts/error/Error";
import GalleryCard from "@/components/Card/GalleryCard";
import { Gallery } from "@prisma/client";
import GalleriesLoading from "@/components/loading/galleries/GalleriesLoading";

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
        <Topbanner title="Glimpse of past events" description="Discover our journey, values, and mission behind blending the serenity of yoga 
        with the thrill of trekking through nature’s untouched beauty."/>
      </section>

      <PageWrapper className="section-padding">
        {galleries && galleries.length > 0 ? (
          <div className="  grid grid-cols-3 space-x-5">
            {galleries.map((gallery) => {
              return <GalleryCard gallery={gallery} key={gallery.id} />;
            })}
          </div>
        ) : (
          <GalleriesLoading />
        )}
      </PageWrapper>
    </main>
  );
}
