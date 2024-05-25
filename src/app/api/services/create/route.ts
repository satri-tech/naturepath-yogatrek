import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const extractServiceData = await request.json();
    const newlyCreatedService = await prisma.service.create({
      data: extractServiceData,
    });

    console.log(extractServiceData, "extractPostData");

    if (newlyCreatedService) {
      return NextResponse.json({
        success: true,
        message: "New service added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
