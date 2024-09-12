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
import TableController from "@/components/ui/tableController";
import UpdateButton from "@/components/ui/updateButton";
import ViewButton from "@/components/ui/viewButton";
import Error from "@/layouts/error/Error";
import { Gallery } from "@prisma/client";
import { MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GalleriesList = () => {
  const [galleries, setGalleries] = useState([]);
  const session = useSession();

  //for pagination
  const itemsPerTable = 6;
  const tablesPresent = Math.ceil(galleries.length / itemsPerTable);

  const [currentTable, setCurrentTable] = useState<number>(0);

  
  const updateCurrentTableByNumber = (index: number) => {
    setCurrentTable(index);
  };

  const updateCurrentTable = (mode: string) => {
    switch (mode) {
      case "prev":
        setCurrentTable(currentTable == 0 ? currentTable : currentTable - 1);
        break;

      case "next":
        setCurrentTable(
          currentTable == tablesPresent - 1 ? currentTable : currentTable + 1
        );
        break;

      default:
        console.log(
          "invalid case in prev next handling in table of deals statistics"
        );
    }
  };

  const itemsInLastTable =
    galleries.length - (tablesPresent - 1) * itemsPerTable;

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

  async function deleteGallery(galleryId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/galleries/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: JSON.stringify({ id: galleryId }), // Send the gallery id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Gallery deleted successfully:", result.message);
      } else {
        console.error("Failed to delete gallery:", result.message);
      }
    } catch (error) {
      console.error("Error deleting gallery:", error);
    }
  }

  useEffect(() => {
    fetchgalleries();
  }, []);

  if (galleries && galleries.length > 0) {
    return (
      <div>
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
                  <div className="font-medium whitespace-nowrap">
                    {Item.title}
                  </div>
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
                  <div className="flex items-center gap-2 shrink-0 w-[200px]">
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

                    <DeletePopover
                      text="gallery"
                      deleteFn={() => {
                        deleteGallery(Item.id);
                      }}
                    >
                      <DeleteButton />
                    </DeletePopover>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/*controller*/}
        <TableController
          updateCurrentTable={updateCurrentTable}
          updateCurrentTableByNumber={updateCurrentTableByNumber}
          currentTable={currentTable}
          itemsInLastTable={itemsInLastTable}
          itemsPerTable={itemsPerTable}
          tablesPresent={tablesPresent}
        />
      </div>
    );
  } else {
    return <ServiceListLoading />;
  }
};

export default GalleriesList;
