"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LayoutDashboard } from "lucide-react";

const User = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user ? (
        <div className="flex gap-4 flex-1 items-center justify-end">
          <DropdownMenu>
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
            <DropdownMenuContent>
              <DropdownMenuItem className=" flex items-start gap-2 cursor-default">
                <Image
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                  alt=""
                  width={100}
                  height={100}
                  quality={100}
                  className="rounded-full w-10 h-10 object-cover "
                />
                <span className=" font-semibold text-black/90">
                  {session?.user?.firstName} {session?.user?.lastName}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className=" flex items-center gap-2">
                <Link href={"/"} className=" flex items-center gap-2">
                  <Home className=" w-5 h-5" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/admin"} className=" flex items-center gap-2">
                  <LayoutDashboard className=" w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="  bg-yoga-red/10 text-yoga-red hover:!text-yoga-red hover:!bg-yoga-red/20">
                <Link
                  href={"/api/auth/signout"}
                  className="flex items-center gap-2"
                >
                  <LogOut className=" w-5 h-5" />
                  <span>Logout</span>
                </Link>
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
