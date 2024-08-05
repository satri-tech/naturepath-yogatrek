
import React, { Suspense } from 'react';
import ReviewForm from "@/components/forms/Client/ReviewForm";
import PackageDetailss from "@/components/Package/PackageDetails";
import PackageIncluded from '@/components/Package/PackageIncluded';
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import RightSidebar from "@/layouts/PagesSidebar/RightSidebar";
import Topbanner from "@/layouts/Topbanner";
import { Calendar, Tag } from "lucide-react";
import ReviewsList from "@/components/Package/Review/ReviewList";
import Itinerary from '@/components/Package/Itinerary';
import ClientReviews from '@/components/Package/ClientReviews';
import DetailNavbar from '@/components/Package/DetailNavbar';
import Error from '@/layouts/error/Error';

const photos = [
  '/trekking.jpg',
  '/yoga.jpg',
  '/basecamp.jpg',
];

const PackageDetails=async() => {
   try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?slug=everest-base-camp-trek-15-days`,
      { next: { tags: [`Package detail id `], revalidate: 200 } }
    );
    const data = await response.json();


    return (
      <>
        <div className="flex gap-3 mx-auto mb-4">
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Calendar size={32} />
            <div className="text-lg font-medium flex flex-col">
              <span>14D/13N</span>Duration
            </div>
          </div>
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Tag size={32} className="rotate-90" />
            <div className="text-lg font-medium flex flex-col">
              <span>
                $120 <span className="text-xs font-thin">per person</span>
              </span>
              Room share
            </div>
          </div>
          <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
            <Tag size={32} className="rotate-90" />
            <div className="text-lg font-medium flex flex-col">
              <span>
                $180 <span className="text-xs font-thin">per person</span>
              </span>
              Private Room
            </div>
          </div>
        </div>

        <Card id="highlights" className="bg-indigo-100 text-black my-1 p-1">
          <CardTitle className="text-center">Highlight</CardTitle>
          <CardContent className="p-1">
            <PackageDetailss duration="12 Days" pax="2 - 16" price="$800" />
          </CardContent>
        </Card>

        <h1 id="overview" className="text-3xl font-bold mb-6">
          Trekking Photos
        </h1>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="inline-flex space-x-4">
            {photos.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-50 h-60 relative">
                <img
                  src={src}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div id="overview" className="my-4">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg text-gray-800 mb-4">
              This 14-day, 13-night trekking package in Nepal is perfect for
              adventure seekers. Priced at{" "}
              <span className="font-bold">
                $120 per person for shared rooms
              </span>{" "}
              and{" "}
              <span className="font-bold">
                $180 per person for private rooms
              </span>
              , the moderate-grade trek starts and ends in Kathmandu, with
              accommodation in tea houses or lodges. Trekkers will reach the
              Annapurna Base Camp at{" "}
              <span className="font-bold">4130 meters</span>, with meals
              provided throughout the trek.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Additionally, this package offers a blend of natural beauty and
              cultural immersion, with every detail designed to enhance the
              trekking experience.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Experience the thrill of trekking through diverse landscapes, from
              lush forests to alpine meadows, while witnessing stunning views of
              the Himalayan peaks. You&apos;ll have the opportunity to interact
              with local communities, gaining insights into their traditions and
              lifestyles. Our experienced guides ensure your safety and comfort
              throughout the journey, while hearty meals prepared with local
              ingredients keep you energized.
            </p>
            <p className="text-lg text-gray-800">
              Join us for an unforgettable adventure where every step brings you
              closer to nature and leaves you with lasting memories of
              Nepal&apos;s majestic landscapes.
            </p>
          </div>
        </div>

        <div id="itinerary" className="grid sm:grid-cols-1 gap-5">
          <div className="md:col-span-1 my-5">
            <Itinerary />
          </div>
          <PackageIncluded />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
}


const PackageDetail: React.FC = () => {
  return (
    <div>
      <Topbanner title="Packages detail page" />
      <DetailNavbar />
      <div className="flex flex-col lg:flex-row gap-1 h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container max-w-full">
            <div className="container max-w-full grid justify-center">
              <Suspense>
                <PackageDetails />
              </Suspense>
              <div id="reviews">
                <ReviewForm />
                <ClientReviews />
                {/* <ReviewsList reviews={[]} /> */}
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:w-1/3 container max-w-2xl sticky top-0 p-4">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default PackageDetail;
