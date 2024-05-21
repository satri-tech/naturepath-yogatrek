// import { categorySchema } from '@/lib/Validation/CategoryFormValidation'
// import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import * as yup from "yup";
import { Input } from '../ui/input';
const CategoryForm = () => {
    // const {
    //     register,
    //     handleSubmit,
    //     setValue: setFormValue,
    //     watch,
    //     trigger,
    //     formState: { errors },
    // } = useForm<yup.InferType<typeof categorySchema>>(
    //     {
    //         resolver: yupResolver(categorySchema),
    //         mode: "onBlur"
    //     }
    // )

    // const onSubmit: SubmitHandler<yup.InferType<typeof categorySchema>> = (data) => console.log(data)
  return (
//     <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col '>
//         <input type='hidden' name={"uid"}  value={"1"} />
//     <div className='flex flex-col gap-3 mb-2'>
//         <label htmlFor='title' className='text-base font-medium'>Title:</label>
//         <Input type='text' placeholder='medicine' {...register("title")} className={`'w-full ${errors.title ? ' ring-2 ring-red-500 ring-offset-2' : ''}`} aria-invalid={errors.title ? "true" : "false"} />
//         {errors.title && <span className='text-red-500 text-sm '>{errors.title?.message}</span>}
//     </div>

//     <input type="submit" />
// </form>
<h1>form</h1>
  )
}

export default CategoryForm
