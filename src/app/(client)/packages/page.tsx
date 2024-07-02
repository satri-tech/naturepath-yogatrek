import PackageCard from "@/components/Card/PackageCard";
import PopularPackage from "@/components/Package/PopularPackage";
import PackageFilterForm from "@/components/forms/Client/PackageFilterForm";
import Topbanner from "@/layouts/Topbanner";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import React from "react";

const PackageList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    return (
      <>
        {data.data.map((items: Package) => (
          <PackageCard key={items.id} packages={items} />
        ))}
      </>
    );
  } catch (err) {
    return <Error status={404} message="Bad request" />;
  }
};

const PackagePage = () => {
  return (
    <div>
      <Topbanner title="Explore Suitable Package" />
      <div className="container my-10 mx-4 lg:mx-auto lg:px-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <PackageFilterForm />
        </div>
        <PackageList />
      </div>
    </div>
  );
};

export default PackagePage;
