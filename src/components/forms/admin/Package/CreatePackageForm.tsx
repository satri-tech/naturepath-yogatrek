"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageFormSchema } from "@/utils/validation/admin/PackageFormValidation";
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

const CreatePackageForm = ({ service }: { service: Service[] }) => {
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

  const methods = useForm<z.infer<typeof PackageFormSchema>>({
    resolver: zodResolver(PackageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      // serviceId: "",
      sharedprice: "",
      privateprice: "",
      sharedOfferPrice: "",
      privateOfferPrice: "",
      duration: "",
      // thumbnail: null,
      highlights: "",
      description: "",
      itinerary: "",
      costInclusion: "",
      costExclusion: "",
      // gallery: [""],
    },
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

  const onSubmit = async (values: z.infer<typeof PackageFormSchema>) => {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        try {
          const formdata = {
            title: values.title,
            slug: values.slug,
            image: res.url,
            SharingPrice: values.sharedprice,
            PrivatePrice: values.privateprice,
            SharingOffer: values.sharedOfferPrice,
            PrivateOffer: values.privateOfferPrice,
            Duration: values.duration,
            // serviceId: values.serviceId,
            highlights: values.highlights,
            description: values.description,
            itinerary: values.itinerary,
            costInclusion: values.costInclusion,
            costExclusion: values.costExclusion,
            gallery: resource,
          };
          const jsonData = JSON.stringify(formdata);

          const response = await fetch("/api/package/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${session.data?.user.accessToken}`,
            },
            body: jsonData,
          });
          const data = await response.json();
          console.log(response);
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

export default CreatePackageForm;
