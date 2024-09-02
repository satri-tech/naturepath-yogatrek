"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../../FormElements/RichTextEditor";
import { Button } from "@/components/ui/button";
import z from "zod";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Service } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";

import { Trash2 } from "lucide-react";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { useSession } from "next-auth/react";
import { packageFormInput } from "@/utils/types/admin/packageType";
import { inputType } from "@/utils/types/admin/inputType";
import RichTextArea from "../../FormElements/RichTextArea";
import ImageInputSingle from "../../FormElements/ImageInputSingle";
import TextInput from "../../FormElements/TextInput";
import { TrekkingTipFormSchema } from "@/utils/validation/admin/TrekkingTipFormValidation";
import { Blog } from "@/utils/types/BlogType";
import { trekkingTipFormInput } from "@/utils/types/admin/trekkingTipType";

const CreateTrekkingTipForm = () => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const [resource, setResource] = useState<string[]>([]);

  const session = useSession();

  const removeImage = (url: string) => {
    setResource((prevRes) => {
      const newResources = prevRes.filter((resourceUrl) => resourceUrl !== url);
      return newResources;
    });
  };

  const methods = useForm<z.infer<typeof TrekkingTipFormSchema>>({
    resolver: zodResolver(TrekkingTipFormSchema),
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
    watch,
    setValue,
  } = methods;

  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  const generateSlug = () => {
    const title = watch("title");
    console.log("title", title);
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove non-word characters
        .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
      setValue("slug", slug);
    }
  };

  const onSubmit = async (values: z.infer<typeof TrekkingTipFormSchema>) => {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        try {
          const formdata = {
            title: values.title,
            slug: values.slug,
            img_url: res.url,
            authors: values.authors,
            body: values.body,
          };
          const jsonData = JSON.stringify(formdata);

          const response = await fetch("/api/trekking-tips/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${session.data?.user.accessToken}`,
            },
            body: jsonData,
          });
          const data = await response.json();
          console.log("trekking tip posted: ", response);
          reset();
          setResource([]);
          setImages(null);

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

    // Handle form submission
  };

  const inputs: inputType<trekkingTipFormInput>[] = [
    {
      name: "title",
      label: "Trekking tip title",
      type: "text",
      placeholder: "Enter trekking tip title",
      error: errors.title?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "Slug",
      error: errors.slug?.message,
      element: "input-slug",
      className: "w-full lg:w-[calc(50%_-_8px)] flex-1",
    },
    {
      name: "authors",
      label: "Auhor name",
      type: "text",
      placeholder: "Enter author name",
      error: errors.authors?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "img_url",
      label: "Trekking tip thumbnail",
      type: "file",
      placeholder: "Select trekking tip",
      error: errors.img_url?.message,
      element: "image",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "body",
      label: "Description",
      type: "text",
      placeholder: "Enter trekking tip description",
      error: errors.body?.message,
      element: "rich-text",
      className: "w-full xl:w-[calc(50%_-_8px)]",
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
          ) : element == "input-slug" ? (
            <div key={i} className={`flex items-end gap-2 w-full ${className}`}>
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
              <Button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  generateSlug();
                }}
              >
                Generate
              </Button>
            </div>
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

export default CreateTrekkingTipForm;
