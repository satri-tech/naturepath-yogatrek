import React from "react";
import PackageCard from "../Card/PackageCard";
import Headings from "../ui/Headings";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";

const PackageList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    return (
      <>
        {data.data.slice(0, 3).map((items: Package) => (
          <PackageCard key={items.id} packages={items} />
        ))}
      </>
    );
  } catch (err) {
    return <Error status={404} message="Bad request" />;
  }
};

const PopularPackage = () => {
  return (
    <section className=" section-padding  dark:text-text-dark flex flex-col gap-8">
      <Headings>Popular Packages</Headings>
      <div className="conatiner max-w-6xl mx-4 lg:mx-auto gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <PackageList />
      </div>
    </section>
  );
};

export default PopularPackage;
