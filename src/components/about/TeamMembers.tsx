"use client";

import React, { useEffect, useState } from "react";
import TeamMemberCard from "../Card/TeamMemberCard";
import { Team } from "@prisma/client";
import TeamMembersLoading from "../loading/about/TeamMembersLoading";
import { petrona } from "@/app/fonts";

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);

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
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  if (teamMembers && teamMembers.length > 0) {
    return (
      <section className=" flex flex-col gap-4 section-padding">
        <h2
          className={`${petrona.className} uppercase font-extrabold text-2xl md:text-3xl text-center text-primary`}
        >
          Meet Our Extraordinary team
        </h2>
        <div className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
          {teamMembers.map((teamMember: Team) => {
            return (
              <TeamMemberCard teamMember={teamMember} key={teamMember.id} />
            );
          })}
        </div>
      </section>
    );
  } else {
    return <TeamMembersLoading />;
  }
}
