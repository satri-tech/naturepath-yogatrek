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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema } from "@/utils/validation/admin/ServicesFormValidation";
import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { useSession } from "next-auth/react";
import { Service } from "@prisma/client";
import { revalidateTag } from "next/cache";
import TextInput from "../../FormElements/TextInput";
import RichTextArea from "../../FormElements/RichTextArea";
import ImageInputSingle from "../../FormElements/ImageInputSingle";
import { inputType } from "@/utils/types/admin/inputType";
import { serviceFormInput } from "@/utils/types/admin/serviceType";
import { urlToFile } from "@/lib/urlToFile";

const UpdateServicesForm = ({ services }: { services: Service }) => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");
  const updateImages = (img: File | null) => {
    setImages(img);
  };

  const updateImgError = (imgError: string) => {
    setImageError(imgError);
  };

  const getImage = async () => {
    const image = await urlToFile(
      services.image as string,
      "service-thumbnail.jpg",
      "image/jpeg"
    );
    setImages(image);
    setValue("image", image);
  };

   useEffect(() => {
     if (services.image) getImage();
   }, []);

  const session = useSession();

  const methods = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      title: services.title,
      description: services.description,
    },
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = methods;

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  interface UpdateFormTypes {
    id: string;
    title?: string;
    description?: string;
    image?: string;
  }

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/services/update", {
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

  async function onSubmit(values: z.infer<typeof ServiceFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        if (
          values.title !== services.title ||
          values.description !== services.description
        ) {
          const formdata = {
            id: services.id,
            title: values.title,
            description: values.description,
            image: res.url,
          };

          await update(formdata);
        } else {
          const formdata = {
            id: services.id,
            image: res.url,
          };
          const jsonData = JSON.stringify(formdata);
          await update(formdata);
        }
      }

      if (res.error) {
        setImageError(res.error);
      }
    } else {
      if (
        values.title !== services.title ||
        values.description !== services.description
      ) {
        const formdata = {
          id: services.id,
          title: values.title,
          description: values.description,
        };
        // function call
        await update(formdata);
      }
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
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
      error: errors.description?.message,
      element: "rich-text",
      className: "w-full md:w-[calc(50%_-_8px)]",
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
            //later for single image input component
            <FormField
              control={control}
              key={i}
              name={name}
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

export default UpdateServicesForm;
