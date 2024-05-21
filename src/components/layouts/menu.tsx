import { AlignLeft, ClipboardList, Layers3, LayoutDashboard, NotebookPen } from 'lucide-react';
import React, { ReactElement } from 'react'
import MenuItem from './menuItem';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';


interface MenulistType{
    id:number;
    href:string;
    icons:ReactElement;
    name:string;
}

export const MenuList:MenulistType[]=[
    {
        id:1,
        href:"/admin",
        name:"Dashboard",
        icons:<LayoutDashboard/>
    },
    {
        id:2,
        href:"/admin/expense",
        name:"Expenses",
        icons:<ClipboardList/>
    },
    {
        id:3,
        href:"/admin/add-expense",
        name:"Add Expenses",
        icons:<NotebookPen/>
    },
    {
        id:4,
        href:"/admin/category",
        name:"Category",
        icons:<Layers3/>
    },
]

const Menu = async() => {
    return (
        <>
        <div className="md:space-y-10 mt-5">
            <div id="menu" className="md:flex flex-col space-y-2 hidden">
                {MenuList.map(async (list)=>(
                    <MenuItem key={`${list.id}-${list.name}`} list={list}/>
                ))}
            </div>
        </div>
        <Sheet >
            <SheetTrigger asChild>
                <AlignLeft className='md:hidden' />
            </SheetTrigger>
            <SheetContent side={'left'} className='max-w-60 p-0'>
                <div className='h-screen '>
                    <h1 className="font-bold text-sm md:text-xl text-center place-self-center text-primary border-b border-secondary h-[10%] md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out pt-4">
                        ERS<span className="text-secondary">.</span>
                    </h1>
                    <div
                        id="sidebar"
                        className="bg-white  md:block shadow-xl px-3 w-30 h-[90%] md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
                    >
                        <div className="space-y-6 md:space-y-10 mt-5">
                            <div id="menu" className="flex flex-col space-y-2">
                                {MenuList.map((list) => (
                                    <SheetClose asChild key={`${list.name}-${list.id}`}>
                                       <MenuItem list={list}/>
                                    </SheetClose>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
        </>

    )
}

export default Menu
