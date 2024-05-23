import Image from 'next/image'
import React from 'react'
import Breadcrumbs from './breadcrumbs'
import Headings from '@/components/ui/Headings'
import { Badge } from '@/components/ui/badge'

const Topbanner = ({title}:{title:string}) => {
  return (
    <div className="container px-0 relative w-full h-[60vh] -translate-y-20 -z-10">
      <div className="grid items-center h-full w-full text-white ">
      <div className="flex flex-col items-center">
            <Badge className='bg-white'><Breadcrumbs /></Badge>
            <Headings className="">{title}</Headings>
          </div>
      </div>
      <Image
        src="https://picsum.photos/200/300?random=11"
        alt="hero image"
        width={2048}
        height={2048}
     
        className="absolute top-0 w-full h-full object-cover brightness-50 -z-10"
      />
     
    </div>
  )
}

export default Topbanner
