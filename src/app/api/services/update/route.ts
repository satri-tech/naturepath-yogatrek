
import { authenticate } from "@/lib/authenticate";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {

  try {
    const payload = await authenticate(request);

    return await parseResult(request);
  } catch (error:any) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}


const parseResult =async (request:NextRequest)=>{ 
    
  try {
    const extractData = await request.json();

    if(!extractData.id){
      return NextResponse.json({
        success: false,
        message: "id is required in the request body.",
      });
    }

    const updatedBlogPost = await prisma.service.update({
      where: {
        id: extractData.id,
      },
      data: extractData,
    });

    if (updatedBlogPost) {

      return NextResponse.json({
        success: true,
        message: "Service updated successfully",
       
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to update the service ! Please try again",
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