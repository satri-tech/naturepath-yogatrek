'use client'
import {MenuItem as Menu } from '@/lib/types/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuItem = ({list}:{list:Menu}) => {
    const pathname = usePathname()

 function isActive( href: string){
    return pathname === href;
  };

    return (
        <Link
            href={list.href}
            key={`${list.name}-${list.id}`}
            className={`text-sm font-medium text-gray-700 py-2 px-2 ${isActive(list.href) ? 'bg-primary text-white' : ''}  hover:bg-primary hover:text-white  rounded-md transition duration-700 ease-in-out flex gap-2 items-center`}
        >
            {list.icons}
            <span className="">{list.name}</span>
        </Link>
    )
}

export default MenuItem
