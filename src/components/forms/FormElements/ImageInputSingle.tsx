"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadImageField from "@/components/ui/uploadImageField";
import { ImageInputProps, TextInputProps } from "@/utils/types/admin/inputType";
import React, { useRef, useState } from "react";

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
  updateImages,
  updateImgError,
  ...rest
}: ImageInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      field.onChange(files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (field.value) {
      field.onChange(null);

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.files = null;
        updateImages(null);
        updateImgError("");
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <FormItem className={`flex flex-col ${wrapperClass}`}>
      <FormLabel className="">{label}</FormLabel>
      <FormControl>
        <UploadImageField
          ref={inputRef}
          images={images}
          imageerror={error}
          handleChangeFunc={handleImageFileSelected}
          handleRemoveImage={() => {
            handleRemoveImage();
          }}
          handleChange={(e) => {
            handleChange(e);
          }}
          handleClick={() => {
            handleClick();
          }}
        />
      </FormControl>
    </FormItem>
  );
};

export default ImageInputSingle;
