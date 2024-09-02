"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, Home, LogOut, UserRoundCog } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import LogoutPopover from "@/components/ui/logoutPopover";

const User = ({
  isInAdmin = false,
  className,
}: {
  isInAdmin?: boolean;
  className?: string;
}) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {session && session.user ? (
        <div className={`lex gap-4 flex-1 items-center ${className}`}>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger>
              <Image
                src="https://randomuser.me/api/portraits/men/20.jpg"
                alt=""
                width={100}
                height={100}
                quality={100}
                className="rounded-full w-10 h-10 object-cover "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={` absolute ${isInAdmin ? "-right-5" : " -right-[175px] min-[900px]:left-auto min-[900px]:-right-5"} top-[calc(100%_+_12px)] z-[100]`}
            >
              <DropdownMenuItem className=" flex gap-2 cursor-default w-full items-center">
                <Image
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                  alt=""
                  width={100}
                  height={100}
                  quality={100}
                  className="rounded-full w-10 h-10 object-cover "
                />
                <span className=" whitespace-nowrap shrink-0 inline-block font-semibold text-black/90 dark:text-white/70">
                  {session?.user?.firstName} {session?.user?.lastName}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className=" flex items-center gap-2 w-full">
                <Link
                  href={"/"}
                  className=" flex items-center gap-2 w-full"
                >
                  <Home className=" w-5 h-5" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full">
                <Link href={"/admin"} className=" flex items-center gap-2 w-full">
                  <LayoutDashboard className=" w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=" flex items-center gap-2 w-full">
                <Link
                  href={"/profile"}
                  className=" flex items-center gap-2 w-full"
                >
                  {session.user.role == "ADMIN" ? (
                    <UserRoundCog />
                  ) : (
                    <CircleUserRound />
                  )}
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="  bg-yoga-red/10 text-yoga-red hover:!text-yoga-red hover:!bg-yoga-red/20 w-full">
                <LogoutPopover>
                  <LogOut className=" w-5 h-5" />
                  <span>Logout</span>
                </LogoutPopover>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default User;
