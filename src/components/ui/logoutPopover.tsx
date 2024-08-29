"use client";
import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

export default function LogoutPopover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`flex items-center gap-2 w-full ${className}`}
        >
          {children}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[200]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-[300] max-w-md max-h-[95%] flex justify-center bg-wh p-5 lg:p-6 flex-col gap-4 bg-white dark:bg-black-dark">
          <span className={` font-semibold lg:text-lg text-yoga-red`}>
            Logout!
          </span>
          <div className=" flex flex-col gap-2">
            <p className=" text-black/80">Are you sure, you want to log out!</p>
            <div className=" flex justify-end gap-3 items-center">
              <Dialog.Close>
                <Button variant={"outline"} className=" capitalize">
                  Cancel
                </Button>
              </Dialog.Close>

              <Link href={"/api/auth/signout"}>
                <Button variant={"destructive"}>Yes, LogOut!</Button>
              </Link>
            </div>
          </div>

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
