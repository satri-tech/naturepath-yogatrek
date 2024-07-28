import React from 'react'
import Breadcrumbs from '../breadcrumbs'
import Menu from './menu'
import User from './User'

const Navbar = () => {
    return (
        <nav className='sticky top-0 flex flex-row px-4 md:px-5 py-2 justify-between h-[10%] shadow-sm'>
            <div className='flex gap-4 flex-1 items-center '>
                <span className='md:hidden flex'><Menu/></span>
                <Breadcrumbs />
            </div>
           <User/>
        </nav>
    )
}

export default Navbar
