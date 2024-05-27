"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import {
  compileActivationTemplete,
  compileResetPassTemplete,
  sendmail,
} from "../mail";
import { signJWt, verifyJwt } from "../jwt";


export async function registerUser(user: Omit<User, "id" | "emailVerified" | "role" | "image">) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 15),
    },
  });
  const jwtUserId = signJWt({
    id: result.id,
  });
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplete(user.firstName, activationUrl);
  await sendmail({ to: user.email, subject: "Activate Your Account", body });
  return result;
}

export async function registerNewUser(
  prevState: string | undefined,
  formData: FormData
) {
  const userData: Omit<User, "id" | "emailVerified" | "role" | "image"> = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  };
  try {
    await registerUser(userData);
  } catch (error) {
    if (error instanceof Error) {
      console.log("register error",error)
      switch (error.message) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authenticate(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      username: formData.get("email"),
      password: formData.get("password"),
    });
    console.log("login",result)
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      switch (error.message) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "sucess">;

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "sucess";
};

export const forgetPassword = async (formData: FormData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });
  if (!user) throw new Error("User Does not Exist!");

  const jwtUserId = signJWt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/reset-Password/${jwtUserId}`;
  const body = compileResetPassTemplete(user.firstName, resetPassUrl);
  const sendResult = await sendmail({
    to: user.email,
    subject: "Reset Password",
    body,
  });
  return sendResult;
};

type ResetPasswordFunc = (jwtUserId: string, password:string)=>Promise <"userNotExist" | "success">;

export const resetPassword:ResetPasswordFunc = async (jwtUserId,password)=>{
const payload = verifyJwt(jwtUserId);
  if(!payload) return "userNotExist";
  const userId = payload.id;

  const user = await prisma.user.findUnique({
    where:{
      id:userId,
    }
  });
  if(!user) return "userNotExist";

  const result = await prisma.user.update({
    where:{
      id:userId,
    },
    data: {
      password: await bcrypt.hash(password, 15),
    },
  });
  if(result) return "success";
  else throw new Error("something went wrong!");

}

