import {
  AlignLeft,
  ClipboardList,
  Images,
  LayoutDashboard,
  LibraryBig,
  List,
  NotebookPen,
  Slack,
  Users,
} from "lucide-react";
import React from "react";
import MenuItem from "./menuItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenulistType } from "@/utils/types/MenuListTypes";
import { TfiGallery } from "react-icons/tfi";

export const MenuList: MenulistType[] = [
  {
    id: 1,
    href: "/admin",
    name: "Dashboard",
    icons: <LayoutDashboard size={16} />,
  },
  {
    id: 2,
    href: "/admin/services",
    name: "Services",
    icons: <List size={16} />,
  },
  {
    id: 2,
    href: "/admin/packages",
    name: "Packages",
    icons: <ClipboardList size={16} />,
  },
  {
    id: 3,
    href: "/admin/bookings",
    name: "Bookings",
    icons: <NotebookPen size={16} />,
  },
  {
    id: 4,
    href: "/admin/sitepage",
    name: "Site Pages",
    icons: <Slack size={16} />,
  },
  // {
  //   id: 5,
  //   href: "/admin/trekking-tips",
  //   name: "Trekking Tips",
  //   icons: <LibraryBig size={16} />,
  // },
  {
    id: 8,
    href: "/admin/galleries",
    name: "Galleries",
    icons: <Images size={16} />,
  },
  {
    id: 6,
    href: "/admin/team",
    name: "Team",
    icons: <Users size={16} />,
  },
  {
    id: 7,
    href: "/admin/user",
    name: "Users",
    icons: <Users size={16} />,
  },
];

const Menu = async () => {
  return (
    <>
      <div className="md:space-y-10 mt-5 dark:!bg-black-dark">
        <div
          id="menu"
          className="md:flex flex-col space-y-2 hidden dark:!bg-black-dark"
        >
          {MenuList.map(async (list) => (
            <MenuItem key={`${list.id}-${list.name}`} list={list} />
          ))}
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <AlignLeft className="md:hidden cursor-pointer dark:text-neutral-50 text-neutral-900" />
        </SheetTrigger>
        <SheetContent side={"left"} className="max-w-60 p-0">
          <div className="h-screen ">
            <h1 className="font-bold text-sm md:text-xl text-center place-self-center dark:text-neutral-50 text-neutral-900 border-b border-primary h-[10%] md:block px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out pt-4">
              ERS<span className="text-secondary">.</span>
            </h1>
            <div
              id="sidebar"
              className=" md:block shadow-xl px-3 w-30 h-[90%] md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
            >
              <div className="space-y-6 md:space-y-10 mt-5">
                <div id="menu" className="flex flex-col space-y-2">
                  {MenuList.map((list) => (
                    <SheetClose asChild key={`${list.name}-${list.id}`}>
                      <MenuItem list={list} />
                    </SheetClose>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Menu;
