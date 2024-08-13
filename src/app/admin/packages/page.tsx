"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import ViewButton from "@/components/ui/viewButton";
import UpdateButton from "@/components/ui/updateButton";
import DeleteButton from "@/components/ui/deleteButton";

const PackageList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[100px] sm:table-cell">
              <span className="">Image</span>
            </TableHead>
            <TableHead className=" w-[175px]">Name</TableHead>
            <TableHead className=" md:table-cell">
              Package Duration
            </TableHead>
            <TableHead className=" md:table-cell">Pricing</TableHead>
            {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
            <TableHead>
              <span className="">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((pac: Package) => (
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
                  Shared: <span className="  font-medium">{pac.SharingOffer}</span>{" "}
                  <span className=" line-through  font-medium">{pac.SharingPrice}</span>
                </span>
                <br />
                <span>
                  Private: <span className="  font-medium">{pac.PrivateOffer}</span>{" "}
                  <span className=" line-through  font-medium">{pac.PrivatePrice}</span>
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
                  url={`/admin/packages/update/${pac.id}`}
                  className=""
                />

                {/*update*/}
                <UpdateButton url={`/admin/packages/update/${pac.id}`} />

                {/* <form action={DeleteService}> */}
                {/* <input type="hidden" value={Item.id} name="id"/> */}

                {/*later put delete api request here in the function*/}
                <DeleteButton clickFunc={() => {}} />
                {/* </form> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } catch (err) {
    return <Error status={404} message="Bad request" />;
  }
};

const PackagePage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Packages</CardTitle>
            <CardDescription>List of package.</CardDescription>
          </div>
          <Link href={"/admin/packages/create"}>
            <Button variant={"default"}>Add new Package</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <PackageList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default PackagePage;
