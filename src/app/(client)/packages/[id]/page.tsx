import React, { Suspense } from "react";
import ReviewForm from "@/components/forms/Client/ReviewForm";
import RightSidebar from "@/layouts/PagesSidebar/RightSidebar";
import Topbanner from "@/layouts/Topbanner";
import ClientReviews from "@/components/Package/ClientReviews";
import DetailNavbar from "@/components/Package/DetailNavbar";
import { GetPackage } from "@/app/admin/packages/view/[id]/page";
import PageWrapper from "@/layouts/PageWrapper";

const PackageDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Topbanner title="Packages detail page" excludeId={true} />
      <DetailNavbar />
      <PageWrapper className="flex flex-col lg:flex-row gap-1 section-padding">
        <div className="flex-1 overflow-y-auto">
          <div className=" max-w-full">
            <div className=" max-w-full grid justify-center">
              <Suspense>
                <GetPackage id={params.id} />
              </Suspense>
              <div id="reviews">
                <ReviewForm />
                <ClientReviews />
                {/* <ReviewsList reviews={[]} /> */}
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:w-1/3  max-w-2xl lg:sticky lg:top-0 p-4 dark:bg-black-dark h-fit">
          <RightSidebar />
        </aside>
      </PageWrapper>
    </div>
  );
};

export default PackageDetailsPage;
