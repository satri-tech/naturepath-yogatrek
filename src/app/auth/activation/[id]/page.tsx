import { activateUser } from '@/lib/actions.ts/authAction';
import React from 'react'

const ActivationPage = async ({params}:{params:{id:string}}) => {


  const result = await activateUser(params.id)

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {result === "userNotExist"? <p className='text-xl text-red-700'>Account doesnt doesnot exist</p>:
      result==="alreadyActivated" ? <p className='text-xl text-red-700'>Account was already activated </p>:
      <p className='text-xl text-emerald-700 '>Your account has been activated </p>
      }

    </div>
  )
}

export default ActivationPage;
