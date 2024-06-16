// import PackageDetails from "@/components/Package/PackageDetails";
// import Testimonials from "../PackageDetailsPage/Testimonials";
import ReviewForm from "@/components/forms/Client/ReviewForm";
import BookingBox from "../../../../components/Package/PackageDetailsPage/BookingBox";
import { testimonialsData } from "../../../../components/Package/PackageDetailsPage/testimonialsData";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import RightSidebar from "@/layouts/PagesSidebar/RightSidebar";
import Topbanner from "@/layouts/Topbanner";
import { Calendar, Tag } from "lucide-react";
import React from "react";
import ReviewsList from "@/components/Package/Review/ReviewList";

const PackageDetail = () => {
  return (
    <div>
      <Topbanner title={"Packages detail page"} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-4/6">
          <div className="container max-w-3xl grid justify-center">
            {/* top highlights  */}
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
                    $ 120 <span className="text-xs font-thin">per person</span>
                  </span>
                  Room share
                </div>
              </div>
              <div className="bg-primary text-white p-3 flex items-center gap-2 max-w-fit rounded-tl-xl rounded-br-xl">
                <Tag size={32} className="rotate-90" />
                <div className="text-lg font-medium flex flex-col">
                  <span>
                    $ 180 <span className="text-xs font-thin">per person</span>
                  </span>
                  Private Room
                </div>
              </div>
            </div>

            {/* <PackageDetails
      duration="14 Days"
      destination="Nepal"
      tripGrade="Moderate"
      startsAt="Kathmandu"
      endsAt="Kathmandu"
      accommodation="Tea House or Lodge"
      maxAltitude="Annapurna Base Camp (4130 Meters)"
      activity="Trekking"
      groupType="Any"
      groupSize="1 to 10"
      bestSeason="Spring and Autumn"
      meals="Breakfast, Lunch, and Dinner During Trek"
    /> */}

            {/* Description  */}
            <Card className="bg-indigo-600 text-black my-4 p-4">
              <CardTitle className="text-center">Highlight</CardTitle>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6"></h1>
                {/* <Testimonials {...testimonialsData}/> */}
              </div>
            </Card>

            <div className="my-4">
              <p>
                This 14-day, 13-night trekking package in Nepal is perfect for
                adventure seekers, priced at $120 per person for shared rooms
                and $180 per person for private rooms. The moderate-grade trek
                starts and ends in Kathmandu, with accommodation in tea houses
                or lodges. Trekkers will reach the Annapurna Base Camp at 4130
                meters, with meals provided throughout the trek.
              </p>
              <p>
                Additionally, this package offers a blend of natural beauty and
                cultural immersion, with every detail designed to enhance the
                trekking experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Card className="bg-green-500 text-white p-4">
                <CardTitle className="text-center">Daily Schedule</CardTitle>
                <div className="md:col-span-1 my-5">
                  <BookingBox />
                </div>
              </Card>
              <div className="grid gap-4">
                <Card className="bg-orange-400 text-white p-4">
                  <CardTitle className="text-center font-serif">
                    Include
                  </CardTitle>
                  <CardContent className="mt-4">
                    <ul className="list-disc list-inside">
                      <li>Accommodation: Tea House or Lodge.</li>
                      <li>Meals: Breakfast, Lunch, and Dinner During Trek.</li>
                      <li>Travel insurance.</li>
                      <li>Activity: Trekking.</li>
                      <li>Welcome and farewell dinners in Kathmandu.</li>
                      <li>First aid medical kit.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-red-600 text-white  p-4">
                  <CardTitle className="text-center font-serif">
                    Not Include
                  </CardTitle>
                  <CardContent className="mt-4 text-sm">
                    <ul className="list-disc list-inside">
                      <li>International flights to and from Nepal.</li>
                      <li>Nepal entry visa.</li>
                      <li>Rescue insurance.</li>
                      <li>
                        Personal expenses (e.g., drinks, snacks, and souvenirs).
                      </li>
                      <li>Alcohol.</li>
                      <li>Any other costs not specifically mentioned above.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
            <ReviewForm />
            <ReviewsList reviews={[]} />
            </div>
          </div>
        </div>
        <aside className="lg:w-2/6 container max-w-3xl">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default PackageDetail;
