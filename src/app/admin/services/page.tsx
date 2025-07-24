import ServicesList from "@/components/admin/services/ServicesList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

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
            <Button variant={"default"} className="flex gap-2">
              Create New Service
              <Plus size={18} />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ServicesList />
      </CardContent>
    </Card>
  );
};

export default ServicesPage;
