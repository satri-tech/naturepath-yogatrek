"use client";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import ActionsButtons from "./ActionsButtons";

const Navbar = () => {
  return (
    <nav
      className={`w-full h-20 md:h-20  flex items-center justify-center z-20 sticky  top-0    bg-bakcgroundLight dark:bg-backgroundDark  text-black`}
    >
      <div className=" w-[95%] h-16 flex justify-between items-center ">
        <Link href="/" className="text-3xl font-semibold ">
          <Image
            src={`/Logo/logo.png`}
            alt="logo"
            width={750}
            height={750}
            quality={100}
            className="h-10 w-auto "
          />

        </Link>

        <div className="flex gap-4 items-center">
          <Menu />
          <MobileMenu />
        </div>
        <ActionsButtons />
      </div>
    </nav>
  );
};

export default Navbar;
