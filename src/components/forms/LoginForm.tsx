"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";

import { signIn, useSession } from "next-auth/react";
import { inputType } from "@/utils/types/admin/inputType";
import { toastError, toastSuccess } from "@/lib/toast";
import TextInput from "./FormElements/TextInput";
import Link from "next/link";
import { LoginFormSchema } from "@/utils/validation/admin/LoginFormSchema";
import { loginFormInput } from "@/utils/types/admin/loginFormType";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogIn } from "lucide-react";

interface Props {
  callbackUrl?: string;
}

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  const methods = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
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

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      setIsloading(true);

      const formdata: loginFormInput = {
        email: values.email,
        password: values.password,
      };

      const result = await signIn("credentials", {
        redirect: false,
        username: formdata.email,
        password: formdata.password,
      });
      if (!result?.ok) {
        throw new Error(result?.error as string);
      }
      if (result?.ok) {
        router.push(props.callbackUrl ? props.callbackUrl : "/admin");
      }
      reset();
      toastSuccess("Login successfully!");
    } catch (err: any) {
      toastError(`Login failed. ${err}`);
      setErrorMesage(err.message);
      return;
    } finally {
      setIsloading(false);
    }
  };

  const inputs: inputType<loginFormInput>[] = [
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
        buttonLabel={
          <div className="flex gap-2  items-center justify-center">
            {isloading ? <></> : <div className="font-bold">Sign In</div>}
            <div className="mr-2">
              {isloading ? (
                <LoaderCircle className="animate-spin text-white w-6 h-6" />
              ) : (
                <LogIn className="text-white" size={20} />
              )}
            </div>
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

export default LoginForm;
