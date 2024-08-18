"use client";
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./button";

export default function DeletePopover({
  children,
  text,
  deleteFn,
}: {
  children: ReactNode;
  text: string;
  deleteFn: () => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-[100] max-w-md max-h-[95%] flex justify-center bg-wh p-5 lg:p-6 flex-col gap-4 bg-white dark:bg-black-dark">
          <span className={` font-semibold lg:text-lg text-yoga-red`}>
            Delete {text}
          </span>
          <div className=" flex flex-col gap-2">
            <p className=" text-black/80 dark:text-gray-400">Do you want to delete the {text}</p>
            <div className=" flex justify-end gap-3 items-center">
              <Dialog.Close>
                <Button variant={"outline"} className=" capitalize">
                  Cancel
                </Button>
              </Dialog.Close>

              <Button variant={"destructive"} onClick={deleteFn}>
                Yes, delete!
              </Button>
            </div>
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <Dialog.Close asChild>
              <button className="p-1 text-black/50 dark:text-white/50 dark:hover:text-white/65 dark:bg-black/65 hover:text-black/60 rounded-md bg-white">
                <X size={22} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
