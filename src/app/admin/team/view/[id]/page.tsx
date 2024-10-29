import CustomError from "@/layouts/error/Error";
import { Team } from "@prisma/client";
import Image from "next/image";

const TeamMemberViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetching the team members data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
      { next: { tags: [`TeamCollection`], revalidate: 100 } }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    const { data }: { data: Team[] } = await response.json();

    // Find the specific team member by ID
    const teamMember = data.find((member) => member.id === params.id);

    // Check if the team member exists
    if (!teamMember) {
      return <CustomError status={404} message="Team member not found" />;
    }

    // Destructure team member properties
    const { name, bio, position, image } = teamMember;

    // Render the member details
    return (
      <main className="dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-0.5 lg:mb-2">{name}</h1>
        <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-5">
          {position}
        </h3>
        <Image
          width={400}
          height={400}
          src={image}
          alt={`${name}'s image`}
          className="w-full h-[250px] md:h-[275px] xl:h-[300px] object-cover rounded-md"
        />
        <p className="dark:text-text-dark mt-3 lg:mt-5">{bio}</p>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default TeamMemberViewPage;
