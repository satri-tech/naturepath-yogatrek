"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/themeToggle";
import User from "../admin/User";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const Menus = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Booking", url: "/booking" },
  { id: 4, name: "Service", url: "/packages" },
  { id: 5, name: "Gallery", url: "/gallery" },
  { id: 6, name: "Trekking Tips", url: "/trekking-tips" },
  { id: 7, name: "Contact Us", url: "/contact" },
];

const Menu = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <ul className="hidden xl:flex items-center gap-5 font-medium dark:text-white">
      {Menus.map((item) => (
        <li key={item.id}>
          <Link
            href={item.url}
            className={`px-3 py-2 rounded-md transition-colors duration-300 ${pathname === item.url
              ? "text-primary dark:bg-black-dark bg-white"
              : "hover:text-primary hover:bg-white hover:dark:bg-black-dark"
              }`}
          >
            {item.name}
          </Link>
        </li>
      ))}

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {session?.user ? (
          <User />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/signin">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </ul>
  );
};

export default Menu;
