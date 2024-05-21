import React from 'react'
import Expenses from './@expenses/page'

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col gap-4 items-start p-4">
      
      <h1 className='text-lg font-bold tracking-wider text-primary'>Your Expense</h1>
      <hr className='bg-secondary h-0.5 my-2 w-full' />
        <Expenses/>
    
    </div>
  )
}

export default Page


