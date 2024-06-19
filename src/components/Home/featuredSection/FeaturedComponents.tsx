import Headings from "@/components/ui/Headings";
import React from "react";
import FeaturedCard from "./FeaturedCard";
import Carousel from "./FeaturedCarousel";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";

const GetFeaturedcomponets = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    // const repeatedData = [].concat(data.data, data.data, data.data) as Package[];
    const features = data?.data ?? [];
    const repeatedData = [].concat(features, features, features) as Package[];

    return (
      <>
        {repeatedData && repeatedData.length > 0 && (
          <Carousel featuredlist={repeatedData} />
        )}
      </>
    );
  } catch (err) {
    return <Error status={404} message="notfound" />;
  }
};

const FeaturedComponents = async () => {
  return (
    <div>
      <Headings>Featuring now</Headings>
      <GetFeaturedcomponets />
    </div>
  );
};

export default FeaturedComponents;
