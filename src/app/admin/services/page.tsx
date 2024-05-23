import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ServicesPage = () => {
  return (
    <div>
      services
      <Link href={'/admin/services/create'}>
      
      <Button variant={"default"}>Create New Service</Button>
      </Link>
    </div>
  )
}

export default ServicesPage
