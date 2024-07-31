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

    const data = {
      packages: {
        totalPackage: totalPackage,
      },
      booking: {
        totalBooking: totalBooking,
        bookingThisMonth: totalBookingThisMonth,
        bookingToday: totalBookingToday,
      },
      user: {
        totalUser: totalUser,
        totalUserThisMonth: totalUserThisMonth,
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
