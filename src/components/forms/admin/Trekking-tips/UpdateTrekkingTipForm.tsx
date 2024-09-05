"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrekkingTipFormSchema } from "@/utils/validation/admin/PackageFormValidation";
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
import { Package, Service } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { inputType } from "@/utils/types/admin/inputType";
import { packageFormInput } from "@/utils/types/admin/packageType";
import TextInput from "../../FormElements/TextInput";
import RichTextArea from "../../FormElements/RichTextArea";
import ImageInputSingle from "../../FormElements/ImageInputSingle";
import { urlToFile } from "@/lib/urlToFile";
import { Blog } from "@/utils/types/BlogType";
import { TrekkingTipFormSchema } from "@/utils/validation/admin/TrekkingTipFormValidation";

interface UpdateFormTypes {
  id: string;
  title?: string;
  slug?: string;
  authors?: string;
  publishedAt?: string;
  body?: any;
  img_url?: string;
  category?: string[];
}

const UpdateTrekkingTipForm = ({ trekkingTip }: { trekkingTip: Blog }) => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const session = useSession();

  const methods = useForm<z.infer<typeof TrekkingTipFormSchema>>({
    resolver: zodResolver(TrekkingTipFormSchema),
    defaultValues: {
      title: trekkingTip.title,
      slug: trekkingTip.slug,
      authors: trekkingTip.authors,
      body: trekkingTip.body,
      category: trekkingTip.category,
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

  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  const updateImages = (img: File | null) => {
    setImages(img);
  };

  const updateImgError = (imgError: string) => {
    setImageError(imgError);
  };

  const getImage = async () => {
    const image = await urlToFile(
      trekkingTip.img_url as string,
      "trekking-tip-thumbnail.jpg",
      "image/jpeg"
    );
    setImages(image);
    setValue("img_url", image);
  };

  useEffect(() => {
    if (trekkingTip.img_url) getImage();
  }, []);

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

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/trekking-tips/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${session.data?.user.accessToken}`,
        },

        body: jsonData,
      });
      const data = await response.json();
      reset();

      if (data && data.success) {
        reset();
        setImages(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values: z.infer<typeof TrekkingTipFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        if (
          values.title !== trekkingTip.title ||
          values.slug !== trekkingTip.slug ||
          values.authors !== trekkingTip.authors ||
          // values.serviceId !== trekkingTip.serviceId ||
          values.body !== trekkingTip.body ||
          values.category !== trekkingTip.category
        ) {
          const formdata = {
            id: trekkingTip.id as string,
            title: values.title,
            slug: values.slug,
            img_url: res.url,
            authors: values.authors,
            body: values.body,
            category: values.category,
          };

          await update(formdata);
        }
      }

      if (res.error) {
        setImageError(res.error);
      }
    } 
  }

  const inputs: inputType<packageFormInput>[] = [
    {
      name: "title",
      label: "Package title",
      type: "text",
      placeholder: "Enter service title",
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
      name: "duration",
      label: "Duration",
      type: "text",
      placeholder: "3D/2N",
      error: errors.duration?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "sharedprice",
      label: "Shared price",
      type: "text",
      placeholder: "$ 200 ",
      error: errors.sharedprice?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "privateprice",
      label: "Private price",
      type: "text",
      placeholder: "$ 200",
      error: errors.privateprice?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "sharedOfferPrice",
      label: "Shared Offer Price",
      type: "text",
      placeholder: "$ 200",
      error: errors.sharedOfferPrice?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "privateOfferPrice",
      label: "Private Offer Price",
      type: "text",
      placeholder: "$ 200",
      error: errors.privateOfferPrice?.message,
      element: "input",
      className: "w-full lg:w-[calc(50%_-_8px)]",
    },
    {
      name: "thumbnail",
      label: "Service thumbnail",
      type: "file",
      placeholder: "Select thumbnail",
      error: errors.thumbnail?.message,
      element: "image",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "highlights",
      label: "Highlights",
      type: "text",
      placeholder: "Enter highlights",
      error: errors.highlights?.message,
      element: "rich-text",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
      error: errors.description?.message,
      element: "rich-text",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "itinerary",
      label: "Itinerary",
      type: "text",
      placeholder: "Enter itinerary",
      error: errors.itinerary?.message,
      element: "rich-text",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "costInclusion",
      label: "Cost Inclusion",
      type: "text",
      placeholder: "Enter cost inclusion",
      error: errors.costInclusion?.message,
      element: "rich-text",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "costExclusion",
      label: "Cost Exclusion",
      type: "text",
      placeholder: "Enter cost exclusion",
      error: errors.costExclusion?.message,
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

export default UpdateTrekkingTipForm;
