import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
// import NextAuth from "next-auth/next";
import { User } from "@prisma/client";
import { signJWt } from "@/lib/jwt";
import { UserWithAccessToken } from "@/lib/types";


export const authOptions: AuthOptions = {
  pages:{
    signIn: "/auth/signin"
  },
  session:{
    strategy:"jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Email Address",
          type: "email",
          placeholder: "Your Email Address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            password: true,
            email: true,
            emailVerified: true,
            role: true,
            image: true,
            accounts: true,
            sessions: true,
          },
          
        });

        if (!user) throw new Error("User name or password is not correct");

        if (!credentials?.password)
          throw new Error("Please Provide Your Password");
        const isPassowrdCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPassowrdCorrect)
          throw new Error("Invalid Credentials");

        if (!user.emailVerified)
          throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        const payload = {
            userId: user.id,
            role: user.role,
          };
        const accessToken = signJWt(payload);
        return {...userWithoutPass, accessToken};
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
        if(user as UserWithAccessToken) token.user = user as UserWithAccessToken
        return token
    },

    async session({token, session}){
        session.user = token.user as UserWithAccessToken
        return session;
    }
  },
}; 

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
