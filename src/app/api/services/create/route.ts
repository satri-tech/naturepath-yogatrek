import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

  const authHeader = request.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return NextResponse.json({
      success: false,
      message: "Missing Authorization Token",
    })
  }

  if(token){
   let payload
    try {
      payload = verifyJwt(token);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Invalid Authorization Token",
      });
    }
  
    if (payload?.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }else{
     return await parseResult(request, response)
    }
  }
}


const parseResult =async (request:NextRequest , response:NextResponse)=>{
  try {
    const extractServiceData = await request.json();
    const newlyCreatedService = await prisma.service.create({
      data: extractServiceData,
    });


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