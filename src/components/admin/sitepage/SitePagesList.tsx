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
import { Service, SitePage } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SitePagesList = () => {
  const [sitePages, setsitePages] = useState([]);

  const fetchsitePages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage`,
        { next: { tags: [`PageCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      setsitePages(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  //for pagination
  const itemsPerTable = 6;
  const tablesPresent = Math.ceil(sitePages.length / itemsPerTable);

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
    sitePages.length - (tablesPresent - 1) * itemsPerTable;

  async function deleteSitePage(sitePageId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: sitePageId }), // Send the Package id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Service deleted successfully:", result.message);
      } else {
        console.error("Failed to delete service:", result.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  useEffect(() => {
    fetchsitePages();
  }, []);

  if (sitePages && sitePages.length > 0) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Profile</TableHead>
              <TableHead>Page</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sitePages.map((Item: SitePage) => (
              <TableRow className="bg-accent" key={Item.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={Item.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={Item.image}
                    width="64"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{Item.title}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {Item.id}
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <ViewButton url={`/admin/sitepage/update/${Item.id}`} />
                  <UpdateButton url={`/admin/sitepage/update/${Item.id}`} />
                  <DeletePopover
                    text="page"
                    deleteFn={() => {
                      deleteSitePage(Item.id);
                    }}
                  >
                    <DeleteButton />
                  </DeletePopover>
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

export default SitePagesList;
