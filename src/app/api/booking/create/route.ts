import { userauthenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import {
  compileAdminTemplate,
  compileUserTemplate,
  sendmail,
} from "@/lib/mail";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getMainColorOfGraphicItem } from "recharts/types/util/ChartUtils";

export async function POST(request: NextRequest, response: NextResponse) {
  // try {
  //   const payload = await authenticate(request);
  //   return await parseResult(request, response);
  // } catch (error:any) {
  //   return errorResponse(error);
  // }

  try {
    const payload = await userauthenticate(request);
    console.log("paylaod", payload);
    return await parseResult(request, response); // Try to authenticate the user
  } catch (error: any) {
    // User not authenticated, proceed without user info
    if (error?.message === "Missing Authorization Token") {
      return await parseResult(request, response);
    } else {
      return errorResponse(error);
    }
  }
}

const parseResult = async (request: NextRequest, response: NextResponse) => {
  try {
    const extractedBookingData = await request.json();
    const newlyCreatedBooking = await prisma.booking.create({
      data: extractedBookingData,
    });

    const packagename = await prisma.package.findUnique({
      where: {
        id: extractedBookingData.packageId,
      },
    });
    if (packagename) {
      const adminbody = compileAdminTemplate(extractedBookingData, packagename);

      const userBody = compileUserTemplate(extractedBookingData, packagename);

      await sendmail({
        to: "navinlamsal378@gmail.com",
        subject: `New Booking from ${extractedBookingData.fullname}`,
        body: adminbody,
      });
      await sendmail({
        to: `${extractedBookingData.email}`,
        subject: `Regarding your Booking at Nature Path yoga Trek`,
        body: userBody,
      });
      if (newlyCreatedBooking) {
        return NextResponse.json({
          success: true,
          message: "New Booking created successfully",
        });
      } else {
        return errorResponse(
          undefined,
          "Something went wrong ! Please try again",
          500
        );
      }
    } else {
      return errorResponse(undefined, "Invalid package", 404);
    }
  } catch (e: any) {
    return errorResponse(e);
  }
};
