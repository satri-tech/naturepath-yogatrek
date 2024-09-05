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
import { Gallery } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GalleriesList = () => {
  const [galleries, setGalleries] = useState([]);

  const fetchgalleries = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/getGallery`,
        { next: { tags: [`GalleriesCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      setGalleries(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  useEffect(() => {
    fetchgalleries();
  }, []);

  if (galleries && galleries.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Gallery Title</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Gallery Photos</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {galleries.map((Item: Gallery) => (
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
                  src={Item.thumbnail}
                  width="48"
                />
              </TableCell>
              <TableCell className=" ">
                <div className="flex items-center gap-2">
                  {Item.galleryPhotos.slice(0, 3).map((galleryPhoto, i) => {
                    return (
                      <Image
                        key={i}
                        alt={Item.title}
                        className="aspect-square rounded-md object-cover"
                        height="48"
                        src={galleryPhoto}
                        width="48"
                      />
                    );
                  })}
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-2">
                  <ViewButton
                    url={`/admin/galleries/view/${Item.id}`}
                    className=""
                  />

                  <UpdateButton url={`/admin/galleries/update/${Item.id}`} />

                  <DeletePopover text="gallery" deleteFn={() => {}}>
                    <DeleteButton />
                  </DeletePopover>
                </div>
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

export default GalleriesList;
