import UpdateTeamForm from "@/components/forms/admin/Team/UpdateTeamForm";
import Pageheading from "@/layouts/admin/Pageheading";
import CustomError from "@/layouts/error/Error";
import { Service } from "@prisma/client";

const UpdateTeamPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetching the team member data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember?id=${params.id}`,
      { next: { tags: [`TeamMember-${params.id}`], revalidate: 100 } }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch team member data");
    }

    const data = await response.json();
    const teamMember = data.data;

    // Render the page layout with the UpdateTeamForm
    return (
      <main className="dark:bg-black-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <Pageheading title={"Update Member's Information"} />
        <div>
          <UpdateTeamForm teamMember={teamMember} />
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default UpdateTeamPage;
