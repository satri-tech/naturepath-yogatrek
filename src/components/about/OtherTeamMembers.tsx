"use client";

import React, { useEffect, useState } from "react";
import TeamMemberCard from "../Card/TeamMemberCard";
import { Team } from "@prisma/client";
import { petrona } from "@/app/layout";

export default function OtherTeamMembers({ id }: { id: string }) {
  const [otherTeamMembers, setOtherTeamMembers] = useState<Team[]>([]);

  const fetchOtherTeamMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
        { next: { tags: [`TeamCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      setOtherTeamMembers(
        data.data.filter((teamMember: Team) => teamMember.id != id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOtherTeamMembers();
  }, []);

  if (otherTeamMembers && otherTeamMembers.length > 0) {
    return (
      <section className="flex flex-col gap-4 section-padding clear-left">
        <h2
          className={`${petrona.className} uppercase font-extrabold text-2xl md:text-3xl text-center text-primary`}
        >
          Other team members
        </h2>

        <div className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
          {otherTeamMembers.map((teamMember: Team) => {
            return (
              <TeamMemberCard teamMember={teamMember} key={teamMember.id} />
            );
          })}
        </div>
      </section>
    );
  } else {
    return <p>Loading other team members</p>;
  }
}
