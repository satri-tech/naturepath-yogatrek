import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserWithAccessToken } from "./lib/types";


export default withAuth(

function middleware(req){
  const token = req.nextauth.token as { user: UserWithAccessToken } | undefined

  if(
    req.nextUrl.pathname.startsWith("/admin") && token?.user.role  !== "ADMIN"
  ){
    return NextResponse.redirect("http://localhost:3000/profile");
  }

  if(
    req.nextUrl.pathname.startsWith("/profile") && token?.user.role === "ADMIN"
  ){
    return NextResponse.redirect("http://localhost:3000/admin");
  }
}

)

export const config = {
  matcher: ["/profile", "/admin/:path*"],
};