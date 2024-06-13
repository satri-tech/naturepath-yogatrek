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
      throw new Error("Forbidden");
    }

    return payload;
  } catch (error) {
    throw new Error("Invalid Authorization Token");
  }
}

export async function userauthenticate(request:NextRequest) {

  const authHeader = request.headers.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      throw new Error("Missing Authorization Token");
    }
  
    try {
      const payload = verifyJwt(token);
  
      // if (payload?.role !== "ADMIN") {
      //   throw new Error("Forbidden");
      // }
  
      return payload;
    } catch (error) {
      throw new Error("Invalid Authorization Token");
    }
  }

