"use client";
import React, { useRef } from "react";
import { ImageInputMultipleProps } from "@/utils/types/admin/inputType";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import UploadImageMultipleField from "@/components/ui/uploadImageMultipleField";

const ImageInputMultiple = <T extends {}>({
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
  imageerror,
  updateImages,
  updateImgError,
  ...rest
}: ImageInputMultipleProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const removeDuplicateFiles = (files: File[]): File[] => {
    const uniqueFiles = files.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );
    return uniqueFiles;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      if (field.value && Array.isArray(field.value)) {
        const imageArray = Array.from(
          new Set(
            removeDuplicateFiles([...(field.value as File[]), ...newFiles])
          )
        );
        field.onChange(imageArray);
        updateImages(imageArray);
      } else {
        field.onChange(newFiles);
        updateImages(newFiles);
      }
    }
  };

  const arrayToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const fieldValue = field.value as File[];

    if (fieldValue && Array.isArray(fieldValue)) {
      const updatedImages: File[] = Array.from(
        new Set(
          fieldValue.filter(
            (_, index: number) => index !== indexToRemove
          ) as File[]
        )
      );
      field.onChange(updatedImages);
      updateImages(updatedImages);

      if (inputRef.current) {
        inputRef.current.files = arrayToFileList(updatedImages);
        updateImgError("");
      }
    } else {
      field.onChange([]);
      updateImages([]);
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
        <UploadImageMultipleField
          ref={inputRef}
          images={images}
          imageerror={error}
          handleRemoveImage={handleRemoveImage}
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

export default ImageInputMultiple;
