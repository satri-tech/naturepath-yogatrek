import { Blog } from "@/utils/types/BlogType";
import BlogCard from "./TrekkingTipsCard";
import { client } from "@/services/sanityconfig";

export async function TrekkingTipList() {
  const result: Blog[] =
    await client.fetch(`*[_type =="post"]| order(publishedAt)
    {"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title, publishedAt,"img_url":mainImage.asset->url,body}`);

  //  const result = await client.fetch(`*[_type =="skill"]{"id":_id,title,description,"skillset": skillset[].icon.asset->url}`);
  console.log("result of blog", result);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {result.length > 0 &&
        result.map((item: Blog) => <BlogCard key={item.slug} blog={item} />)}
    </div>
  );
}
