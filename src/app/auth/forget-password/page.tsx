import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { forgetPassword } from "@/lib/actions.ts/authAction";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center h-screen justify-evenly ">
          <div className="max-w-md  mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Forget password</h1>
            <p className="text-slate-500">
              Please provide the valid email address
            </p>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
