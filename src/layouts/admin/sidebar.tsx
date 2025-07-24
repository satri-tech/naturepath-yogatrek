import React from "react";
import Menu from "./menu";

const Sidebar = () => {
  return (
    <div className="h-screen dark:!bg-black-dark md:block hidden shadow-md">
      <h1 className="font-bold text-sm md:text-xl  place-self-center dark:text-neutral-50 text-neutral-900 border-b border-neutral-700 md:block px-3 pb-5 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out pt-4 ">
        ADMIN PANEL
      </h1>
      <div
        id="sidebar"
        className="dark:bg-black-dark  md:block px-3 w-30 h-[90%] md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-200 ease-in-out shadow-md"
      >
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
