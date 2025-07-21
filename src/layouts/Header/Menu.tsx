"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <ul className="hidden xl:flex items-center gap-5 font-medium dark:text-white">
      {Menus.map((item) => (
        <li key={item.id}>
          <Link
            href={item.url}
            className={`px-3 py-2 rounded-md  text-sm ${pathname === item.url
              ? "text-primary  "
              : "hover:text-primary"
              }`}
          >
            {item.name}
          </Link>
        </li>
      ))}


    </ul>
  );
};

export default Menu;
