import PackageDetailss from "@/components/Package/PackageDetails";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export async function GetPackage({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${id}`,
      { next: { tags: [`Package-${id}`] } }
    );
    const { data }: { data: Package[] } = await response.json();

    const pckg = data.find((pckg) => pckg.id == id);
    const {
      title,
      image,
      SharingOffer,
      SharingPrice,
      PrivateOffer,
      PrivatePrice,
      Duration,
      highlights,
      description,
      itinerary,
      costInclusion,
      costExclusion,
      gallery,
    } = pckg as Package;

    return (
      <main className="  dark:text-text-dark rounded-md shadow-md flex flex-col gap-4">
        <div className="flex gap-3 mx-auto ">
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Calendar size={32} />
            <div className="text-lg font-medium flex flex-col">
              <span>{Duration}</span>Duration
            </div>
          </div>
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Tag size={32} className="rotate-90" />
            <div className="text-lg font-medium flex flex-col">
              <span>
                {SharingOffer}{" "}
                <span className="text-xs font-thin">per person</span>
              </span>
              Room share
            </div>
          </div>
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Tag size={32} className="rotate-90" />
            <div className="text-lg font-medium flex flex-col">
              <span>
                {PrivateOffer}{" "}
                <span className="text-xs font-thin">per person</span>
              </span>
              Private Room
            </div>
          </div>
        </div>

        <div id="highlights" className=" flex flex-col gap-2">
          <h1 className="text-xl lg:text-2xl font-bold ">Highlight</h1>
          <div
            className=" dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
            dangerouslySetInnerHTML={{ __html: highlights as string }}
          />
        </div>

        {/* <div  className=" flex flex-col gap-2">
          <h1 className="text-xl lg:text-2xl font-bold ">Trekking Photos</h1>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="inline-flex space-x-4">
              {gallery.map((src, index) => (
                <div key={index} className="flex-shrink-0 w-50 h-60 relative">
                  <Image
                    width={400}
                    height={400}
                    src={src}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div id="overview" className="flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl font-bold ">Overview</h2>
          <div className="bg-white dark:bg-transparent ">
            <p
              className=" dark:text-text-dark"
              dangerouslySetInnerHTML={{ __html: description as string }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div id="itinerary" className=" flex flex-col gap-2">
            <h1 id="overview" className="text-xl lg:text-2xl font-bold ">
              Itinerary
            </h1>
            <p
              className=" dark:text-text-dark"
              dangerouslySetInnerHTML={{ __html: itinerary as string }}
            />
          </div>
          <div id="included" className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-2xl font-bold ">Package Included</h1>
            <p
              className=" dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
              dangerouslySetInnerHTML={{ __html: costInclusion as string }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-2xl font-bold ">Package Excluded</h1>
            <p
              className=" dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
              dangerouslySetInnerHTML={{ __html: costExclusion as string }}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
}

const PackageViewPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback="Loading...">
      <GetPackage id={params.id} />
    </Suspense>
  );
};

export default PackageViewPage;
