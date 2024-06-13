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
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormSchema } from "@/utils/validation/admin/ServicesFormValidation";
import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { useSession } from "next-auth/react";
import { Service } from "@prisma/client";
import { revalidateTag } from "next/cache";

const UpdateServicesForm = ({ services }: { services: Service }) => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const session = useSession();

  const form = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      title: services.title,
      Description: services.description,
    },
  });

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

interface UpdateFormTypes{
    id:string,
    title?:string,
    Description?:string,
    image?:string
  }

  async function update(formdatas:UpdateFormTypes) {
    try {
     const jsonData= JSON.stringify(formdatas)
      const response = await fetch("/api/services/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${session.data?.user.accessToken}`,
        },

        body: jsonData,
      });
      const data = await response.json();
      revalidateTag(`Service-${services.id}`)
      revalidateTag("ServiceCollection")
      form.reset();

      if (data && data.success) {
        form.reset();
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
          values.Description !== services.description
        ) {
          const formdata = {
            id: services.id,
            title: values.title,
            description: values.Description,
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
        values.Description !== services.description
      ) {
        const formdata = {
          id: services.id,
          title: values.title,
          description: values.Description,
        };
        // function call
        await update(formdata);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" name="id" value={services.id} />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Service Title" {...field} />
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
                {services.image ? (
                  <div className="relative col-span-12">
                    <Image
                      src={services.image}
                      alt={services.title}
                      className="object-fit h-40 w-auto mx-auto"
                      height={500}
                      width={500}
                      quality={100}
                    />
                  </div>
                ) : (
                  <div className="relative col-span-12 grid h-40 w-auto justify-center">
                    <p className=" mx-auto place-self-center">
                      Upload the image
                    </p>
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

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <RichTextEditor placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdateServicesForm;
