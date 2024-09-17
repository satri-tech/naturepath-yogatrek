"use client";

import PackageCard from "@/components/Card/PackageCard";
import PackageList from "@/components/Package/PackageList";
import PopularPackage from "@/components/Package/PopularPackage";
import PackageFilterForm from "@/components/forms/Client/PackageFilterForm";
import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";

export interface PackageFilterInterface {
  serviceId?: string;
  title?: string;
}

const PackagePage = () => {
  const [packageFilterOptions, setPackageFillterOptions] =
    useState<PackageFilterInterface>({});
  const [filterServiceId, setFilterServiceId] = useState<string | undefined>(
    undefined
  );
  const [filterTitle, setFilterTitle] = useState<string>("");

  const updateFilterServiceId = useCallback((serviceId: string | undefined) => {
    setFilterServiceId(serviceId);
  }, []);

  const updateFilterTitle = useCallback((title: string) => {
    setFilterTitle(title);
  }, []);

  const updatePackageFilterOptions = useCallback(() => {
    if (packageFilterOptions.serviceId) {
      let duplicatePackageFilterOptions = { ...packageFilterOptions };
      if (filterServiceId)
        duplicatePackageFilterOptions = {
          ...duplicatePackageFilterOptions,
          serviceId: filterServiceId,
        };
      else {
        if (duplicatePackageFilterOptions.serviceId) {
          const { serviceId, ...restOptions } = duplicatePackageFilterOptions;
          duplicatePackageFilterOptions = restOptions;
        }
      }

      if (filterTitle && filterTitle != "")
        duplicatePackageFilterOptions = {
          ...duplicatePackageFilterOptions,
          title: filterTitle,
        };
      else {
        1;
        if (duplicatePackageFilterOptions.title) {
          const { title, ...restOptions } = duplicatePackageFilterOptions;
          duplicatePackageFilterOptions = restOptions;
        }
      }

      setPackageFillterOptions(duplicatePackageFilterOptions);
    } else {
      let duplicatePackageFilterOptions = {};

      if (filterServiceId)
        duplicatePackageFilterOptions = {
          ...duplicatePackageFilterOptions,
          serviceId: filterServiceId,
        };

      if (filterTitle && filterTitle != "")
        duplicatePackageFilterOptions = {
          ...duplicatePackageFilterOptions,
          title: filterTitle,
        };

      setPackageFillterOptions(duplicatePackageFilterOptions);
    }
  }, [filterServiceId, packageFilterOptions, filterTitle]);

  useEffect(() => {
    updatePackageFilterOptions();
  }, []);

  useEffect(() => {
    updatePackageFilterOptions();
    console.log("filter service id:", filterServiceId);
    console.log("filter title: ", filterTitle);
  }, [filterServiceId, filterTitle]);

  return (
    <div>
      <Topbanner title="Explore Suitable Package" />
      <PageWrapper className=" lg:px-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 section-padding">
        <div className="sm:col-span-2 lg:col-span-3">
          <PackageFilterForm
            updateFilterServiceId={updateFilterServiceId}
            updateFilterTitle={updateFilterTitle}
            filterServiceId={filterServiceId}
            filterTitle={filterTitle}
          />
        </div>
        <PackageList {...packageFilterOptions} />
      </PageWrapper>
    </div>
  );
};

export default PackagePage;
