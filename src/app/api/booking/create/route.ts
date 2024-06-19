import { authenticate, userauthenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

  // try {
  //   const payload = await authenticate(request);
  //   return await parseResult(request, response);
  // } catch (error:any) {
  //   return errorResponse(error);
  // }
 
    
    try {
      const payload = await userauthenticate(request); 
      console.log("paylaod",payload)
      return await parseResult(request, response); // Try to authenticate the user
    } catch (error: any) {
      // User not authenticated, proceed without user info
      if(error?.message === "Missing Authorization Token"){
        return await parseResult(request, response); 
      }else{
        return errorResponse(error);
      }
    }
}


const parseResult =async (request:NextRequest , response:NextResponse)=>{
  try {
    const extractServiceData = await request.json();
    const newlyCreatedService = await prisma.booking.create({
      data: extractServiceData,
    });

    if (newlyCreatedService) {
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
