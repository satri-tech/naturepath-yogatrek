"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadImageField from "@/components/ui/uploadImageField";
import { ImageInputProps, TextInputProps } from "@/utils/types/admin/inputType";
import React, { useState } from "react";

const ImageInputSingle = <T extends {}>({
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
  images,
  handleImageFileSelected,
  imageerror,
  ...rest
}: ImageInputProps<T>) => {
  return (
    <FormItem className="flex flex-col w-full xl:w-[calc(50%_-_8px)]">
      <FormLabel className="">Thumbnail</FormLabel>
      <FormControl>
        <UploadImageField
          images={images}
          imageerror={imageerror}
          handleChangeFunc={handleImageFileSelected}
        />
      </FormControl>
    </FormItem>
  );
};

export default ImageInputSingle;
