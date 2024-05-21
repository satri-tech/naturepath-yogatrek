import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/lib/actions.ts/authAction'
import { verifyJwt } from '@/lib/jwt';
import Link from 'next/link';

import React from 'react'

const ResetPasswordPage = async({params}:{params:{id:string}}) => {
const payload= verifyJwt(params.id);
if(!payload)
  return(
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
    <div className="container px-6 mx-auto">
      <div className="flex flex-col text-center h-screen justify-evenly ">
        <div className="max-w-md  mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">Reset password</h1>
           <p className='text-2xl text-red-600'>The URL is not valid!</p> 
           <Link href="/auth/forget-password"><Button variant={"default"} >Get Reset link </Button></Link>
        </div>
      </div>
    </div>
  </div>
)
  

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center h-screen justify-evenly ">
          <div className="max-w-md  mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <ResetPasswordForm jwtUserId={params.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
