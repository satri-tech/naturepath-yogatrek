import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const getStartAndEndOfMonth = (year: number, month: number) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

const getRateAnalytics = async () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const { start: currentMonthStart, end: currentMonthEnd } =
    getStartAndEndOfMonth(currentYear, currentMonth);
  const { start: previousMonthStart, end: previousMonthEnd } =
    getStartAndEndOfMonth(currentYear, currentMonth - 1);

  // Fetch booking counts for the current month
  const currentMonthCount = await prisma.booking.count({
    where: {
      bookingDate: {
        gte: currentMonthStart,
        lte: currentMonthEnd,
      },
      status: "CANCELLED",
    },
  });

  // Fetch booking counts for the previous month
  const previousMonthCount = await prisma.booking.count({
    where: {
      bookingDate: {
        gte: previousMonthStart,
        lte: previousMonthEnd,
      },
      status: "CANCELLED",
    },
  });

  // Fetch booking counts for the current month
  const currentMonthBookingCount = await prisma.booking.count({
    where: {
      bookingDate: {
        gte: currentMonthStart,
        lte: currentMonthEnd,
      },
    },
  });

  // Fetch booking counts for the previous month
  const previousMonthBookingCount = await prisma.booking.count({
    where: {
      bookingDate: {
        gte: previousMonthStart,
        lte: previousMonthEnd,
      },
    },
  });

  const currentMonthUserCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: currentMonthStart,
        lte: currentMonthEnd,
      },
    },
  });

  // Fetch user registration counts for the previous month
  const previousMonthUserCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: previousMonthStart,
        lte: previousMonthEnd,
      },
    },
  });

  const percentageChange =
    previousMonthCount === 0
      ? currentMonthCount === 0
        ? 0
        : 100
      : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

  const rate_increase = percentageChange > 0;

  const bookingPercentageChange =
    previousMonthBookingCount === 0
      ? currentMonthBookingCount === 0
        ? 0
        : 100
      : ((currentMonthBookingCount - previousMonthBookingCount) /
          previousMonthBookingCount) *
        100;

  const booking_rate_increase = bookingPercentageChange > 0;

  const userPercentageChange =
    previousMonthUserCount === 0
      ? currentMonthUserCount === 0
        ? 0
        : 100
      : ((currentMonthUserCount - previousMonthUserCount) /
          previousMonthUserCount) *
        100;

  const userRateIncrease = userPercentageChange > 0;

  return {
    booking: {
      rate_increase: booking_rate_increase,
      percentageChange: bookingPercentageChange,
    },
    booking_cancelled: {
      rate_increase,
      percentageChange,
    },
    user: {
      rate_increase: userRateIncrease,
      percentageChange: userPercentageChange,
    },
  };
};

const getBookingsDataForPieChart = async () => {
  const servicesWithBookings = await prisma.service.findMany({
    select: {
      title: true, // Service title
      packages: {
        select: {
          bookings: true, // Access bookings for each package
        },
      },
    },
  });

  // Map over services and count bookings
  const serviceBookings = servicesWithBookings.map((service) => {
    const totalBookings = service.packages.reduce((acc, pkg) => {
      return acc + pkg.bookings.length; // Sum bookings for each package
    }, 0);

    return {
      name: service.title,
      booking: totalBookings,
    };
  });

  return serviceBookings;
};

const getRevenueDataForBarGraph = async () => {
  const servicesWithPackages = await prisma.service.findMany({
    select: {
      title: true, // Service title
      packages: {
        select: {
          bookings: {
            select: {
              roomPreferences: true, // Retrieve room preferences (PRIVATE or SHARED)
            },
          },
          PrivateOffer: true, // PrivateOffer for each package
          SharingOffer: true, // SharingOffer for each package
        },
      },
    },
  });

  // Function to clean and parse the price (e.g., $200 -> 200)
  const parsePrice = (price: string | null) => {
    if (!price) return 0; // Return 0 if price is null
    return parseFloat(price.replace(/[^0-9.]/g, "")); // Remove non-numeric characters
  };

  // Calculate the earnings for each service based on room preferences
  const revenueData = servicesWithPackages.map((service) => {
    const totalEarnings = service.packages.reduce((acc, pkg) => {
      // Calculate earnings based on room preferences in bookings
      const packageEarnings = pkg.bookings.reduce((bookingAcc, booking) => {
        if (booking.roomPreferences === "PRIVATE") {
          // Add PrivateOffer if room preference is PRIVATE
          return bookingAcc + parsePrice(pkg.PrivateOffer);
        } else {
          // Add SharingOffer if room preference is SHARED (or default case)
          return bookingAcc + parsePrice(pkg.SharingOffer);
        }
      }, 0);

      return acc + packageEarnings;
    }, 0);

    return {
      category: service.title, // Service title
      Earnings: totalEarnings, // Total earnings for the service
    };
  });
  return revenueData;
};

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // const payload = await authenticate(request);
    return await parseResult(request, response);
  } catch (error: any) {
    return errorResponse(error);
  }
}

