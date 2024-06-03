import { authenticate } from "@/lib/authenticate";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

  try {
    const payload = await authenticate(request);

    return await parseResult(request, response);
  } catch (error:any) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}


const parseResult =async (request:NextRequest , response:NextResponse)=>{
  try {
    const extractServiceData = await request.json();
    const newlyCreatedService = await prisma.sitePage.create({
      data: extractServiceData,
    });


    if (newlyCreatedService) {
      return NextResponse.json({
        success: true,
        message: "New pages added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}