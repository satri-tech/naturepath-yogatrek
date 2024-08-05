"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteButton from "@/components/ui/deleteButton";
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
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const ServicesList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: [`ServicesCollection`], revalidate: 100 } }
    );
    const data = await response.json();
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
              {data.data.map((Item: Service) => (
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
                    <ViewButton url={`/admin/services/update/${Item.id}`} className="" />

                    {/*update*/}
                    <UpdateButton url={`/admin/services/update/${Item.id}`} />

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
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const ServicesPage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>List of Service.</CardDescription>
          </div>
          <Link href={"/admin/services/create"}>
            <Button variant={"default"}>Create New Service</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <ServicesList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ServicesPage;
