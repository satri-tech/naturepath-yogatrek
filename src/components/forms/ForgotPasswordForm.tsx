"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";

import { inputType } from "@/utils/types/admin/inputType";
import { toastError, toastSuccess } from "@/lib/toast";
import TextInput from "./FormElements/TextInput";
import { forgetPasswordFormSchema } from "@/utils/validation/admin/ForgetPasswordFormSchema";
import { forgetPasswordformInput } from "@/utils/types/admin/forgetPasswordType";

const ForgotPasswordForm = () => {
  const methods = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: "",
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

  const onSubmit = async (values: z.infer<typeof forgetPasswordFormSchema>) => {
    try {
      const formdata: forgetPasswordformInput = {
        email: values.email,
      };

      const jsonData = JSON.stringify(formdata);

      const response = await fetch("/api/users/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await response.json();
      reset();
      ``;
      toastSuccess("Password reset link sent successfully!");
    } catch (err) {
      console.log(err);
      toastError(`Password reset link send failed ${err}`);
    }
  };

  const inputs: inputType<forgetPasswordformInput>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      error: errors.email?.message,
      element: "input",
      className: "w-full",
    },
  ];

  return (
    <div>
      <Form
        buttonLabel={
          <div className=" flex items-center gap-2">
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

            <span>Reset password</span>
          </div>
        }
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
        <p className="text-center">
          Not registered yet?{" "}
          <a
            href="/auth/signup"
            className="text-primary font-medium inline-flex space-x-1 items-center"
          >
            <span>sign up </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
