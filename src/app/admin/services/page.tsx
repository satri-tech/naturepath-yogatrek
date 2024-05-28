import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";






const ServicesList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,{  next: { tags: [`ServicesCollection`], revalidate: 600 } }
    );
    
    const data = await response.json();
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Thumbnail</TableHead>
                <TableHead>Service</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((Item: Service) => (
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
                    <Link href={`/admin/services/update/${Item.id}`}>
                      <div><Eye/></div>   
                    </Link>

                    {/* <form action={DeleteService}> */}
                      {/* <input type="hidden" value={Item.id} name="id"/> */}
                        <Button variant={"link"} type="submit"><Trash2 /></Button>
                      {/* </form> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>    
    );
  } catch (error) {
    console.log(error);
    return (<Error
      status={404}
      message="Bad request"
    />
      
    );
  }
};

const ServicesPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesList />
      </Suspense>
    </div>
  );
};

export default ServicesPage;
