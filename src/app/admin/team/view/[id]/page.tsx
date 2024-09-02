import Error from "@/layouts/error/Error";
import { Team } from "@prisma/client";
import { Suspense } from "react";
import Image from "next/image";

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
      <main className=" dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-0.5 lg:mb-2">{name}</h1>
        <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-5">
          {position}
        </h3>

        <Image
          width={400}
          height={400}
          src={image}
          alt={`teamMember img`}
          className="w-full h-[250px] md:h-[275px] xl:h-[300px]  object-cover rounded-md"
        />
        <p className=" dark:text-text-dark mt-3 lg:mt-5">{bio}</p>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
}

const teamMemberViewPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback="Loading...">
      <GetTeamMember id={params.id} />
    </Suspense>
  );
};

export default teamMemberViewPage;
