import React from "react";
import BlogCard from "@/components/Trekking_Tips/TrekkingTipsCard";
import { client } from "@/services/sanityconfig";
import { Blog } from "@/utils/types/BlogType";
import Topbanner from "@/layouts/Topbanner";

export const revalidate = 100;

async function BlogList() {
  const result: Blog[] =
    await client.fetch(`*[_type =="post"]| order(publishedAt)
     {"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title,keywords, publishedAt,"img_url":mainImage.asset->url,body}`);

  //  const result = await client.fetch(`*[_type =="skill"]{"id":_id,title,description,"skillset": skillset[].icon.asset->url}`);
  console.log("result of blog", result);

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
        {/* <div className="flex flex-col md:flex-row gap-5 lg:mx-10 lg:px-10 items-center lg:justify-evenly mb-10">
                 </div> */}
        <div className="container mx-auto p-4">
          <BlogList />
        </div>
        <div className="w-full flex justify-center">
          {/* <Button className=" bg-primary text-white font-semibold tracking-wider my-4 hover:bg-transparent hover:text-primary hover:border-primary normal-case ">
          View More
        </Button> */}
        </div>
      </div>
    </>
  );
};

export default Page;
