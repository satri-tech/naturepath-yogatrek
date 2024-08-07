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

const CreateServicesForm = () => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const session = useSession();

  const form = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
  });

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
            description: values.Description,
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
          form.reset();

          if (data && data.success) {
            form.reset();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Service Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col w-full xl:w-[calc(50%_-_8px)]">
          <FormLabel className="">Thumbnail</FormLabel>
          <UploadImageField
            images={images}
            imageerror={imageerror}
            handleChangeFunc={handleImageFileSelected}
          />
        </FormItem>

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem className="w-full xl:w-[calc(50%_-_8px)] h-[200px]">
              <FormLabel>Description</FormLabel>
              <FormControl className=" ">
                <RichTextEditor
                  placeholder="Description"
                  className="dark:text-text-dark/75 dark:placeholder:text-text-dark/75 h-[125px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" w-full">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateServicesForm;
