'use client'
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "../ui/button";


import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const DropDownUser = () => {

  const { data: session } = useSession()

  return (

    <div className="hidden min-[900px]:inline-block">
      {session && session.user ?
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-2 border-4 flex items-center border-Primary rounded-full cursor-pointer">
              <User className="text-Primary md:h-7 md:w-7 h-5 w-5 " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Link href='/dashboard' className="w-full">Dashboard</Link> </DropdownMenuItem>
            <DropdownMenuItem>

              {/* <Link href='/signin' className="w-full">Sign Out</Link> */}
              <form action={async () => {

                await signOut();
              }}>
                <button type="submit" className="relative flex cursor-pointer select-none items-center rounded-sm  text-sm outline-none transition-colors focus:bg-Primary focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-Secondary dark:focus:text-black">Sign Out</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        :
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-2 border-4 flex items-center border-Primary rounded-full cursor-pointer">
              <User className="text-Primary md:h-7 md:w-7 h-5 w-5 " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <form action={async () => {
                await signIn();
              }}>
                <button type="submit" className="relative flex cursor-pointer select-none items-center rounded-sm  text-sm outline-none transition-colors focus:bg-Primary focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-Secondary dark:focus:text-black">Sign In</button>
              </form>
              {/* <Link href='/signin' className="w-full">Sign Up</Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem><Link href='/signup' className="w-full">Sign Up</Link> </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  );
};

export default DropDownUser;
