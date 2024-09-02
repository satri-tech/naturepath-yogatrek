"use client";

import React, { useEffect, useState } from "react";
import TeamMemberCard from "../Card/TeamMemberCard";
import { Team } from "@prisma/client";

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
        { next: { tags: [`TeamCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      console.log("members: ", data.data);

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
      <section className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
        {teamMembers.map((teamMember) => {
          return <TeamMemberCard teamMember={teamMember} key={teamMember.id} />;
        })}
      </section>
    );
  } else {
    return <p>Loading team members</p>;
  }
}
