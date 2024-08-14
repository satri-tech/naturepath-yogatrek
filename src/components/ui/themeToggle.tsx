"use client";
import { log } from "handlebars";
import { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className=" hover:bg-gray-200 dark:hover:bg-gray-600 text-black/85 dark:text-text-dark relative flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-dark rounded-full focus:outline-none gap-4"
    >
      <div
        className={`absolute w-8 h-8 top-1/2 left-2  z-0  rounded-full shadow-md transform transition-transform dark:translate-x-[calc(100%_+_4px)] translate-x-0 -translate-y-1/2 dark:bg-black/90 bg-white duration-300 ease-in-out`}
      ></div>

      <IoMdSunny
        className={`w-6 h-6 shrink-0 text-yellow-500 relative z-10`}
      />
      <BsMoonStarsFill
        className={`w-5 h-5 shrink-0 dark:text-gray-200 text-black/40  relative z-10`}
      />
    </button>
  );
};

export default ThemeToggle;
