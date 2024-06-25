import { Blog } from '@/utils/types/BlogType'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({blog}:{blog:Blog}) => {
  return (
    <div className="bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg border p-4">
    <Image src={blog.img_url} alt="Placeholder Image" width={300} height={200} quality={100} className="w-full h-48 rounded-md object-cover" />
    <div className="px-1 py-4">
      <div className="font-bold text-xl mb-2">{blog.title}</div>
      <p className="text-gray-700 dark:text-slate-200 text-base line-clamp-3">
      <PortableText
              value={blog.body}
            />
      </p>
    </div>
    <div className="px-1 py-4">
      <Link href={`blog/${blog.slug}`} className="text-primary dark:text-white hover:underline">Read More</Link>
    </div>
  </div>
  )
}

export default BlogCard
