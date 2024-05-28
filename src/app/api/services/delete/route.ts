
import { authenticate } from "@/lib/authenticate";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {

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

    const deleteService = await prisma.service.delete({
      where: {
        id: extractData.id,
      },
     
  });

    if (deleteService) {

      return NextResponse.json({
        success: true,
        message: "service deleted successfully",
       
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to delete the post ! Please try again",
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