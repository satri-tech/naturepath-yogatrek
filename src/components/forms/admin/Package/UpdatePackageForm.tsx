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
import { Package, Service } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";


interface UpdateFormTypes{
  id:string,
  title?:string,
  slug?:string,
  serviceId?:string,
  sharedprice?:string,
  privateprice?:string,
  sharedOfferPrice?:string,
  privateOfferPrice?:string,
  duration?:string,
  highlights?:string ,
  description?:string,
  itinerary?:string,
  costInclusion?:string ,
  costExclusion?:string ,
  gallery?:string[],
}

const UpdatePackageForm = ({
  packages,
  service,
}: {
  packages: Package;
  service: Service[];
}) => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const [resource, setResource] = useState<string[]>(packages.gallery);

  const session = useSession();

  const removeImage = (url: string) => {
    setResource((prevRes) => {
      const newResources = prevRes.filter((resourceUrl) => resourceUrl !== url);
      return newResources;
    });
  };

  const form = useForm({
    resolver: zodResolver(PackageFormSchema),
    defaultValues: {
      title: packages.title,
      slug: packages.slug,
      serviceId: packages.serviceId,
      sharedprice: packages.SharingPrice,
      privateprice: packages.PrivatePrice,
      sharedOfferPrice: packages.SharingOffer ?? "",
      privateOfferPrice: packages.PrivateOffer ?? "",
      duration: packages.Duration,
      highlights: packages.highlights ?? "",
      description: packages.description,
      itinerary: packages.description,
      costInclusion: packages.costInclusion ?? "",
      costExclusion: packages.costExclusion ?? "",
    },
  });

  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError("");
      const _files = Array.from(e.target.files);
      setImages(_files[0]);
    }
  };

  const generateSlug = () => {
    const title = form.watch("title");

    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove non-word characters
        .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
      form.setValue("slug", slug);
    }
  };

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/package/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${session.data?.user.accessToken}`,
        },

        body: jsonData,
      });
      const data = await response.json();
      revalidateTag(`Package-${packages.id}`);
      revalidateTag("PackageCollection");
      form.reset();

      if (data && data.success) {
        form.reset();
        setImages(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values: z.infer<typeof PackageFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        if (
          values.title !== packages.title ||
          values.slug !== packages.slug ||
          values.duration !== packages.Duration ||
          values.serviceId !== packages.serviceId ||
          values.sharedprice !== packages.SharingPrice ||
          values.sharedOfferPrice !== packages.SharingOffer ||
          values.privateprice !== packages.PrivatePrice ||
          values.privateOfferPrice !== packages.PrivateOffer ||
          values.highlights !== packages.highlights ||
          values.description !== packages.description ||
          values.itinerary !== packages.itinerary ||
          values.costInclusion !== packages.costInclusion ||
          values.costExclusion !== packages.costExclusion ||
          resource !== packages.gallery
        ) {
          const formdata = {
            id: packages.id,
            title: values.title,
            slug: values.slug,
            image: res.url,
            SharingPrice: values.sharedprice,
            PrivatePrice: values.privateprice,
            SharingOffer: values.sharedOfferPrice,
            PrivateOffer: values.privateOfferPrice,
            Duration: values.duration,
            serviceId: values.serviceId,
            highlights: values.highlights,
            description: values.description,
            itinerary: values.itinerary,
            costInclusion: values.costInclusion,
            costExclusion: values.costExclusion,
            gallery: resource,
          };

          await update(formdata);
        } else {
          const formdata = {
            id: packages.id,
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
        values.title !== packages.title ||
        values.slug !== packages.slug ||
        values.duration !== packages.Duration ||
        values.serviceId !== packages.serviceId ||
        values.sharedprice !== packages.SharingPrice ||
        values.sharedOfferPrice !== packages.SharingOffer ||
        values.privateprice !== packages.PrivatePrice ||
        values.privateOfferPrice !== packages.PrivateOffer ||
        values.highlights !== packages.highlights ||
        values.description !== packages.description ||
        values.itinerary !== packages.itinerary ||
        values.costInclusion !== packages.costInclusion ||
        values.costExclusion !== packages.costExclusion ||
        resource !== packages.gallery
      ) {
        const formdata = {
          id: packages.id,
          title: values.title,
          slug: values.slug,
          SharingPrice: values.sharedprice,
          PrivatePrice: values.privateprice,
          SharingOffer: values.sharedOfferPrice,
          PrivateOffer: values.privateOfferPrice,
          Duration: values.duration,
          serviceId: values.serviceId,
          highlights: values.highlights,
          description: values.description,
          itinerary: values.itinerary,
          costInclusion: values.costInclusion,
          costExclusion: values.costExclusion,
          gallery: resource,
        };
        // function call
        await update(formdata);
      }
    }
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
                <Input type="text" placeholder="Service Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 items-end gap-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="space-y-0 col-span-8 justify-items-end">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="col-span-4 "
            onClick={(e) => {
              e.preventDefault();
              generateSlug();
            }}
          >
            Generate
          </Button>
        </div>

        <div className="grid md:grid-cols-2  items-end justify-between gap-2">
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {service &&
                        service.map((item: Service) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="space-y-0 ">
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="3D/2N" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="sharedprice"
            render={({ field }) => (
              <FormItem className="space-y-0 ">
                <FormLabel>Shared Price</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="$ 200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privateprice"
            render={({ field }) => (
              <FormItem className="space-y-0 ">
                <FormLabel>Private Price</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="$ 200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="sharedOfferPrice"
            render={({ field }) => (
              <FormItem className="space-y-0 ">
                <FormLabel>Shared Offer</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="$ 200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privateOfferPrice"
            render={({ field }) => (
              <FormItem className="space-y-0 ">
                <FormLabel>Private Offer</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="$ 200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                {packages.image ? (
                  <div className="relative col-span-12">
                    <Image
                      src={packages.image}
                      alt={packages.title}
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
          name="highlights"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Highlights</FormLabel>
              <FormControl>
                <RichTextEditor placeholder="Highlights" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  {...field}
                  //   onChange={(value) => field.onChange(value.toString("html"))}
                  placeholder="Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itinerary"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Itinerary</FormLabel>
              <FormControl>
                <RichTextEditor placeholder="Itinerary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="costInclusion"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Cost Inclusion</FormLabel>
              <FormControl>
                <RichTextEditor placeholder="Cost Inclusion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="costExclusion"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Cost Exclusion</FormLabel>
              <FormControl>
                <RichTextEditor placeholder="Cost Exclusion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-2">
          <FormLabel>Gallery Images</FormLabel>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
            onSuccess={(result, { widget }) => {
              const results = result as any;
              setResource((prevRes) => [
                ...prevRes,
                results?.info?.url as string,
              ]);
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnClick();
                  }}
                >
                  Upload Image
                </Button>
              );
            }}
          </CldUploadWidget>
          <div className="grid grid-cols-12 gap-2 my-2 border border-black rounded-md ">
            {resource ? (
              <>
                <div className="relative col-span-12 grid sm:grid-cols-2 md:grid-cols-3">
                  {resource.map((img, index) => (
                    <div className="relative col-span-1" key={index}>
                      <Image
                        src={img}
                        alt="uploadsimage"
                        width={500}
                        height={500}
                        quality={80}
                        className="col-span-1 relative"
                      />
                      <span
                        className="absolute top-0.5 right-0.5 cursor-pointer hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage(img);
                        }}
                      >
                        <Trash2 size={14} />
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="relative col-span-12 grid h-40 w-auto justify-center">
                <p className=" mx-auto place-self-center">Upload the image</p>
              </div>
            )}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdatePackageForm;
