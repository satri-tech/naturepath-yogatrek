
import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {

  try {
    const payload = await authenticate(request);

    return await parseResult(request);
  } catch (error:any) {
    return errorResponse(error);
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

    const deleteService = await prisma.testimonial.delete({
      where: {
        id: extractData.id,
      },
     
  });

    if (deleteService) {

      return NextResponse.json({
        success: true,
        message: "Page removed successfully",
       
      });
    } else {
      return errorResponse(undefined, "failed to delete the page ! Please try again", 400)
      // return NextResponse.json({
      //   success: false,
      //   message: "failed to delete the page ! Please try again",
      // });
    }
  } catch (e:any) {
    console.log(e);
    return errorResponse(e);
   
    // return NextResponse.json({
    //   success: false,
    //   message: "Something went wrong ! Please try again",
    // });
  }
}