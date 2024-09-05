"use client";
import React from "react";
import Image from "next/image";
import { Input } from "./input";
import { Pencil, Trash2, X } from "lucide-react";
import ImagePopover from "./imagePopover";
import { FormMessage } from "./form";

interface UploadImageMultipleFieldProps {
  images: File[] | null;
  imageerror: string | undefined;
  handleRemoveImage: (indexToRemove: number) => void;
  handleClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageMultipleField = React.forwardRef<
  HTMLInputElement,
  UploadImageMultipleFieldProps
>(
  (
    { images, imageerror, handleRemoveImage, handleChange, handleClick },
    ref
  ) => {
    return (
      <>
        <div className="flex items-center justify-center gap-2 my-2 border border-slate-200 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:focus-visible:ring-slate-300 rounded-md relative ">
          <div className="relative col-span-12 grid h-40 w-auto justify-center cursor-pointer">
            <p className="mx-auto place-self-center dark:text-text-dark/75">
              Upload the images
            </p>
          </div>
          <div
            className={`flex flex-1 justify-between absolute left-0 right-0 bottom-0 top-0 z-10 cursor-pointer`}
          >
            <Input
              type="file"
              ref={ref}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                handleChange(e);
              }}
              multiple={true}
              className="block w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <FormMessage />

        {images && (
          <div className=" flex flex-wrap gap-2">
            {images.map((image, index) => {
              return (
                <div className=" shrink-0 relative" key={index}>
                  <ImagePopover images={image}>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="object-cover object-center h-40 w-40 mx-auto cursor-pointer rounded-md"
                      height={500}
                      width={500}
                      quality={100}
                    />
                  </ImagePopover>
                  <div className="absolute top-1 right-1 flex items-center gap-1">
                    <span
                      className="inline-block  p-1.5 cursor-pointer bg-white text-yoga-red rounded-md"
                      onClick={() => {
                        handleRemoveImage(index);
                      }}
                    >
                      <Trash2 size={14} />
                    </span>

                    <span
                      className="inline-block p-1.5 cursor-pointer bg-white text-yoga-red rounded-md"
                      onClick={() => {
                        handleRemoveImage(index);
                        handleClick();
                      }}
                    >
                      <Pencil size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

UploadImageMultipleField.displayName = "UploadImageMultipleField"; // For debugging in React DevTools

export default UploadImageMultipleField;
