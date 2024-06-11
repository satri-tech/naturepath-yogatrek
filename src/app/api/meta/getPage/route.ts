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
      const totalCount = await prisma.sitePage.count();
      const totalPages = Math.ceil(totalCount / limit);

      if (page > totalPages) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Page not found",
        });
      }

      const getTeam = await prisma.sitePage.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      if (getTeam && getTeam.length) {
        return NextResponse.json({
          success: true,
          data: getTeam,
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
        return errorResponse(undefined, "Failed to fetch page. Please try again", 500)
      //   return NextResponse.json({
      //     success: false,
      //     message: "Failed to fetch page. Please try again",
      // },{
      //   status: 404,
      // });
      }
    } catch (e) {
     
      return errorResponse(undefined, "Something went wrong ! Please try again", 500)
      // return NextResponse.json(
      //   {
      //     success: false,
      //     message: "Something went wrong ! Please try again",
      //   },
      //   {
      //     status: 500,
      //   }
      // );
    }
  }

  if (postid) {
    try {
      const getTeam = await prisma.sitePage.findUnique({
        where: {
          id: postid,
        },
        include: {
          sections: true, // Include the sections relation
        },
      });

      if (getTeam) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: getTeam,
        });
      } else {
        return errorResponse(undefined, "Page not Found ! Please try again", 404)
        
      }
    } catch (e) {
      return errorResponse(undefined, "Something went wrong ! Please try again", 500)
    }
  }
}
