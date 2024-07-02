import React from 'react'
import { Button } from '../ui/button'
import BlogCard from './BlogCard'


import Link from 'next/link';
import { client } from '@/services/sanityconfig';
import { Blog } from '@/utils/types/BlogType';

 async function BlogList() {

  const result:Blog[] = await client.fetch(`*[_type =="post"]| order(publishedAt)
  {"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title, publishedAt,"img_url":mainImage.asset->url,body}[0..4]`);

 //  const result = await client.fetch(`*[_type =="skill"]{"id":_id,title,description,"skillset": skillset[].icon.asset->url}`);
  console.log("result of blog",result)


 return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         {result.length > 0 && result.map((item: Blog) => (
             <BlogCard key={item.slug} blog={item} />
         ))
         }
     </div>
 )

}

const HomeBlog = () => {
  return (
    <div className="relative container mx-auto my-14">
      <div className="flex flex-col md:flex-row gap-5 lg:mx-10 lg:px-10 items-center lg:justify-evenly mb-10">
        <div className="">
          <div className="relative mx-2 mb-4">
            <p className="text-lg font-semibold">Blogs</p>
            <div className=" absolute -top-2 -left-2 h-10 w-20 border border-primary rounded-[50%]"></div>
          </div>
          <div className="normal-case">
            <h1 className="text-4xl font-bold tracking-wider">
              Some of my Writings and Latest<span className="text-primary">Blogs</span>
            </h1>
            <p>
              Some Latest Blogs to share with you
            </p>
          </div>

        </div>
      </div>
      <div className="container mx-auto p-4">
        <BlogList/>
      </div>
      <div className='w-full flex justify-center'>
        <Link href={`/blog`}>
        
        <Button className=" bg-primary text-white font-semibold tracking-wider my-4 hover:bg-transparent hover:text-primary hover:border-primary normal-case ">
          View More
        </Button>
        </Link>
      </div>
      <div className="absolute top-[5%] left-[12%] h-2 w-2 -z-10 rounded-full bg-red"></div>
<div className="absolute top-[28%] right-[12%] h-4 w-4 -z-10 rounded-full bg-red"></div>
<div className="absolute bottom-[13%] left-[49%] h-2 w-2 -z-10 rounded-full bg-red"></div>
<div className="absolute bottom-[20%] right-[3%] h-2 w-2 -z-10 rounded-full bg-red"></div>
<div className="absolute top-[9%] left-[17%] h-2 w-2 -z-10 rounded-full bg-orange"></div>
<div className="absolute bottom-[31%] right-[18%] h-2 w-2 -z-10 rounded-full bg-orange"></div>
<div className="absolute top-[3%] left-[23%] h-4 w-4 -z-10 rounded-full bg-orange"></div>
<div className="absolute bottom-[25%] right-[19%] h-2 w-2 -z-10 rounded-full bg-orange"></div>
<div className="absolute top-[7%] left-[38%] h-2 w-2 -z-10 rounded-full bg-orange"></div>
<div className="absolute bottom-[16%] right-[49%] h-2 w-2 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute top-[30%] left-[8%] h-2 w-2 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute bottom-[1%] right-[18%] h-4 w-4 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute top-[24%] left-[32%] h-2 w-2 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute bottom-[11%] right-[46%] h-2 w-2 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute top-[27%] left-[15%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
<div className="absolute bottom-[8%] right-[45%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
<div className="absolute top-[22%] left-[53%] h-4 w-4 -z-10 rounded-full bg-green-400"></div>
<div className="absolute bottom-[14%] right-[18%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
<div className="absolute top-[2%] left-[47%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
<div className="absolute bottom-[10%] left-[10%] h-2 w-2 -z-10 rounded-full bg-red"></div>
<div className="absolute bottom-[15%] left-[25%] h-2 w-2 -z-10 rounded-full bg-orange"></div>
<div className="absolute bottom-[25%] left-[5%] h-4 w-4 -z-10 rounded-full bg-blue-500"></div>
<div className="absolute bottom-[5%] left-[15%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
<div className="absolute bottom-[20%] left-[20%] h-2 w-2 -z-10 rounded-full bg-green-400"></div>
    </div>



  )
}

export default HomeBlog
