
import { authenticate } from "@/lib/authenticate";
import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {

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
      return errorResponse(undefined, "id is required in the request body.", 400)
     
    }
    const { id } = extractData;
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: extractData,
    });

    if (updatedUser) {

      return NextResponse.json({
        success: true,
        message: "User updated successfully",
       
      });
    } else {
      return errorResponse(undefined, "failed to update! Please try again", 500)
     
    }
  } catch (e:any) {
    return errorResponse(e);
 
  }
}