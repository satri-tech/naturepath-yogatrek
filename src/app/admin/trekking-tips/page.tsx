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
import TrekkingTipsList from "@/components/admin/trekking-tips/TrekkingTipsList";

const TrekkingTipPage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Trekking Tips</CardTitle>
            <CardDescription>List of trekking tips.</CardDescription>
          </div>
          <Link href={"/admin/trekking-tips/create"}>
            <Button variant={"default"}>Add new trekking tip</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <TrekkingTipsList />
      </CardContent>
    </Card>
  );
};

export default TrekkingTipPage;
