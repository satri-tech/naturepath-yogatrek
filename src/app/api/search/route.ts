import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const extractQuery = url.searchParams.get("query");

    return NextResponse.json({
                success: true,
                data: extractQuery,
        });
    

    // const searchPostList = await prisma.post.findMany({
    //   where: {
    //     OR: [
    //       {
    //         title: {
    //           contains: extractQuery || "",
    //         },
    //       },
    //       {
    //         description: {
    //           contains: extractQuery || "",
    //         },
    //       },
    //     ],
    //   },
    // });

//     if (searchPostList) {
//       return NextResponse.json({
//         success: true,
//         data: searchPostList,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Failed to search results",
//       });
//     }
//   } catch (e) {
//     console.log(e);

//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong ! Please try again",
//     });
  }catch(err){
    return NextResponse.json({
        success: false,
        data: "something went wrong",
});
  }
}