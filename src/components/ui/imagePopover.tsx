import React, { ReactNode } from "react";
import { Popover, PopoverTrigger } from "./popover";
import { PopoverContent } from "@radix-ui/react-popover";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ImagePopover({
  children,
  images,
  handleRemoveImage,
}: {
  children: ReactNode;
  images: File;
  handleRemoveImage: () => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 h-screen p-6 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-h-[500px] flex items-center justify-center">
          <Image
            src={URL.createObjectURL(images)}
            alt={images.name}
            className="h-[80%]  rounded-md mx-auto cursor-pointer object-cover object-center w-[90%] rounded-md"
            // height={500}
            // width={500}
            fill
            quality={100}
          />
          <div className="absolute top-5 right-5 flex flex-col gap-1 items-end">
            <Dialog.Close asChild>
              <button className="p-1 text-gray-200 hover:text-gray-300">
                <X size={30} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
