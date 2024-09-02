"use client";
import ServiceListLoading from "@/components/loading/admin/ServiceListLoading";
import DeleteButton from "@/components/ui/deleteButton";
import DeletePopover from "@/components/ui/deletePopover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateButton from "@/components/ui/updateButton";
import ViewButton from "@/components/ui/viewButton";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ServicesList = () => {
  const [services, setServices] = useState([]);

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
      return <Error status={404} message="Bad request" />;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (services && services.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Service</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((Item: Service) => (
            <TableRow className="bg-accent" key={Item.id}>
              <TableCell>
                <div className="font-medium">{Item.title}</div>
                {/* <div className="hidden text-sm text-muted-foreground md:inline">
                      {Item.id}
                    </div> */}
              </TableCell>
              <TableCell className="">
                <Image
                  alt={Item.title}
                  className="aspect-square rounded-md object-cover"
                  height="48"
                  src={Item.image}
                  width="48"
                />
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <ViewButton
                  url={`/admin/services/view/${Item.id}`}
                  className=""
                />

                <UpdateButton url={`/admin/services/update/${Item.id}`} />

                <DeletePopover text="service" deleteFn={() => {}}>
                  <DeleteButton />
                </DeletePopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <ServiceListLoading />;
  }
};

export default ServicesList;
