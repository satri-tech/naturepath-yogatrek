
import { urlFor } from '@/services/sanityconfig';
import Image from 'next/image'
import Link from 'next/link';
import React, { Children } from 'react'



const RichtextComponents =  {
    types: {
      image: ({value}:any) => {        
        return(
          <div className='relative w-full mx-auto'>
            <Image
            className='object-contain w-full'
            src={urlFor(value).url()}
            alt="Blog post image"
            width={500}
            height={500}
            quality={100} 
            />
          </div>
          
        );
      },
      
    },
    list:{
      bullet:({children}:any)=>(
        <ul className='ml-10 py-2 text-base list-disc space-y-5'>{children}</ul>
      ),
      number:({children}:any)=>(
        <ul className='ml-10 py-2 text-base list-decimal space-y-5'>{children}</ul>
      ),
    },
    block:{
      h1:({children}:any)=>(
        <h1 className='md:text-3xl sm:text-2xl text-xl lg:text-4xl  py-10 font-bold text-primary'>{children}</h1>
      ),
      h2:({children}:any)=>(
        <h2 className='md:text-2xl sm:text-xl text-lg lg:text-3xl py-8 font-bold'>{children}</h2>
      ),
      h3:({children}:any)=>(
        <h3 className='md:text-xl sm:text-lg text-lg lg:text-2xl py-8 font-bold'>{children}</h3>
      ),
      h4:({children}:any)=>(
        <h4 className='md:text-xl sm:text-lg text-lg lg:text-xl py-8 font-bold'>{children}</h4>
      ),
      normal:({children}:any)=>(
        <p className='md:text-base sm:text-sm text-sm lg:text-lg py-2 tracking-wider font-normal'>{children}</p>
      )

    },
    blockquote: ({children}:any)=>(
      <blockquote className='border-l-4 pl-5 py-5 my-5'>{children}</blockquote>
    ),  
    marks: {
      link: ({children, value}:any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <Link href={value.href} 
          rel={rel}
          className='underline text-primary hover:text-black'
          >
            {children}
          </Link>
        )
      },
    },
  }


export default RichtextComponents