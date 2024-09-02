import TeamList from "@/components/admin/team/TeamList";
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

const TeamPage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>List of Team Members.</CardDescription>
          </div>
          <Link href={"/admin/team/create"}>
            <Button variant={"default"}>Add Member </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <TeamList />
      </CardContent>
    </Card>
  );
};

export default TeamPage;
