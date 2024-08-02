import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    console.log(totalBookingPreviousMonth, totalBookingYesterday,totalUserPreviousMonth);

    // Calculate percentages
  const percentageChangeInBookingsTodayVsYesterday =
    totalBookingYesterday === 0
      ? totalBookingToday > 0
        ? 100
        : 0 // if yesterday is 0, return 100% if today is positive, or 0% if today is 0
      : ((totalBookingToday - totalBookingYesterday) / totalBookingYesterday) *
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

    

    const data = {
      packages: {
        totalPackage: totalPackage,
      },
      booking: {
        totalBooking: totalBooking,
        bookingThisMonth: percentageChangeInBookingsThisMonthVsPreviousMonth.toFixed(2),
        bookingToday: percentageChangeInBookingsTodayVsYesterday.toFixed(2),
      },
      user: {
        totalUser: totalUser,
        totalUserThisMonth: percentageChangeInUsersThisMonthVsPreviousMonth.toFixed(2),
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
