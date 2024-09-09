import { errorResponse } from "@/lib/errorResponse";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { signJWt } from "@/lib/jwt";
import { compileActivationTemplete, sendmail } from "@/lib/mail";

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
    const newlyCreatedUser = await prisma.user.create({
      data: {
        ...extractedUserData,
        password: await bcrypt.hash(extractedUserData.password, 15),
      },
    });

    if (newlyCreatedUser) {
      const jwtUserId = signJWt({
        id: newlyCreatedUser.id,
      });
      const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
      const body = compileActivationTemplete(
        newlyCreatedUser.firstName,
        activationUrl
      );
      await sendmail({
        to: newlyCreatedUser.email,
        subject: "Activate Your Account",
        body,
      });

      return NextResponse.json({
        success: true,
        message: "New user added successfully",
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
