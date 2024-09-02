"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import ThemeToggle from "@/components/ui/themeToggle";
import User from "../admin/User";
import { useSession } from "next-auth/react";

const inter = Inter({
  weight: ["600"],
  style: ["normal"],
  subsets: ["latin"],
});
interface MenuType {
  id: number;
  name: string;
  url: string;
  subMenu?: any[];
}

export const Menus: MenuType[] = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Booking", url: "/booking" },
  { id: 4, name: "Service", url: "/packages" },
  { id: 5, name: "Trekking Tips", url: "/trekking-tips" },
  { id: 6, name: "Contact Us", url: "/contact" },
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }: any) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <ul
      className={`${inter.className} hidden min-[900px]:flex items-center gap-8 font-medium  dark:text-white
`}
    >
      {Menus.map((items) => {
        return (
          <React.Fragment key={items.id}>
            {!!items?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative hover:text-gray font-semibold text-xl"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => {
                  setShowCatMenu(false);
                }}
              >
                {items.name}
                {/* <Icon icon="ic:baseline-keyboard-arrow-down" className="w-8" /> */}
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] p-1 text-black shadow-lg ">
                    {categories?.map(({ attributes: c, id }: any) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                          }}
                        >
                          <li className="h-12 font-semibold flex justify-between items-center px-3 hover:bg-smokeWhite rounded-md text-xl">
                            {c.name}
                            <span className="opacity-50 text-sm">{`(${c.products.data.length})`}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li
                className={`cursor-pointer hover:text-primary ${
                  items.url === pathname ? "text-primary/95" : ""
                }`}
              >
                <Link href={items.url}>{items.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
      <div
        className={` flex items-center ${session?.user.role == "ADMIN" ? "gap-4" : ""}`}
      >
        <ThemeToggle />
        {session?.user.role == "ADMIN" && <User />}
      </div>
    </ul>
  );
};

export default Menu;
