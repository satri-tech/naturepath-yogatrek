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

const TextInput = <T extends {}>({
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
      <FormControl className=" flex">
        <Input
          type={type}
          placeholder={placeholder}
          className="flex-1"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TextInput;
