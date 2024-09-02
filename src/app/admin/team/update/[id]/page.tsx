import UpdateTeamForm from "@/components/forms/admin/Team/UpdateTeamForm";
import Pageheading from "@/layouts/admin/Pageheading";
import Error from "@/layouts/error/Error";
import { Service } from "@prisma/client";
import React, { Suspense } from "react";

const UpdateTeam = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember?id=${id}`,
      { next: { tags: [`TeamMember-${id}`], revalidate: 100 } }
    );
    const data = await response.json();
    const teamMember = data.data;
    // console.log("teamMember: ", teamMember);

    return <UpdateTeamForm teamMember={teamMember} />;
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

const UpdateTeamPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className=" dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
      <Pageheading title={"Update Service"} />
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateTeam id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default UpdateTeamPage;
