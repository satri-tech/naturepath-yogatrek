"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";

import { LucideMenu, Moon, Sun, X } from "lucide-react";
// import DropDownUser from "./DropDownUser";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  // const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const pathname = usePathname();
  const [show, setShow] = useState(
    pathname == "/"
      ? "translate-y-0 bg-transparent text-white"
      : "translate-y-0 bg-transparent text-black dark:text-white"
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  // const { setTheme } = useTheme()

  //   const {cartItems}= useSelector((state => state.cart))

  const controlNavbar = () => {
    if (!window.scrollY) {
      if (pathname == "/") setShow("translate-y-0 bg-transparent text-white");
      else setShow("translate-y-0 bg-transparent text-black dark:text-white");
    } else if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px] bg-white dark:!bg-gray-dark");
      } else {
        setShow("shadow-sm bg-white dark:!bg-gray-dark");
      }
    } else {
      setShow("translate-y-0 bg-white text-black dark:text-white dark:!bg-gray-dark");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full h-20 md:h-20 bg-transparent flex items-center z-20 sticky top-0  ease-linear transition-all duration-500 ${show}`}
    >
      <div className=" container h-16 w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src={`/Logo/logo.png`}
            alt="logo"
            width={750}
            height={750}
            quality={100}
            className="h-16 w-auto dark:hidden"
          />
          <Image
            src={`/Logo/logo.png`}
            alt="logo"
            width={750}
            height={750}
            quality={100}
            className="h-16 w-auto hidden dark:block"
          />
        </Link>

        <div className="flex gap-4 items-center">
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
