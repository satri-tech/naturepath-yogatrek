'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MenulistType } from '@/utils/types/MenuListTypes';

const MenuItem = ({list}:{list:MenulistType}) => {
    const pathname = usePathname()

 function isActive( href: string){
    return pathname === href;
  };

    return (
        <Link
            href={list.href}
            key={`${list.name}-${list.id}`}
            className={`text-sm font-medium text-gray-700 py-2 px-2 ${isActive(list.href) ? 'bg-primary text-white' : 'text-primary'}  hover:bg-primary hover:text-white  rounded-md transition duration-300 ease-in-out flex gap-2 items-center`}
        >
            {list.icons}
            <span className="">{list.name}</span>
        </Link>
    )
}

export default MenuItem
