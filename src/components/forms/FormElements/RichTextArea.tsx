"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextInputProps } from "@/utils/types/admin/inputType";
import React from "react";
import RichTextEditor from "./RichTextEditor";

const RichTextArea = <T extends {}>({
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
    <FormItem className={`h-[215px] ${wrapperClass}`}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RichTextEditor placeholder={placeholder} className="" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RichTextArea;
