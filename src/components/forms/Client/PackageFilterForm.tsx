"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
import { X } from "lucide-react";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

const PackageFilterForm = ({
  updateFilterServiceId,
  updateFilterTitle,
  filterServiceId,
  filterTitle,
}: {
  updateFilterTitle: (title: string) => void;
  updateFilterServiceId: (serviceId: string | undefined) => void;
  filterServiceId: string | undefined;
  filterTitle: string | undefined;
}) => {
  const [isFiltered, setIsFiltered] = useState();
  const [services, setServices] = useState<Service[]>([]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilterTitle(event.target.value);
  };

  const handleServiceChange = (value: string) => {
    const serviceId = value;
    updateFilterServiceId(serviceId);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
        { next: { tags: [`ServicesCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilters = useCallback(() => {
    updateFilterServiceId(undefined);
    updateFilterTitle("");
  }, []);

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-xl">
      <div className="flex flex-1 items-center space-x-2">
        <input
          type="text"
          className={cn(
            "flex h-10 w-full rounded-md border dark:border border-slate-200 bg-white  dark:bg-slate-950  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:focus-visible:ring-slate-300"
          )}
          value={filterTitle}
          onChange={handleTitleChange}
          placeholder="Enter text"
        />

        <div className="w-[250px]">
          {services && services.length > 0 && (
            <Select onValueChange={handleServiceChange}>
              <SelectTrigger className="h-8 py-2">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => {
                  return (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>

        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={resetFilters}
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PackageFilterForm;
