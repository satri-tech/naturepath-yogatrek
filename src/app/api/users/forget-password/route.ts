import { errorResponse } from "@/lib/errorResponse";
import { signJWt } from "@/lib/jwt";
import { compileResetPassTemplete, sendmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    if (!extractedUserData.email) {
      return errorResponse(undefined, "Email is required!.", 400);
    }
    const { email } = extractedUserData;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User Does not Exist!");

    const jwtUserId = signJWt({
      id: user.id,
    });
    const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${jwtUserId}`;
    const body = compileResetPassTemplete(user.firstName, resetPassUrl);
    const sendResult = await sendmail({
      to: user.email,
      subject: "Reset Password",
      body,
    });

    if (sendResult) {
      return NextResponse.json({
        success: true,
        message: "Reset password link sent successfully",
      });
    } else {
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
