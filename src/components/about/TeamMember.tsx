"use client";

import PageWrapper from "@/layouts/PageWrapper";
import { Team } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function TeamMember({ id }: { id: string }) {
  const [teamMember, setTeamMember] = useState<Team>();

  const fetchTeamMember = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
        { next: { tags: [`TeamCollection`], revalidate: 100 } }
      );
      const { data } = await response.json();
      const teamMember = data.find((teamMember: Team) => teamMember.id == id);

      setTeamMember(teamMember);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeamMember();
  }, []);

  if (teamMember) {
    const { name, position, bio, image } = teamMember;

    return (
      <PageWrapper className=" dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md section-padding">
        <h1 className="text-xl lg:text-2xl font-bold mb-0.5 lg:mb-2">{name}</h1>
        <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-5">
          {position}
        </h3>

        <div className=" after:content-[''] after:block after:clear-both">
          <Image
            width={400}
            height={400}
            src={image}
            alt={`teamMember img`}
            className="w-full h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] md:max-w-[350px] xl:max-w-[400px]  object-cover rounded-md md:float-left md:mr-2 xl:mr-3"
          />
          <p className=" dark:text-text-dark mt-3 lg:mt-5 ">{bio}</p>
        </div>
      </PageWrapper>
    );
  } else {
    return <p>Loading team member ...</p>;
  }
}
