import PageWrapper from "@/layouts/PageWrapper";
import { UsersRound, Package, PackagePlus, PackageMinus } from "lucide-react";
import { Card } from "@/components/ui/card";
import TopStatisticCard from "@/components/Card/admin/TopStatisticCard";
import DashSectionHeading from "@/components/ui/DashSectionHeading";
import dynamic from "next/dynamic";
import { petrona } from "../fonts";

const BookingPieChart = dynamic(
  () => import("@/components/admin/dashboard/BookingPieChart"),
  { ssr: false }
);
const RevenueBarGraph = dynamic(
  () => import("@/components/admin/dashboard/RevenueBarGraph"),
  { ssr: false }
);

export default async function Admin() {
  async function fetchDashboardData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`,
        { next: { tags: ["Dashboard data"], revalidate: 100 } }
      );
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const dashboardData = await fetchDashboardData();

  const totalAnalytics = dashboardData
    ? [
      {
        id: "3",
        icon: <UsersRound />,
        title: "Total Users",
        value: dashboardData.user.totalUser,
        rate: dashboardData.user.percentageChange,
        rate_increase: dashboardData.user.rate_increase,
        img: "/admin/chart1.png",
        className:
          "text-yoga-green bg-yoga-green/15 dark:bg-yoga-green dark:bg-yoga-green/30",
      },
      {
        id: "4",
        icon: <Package />,
        title: "Total Packages",
        value: dashboardData.packages.totalPackage,
        img: "/admin/package2.png",
        className: "text-yoga-pink bg-yoga-pink/15 dark:bg-yoga-pink/30",
      },
      {
        id: "5",
        icon: <PackagePlus />,
        title: "Packages Booked",
        value: dashboardData.booking.totalBooking,
        rate: dashboardData.booking.percentageChange,
        rate_increase: dashboardData.booking.rate_increase,
        img: "/admin/chart7.png",
        className:
          "text-yoga-purple bg-yoga-purple/15 dark:bg-yoga-purple/25",
      },
      {
        id: "6",
        icon: <PackageMinus />,
        title: "Packages Cancelled",
        value: dashboardData.booking.bookingCancelled,
        rate: dashboardData.bookingCancelled.percentageChange,
        rate_increase: dashboardData.bookingCancelled.rate_increase,
        img: "/admin/chart6.png",
        className:
          "text-yoga-orange bg-yoga-orange/15 dark:bg-yoga-orange/25",
      },
    ]
    : [
      // Default analytics if data is not available
    ];

  return (
    <PageWrapper className=" text-black/85 flex flex-col gap-5 md:gap-6 xl:gap-8 dark:text-text-dark bg-bg-white dark:bg-gray-dark  py-6">
      <div className="">
        <h2 className={` font-bold text-2xl md:text-3xl dark:text-white text-neutral-900`}>
          <span>Welcome back!</span>
        </h2>
        <p className="md:text-sm mt-1 text-xs">
          Track your packages, package bookings, revenues and other analytics.
        </p>
      </div>

      <main className="flex flex-wrap gap-4 md:gap-5">
        {/* Top statistics cards */}
        <div className="flex flex-wrap gap-3 w-full">
          {totalAnalytics.map((stat) => (
            <TopStatisticCard key={stat.id} single_analytic={stat} />
          ))}
        </div>

        {/* Booking analytics chart */}
        <Card className="sm:min-w-[425px] sm:w-fit w-full flex flex-col gap-3 p-4 lg:p-5 lg:w-[calc(50%_-_10px)]">
          <DashSectionHeading>Bookings Analytics</DashSectionHeading>
          <BookingPieChart
            bookings_data={dashboardData?.booking.serviceBookingsData}
          />
        </Card>

        {/* Revenue graph */}
        <Card className="w-full flex lg:flex-1 flex-col gap-3 p-4 lg:p-5">
          <DashSectionHeading>Revenue</DashSectionHeading>
          <RevenueBarGraph
            revenue_data={dashboardData?.booking.serviceRevenueData}
          />
        </Card>

        {/* Recent bookings */}
        <Card className="w-full flex flex-col gap-3 p-4 lg:p-5">
          <DashSectionHeading>Recent Bookings</DashSectionHeading>
          {/* Include RecentBookingsTable component if needed */}
        </Card>
      </main>
    </PageWrapper>
  );
}
