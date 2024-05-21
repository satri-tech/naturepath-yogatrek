'use client'
import React from 'react'
// import { Form, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
// import { yupResolver } from "@hookform/resolvers/yup"
// import { expenseSchema } from '@/lib/Validation/ExpenseFormValidation'
// import * as yup from "yup";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Inputs = {
    title: string
    category: string
    expense_date: string,
    amount: number,
    // invoice: string,
}

const ExpenseForm = () => {
    // const {
    //     register,
    //     handleSubmit,
    //     setValue: setFormValue,
    //     watch,
    //     trigger,
    //     formState: { errors },
    // } = useForm<yup.InferType<typeof expenseSchema>>(
    //     {
    //         resolver: yupResolver(expenseSchema),
    //         mode: "onBlur"
    //     }
    // )

    // const onSubmit: SubmitHandler<yup.InferType<typeof expenseSchema>> = (data) => console.log(data)



    return (
        // <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col '>
        //     <div className='flex flex-col gap-3 mb-2'>
        //         <label htmlFor='title' className='text-base font-medium'>Title:</label>
        //         <Input type='text' placeholder='medicine' {...register("title")} className={`'w-full ${errors.title ? ' ring-2 ring-red-500 ring-offset-2' : ''}`} aria-invalid={errors.title ? "true" : "false"} />
        //         {errors.title && <span className='text-red-500 text-sm '>{errors.title?.message}</span>}
        //     </div>

        //     <div className='grid sm:grid-cols-2 gap-4'>

            

        //     <div className='flex flex-col gap-3 mb-2'>
        //         <label htmlFor='category' className='text-base font-medium'>Category:</label>
        //         <Select onValueChange={(value) => {
        //             setFormValue("category", value);
        //         }} {...register("category")} >
        //             <SelectTrigger className={`w-full ${errors.category ? ' ring-2 ring-red-500 ring-offset-2' : ''}`} aria-invalid={errors.category ? "true" : "false"} onBlur={()=>trigger('category')}>
        //                 <SelectValue placeholder="Select a fruit"  />
        //             </SelectTrigger>
        //             <SelectContent>
        //                 <SelectGroup>
        //                     <SelectItem value="apple">Apple</SelectItem>
        //                     <SelectItem value="banana">Banana</SelectItem>
        //                     <SelectItem value="blueberry">Blueberry</SelectItem>
        //                     <SelectItem value="grapes">Grapes</SelectItem>
        //                     <SelectItem value="pineapple">Pineapple</SelectItem>
        //                 </SelectGroup>
        //             </SelectContent>
        //         </Select>
        //         {errors.category && <span className='text-red-500 text-sm '>{errors.category?.message}</span>}
        //     </div>

        //     <div className='flex flex-col gap-3 mb-2'>
        //         <label htmlFor='expense_date' className='text-base font-medium'>Date:</label>
        //         <Input type='date' {...register("expense_date")} className={`'w-full ${errors.expense_date ? ' ring-2 ring-red-500 ring-offset-2' : ''}`} aria-invalid={errors.expense_date ? "true" : "false"} />
        //         {errors.expense_date && <span className='text-red-500 text-sm '>{errors.expense_date?.message}</span>}
        //     </div>
        //     </div>
        //     <div className='flex flex-col gap-3 mb-2'>
        //         <label htmlFor='amount' className='text-base font-medium'>Amount:</label>
        //         <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} className={`'w-full ${errors.amount ? ' ring-2 ring-red-500 ring-offset-2' : ''}`} aria-invalid={errors.amount ? "true" : "false"} />
        //         {errors.amount && <span className='text-red-500 text-sm '>{errors.amount?.message}</span>}
        //     </div>

        //     <div className='flex flex-col gap-3 mb-2'>
        //         <label htmlFor='amount' className='text-base font-medium'>Invoice:</label>
        //         <Input type='file' className={`'w-full `} />
        //         {/* {errors.invoice && <span className='text-red-500 text-sm '>{errors.invoice?.message}</span>} */}
        //     </div>





        //     <input type="submit" />
        // </form>
        <h1>form</h1>
    )
}

export default ExpenseForm


