"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextInputProps } from "@/utils/types/admin/inputType";
import React from "react";

const TextAreaInput = <T extends {}>({
  register,
  name,
  error,
  label,
  wrapperClass,
  placeholder,
  type,
  min,
  step,
  showField,
  value,
  defaultValue,
  inputClassName,
  field,
  ...rest
}: TextInputProps<T>) => {
  return (
    <FormItem className={`${wrapperClass}`}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <textarea
          rows={3}
          placeholder={placeholder}
          {...field}
          className="flex h-[150px] w-full rounded-md border dark:border border-slate-200 bg-white  dark:bg-slate-950  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:focus-visible:ring-slate-300"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TextAreaInput;
