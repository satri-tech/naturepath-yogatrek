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
import {useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { PagesFormSchema } from "@/utils/validation/admin/PagesFormValidation";
import { useSession } from "next-auth/react";

const CreatePageForm = () => {
  const session = useSession();
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const form = useForm<z.infer<typeof PagesFormSchema>>({
    resolver: zodResolver(PagesFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof PagesFormSchema>) {
    console.log("form data",values)
    if(images){
      const res = await UploadCloudinary(images)
      if(res.url){
          try{
            const formdata= {
              "title": values.title,
              "slug": values.slug,
              "image":res.url,
              "sections":{create:values.sections}
            }
            const jsonData = JSON.stringify(formdata)

            const response = await fetch("/api/meta/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization :`bearer ${session.data?.user.accessToken}`
              },  
              body: jsonData,
            });
            const data = await response.json();
            // revalidateTag("ServiceCollection")
            form.reset();

            if(data && data.success){
              form.reset();
              setImages(null);
            }


          }catch(err){
              console.log(err);
          } 
      }
      if(res.error){
          setImageError(res.error);
      }
  }else{
      setImageError("Upload the Image");
  }
    // if (images) {
    //   const res = await UploadCloudinary(images);
    //   if (res.url) {
    //     console.log(res.url);
    //     console.log(values);
    //     form.reset();
    //     setImages(null);
    //   }
    //   if (res.error) {
    //     setImageError(res.error);
    //   }
    // } else {
    //   setImageError("Upload the Image");
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
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
          control={form.control}
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
        </FormItem>

        <FormItem >
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
            <div key={item.id} className="grid gap-2 my-2" >
              <FormField
                control={form.control}
                name={`sections.${index}.title`}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Section Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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

        {/* <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <RichTextEditor placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreatePageForm;
