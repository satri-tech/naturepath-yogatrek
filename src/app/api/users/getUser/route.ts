import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "25");
  const userId = url.searchParams.get("id");

  if (!userId) {
    try {
      const totalCount = await prisma.user.count();
      const totalPages = Math.ceil(totalCount / limit);
        console.log("count",totalCount)
      if (page > totalPages) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Page not found",
        });
      }

      const getUser= await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          emailVerified: true,
          role: true,
          image: true,
          accounts: true,
          sessions: true,
        },
      });
      console.log("count",getUser)

      if (getUser&& getUser.length) {
        return NextResponse.json({
          success: true,
          data: getUser,
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
          message: "Failed to fetch user list. Please try again",
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

  if (userId) {
    try {
      const getUser= await prisma.user.findUnique({
        where: {
          id: userId,
        }, select: {
          id: true,
          firstName: true,
          lastName: true,
          password: false,
          email: true,
          emailVerified: true,
          role: true,
          image: true,
          accounts: true,
          sessions: true,
          bookings:true,
          testimonial:true, 
          reviews:true  
        },
      });

      if (getUser) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: getUser,
        });
      } else {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Member not found. Please try again",
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
