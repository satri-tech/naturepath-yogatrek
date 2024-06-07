import {  userauthenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

  try {
    const payload = await userauthenticate(request);
    return await parseResult(request, response);
  } catch (error:any) {
    return errorResponse(error);
  }
}


const parseResult =async (request:NextRequest , response:NextResponse)=>{
  try {
    const extractServiceData = await request.json();
    

    const { userId } = extractServiceData;

    // Check if a testimonial already exists for the user
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { userId },
    });

    if (existingTestimonial) {
      return errorResponse(undefined, "you have created testimonial alredy !", 403) 
    }

    const newlyCreatedService = await prisma.testimonial.create({
      data: extractServiceData,
    });

    if (newlyCreatedService) {
      return NextResponse.json({
        success: true,
        message: "testimonials added successfully",
      });
    } else {
      return errorResponse(undefined, "Something went wrong ! Please try again", 500)
     
    }
  } catch (e:any) {
    return errorResponse(e)
  }
}