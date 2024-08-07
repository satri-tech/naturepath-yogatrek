import React from "react";
import Breadcrumbs from "../breadcrumbs";
import Menu from "./menu";
import User from "./User";
import PageWrapper from "../PageWrapper";
import ThemeToggle from "@/components/ui/themeToggle";

const Navbar = () => {
  return (
    <PageWrapper>
      <nav className="sticky top-0 flex flex-row py-3 justify-between h-[10%] shadow-sm dark:bg-black/95">
        <div className="flex gap-4 flex-1 items-center ">
          <span className="md:hidden flex">
            <Menu />
          </span>
          <Breadcrumbs />
        </div>

        <div className=" flex gap-3 items-center">
          <ThemeToggle />
          <User />
        </div>
      </nav>
    </PageWrapper>
  );
};

export default Navbar;
