import React, { Suspense } from "react";
import Image from "next/image";
import Topbanner from "@/layouts/Topbanner";
import DetailNavbar from "@/components/Package/DetailNavbar";
import PageWrapper from "@/layouts/PageWrapper";
import ReviewForm from "@/components/forms/Client/ReviewForm";
import ClientReviews from "@/components/Package/ClientReviews";
import RightSidebar from "@/layouts/PagesSidebar/RightSidebar";
import Error from "@/layouts/error/Error";
import { Calendar, Tag } from "lucide-react";
import { Package } from "@prisma/client";

export default async function PackageDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const fetchPackageData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${id}`,
        { next: { tags: [`Package-${id}`] } }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching package data:", error);
      return null;
    }
  };

  const data = await fetchPackageData();

  if (!data || !data.data) {
    return <Error status={404} message="Bad request" />;
  }

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
  } = data.data.find((pckg: Package) => pckg.id === id) as Package;

  return (
    <div>
      <Topbanner title="Packages detail page" excludeId={true} />
      <DetailNavbar />
      <PageWrapper className="flex flex-col lg:flex-row gap-1 section-padding">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-full">
            <div className="max-w-full grid justify-center">
              <Suspense fallback="Loading...">
                <main className="dark:text-text-dark rounded-md shadow-md flex flex-col gap-4">
                  <div className="flex gap-3 mx-auto">
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

                  <div id="highlights" className="flex flex-col gap-2">
                    <h1 className="text-xl lg:text-2xl font-bold">Highlight</h1>
                    <div
                      className="dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
                      dangerouslySetInnerHTML={{ __html: highlights as string }}
                    />
                  </div>

                  <div id="overview" className="flex flex-col gap-2">
                    <h2 className="text-xl lg:text-2xl font-bold">Overview</h2>
                    <div className="bg-white dark:bg-transparent">
                      <p
                        className="dark:text-text-dark"
                        dangerouslySetInnerHTML={{
                          __html: description as string,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div id="itinerary" className="flex flex-col gap-2">
                      <h1 className="text-xl lg:text-2xl font-bold">
                        Itinerary
                      </h1>
                      <p
                        className="dark:text-text-dark"
                        dangerouslySetInnerHTML={{
                          __html: itinerary as string,
                        }}
                      />
                    </div>
                    <div id="included" className="flex flex-col gap-2">
                      <h1 className="text-xl lg:text-2xl font-bold">
                        Package Included
                      </h1>
                      <p
                        className="dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
                        dangerouslySetInnerHTML={{
                          __html: costInclusion as string,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-xl lg:text-2xl font-bold">
                        Package Excluded
                      </h1>
                      <p
                        className="dark:text-text-dark prose prose-ul:text-black prose-li:marker:text-black/65 dark:prose-ul:text-text-dark dark:prose-li:marker:text-text-dark/65"
                        dangerouslySetInnerHTML={{
                          __html: costExclusion as string,
                        }}
                      />
                    </div>
                  </div>
                </main>
              </Suspense>
              <div id="reviews">
                <ReviewForm />
                <ClientReviews />
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:w-1/3 max-w-2xl lg:sticky lg:top-0 p-4 dark:bg-black-dark h-fit">
          <RightSidebar />
        </aside>
      </PageWrapper>
    </div>
  );
}
