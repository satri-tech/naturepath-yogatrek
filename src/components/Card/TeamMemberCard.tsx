import { Team } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

export default function TeamMemberCard({ teamMember }: { teamMember: Team }) {
  const { name, image, position, id } = teamMember;

  return (
    <Card className=" w-full  flex gap-2 flex-col p-4 lg:p-5 border">

      <Image
        alt={name}
        className=" object-center rounded-md object-cover w-full h-[200px] md:h-[225px] xl:h-[250px]"
        height="400"
        src={image}
        width="400"
      />
      <div className=" flex flex-col w-full  items-start">
        <h1 className=" font-semibold lg:text-lg">{name}</h1>
        <h6 className=" text-sm  font-medium">{position}</h6>
      </div>

      <Link href={`/about/team-member/${id}`} className=" w-full">
        <Button className=" w-full">View profile</Button>
      </Link>
    </Card>
  );
}
