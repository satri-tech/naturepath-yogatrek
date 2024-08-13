"use client";
import React from "react";
import Image from "next/image";
import { Input } from "./input";
import { Pencil, Trash2, X } from "lucide-react";
import ImagePopover from "./imagePopover";

interface UploadImageFieldProps {
  images: File | null;
  handleChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageerror: string;
  handleRemoveImage: () => void;
  handleClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageField = React.forwardRef<
  HTMLInputElement,
  UploadImageFieldProps
>(
  (
    { images, handleChangeFunc, imageerror, handleRemoveImage, handleChange ,handleClick },
    ref
  ) => {
    return (
      <>
        <div className="flex items-center justify-center gap-2 my-2 border border-slate-200 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:focus-visible:ring-slate-300 rounded-md relative ">
          {images ? (
            <>
              <div className=" w-fit" key={images.name}>
                <ImagePopover
                  images={images}
                  handleRemoveImage={handleRemoveImage}
                >
                  <div className=" relative">
                    <Image
                      src={URL.createObjectURL(images)}
                      alt={images.name}
                      className="object-fit h-40 w-40 mx-auto cursor-pointer rounded-md"
                      height={500}
                      width={500}
                      quality={100}
                    />

                    <div className="absolute top-1 right-1 flex items-center gap-1">
                      <span
                        className="inline-block  p-1.5 cursor-pointer z-30 bg-white text-yoga-red rounded-md"
                        onClick={() => {
                          handleRemoveImage();
                        }}
                      >
                        <Trash2 size={14} />
                      </span>

                      <span
                        className="inline-block p-1.5 cursor-pointer z-30 bg-white text-yoga-red rounded-md"
                        onClick={() => {
                          handleRemoveImage();
                          handleClick();
                        }}
                      >
                        <Pencil size={14} />
                      </span>
                    </div>
                  </div>
                </ImagePopover>
              </div>
            </>
          ) : (
            <div className="relative col-span-12 grid h-40 w-auto justify-center cursor-pointer">
              <p className="mx-auto place-self-center dark:text-text-dark/75">
                Upload the image
              </p>
            </div>
          )}

          <div
            className={`flex flex-1 justify-between absolute left-0 right-0 bottom-0 top-0 ${images ? "-z-10" : "z-10"} cursor-pointer`}
          >
            <Input
              type="file"
              ref={ref}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                handleChange(e);
                handleChangeFunc(e);
              }}
              className="block w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        {imageerror && <p className="text-red-700">{imageerror}</p>}
      </>
    );
  }
);

UploadImageField.displayName = "UploadImageField"; // For debugging in React DevTools

export default UploadImageField;
