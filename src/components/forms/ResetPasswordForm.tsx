"use client";
import { resetPassword } from "@/lib/actions.ts/authAction";
import { ShieldAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordForm = ({ jwtUserId }: { jwtUserId: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  const handleReset = async (formData: FormData) => {
    setIsloading(true);
    const password = formData.get("password") as string;
    const cpassword = formData.get("cpassword") as string;
    if (password === cpassword) {
      try {
        const result = await resetPassword(jwtUserId, password);
        if (result === "userNotExist") {
          throw new Error("User Does not exist");
        }
        if (result === "success") {
          router.push("/auth/signin");
        }
      } catch (error: any) {
        setErrorMesage(error.message);

        return;
      } finally {
        setIsloading(false);
      }
    } else {
      setErrorMesage("Password Doesnt match");
      setIsloading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReset(new FormData(e.currentTarget));
      }}
      className="my-10"
    >
      {errorMessage && (
        <>
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
      <div className="flex flex-col space-y-5">
        <label>
          <p className="font-medium text-slate-700 pb-2 text-start">
            New Password
          </p>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter New Password"
          />
        </label>
        <label>
          <p className="font-medium text-slate-700 pb-2 text-start">
            confirm Password
          </p>
          <input
            id="cpassword"
            name="cpassword"
            type="password"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Confirm New Password"
          />
        </label>

        <button
          className="w-full py-3 font-medium text-white bg-primary hover:bg-secondary rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          aria-disabled={isloading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>

          <span>Set New password </span>
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
