"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema } from "@/utils/validation/admin/ServicesFormValidation";
import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import UploadImageField from "@/components/ui/uploadImageField";
import { inputType } from "@/utils/types/admin/inputType";
import { serviceFormInput } from "@/utils/types/admin/serviceType";
import TextInput from "../../FormElements/TextInput";
import RichTextArea from "../../FormElements/RichTextArea";
import ImageInputSingle from "../../FormElements/ImageInputSingle";

const CreateServicesForm = () => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const session = useSession();

  const methods = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
  });

  const updateImages = (img: File | null) => {
    setImages(img);
  };

  const updateImgError = (imgError: string) => {
    setImageError(imgError);
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = methods;

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      console.log("files from images", _files[0]);
      setImages(_files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof ServiceFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        try {
          const formdata = {
            title: values.title,
            description: values.description,
            image: res.url,
          };
          const jsonData = JSON.stringify(formdata);

          const response = await fetch("/api/services/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${session.data?.user.accessToken}`,
            },
            body: jsonData,
          });
          const data = await response.json();
          revalidateTag("ServiceCollection");
          reset();

          if (data && data.success) {
            reset();
            setImages(null);
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (res.error) {
        setImageError(res.error);
      }
    } else {
      setImageError("Upload the Image");
    }
  }

  const inputs: inputType<serviceFormInput>[] = [
    {
      name: "title",
      label: "Service Title",
      type: "text",
      placeholder: "Enter service titile",
      error: errors.title?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
      error: errors.description?.message,
      element: "rich-text",
      className: "w-full",
    },
    {
      name: "image",
      label: "Service thumbnail",
      type: "file",
      placeholder: "Select thumbnail",
      error: errors.image?.message,
      element: "image",
      className: "w-full",
    },
  ];

  return (
    <Form
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
          element == "input" ? (
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
          ) : element == "rich-text" ? (
            <FormField
              key={i}
              control={control}
              name={name}
              render={({ field }) => (
                <RichTextArea
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={error}
                  autoFocus={autoFocus}
                  register={register}
                  wrapperClass={className}
                  field={field}
                />
              )}
            />
          ) : (
            //  : element == "images" ? (
            //   <Controller
            //     key={i}
            //     name={name}
            //     control={control}
            //     defaultValue={[]} //empty array as default value
            //     render={({ field }) => (
            //       <ImageInputMultiple
            //         key={i}
            //         name={name}
            //         label={label}
            //         type={type}
            //         placeholder={placeholder}
            //         error={error}
            //         autoFocus={autoFocus}
            //         register={register}
            //         wrapperClass={className}
            //         field={field}
            //         containerSizeClass="h-[200px]"
            //         iconSizeClass="text-[75px]"
            //       />
            //     )}
            //   />
            // )
            //later for single image input component
            <FormField
              control={control}
              key={i}
              name={name}
              defaultValue=""
              render={({ field }) => (
                <ImageInputSingle
                  key={i}
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={error}
                  autoFocus={autoFocus}
                  register={register}
                  wrapperClass={className}
                  field={field}
                  handleImageFileSelected={handleImageFileSelected}
                  imageerror={imageerror}
                  images={images}
                  containerSizeClass="h-[150px]"
                  iconSizeClass="text-[60px]"
                  updateImages={updateImages}
                  updateImgError={updateImgError}
                />
              )}
            />
          )
        ) : (
          <span className={className} key={i}></span>
        );
      })}
    </Form>
  );
};

export default CreateServicesForm;
