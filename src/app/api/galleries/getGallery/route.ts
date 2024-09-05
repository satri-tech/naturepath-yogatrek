import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "25");
  const galleryId = url.searchParams.get("id");

  if (!galleryId) {
    try {
      const totalCount = await prisma.gallery.count();
      const totalPages = Math.ceil(totalCount / limit);

      if (page > totalPages) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Page not found",
        });
      }

      const getGallery = await prisma.gallery.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      if (getGallery && getGallery.length) {
        return NextResponse.json({
          success: true,
          data: getGallery,
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
          message: "Failed to fetch gallery. Please try again",
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

  if (galleryId) {
    try {
      const getGallery = await prisma.gallery.findUnique({
        where: {
          id: galleryId,
        },
      });

      if (getGallery) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: getGallery,
        });
      } else {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "Gallery not found. Please try again",
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
