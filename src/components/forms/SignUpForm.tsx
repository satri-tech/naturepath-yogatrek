"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";

import { inputType } from "@/utils/types/admin/inputType";
import { toastError, toastSuccess } from "@/lib/toast";
import { RegisterFormSchema } from "@/utils/validation/admin/RegisterFormSchema";
import { registerFormInput } from "@/utils/types/admin/registerType";
import TextInput from "./FormElements/TextInput";
import Link from "next/link";

const SignUpForm = () => {
  const methods = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    try {
      const formdata: registerFormInput = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      const jsonData = JSON.stringify(formdata);

      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await response.json();
      reset();
      ``;
      toastSuccess("User registered successfully!");
    } catch (err) {
      console.log(err);
      toastError(`User registration failed, ${err}`);
    }
  };

  const inputs: inputType<registerFormInput>[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      error: errors.firstName?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      error: errors.lastName?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
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
  ];

  return (
    <div>
      <Form
        buttonLabel="Register"
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

export default SignUpForm;
