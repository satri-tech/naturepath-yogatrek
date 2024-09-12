import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "25");
  const postid = url.searchParams.get("id");

  if (!postid) {
    try {
      const totalCount = await prisma.booking.count();
      const totalPages = Math.ceil(totalCount / limit);

      if (page > totalPages) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Page not found",
        });
      }

      // Fetch bookings with roomPreferences and packages (to get prices)
      const booking = await prisma.booking.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          packageId: true,
          userId: true,
          fullname: true,
          email: true,
          phone: true,
          country: true,
          noofPerson: true,
          message: true,
          bookingDate: true,
          status: true,
          roomPreferences: true,
          package: {
            select: {
              SharingPrice: true,
              PrivatePrice: true,
              SharingOffer: true,
              PrivateOffer: true,
            },
          },
        },
      });

      if (booking && booking.length) {
        return NextResponse.json(
          {
            success: true,
            data: booking, // Return the processed data
            meta: {
              pagination: {
                page,
                limit,
                total: totalCount,
                lastPage: totalPages,
              },
            },
          },
          {
            status: 200,
          }
        );
      } else {
        return errorResponse(
          undefined,
          "Failed to fetch page. Please try again",
          500
        );
      }
    } catch (e) {
      return errorResponse(
        undefined,
        "Something went wrong! Please try again",
        500
      );
    }
  }

  if (postid) {
    try {
      // Fetch booking details by id, including roomPreferences and package prices
      const booking = await prisma.booking.findUnique({
        where: {
          id: postid,
        },
        select: {
          id: true,
          packageId: true,
          userId: true,
          fullname: true,
          email: true,
          phone: true,
          country: true,
          noofPerson: true,
          message: true,
          bookingDate: true,
          status: true,
          roomPreferences: true,
          package: {
            select: {
              SharingPrice: true,
              PrivatePrice: true,
              SharingOffer: true,
              PrivateOffer: true,
            },
          },
        },
      });

      if (booking) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: booking, // Include the price in the response
        });
      } else {
        return errorResponse(
          undefined,
          "Page not Found! Please try again",
          404
        );
      }
    } catch (e) {
      return errorResponse(
        undefined,
        "Something went wrong! Please try again",
        500
      );
    }
  }
}
