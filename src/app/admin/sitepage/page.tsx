import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SitePagesList from "@/components/admin/sitepage/SitePagesList";

const SitePages = async () => {
  // Render the table with fetched site pages
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
        <SitePagesList />
      </CardContent>
    </Card>
  );
};

export default SitePages;
