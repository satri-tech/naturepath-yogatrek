
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
    // return NextResponse.json({
    //   success: false,
    //   message: error?.message,
    // });
  }
}


const parseResult =async (request:NextRequest)=>{ 
    
  try {
    const extractData = await request.json();

    if(!extractData.id){
      return errorResponse(undefined, "id is required in the request body.", 400)
      // return NextResponse.json({
      //   success: false,
      //   message: "id is required in the request body.",
      // });
    }
    const { id, title, slug, image, sections } = extractData;
    const updatedBlogPost = await prisma.sitePage.update({
      where: {
        id: id,
      },
      data: {
        title,
        slug,
        image,
        sections: {
          deleteMany: {}, // Delete existing sections
          create: sections.create, // Create new sections
        },
  }});

    if (updatedBlogPost) {

      return NextResponse.json({
        success: true,
        message: "Page updated successfully",
       
      });
    } else {
      return errorResponse(undefined, "failed to update! Please try again", 500)
      // return NextResponse.json({
      //   success: false,
      //   message: "failed to update! Please try again",
      // });
    }
  } catch (e:any) {
    return errorResponse(e);
    // return NextResponse.json({
    //   success: false,
    //   message: "Something went wrong ! Please try again",
    // });
  }
}