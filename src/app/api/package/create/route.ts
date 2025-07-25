import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

  try {
    const payload = await authenticate(request);
    return await parseResult(request, response);
  } catch (error:any) {
    return errorResponse(error);
  }
}


const parseResult =async (request:NextRequest , response:NextResponse)=>{
  try {
    const extractedPackageData = await request.json();
    const newlyCreatedPackage = await prisma.package.create({
      data: extractedPackageData,
    });

    if (newlyCreatedPackage) {
      return NextResponse.json({
        success: true,
        message: "New package added successfully",
      });
    } else {
      return errorResponse(undefined, "Something went wrong ! Please try again", 500)
     
    }
  } catch (e:any) {
    return errorResponse(e)
  }
}