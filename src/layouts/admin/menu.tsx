import { AlignLeft, ClipboardList, Layers3, LayoutDashboard, LibraryBig, List, NotebookPen, Slack, Users } from 'lucide-react';
import React, { ReactElement } from 'react'
import MenuItem from './menuItem';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenulistType } from '@/utils/types/MenuListTypes';




export const MenuList:MenulistType[]=[
    {
        id:1,
        href:"/admin",
        name:"Dashboard",
        icons:<LayoutDashboard/>
    },
    {
        id:2,
        href:"/admin/services",
        name:"Services",
        icons:<List />
    },
    {
        id:2,
        href:"/admin/packages",
        name:"Packages",
        icons:<ClipboardList/>
    },
    {
        id:3,
        href:"/admin/bookings",
        name:"Bookings",
        icons:<NotebookPen/>
    },
    {
        id:4,
        href:"/admin/sitepage",
        name:"Site Pages",
        icons:<Slack />
    },
    {
        id:5,
        href:"/admin/blog",
        name:"Blog",
        icons:<LibraryBig />
    },
    {
        id:6,
        href:"/admin/team",
        name:"Team",
        icons:<Users />
    },
    {
        id:7,
        href:"/admin/user",
        name:"Users",
        icons:<Users />
    },
]

const Menu = async() => {
    return (
      <>
        <div className="md:space-y-10 mt-5">
          <div id="menu" className="md:flex flex-col space-y-2 hidden">
            {MenuList.map(async (list) => (
              <MenuItem key={`${list.id}-${list.name}`} list={list} />
            ))}
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <AlignLeft className="md:hidden cursor-pointer dark:text-text-dark" />
          </SheetTrigger>
          <SheetContent side={"left"} className="max-w-60 p-0">
            <div className="h-screen ">
              <h1 className="font-bold text-sm md:text-xl text-center place-self-center text-primary border-b border-secondary h-[10%] md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out pt-4">
                ERS<span className="text-secondary">.</span>
              </h1>
              <div
                id="sidebar"
                className="bg-white dark:bg-black-dark  md:block shadow-xl px-3 w-30 h-[90%] md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
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
}

export default Menu
