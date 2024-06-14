import React from 'react'
import Breadcrumbs from '../breadcrumbs'
import Menu from './menu'
import User from './User'

const Navbar = () => {
    return (
        <nav className='sticky top-0 bg-slate-900 text-white flex flex-row px-2 py-2 justify-between h-[10%] shadow-sm'>
            <div className='flex gap-2 flex-1 items-center '>
                <span className='md:hidden flex'><Menu/></span>
                <Breadcrumbs />
            </div>
           <User/>
        </nav>
    )
}

export default Navbar
