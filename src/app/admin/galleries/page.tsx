import GalleriesList from "@/components/admin/galleries/GalleriesList";
import ServicesList from "@/components/admin/services/ServicesList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const GalleriesPage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Galleries</CardTitle>
            <CardDescription>List of Gallery.</CardDescription>
          </div>
          <Link href={"/admin/galleries/create"}>
            <Button variant={"default"}>Create New Gallery</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <GalleriesList />
      </CardContent>
    </Card>
  );
};

export default GalleriesPage;
