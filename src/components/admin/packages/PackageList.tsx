"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import ViewButton from "@/components/ui/viewButton";
import UpdateButton from "@/components/ui/updateButton";
import DeleteButton from "@/components/ui/deleteButton";
import DeletePopover from "@/components/ui/deletePopover";
import PackageListLoading from "@/components/loading/admin/PackageListLoading";
import { useSession } from "next-auth/react";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const session = useSession();

  const fetchPackages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
        { next: { tags: [`PackageCollection`], revalidate: 600 } }
      );
      const data = await response.json();
      setPackages(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  async function deletePackage(packageId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: JSON.stringify({ id: packageId }), // Send the Package id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Package deleted successfully:", result.message);
      } else {
        console.error("Failed to delete package:", result.message);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  if (packages && packages.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[100px] sm:table-cell">
              <span className="">Image</span>
            </TableHead>
            <TableHead className=" w-[175px]">Name</TableHead>
            <TableHead className=" md:table-cell">Package Duration</TableHead>
            <TableHead className=" md:table-cell">Pricing</TableHead>
            {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
            <TableHead>
              <span className="">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pac: Package) => (
            <TableRow key={pac.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={pac.title}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={pac.image}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                <span className=" w-[175px] inline-block">{pac.title}</span>
                <br />
                {/* <span className="text-xs font-light inline-block w-[175px]">{pac.slug}</span> */}
              </TableCell>
              <TableCell>
                <p className=" w-[125px]"></p>
                <Badge
                  variant="outline"
                  className=" bg-primary/10 text-primary"
                >
                  {pac.Duration}
                </Badge>
              </TableCell>
              <TableCell className="">
                <span className=" inline-block w-[175px]">
                  Shared:{" "}
                  <span className="  font-medium">{pac.SharingOffer}</span>{" "}
                  <span className=" line-through  font-medium">
                    {pac.SharingPrice}
                  </span>
                </span>
                <br />
                <span>
                  Private:{" "}
                  <span className="  font-medium">{pac.PrivateOffer}</span>{" "}
                  <span className=" line-through  font-medium">
                    {pac.PrivatePrice}
                  </span>
                </span>
              </TableCell>
              {/* <TableCell className="">
            {pac.updatedAt as unknown as string}
          </TableCell> */}
              {/* <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/admin/packages/update/${pac.id}`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell> */}
              <TableCell className="flex gap-2 items-center">
                <ViewButton
                  url={`/admin/packages/view/${pac.id}`}
                  className=""
                />

                {/*update*/}
                <UpdateButton url={`/admin/packages/update/${pac.id}`} />

                {/* <form action={DeleteService}> */}
                {/* <input type="hidden" value={Item.id} name="id"/> */}

                {/*later put delete api request here in the function*/}
                <DeletePopover
                  text="service"
                  deleteFn={() => {
                    deletePackage(pac.id);
                  }}
                >
                  <DeleteButton />
                </DeletePopover>
                {/* </form> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <PackageListLoading />;
  }
};

export default PackageList;
