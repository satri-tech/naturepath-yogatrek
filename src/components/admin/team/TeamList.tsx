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
import TableController from "@/components/ui/tableController";
import UpdateButton from "@/components/ui/updateButton";
import ViewButton from "@/components/ui/viewButton";
import Error from "@/layouts/error/Error";
import { Team } from "@prisma/client";
import { MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const session = useSession();

  //for pagination
  const itemsPerTable = 6;
  const tablesPresent = Math.ceil(teamMembers.length / itemsPerTable);

  const [currentTable, setCurrentTable] = useState<number>(0);

  const updateCurrentTableByNumber = (index: number) => {
    setCurrentTable(index);
  };

  const updateCurrentTable = (mode: string) => {
    switch (mode) {
      case "prev":
        setCurrentTable(currentTable == 0 ? currentTable : currentTable - 1);
        break;

      case "next":
        setCurrentTable(
          currentTable == tablesPresent - 1 ? currentTable : currentTable + 1
        );
        break;

      default:
        console.log(
          "invalid case in prev next handling in table of deals statistics"
        );
    }
  };

  const itemsInLastTable =
    teamMembers.length - (tablesPresent - 1) * itemsPerTable;

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
            Authorization: `bearer ${session.data?.user.accessToken}`,
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
      <div>
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
                  <div className="font-medium whitespace-nowrap">
                    {Item.name}
                  </div>
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
                  <ViewButton
                    url={`/admin/team/view/${Item.id}`}
                    className=""
                  />

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

        {/*controller*/}
        <TableController
          updateCurrentTable={updateCurrentTable}
          updateCurrentTableByNumber={updateCurrentTableByNumber}
          currentTable={currentTable}
          itemsInLastTable={itemsInLastTable}
          itemsPerTable={itemsPerTable}
          tablesPresent={tablesPresent}
        />
      </div>
    );
  } else {
    return <ServiceListLoading />;
  }
};

export default TeamList;
