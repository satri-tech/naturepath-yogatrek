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

import { LucideMenu } from "lucide-react";
// import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import Link from "next/link";
import { Menus } from "./Menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";
import User from "../admin/User";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const { data: session } = useSession();

  return (
    <div className="inline-block xl:hidden">
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
            {session?.user && <User className=" mb-2" />}
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
          {!session?.user && (
            <div className=" flex flex-col items-start gap-2 mt-3">
              <Link href={"/auth/signin"}>
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link href={"/auth/signup"}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
