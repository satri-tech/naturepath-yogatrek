import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "25");
  const slug = url.searchParams.get("slug");
  const category = url.searchParams.get("category");
  const title = url.searchParams.get("title");
  const serviceId = url.searchParams.get("serviceId");

  if (!slug) {
    if (!category) {
      try {
        const whereConditions: any = {};

        // Filter by serviceId if provided
        if (serviceId) {
          whereConditions.serviceId = serviceId;
        }

        // Filter by title if provided
        if (title && title != "") {
          const titleSubstrings = title.split(" ").map((substring) => ({
            title: { contains: substring, mode: "insensitive" },
          }));

          whereConditions.OR = titleSubstrings;
        }

        const totalCount = await prisma.package.count({
          where: whereConditions,
        });

        const totalPages = Math.ceil(totalCount / limit);

        if (page > totalPages) {
          return NextResponse.json({
            status: 404,
            success: false,
            message: "Page not found",
          });
        }

        const getPackages = await prisma.package.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereConditions,
        });

        if (getPackages && getPackages.length) {
          return NextResponse.json(
            {
              success: true,
              data: getPackages,
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
            "Failed to fetch packages. Please try again",
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
    } else {
      try {
        const service = await prisma.service.findFirst({
          where: {
            slug: {
              contains: category,
            },
          },
        });

        if (!service) {
          return errorResponse(
            undefined,
            "Failed to fetch data. Please try again",
            404
          );
        }

        const whereConditions: any = {
          serviceId: service.id,
        };

        // Filter by title if provided
        if (title) {
          const titleSubstrings = title.split(" ").map((substring) => ({
            title: { contains: substring, mode: "insensitive" },
          }));

          whereConditions.OR = titleSubstrings;
        }

        const totalCount = await prisma.package.count({
          where: whereConditions,
        });

        const totalPages = Math.ceil(totalCount / limit);

        if (page > totalPages) {
          return NextResponse.json({
            status: 404,
            success: false,
            message: "Page not found",
          });
        }

        const getPackages = await prisma.package.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereConditions,
        });

        if (getPackages && getPackages.length) {
          return NextResponse.json(
            {
              success: true,
              data: getPackages,
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
            "Failed to fetch packages. Please try again",
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
  }

  if (slug) {
    try {
      const getPackage = await prisma.package.findUnique({
        where: {
          slug: slug,
        },
      });

      if (getPackage) {
        return NextResponse.json({
          status: 200,
          success: true,
          data: getPackage,
        });
      } else {
        return errorResponse(
          undefined,
          "Page not found! Please try again",
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
