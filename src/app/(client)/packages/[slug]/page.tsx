
import PackageDetails from "@/components/Package/PackageDetails";
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
              <span>3D/2N</span>Duration
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

        <PackageDetails
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
    />

        {/* Description  */}
        <Card className="bg-indigo-600 text-white my-4 p-4">
          <CardTitle className="text-center">Highlight</CardTitle>
          <CardContent className="mt-4">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur Lorem, ipsum dolor.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet .</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </CardContent>
        </Card>
        <div className="my-4">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          incidunt corporis nobis veritatis? Temporibus incidunt omnis est
          aliquam deleniti velit totam, saepe iusto, voluptatibus natus minus
          neque dignissimos aperiam assumenda.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          incidunt corporis nobis veritatis? Temporibus incidunt omnis est
          aliquam deleniti velit totam, saepe iusto, voluptatibus natus minus
          neque dignissimos aperiam assumenda.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          incidunt corporis nobis veritatis? Temporibus incidunt omnis est
          aliquam deleniti velit totam, saepe iusto, voluptatibus natus minus
          neque dignissimos aperiam assumenda.
        </p>

        </div>
        <div className="grid sm:grid-cols-2 gap-4">

        <Card className="bg-green-500 text-white my-4 p-4">
          <CardTitle className="text-center">Daily Schedule</CardTitle>
          <CardContent className="mt-4">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur Lorem, ipsum dolor.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet .</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </CardContent>
        </Card>
        <div className="grid gap-4">
        <Card className="bg-orange-400 text-white my-4 p-4">
          <CardTitle className="text-center">Include</CardTitle>
          <CardContent className="mt-4">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur Lorem, ipsum dolor.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet .</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-red-600 text-white my-4 p-4">
          <CardTitle className="text-center">Not Include</CardTitle>
          <CardContent className="mt-4 text-sm">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur Lorem, ipsum dolor.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet .</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </CardContent>
        </Card>
        </div>
        </div>
      </div>
    </div>
      <aside className="lg:w-2/6 container max-w-3xl">
        <RightSidebar/>
      </aside>
      </div>
    </div>
  );
};

export default PackageDetail;
