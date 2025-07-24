"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pageheading = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-sembold text-neutral-900 font-semibold dark:text-neutral-50 text-xl sm:text-2xl md:text-3xl mt-2 mb-8 ">
        {title}
      </h1>
      <Button variant={"ghost"} onClick={() => router.back()}>Back</Button>
    </div>
  )
}

export default Pageheading
