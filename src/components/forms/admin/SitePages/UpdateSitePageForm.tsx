"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { PagesFormSchema } from "@/utils/validation/admin/PagesFormValidation";
import { useSession } from "next-auth/react";
import { Section, SitePage } from "@prisma/client";
import { revalidateTag } from "next/cache";

export interface ExtendedSitePage extends SitePage {
  sections: Section[];
}

const UpdatePageForm = ({ meta }: { meta: ExtendedSitePage }) => {
  const session = useSession();
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const methods = useForm<z.infer<typeof PagesFormSchema>>({
    resolver: zodResolver(PagesFormSchema),
    defaultValues: {
      title: meta?.title,
      slug: meta?.slug,
      // image: meta?.image,
      sections: meta.sections?.map((section) => ({
        title: section.title,
        description: section.description,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "sections",
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = methods;

  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  interface UpdateFormTypes {
    id: string;
    title?: string;
    slug?: string;
    image?: string;
    secction?: Section;
  }

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/meta/update", {
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

  async function onSubmit(values: z.infer<typeof PagesFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        if (values.title !== meta.title || values.slug !== meta.slug) {
          const formdata = {
            id: meta.id,
            title: values.title,
            slug: values.slug,
            image: res.url,
            sections: { set: values.sections },
          };

          await update(formdata);
        } else {
          const formdata = {
            id: meta.id,
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
      const formdata = {
        id: meta.id,
        title: values.title,
        slug: values.slug,
        sections: { create: values.sections },
      };
      // function call
      await update(formdata);
    }
  }

  return (
    <Form
      methods={methods}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      className="space-y-8"
    >
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Page Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="slug"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Page Slug" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem className="flex flex-col gap-2 mb-3 ">
        <FormLabel className="">Thumbnail</FormLabel>
        <div className="grid grid-cols-12 gap-2 my-2 border border-black rounded-md ">
          {images ? (
            <div className="relative col-span-12" key={images.name}>
              <Image
                src={URL.createObjectURL(images)}
                alt={images.name}
                className="object-fit h-40 w-auto mx-auto"
                height={500}
                width={500}
                quality={100}
              />
            </div>
          ) : (
            <>
              {meta.image ? (
                <div className="relative col-span-12">
                  <Image
                    src={meta.image}
                    alt={meta.title}
                    className="object-fit h-40 w-auto mx-auto"
                    height={500}
                    width={500}
                    quality={100}
                  />
                </div>
              ) : (
                <div className="relative col-span-12 grid h-40 w-auto justify-center">
                  <p className=" mx-auto place-self-center">Upload the image</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-1 justify-between">
          <Input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageFileSelected}
          />
        </div>
        {imageerror && <p className="text-red-700">{imageerror}</p>}
      </FormItem>
      {/* <FormItem className="flex flex-col gap-2 mb-3 ">
          <FormLabel className="">Thumbnail</FormLabel>
          <div className="grid grid-cols-12 gap-2 my-2 border border-black rounded-md ">
            {images ? (
              <div className="relative col-span-12" key={images.name}>
                <Image
                  src={URL.createObjectURL(images)}
                  alt={images.name}
                  className="object-fit h-40 w-auto mx-auto"
                  height={500}
                  width={500}
                  quality={100}
                />
              </div>
            ) : (
              <div className="relative col-span-12 grid h-40 w-auto justify-center">
                <p className=" mx-auto place-self-center">Upload the image</p>
              </div>
            )}
          </div>
          <div className="flex flex-1 justify-between">
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageFileSelected}
            />
          </div>
          {imageerror && <p className="text-red-700">{imageerror}</p>}
        </FormItem> */}

      <FormItem>
        <div className="flex justify-between items-center">
          <FormLabel>Sections</FormLabel>
          <Button
            type="button"
            onClick={() => append({ title: "", description: "" })}
          >
            Add Section
          </Button>
        </div>
        {fields.map((item, index) => (
          <div key={item.id} className="grid gap-2 my-2">
            <FormField
              control={control}
              name={`sections.${index}.title`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Section Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections.${index}.description`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Section Description</FormLabel>
                  <FormControl>
                    <RichTextEditor placeholder="Description" {...field} />
                    {/* <Input
                        type="text"
                        placeholder="Section Description"
                        {...field}
                      /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove Section
            </Button>
          </div>
        ))}
      </FormItem>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UpdatePageForm;
