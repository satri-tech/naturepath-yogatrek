"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger } from "./popover";
import { PopoverContent } from "@radix-ui/react-popover";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ImagePopover({
  children,
  images,
}: {
  children: ReactNode;
  images: File;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.clientWidth);
      console.log(imageRef.current.clientWidth);
    }
  }, [imageRef]);

   useEffect(() => {
     if (imageRef.current) {
       setImageWidth(imageRef.current.clientWidth);
       console.log(imageRef.current.clientWidth);
     }
   }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 h-screen rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-h-[300px]  md:max-h-[400px] xl:max-h-[500px] flex items-center justify-center bg-wh p-4 lg:p-5">
          <Image
            src={URL.createObjectURL(images)}
            alt={images.name}
            className="h-full rounded-md mx-auto object-contain"
            // height={500}
            // width={500}
            ref={imageRef}
            fill
            quality={100}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <Dialog.Close asChild>
              <button className="p-1 text-black/50 hover:text-black/60 rounded-md bg-white">
                <X size={22} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
