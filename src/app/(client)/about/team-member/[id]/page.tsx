"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Team } from "@prisma/client";
import Error from "@/layouts/error/Error";
import TeamMemberCard from "@/components/Card/TeamMemberCard";
import { petrona } from "@/app/layout";
import PageWrapper from "@/layouts/PageWrapper";
import Topbanner from "@/layouts/Topbanner";
import TeamMember from "@/components/about/TeamMember";
import OtherTeamMembers from "@/components/about/OtherTeamMembers";

async function GetTeamMember({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
      { next: { tags: [`TeamCollection`], revalidate: 100 } }
    );
    const { data }: { data: Team[] } = await response.json();

    const teamMember = data.find((teamMember) => teamMember.id == id);
    const { name, bio, position, image } = teamMember as Team;

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
  } catch (error) {
    console.log(error);
  }
}

async function GetOtherTeamMembers({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
      { next: { tags: [`TeamCollection`], revalidate: 100 } }
    );
    const { data }: { data: Team[] } = await response.json();

    const teamMembers = data.filter((teamMember) => teamMember.id != id);

    return (
      <section className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
        {teamMembers.map((teamMember) => {
          return <TeamMemberCard teamMember={teamMember} key={teamMember.id} />;
        })}
      </section>
    );
  } catch (error) {
    console.log(error);
  }
}

export default function TeamMemberDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

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

  return (
    <main className="dark:text-text-dark">
      <section>
        <Topbanner
          img_url="/about/team-member-bgimage.avif"
          title="Nature Path Team"
        />
      </section>

      <section>
        <TeamMember id={id} />

        <OtherTeamMembers id={id} />
      </section>
    </main>
  );
}
