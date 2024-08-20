import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LucideMenu, User } from "lucide-react";
// import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import Link from "next/link";
import { Menus } from "./Menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";

const MobileMenu = () => {
  return (
    <div className="inline-block min-[900px]:hidden">
      <Sheet>
        <div className=" flex gap-3 items-center">
          <ThemeToggle />
          <SheetTrigger asChild>
            <div className=" cursor-pointer p-2 rounded-sm dark:text-white">
              <LucideMenu />
            </div>
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex flex-col items-center justify-center"></SheetTitle>
            <SheetDescription className="flex flex-col w-full gap-5">
              <>
                <div className="flex flex-col items-center justify-center w-full max-w-full">
                  <SheetClose asChild>
                    <Link href="/profile" className="w-full p-4 text-lg">
                      Profile
                    </Link>
                  </SheetClose>
                </div>
              </>
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col  w-full">
            {Menus.map((item) => (
              <SheetClose asChild key={item.id}>
                <Link
                  href={item.url}
                  className="w-full  flex p-2 text-lg hover:text-primary transition-all duration-200"
                >
                  {item.name}
                </Link>
              </SheetClose>
            ))}
          </div>
          {/* <SheetFooter className='flex gap-4 flex-col mt-10'>
          <SheetClose asChild>
            <Button >Sign in</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button >Sign up</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button >Sign Out</Button>
          </SheetClose>
        </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
