import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function authenticate(request:NextRequest) {

const authHeader = request.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Missing Authorization Token");
  }

  try {
    const payload = verifyJwt(token);

    if (payload?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    return payload;
  } catch (error) {
    throw new Error("Invalid Authorization Token");
  }
}

//   if(!token){
//     return NextResponse.json({
//       success: false,
//       message: "Missing Authorization Token",
//     })
//   }

//   if(token){
//    let payload
//     try {
//       payload = verifyJwt(token);
//     } catch (error) {
//       return NextResponse.json({
//         success: false,
//         message: "Invalid Authorization Token",
//       });
//     }
  
//     if (payload?.role !== "ADMIN") {
//       return NextResponse.json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }else{
//       return NextResponse.json({
//         success: true,
//         message: "Authorized",
//       });
//     }
//   }
// }