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
import RichTextEditor from "../../FormElements/RichTextEditor";
import Image from "next/image";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { AddTeamFormSchema } from "@/utils/validation/admin/TeamFormValidation";

const AddTeamForm = () => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError]= useState<string>("")


  const form = useForm<z.infer<typeof AddTeamFormSchema>>({
    resolver: zodResolver(AddTeamFormSchema),
  });

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      setImageError('')
      const _files = Array.from(e.target.files);
      console.log("files from images", _files[0]);
      setImages(_files[0]);
    }
  };

 async function onSubmit(values: z.infer<typeof AddTeamFormSchema>) {
    if(images){
        const res = await UploadCloudinary(images)
        if(res.url){
            console.log(res.url);
            console.log(values);
            form.reset();
            setImages(null);
        }
        if(res.error){
            setImageError(res.error);
        }
    }else{
        setImageError("Upload the Image");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col gap-2 mb-3 ">
          <FormLabel className="">Profile Picture</FormLabel>
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
                <p className=" mx-auto place-self-center">Upload the Profile Picture</p>
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

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-0">
                <FormLabel>Bio</FormLabel>
              <FormControl>
                <RichTextEditor placeholder="Bio" {...field} />
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

export default AddTeamForm;
