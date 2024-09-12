import PageWrapper from "@/layouts/PageWrapper";
import { petrona } from "../layout";
import { UsersRound, Package, PackagePlus, PackageMinus } from "lucide-react";
import { Card } from "@/components/ui/card";
import TopStatisticCard from "@/components/Card/admin/TopStatisticCard";
import DashSectionHeading from "@/components/ui/DashSectionHeading";
import RecentBookingsTable from "@/components/admin/dashboard/RecentBookingsTable";
import TopStatisticCardLoading from "@/components/loading/admin/TopStatisticCardLoading";
import BookingAnalyticsLoading from "@/components/loading/admin/BookingAnalyticsLoading";
import RevenueLoading from "@/components/loading/admin/RevenueLoading";
import RecentBookingLoading from "@/components/loading/admin/RecentBookingLoading";
import dynamic from "next/dynamic";
import UserWelcome from "@/components/admin/dashboard/UserWelcome";

const BookingPieChart = dynamic(
  () => import("@/components/admin/dashboard/BookingPieChart"),
  {
    ssr: false,
  }
);
const RevenueBarGraph = dynamic(
  () => import("@/components/admin/dashboard/RevenueBarGraph"),
  {
    ssr: false,
  }
);

export default async function Admin() {
  const dashboarddata = await DashboardData();

  let total_analytics = [];

  if (!dashboarddata) {
    total_analytics = [
      {
        id: "3",
        icon: <UsersRound />,
        title: "Total Users",
        value: 300,
        rate: 20,
        rate_increase: true,
        img: "/admin/chart1.png",
        className:
          "text-yoga-green bg-yoga-green/15 dark:bg-yoga-green dark:bg-yoga-green/30",
      },
      {
        id: "4",
        icon: <Package />,
        title: "Total Packages",
        value: 2000,
        img: "/admin/package.png",
        className: "text-yoga-pink bg-yoga-pink/15 dark:bg-yoga-pink/30",
      },
      {
        id: "5",
        icon: <PackagePlus />,
        title: "Packages Booked",
        value: 20,
        rate: 34,
        rate_increase: false,
        img: "/admin/chart7.png",
        className: "text-yoga-purple bg-yoga-purple/15 dark:bg-yoga-purple/25",
      },
      {
        id: "6",
        icon: <PackageMinus />,
        title: "Packages Cancelled",
        value: 5,
        rate: 34,
        rate_increase: true,
        img: "/admin/chart6.png",
        className: "text-yoga-orange bg-yoga-orange/15 dark:bg-yoga-orange/25",
      },
    ];
  } else {
    total_analytics = [
      {
        id: "3",
        icon: <UsersRound />,
        title: "Total Users",
        value: dashboarddata.user.totalUser,
        rate: dashboarddata.user.percentageChange,
        rate_increase: dashboarddata.user.rate_increase,
        img: "/admin/chart1.png",
        className: "text-yoga-green bg-yoga-green/15 dark:bg-yoga-green/30",
      },
      {
        id: "4",
        icon: <Package />,
        title: "Total Packages",
        value: dashboarddata.packages.totalPackage,
        img: "/admin/package2.png",
        className: "text-yoga-pink bg-yoga-pink/15 dark:bg-yoga-pink/30",
      },
      {
        id: "5",
        icon: <PackagePlus />,
        title: "Packages Booked",
        value: dashboarddata.booking.totalBooking,
        rate: dashboarddata.booking.percentageChange,
        rate_increase: dashboarddata.booking.rate_increase,
        img: "/admin/chart7.png",
        className: "text-yoga-purple bg-yoga-purple/15 dark:bg-yoga-purple/25",
      },
      {
        id: "6",
        icon: <PackageMinus />,
        title: "Packages Cancelled",
        value: dashboarddata.booking.bookingCancelled,
        rate: dashboarddata.bookingCancelled.percentageChange,
        rate_increase: dashboarddata.bookingCancelled.rate_increase,
        img: "/admin/chart6.png",
        className: "text-yoga-orange bg-yoga-orange/15 dark:bg-yoga-orange/25",
      },
    ];
  }
  if (!dashboarddata)
    return (
      <PageWrapper className="  flex flex-col gap-5 md:gap-6 xl:gap-8  vertical-padding-dashboard">
        <div className="">
          <h2
            className={`${petrona} font-bold text-2xl md:text-3xl skeleton w-fit`}
          >
            <span className=" ">Welcome</span> back! Navin Sirr
          </h2>
          <p className="md:text-sm mt-1  text-xs skeleton w-fit">
            Track your packages, package bookings, revenues and other analytics.
          </p>
        </div>

        <main className=" flex flex-wrap gap-4 md:gap-5">
          {/*top 6 analytics here*/}
          <div className=" flex flex-wrap gap-3 w-full">
            {Array(4)
              .fill("*")
              .map((_, i) => {
                return <TopStatisticCardLoading key={i} />;
              })}
          </div>

          <BookingAnalyticsLoading />

          <RevenueLoading />

          <RecentBookingLoading />

          {/*average rating pie chart*/}

          {/*recent reviews table*/}
        </main>
      </PageWrapper>
    );
  else if (dashboarddata) {
    const bookings_data = dashboarddata.booking.serviceBookingsData;
    const revenue_data = dashboarddata.booking.serviceRevenueData;

    return (
      <PageWrapper className=" text-black/85 flex flex-col gap-5 md:gap-6 xl:gap-8 dark:text-text-dark bg-bg-white dark:bg-gray-dark vertical-padding-dashboard">
        <UserWelcome />

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
}

export async function DashboardData() {
  // const session = await getServerSession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`,
      {
        // method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `bearer ${session.data?.user.accessToken}`,
        // },
        next: { tags: ["Dashboard data"], revalidate: 100 },
      }
    );
    const data = await response.json();
    return data.data;
    console.log(data);
  } catch (err) {
    console.log(err);
    return null;
  }
}
