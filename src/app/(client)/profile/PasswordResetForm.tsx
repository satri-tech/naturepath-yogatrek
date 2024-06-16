"use client";

import { forgetPassword } from "@/lib/actions.ts/authAction";
import React, { useState } from "react";

const PasswordResetForm = ({ emailaddress }: { emailaddress: string }) => {
  return (
    <div className="p-8 bg-white text-black shadow-lg rounded-lg max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
      <form action={forgetPassword} className="space-y-4">
        <input
          type="hidden"
          name="email"
          placeholder="Email"
          value={emailaddress}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