const parseResult = async (request: NextRequest, response: NextResponse) => {
  try {
    const totalPackage = await prisma.package.count();
    const totalBooking = await prisma.booking.count();
    const totalUser = await prisma.user.count();
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const startOfYesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );

    const totalBookingToday = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfDay,
        },
      },
    });

    const totalBookingThisMonth = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    const totalUserThisMonth = await prisma.user.count({
      where: {
        emailVerified: {
          gte: startOfMonth,
        },
      },
    });

    const totalBookingPreviousMonth = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfPreviousMonth,
          lt: startOfMonth,
        },
      },
    });

    const totalBookingYesterday = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfYesterday,
          lt: startOfDay,
        },
      },
    });

    const totalUserPreviousMonth = await prisma.user.count({
      where: {
        emailVerified: {
          gte: startOfPreviousMonth,
          lt: startOfMonth,
        },
      },
    });

    // Calculate percentages
    const percentageChangeInBookingsTodayVsYesterday =
      totalBookingYesterday === 0
        ? totalBookingToday > 0
          ? 100
          : 0 // if yesterday is 0, return 100% if today is positive, or 0% if today is 0
        : ((totalBookingToday - totalBookingYesterday) /
            totalBookingYesterday) *
          100;

    const percentageChangeInBookingsThisMonthVsPreviousMonth =
      totalBookingPreviousMonth === 0
        ? totalBookingThisMonth > 0
          ? 100
          : 0 // if previous month is 0, return 100% if this month is positive, or 0% if this month is 0
        : ((totalBookingThisMonth - totalBookingPreviousMonth) /
            totalBookingPreviousMonth) *
          100;

    const percentageChangeInUsersThisMonthVsPreviousMonth =
      totalUserPreviousMonth === 0
        ? totalUserThisMonth > 0
          ? 100
          : 0 // if previous month is 0, return 100% if this month is positive, or 0% if this month is 0
        : ((totalUserThisMonth - totalUserPreviousMonth) /
            totalUserPreviousMonth) *
          100;

    const cancelledBookingsCount = await prisma.booking.count({
      where: {
        status: "CANCELLED", // Adjust this value based on your actual status value
      },
    });

    const rateData = await getRateAnalytics();

    const serviceBookingsData = await getBookingsDataForPieChart();

    const serviceRevenueData = await getRevenueDataForBarGraph();

    const data = {
      packages: {
        totalPackage: totalPackage,
      },
      booking: {
        totalBooking: totalBooking,
        bookingThisMonth:
          percentageChangeInBookingsThisMonthVsPreviousMonth.toFixed(2),
        bookingToday: percentageChangeInBookingsTodayVsYesterday.toFixed(2),
        bookingCancelled:
          cancelledBookingsCount != 0 ? cancelledBookingsCount : 0,
        rate_increase: rateData.booking.rate_increase,
        percentageChange: rateData.booking.percentageChange,
        serviceBookingsData,
        serviceRevenueData,
      },
      bookingCancelled: {
        rate_increase: rateData.booking_cancelled.rate_increase,
        percentageChange: rateData.booking_cancelled.percentageChange,
      },
      user: {
        totalUser: totalUser,
        totalUserThisMonth:
          percentageChangeInUsersThisMonthVsPreviousMonth.toFixed(2),
        rate_increase: rateData.booking.rate_increase,
        percentageChange: rateData.booking.percentageChange,
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return errorResponse(
      undefined,
      "Something went wrong ! Please try again",
      500
    );
  }
};
