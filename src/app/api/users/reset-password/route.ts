import { errorResponse } from "@/lib/errorResponse";
import { signJWt, verifyJwt } from "@/lib/jwt";
import { compileResetPassTemplete, sendmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    return await parseResult(request, response);
  } catch (error: any) {
    return errorResponse(error);
  }
}

const parseResult = async (request: NextRequest, response: NextResponse) => {
  try {
    const extractedUserData = await request.json();
    if (!extractedUserData.jwtToken) {
      return errorResponse(undefined, "JWT token is required!.", 400);
    }
    const { jwtToken, password } = extractedUserData;

    const payload = verifyJwt(jwtToken);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 404 }
      );
    }

    const userId = payload.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 404 }
      );
    }

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await bcrypt.hash(password, 15),
      },
    });
    if (result)
      return NextResponse.json({
        success: true,
        message: "Password reset successfully",
      });
    else {
      return errorResponse(
        undefined,
        "Something went wrong ! Please try again",
        500
      );
    }
  } catch (e: any) {
    return errorResponse(e);
  }
};
