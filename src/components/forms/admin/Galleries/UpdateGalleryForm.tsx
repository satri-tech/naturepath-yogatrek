"use client";
import { Form, FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { inputType } from "@/utils/types/admin/inputType";
import { serviceFormInput } from "@/utils/types/admin/serviceType";
import TextInput from "../../FormElements/TextInput";
import RichTextArea from "../../FormElements/RichTextArea";
import ImageInputSingle from "../../FormElements/ImageInputSingle";
import { GalleryFormSchema } from "@/utils/validation/GalleryFormValidation";
import { galleriesFormInput } from "@/utils/types/admin/gallleryType";
import ImageInputMultiple from "../../FormElements/ImageInputMultiple";
import { Gallery } from "@prisma/client";
import { urlToFile } from "@/lib/urlToFile";

interface UpdateFormTypes {
  id: string;
  title?: string;
  thumbnail?: string | undefined;
  galleryPhotos?: (string | undefined)[];
}

const UpdateGalleryForm = ({ gallery }: { gallery: Gallery }) => {
  const [images, setImages] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<File[] | null>(null);
  const [imageerror, setImageError] = useState<string>("");
  const [galleryPhotosError, setGalleryPhotosError] = useState<string>("");

  const session = useSession();

  const methods = useForm<z.infer<typeof GalleryFormSchema>>({
    resolver: zodResolver(GalleryFormSchema),
    defaultValues: {
      title: gallery.title,
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

  const updateImages = (img: File | null) => {
    setImages(img);
  };

  const updateImgError = (imgError: string) => {
    setImageError(imgError);
  };

  const updateGalleryPhotos = (imgs: File[] | null) => {
    setGalleryPhotos(imgs);
  };

  const updateGalleryPhotosError = (imgError: string) => {
    setGalleryPhotosError(imgError);
  };

  const getImage = async () => {
    const image = await urlToFile(
      gallery.thumbnail as string,
      "gallery-thumbnail.jpg",
      "image/jpeg"
    );
    setImages(image);
    setValue("thumbnail", image);
  };

  const getImages = async () => {
    const images = await Promise.all(
      gallery.galleryPhotos.map(async (galleryPhoto, i) => {
        const response = await urlToFile(
          galleryPhoto,
          `gallery-photo-${i}.jpg`,
          "image/jpeg"
        );
        return response;
      })
    );

    setGalleryPhotos(images);
    setValue("galleryPhotos", images);
  };

  useEffect(() => {
    if (gallery.thumbnail) getImage();
  }, []);

  useEffect(() => {
    if (gallery.galleryPhotos && gallery.galleryPhotos.length > 0) getImages();
  }, []);

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/galleries/update", {
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
        setGalleryPhotos(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values: z.infer<typeof GalleryFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      const galleryPhotosUrl = await Promise.all(
        values.galleryPhotos.map(async (galleryPhoto) => {
          const response = await UploadCloudinary(galleryPhoto);
          return response.url;
        })
      );
      console.log("gallery phots: ", galleryPhotosUrl);

      if (res.url && galleryPhotosUrl.length > 0) {
        try {
          const formdata = {
            id: gallery.id,
            title: values.title,
            thumbnail: res.url,
            galleryPhotos: galleryPhotosUrl,
          };

          await update(formdata);
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

  const inputs: inputType<galleriesFormInput>[] = [
    {
      name: "title",
      label: "Gallery Title",
      type: "text",
      placeholder: "Enter gallery title",
      error: errors.title?.message,
      element: "input",
      className: "w-full",
    },
    {
      name: "thumbnail",
      label: "Thumbnail",
      type: "file",
      placeholder: "Select thumbnail",
      error: errors.thumbnail?.message,
      element: "image",
      className: "w-full",
    },
    {
      name: "galleryPhotos",
      label: "Gallery photos",
      type: "file",
      placeholder: "Select gallery photos",
      error: errors.galleryPhotos?.message,
      element: "images",
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
              defaultValue={""}
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
              defaultValue={""}
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
          ) : element == "images" ? (
            <FormField
              control={control}
              key={i}
              name={name}
              defaultValue={[]}
              render={({ field }) => (
                <ImageInputMultiple
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
                  imageerror={imageerror}
                  images={galleryPhotos}
                  updateImages={updateGalleryPhotos}
                  updateImgError={updateGalleryPhotosError}
                />
              )}
            />
          ) : (
            <FormField
              control={control}
              key={i}
              name={name}
              defaultValue={undefined}
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

export default UpdateGalleryForm;
