import { Card } from "@/components/ui/card";
import CustomError from "@/layouts/error/Error";
import { Blog } from "@/utils/types/BlogType";
import Image from "next/image";

const TrekkingTipViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch the trekking tip data based on the provided id
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/trekking-tips/get?id=${params.id}`,
      { next: { tags: [`Trekking-tip-${params.id}`] } }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch trekking tip data");
    }

    const { data }: { data: Blog } = await response.json();

    // Check if data exists
    if (!data) {
      return <CustomError status={404} message="Trekking tip not found" />;
    }

    // Destructure the necessary fields from the fetched data
    const { title, body, img_url } = data;

    // Render the trekking tip view
    return (
      <main className="dark:bg-black-dark dark:text-text-dark bg-white p-4 md:p-5 rounded-md shadow-md">
        <Image
          width={400}
          height={400}
          src={img_url}
          alt="Blog thumbnail"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div>
          <h1 id="overview" className="text-xl lg:text-2xl font-bold mb-6">
            {title}
          </h1>

          <Card id="highlights" className="bg-indigo-100 text-black my-1 p-1">
            <p
              className="dark:text-text-dark"
              dangerouslySetInnerHTML={{ __html: body as string }}
            />
          </Card>
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <CustomError status={404} message="Bad request" />;
  }
};

export default TrekkingTipViewPage;
