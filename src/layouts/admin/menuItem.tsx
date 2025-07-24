'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MenulistType } from '@/utils/types/MenuListTypes';

const MenuItem = ({ list }: { list: MenulistType }) => {
    const pathname = usePathname()

    function isActive(href: string) {
        return pathname === href;
    };

    const activeStyles = isActive(list.href)
        ? 'bg-primary text-white dark:bg-primary dark:text-white'
        : 'text-gray-700 dark:text-gray-300';

    return (
        <Link
            href={list.href}
            key={`${list.name}-${list.id}`}
            className={`text-sm font-medium py-2 px-2 ${activeStyles} hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition duration-300 ease-in-out flex gap-2 items-center`}
        >
            {list.icons}
            <span>{list.name}</span>
        </Link>
    )
}

export default MenuItem
