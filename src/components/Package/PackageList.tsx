"use client";

import { Package } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import PackageCard from "../Card/PackageCard";
import { PackageFilterInterface } from "@/app/(client)/packages/page";

const PackageList = ({ serviceId, title }: PackageFilterInterface) => {
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);

  const fetchFilteredPackages = useCallback(async () => {
    const query =
      serviceId && title && title != ""
        ? `?title=${title}&&serviceId=${serviceId}`
        : serviceId
          ? `?serviceId=${serviceId}`
          : title && title != ""
            ? `?title=${title}`
            : "";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage${query}`,
        { next: { tags: [`PackageCollection`], revalidate: 600 } }
      );
      const data = await response.json();

      console.log("filtered packages: ", data.data);

      setFilteredPackages(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [serviceId, title]);

  useEffect(() => {
    fetchFilteredPackages();
  }, [serviceId, title]);

  return (
    <div>
      {filteredPackages && filteredPackages.length > 0 ? (
        <div>
          {filteredPackages.map((pckg) => (
            <PackageCard key={pckg.id} packages={pckg} />
          ))}
        </div>
      ) : (
        <p>There are no packages to show!</p>
      )}
    </div>
  );
};

export default PackageList;
