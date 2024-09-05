"use client";

import ServiceListLoading from "@/components/loading/admin/ServiceListLoading";
import DeleteButton from "@/components/ui/deleteButton";
import DeletePopover from "@/components/ui/deletePopover";
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
import { Team } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
        { next: { tags: [`TeamCollection`], revalidate: 100 } }
      );
      const data = await response.json();

      setTeamMembers(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  async function deleteTeamMember(teamMemberId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: teamMemberId }), // Send the Package id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Team member deleted successfully:", result.message);
      } else {
        console.error("Failed to delete team member:", result.message);
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  }

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  if (teamMembers && teamMembers.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="">Profile picture</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teamMembers.map((Item: Team) => (
            <TableRow className="bg-accent" key={Item.id}>
              <TableCell>
                <div className="font-medium whitespace-nowrap">{Item.name}</div>
              </TableCell>

              <TableCell>
                <div className=" text-sm md:inline whitespace-nowrap">
                  {Item.position}
                </div>
              </TableCell>

              <TableCell className="">
                <Image
                  alt={Item.name}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={Item.image}
                  width="64"
                />
              </TableCell>

              <TableCell className="flex gap-2 items-center">
                <ViewButton url={`/admin/team/view/${Item.id}`} className="" />

                <UpdateButton url={`/admin/team/update/${Item.id}`} />

                <DeletePopover
                  text="team member"
                  deleteFn={() => {
                    deleteTeamMember(Item.id);
                  }}
                >
                  <DeleteButton />
                </DeletePopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <ServiceListLoading />;
  }
};

export default TeamList;
