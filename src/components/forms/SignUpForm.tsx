import { registerNewUser, registerUser } from '@/lib/actions.ts/authAction';
import { LogIn, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';

const SignUpForm = () => {
  const [errorMessage, dispatch] = useFormState(registerNewUser, undefined);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch} className="w-full">
      <div
        className="flex h-6 items-end justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <div id="input" className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full my-5">
        <div className='flex flex-col w-full'>
        <label className="text-gray-500 mb-2 text-left">First name</label>
        <input
          type="text"
          id="text"
          name="firstName"
          placeholder="John"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
        />
        </div>
        <div className='flex flex-col'>

        <label className="text-gray-500 mb-2 text-left">Last name</label>
        <input
          type="text"
          id="text"
          name="lastName"
          placeholder="Doe"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
        />
        </div>
      </div>
      <div id="input" className="flex flex-col w-full my-5">
        <label className="text-gray-500 mb-2 text-left">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Please insert your email"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
        />
      </div>
      <div id="input" className="flex flex-col w-full my-5">
        <label className="text-gray-500 mb-2 text-left">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Please insert your password"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
          minLength={8}
        />
      </div>
      <div id="button" className="flex flex-col w-full my-5">
        <button
          type="submit"
          aria-disabled={pending}
          className="w-full py-4 bg-primary rounded-lg text-green-100"
        >
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">
            </div>
            <div className="font-bold">Register</div>
          </div>
        </button>
        <div className="flex justify-evenly mt-5">
          <Link
            href="/auth/forget-password"
            className="w-full text-center font-medium text-gray-500"
          >
            Forget password!
          </Link>
          <Link
            href="/auth/signin"
            className="w-full text-center font-medium text-gray-500"
          >
            Sign in!
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
