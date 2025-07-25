"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";

import { inputType } from "@/utils/types/admin/inputType";
import { toastError, toastSuccess } from "@/lib/toast";
import TextInput from "./FormElements/TextInput";
import Link from "next/link";
import { ResetPasswordFormSchema } from "@/utils/validation/admin/ResetPasswordFormSchema";
import { resetPasswordFormInput } from "@/utils/types/admin/resetPasswordType";

const ResetPasswordForm = ({ jwtToken }: { jwtToken: string }) => {
  const methods = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = methods;

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    try {
      const formdata: resetPasswordFormInput = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const { confirmPassword, ...rest } = formdata;

      const dataToBeSent = {
        ...rest,
        jwtToken,
      };

      const jsonData = JSON.stringify(dataToBeSent);

      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await response.json();
      reset();
      ``;
      toastSuccess("Password reset successfully!");
    } catch (err) {
      console.log(err);
      toastError(`Password reset failed ${err}`);
    }
  };

  const inputs: inputType<resetPasswordFormInput>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      error: errors.email?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      error: errors.password?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Enter your confirm password",
      error: errors.confirmPassword?.message,
      element: "input",
      className: "w-full",
    },
  ];

  return (
    <div>
      <Form
        buttonLabel="Reset Password"
        methods={methods}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        {inputs.map((input, i) => {
          const {
            name,
            type,
            placeholder,
            error,
            autoFocus,
            label,
            element,
            min,
            step,
            className,
            showField = true,
            multiple,
          } = input;
          return showField ? (
            element == "input" && (
              <FormField
                key={i}
                control={control}
                name={name}
                render={({ field }) => (
                  <TextInput
                    name={name}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    error={error}
                    autoFocus={autoFocus}
                    register={register}
                    min={min}
                    step={step}
                    wrapperClass={className}
                    field={field}
                  />
                )}
              />
            )
          ) : (
            <span className={className} key={i}></span>
          );
        })}
      </Form>
      <div className="flex justify-evenly mt-5">
        <Link
          href="/auth/forget-password"
          className="w-full text-center font-medium text-gray-500"
        >
          Forgot password!
        </Link>
        <Link
          href="/auth/signin"
          className="w-full text-center font-medium text-gray-500"
        >
          Sign in!
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
