import PageWrapper from "@/layouts/PageWrapper";
import { petrona } from "../layout";
import { bookings_data, revenue_data, total_analytics } from "@/utils/data";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import TopStatisticCard from "@/components/Card/admin/TopStatisticCard";
import DashSectionHeading from "@/components/ui/DashSectionHeading";
import RecentBookingsTable from "@/components/admin/dashboard/RecentBookingsTable";
import BookingPieChart from "@/components/admin/dashboard/BookingPieChart";
import RevenueBarGraph from "@/components/admin/dashboard/RevenueBarGraph";

export default function Admin() {
  return (
    <PageWrapper className=" text-black/85 flex flex-col gap-5 md:gap-6 xl:gap-8">
      <div>
        <h2 className={`${petrona.className} font-bold text-xl md:text-2xl`}>
          <span className=" text-primary">Welcome</span> back! Navin Sirr
        </h2>
        <p className=" text-black/75 md:text-sm  text-xs">
          Track your packages, package bookings, revenues and other analytics.
        </p>
      </div>

      <main className=" flex flex-wrap gap-4 md:gap-5">
        {/*top 6 analytics here*/}
        <div className=" flex flex-wrap gap-3 w-full">
          {total_analytics.map((single_analytic) => {
            return (
              <TopStatisticCard
                single_analytic={single_analytic}
                key={single_analytic.id}
              />
            );
          })}
        </div>

        {/*booking by category pie chart*/}
        <Card className=" sm:min-w-[425px] sm:w-fit w-full flex flex-col gap-3 p-4 lg:p-5 lg:w-[calc(50%_-_10px)]">
          <DashSectionHeading>Bookings Analytics</DashSectionHeading>

          <BookingPieChart bookings_data={bookings_data} />
        </Card>

        {/*revenue bar graph by month an
        d category*/}
        <Card className=" w-full flex lg:flex-1 flex-col gap-3 p-4 lg:p-5">
          <DashSectionHeading>Revenue</DashSectionHeading>

          <RevenueBarGraph revenue_data={revenue_data} />
        </Card>

        {/*recent booking table*/}
        <Card className=" w-full flex flex-col gap-3 p-4 lg:p-5">
          <DashSectionHeading>Recent Bookings</DashSectionHeading>

          <RecentBookingsTable />
        </Card>

        {/*average rating pie chart*/}

        {/*recent reviews table*/}
      </main>
    </PageWrapper>
  );
}
