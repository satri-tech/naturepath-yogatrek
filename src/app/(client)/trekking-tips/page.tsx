import React from "react";
import BlogCard from "@/components/Trekking_Tips/TrekkingTipsCard";
import { Blog } from "@/utils/types/BlogType";
import Topbanner from "@/layouts/Topbanner";
import { client } from "@/sanity/lib/client";

export const revalidate = 100;

async function BlogList() {
  const result: Blog[] =
    await client.fetch(`*[_type =="post"]| order(publishedAt)
     {"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title,keywords, publishedAt,"img_url":mainImage.asset->url,body}`);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {result.length > 0 &&
        result.map((item: Blog) => <BlogCard key={item.slug} blog={item} />)}
    </div>
  );
}

const Page = () => {
  return (
    <>
      <Topbanner title="Trekking tips and tricks" />
      <div className="relative container mx-auto ">

        <div className="container mx-auto p-4">
          <BlogList />
        </div>
        <div className="w-full flex justify-center">

        </div>
      </div>
    </>
  );
};

export default Page;
