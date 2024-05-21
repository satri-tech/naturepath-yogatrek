import ExpenseForm from '@/components/forms/ExpenseForm'
import React from 'react'

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row gap-4 items-start p-4">
      <div className='md:w-3/6 md:mx-0 max-w-lg mx-auto p-2 md:shadow-md rounded-md '>
        <h1 className='text-lg font-bold tracking-wider text-primary'>Add New Expense</h1>
        <hr className='bg-secondary h-0.5 my-2 w-full' />
        <ExpenseForm />
      </div>
      <div className='md:w-3/6 md:mx-0 max-w-lg mx-auto'>
        <h1 className='text-lg font-bold tracking-wider text-primary'>Recent Expense</h1>
        <hr className='bg-secondary h-0.5 my-2 w-full' />
      </div>
    </div>
  )
}

export default Page
