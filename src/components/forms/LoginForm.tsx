"use client";
import React, { useState } from "react";
// import { authenticate } from "@/lib/action/login";
import { LogIn, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
  callbackUrl?: string;
}

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsloading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: formData.get("email"),
        password: formData.get("password"),
      });
      if (!result?.ok) {
        throw new Error(result?.error as string);
      }
      if (result?.ok) {

        router.push(props.callbackUrl ? props.callbackUrl : "/admin");
      }
    } catch (error: any) {
      setErrorMesage(error.message);
      return;
    } finally {
      setIsloading(false);
    }

    
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
      className="w-full"
    >
      <div
        className="flex h-8 items-end space-x-1 justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <div id="input" className="flex flex-col w-full my-5">
        <label className="text-gray-500 mb-2 text-left">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Please insert your email"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
        />
      </div>
      <div id="input" className="flex flex-col w-full my-5">
        <label className="text-gray-500 mb-2 text-left">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Please insert your password"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
          minLength={8}
        />
      </div>
      <div id="button" className="flex flex-col w-full my-5">
        <button
          type="submit"
          className="w-full py-4 bg-primary rounded-lg text-green-100"
        >
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">
              {isloading ? <>Loading...</> : <LogIn className="text-white" />}
            </div>
            <div className="font-bold">Sign In</div>
          </div>
        </button>
        <div className="flex justify-evenly mt-5">
          <Link
            href="/auth/forget-password"
            className="w-full text-center font-medium text-gray-500"
          >
            Forget password!
          </Link>
          <Link
            href="/auth/signup"
            className="w-full text-center font-medium text-gray-500"
          >
            Sign up!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
