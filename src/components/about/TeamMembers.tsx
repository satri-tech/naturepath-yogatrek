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
      <div className="text-center mb-8">
        <h2 className={`uppercase font-extrabold text-2xl md:text-3xl lg:text-4xl bg-primary bg-clip-text text-transparent mb-4`}>
          Why Choose Our Yoga & Trek Company
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto pb-10">
          Discover the perfect blend of adventure, mindfulness, and natural beauty
        </p>

        <div className=" w-full grid grid-cols-3 justify-start ">
          {teamMembers.map((teamMember: Team) => {
            return (
              <TeamMemberCard teamMember={teamMember} key={teamMember.id} />
            );
          })}
        </div>
      </div >
    );
  } else {
    return <TeamMembersLoading />;
  }
}
