import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const payload = await authenticate(request);

    return await parseResult(request);
  } catch (error: any) {
    return errorResponse(error);
  }
}

const parseResult = async (request: NextRequest) => {
  try {
    const extractData = await request.json();

    if (!extractData.id) {
      return errorResponse(
        undefined,
        "id is required in the request body.",
        400
      );
    }
    const { id, rating, comment } = extractData;
    const updatedBlogPost = await prisma.testimonial.update({
      where: {
        id: id,
      },
      data: {
        rating,
        comment,
      },
    });

    if (updatedBlogPost) {
      return NextResponse.json({
        success: true,
        message: "testimonial updated successfully",
      });
    } else {
      return errorResponse(
        undefined,
        "failed to update! Please try again",
        500
      );
      // return NextResponse.json({
      //   success: false,
      //   message: "failed to update! Please try again",
      // });
    }
  } catch (e: any) {
    return errorResponse(e);
    // return NextResponse.json({
    //   success: false,
    //   message: "Something went wrong ! Please try again",
    // });
  }
};
