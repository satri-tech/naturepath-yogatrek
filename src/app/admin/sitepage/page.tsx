import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
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
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { SitePage } from "@prisma/client";

const PageList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage`,
      { next: { tags: [`PageCollection`], revalidate: 100 } }
    );
    const data = await response.json();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Profile</TableHead>
            <TableHead>Page</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((Item: SitePage) => (
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
                <Link href={`/admin/sitepage/update/${Item.id}`}>
                  <div>
                    <Eye />
                  </div>
                </Link>

                {/* <form action={DeleteService}> */}
                {/* <input type="hidden" value={Item.id} name="id"/> */}
                <Button variant={"link"} type="submit">
                  <Trash2 />
                </Button>
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

const SitePages = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Pages</CardTitle>
            <CardDescription>List of pages.</CardDescription>
          </div>
          <Link href={"/admin/sitepage/create"}>
            <Button variant={"default"}>Create New Page</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <PageList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default SitePages;
