import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import PackageListLoading from "@/components/loading/admin/PackageListLoading";
import PackageList from "@/components/admin/packages/PackageList";

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
        <PackageList />
      </CardContent>
    </Card>
  );
};

export default PackagePage;
