import React from 'react'
import Menu from './menu'

const Sidebar = () => {
    return (

        <div className='h-screen bg-slate-900 md:block hidden'>
            <h1 className="font-bold text-sm md:text-xl text-center place-self-center text-primary border-b border-primary h-[10%] md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out pt-4">
                ADMIN PANEL<span className="text-secondary">.</span>
            </h1>
            <div
                id="sidebar"
                className="bg-slate-900  md:block shadow-xl px-3 w-30 h-[90%] md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-200 ease-in-out"
            >
               <Menu/>
            </div>
        </div>


    )
}

export default Sidebar
