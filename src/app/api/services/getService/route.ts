import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "25");
  const postid = url.searchParams.get("id");

  if (!postid) {
    try {
      const totalCount = await prisma.service.count();
      const totalPages = Math.ceil(totalCount / limit);

      if (page > totalPages) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Page not found",
        });
      }

      const getService = await prisma.service.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      if (getService && getService.length) {
        return NextResponse.json({
          success: true,
          data: getService,
          meta: {
            pagination: {
              page,
              limit,
              total: totalCount,
              lastPage: totalPages,
            },
          },
        },{
          status: 200,
        });
      } else {
        return NextResponse.json({
          
          success: false,
          message: "Failed to fetch service. Please try again",
      },{
        status: 404,
      });
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong ! Please try again",
        },
        {
          status: 500,
        }
      );
    }
  }

  if (postid) {
    try {
      const getService = await prisma.service.findUnique({
        where: {
          id: postid,
        },
      });

      if (getService) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: getService,
        });
      } else {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Service not found. Please try again",
        });
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  }
}
