import Image from "next/image";

import BlogCard from "@/components/Blog/BlogCard";

import { PortableText } from "@portabletext/react";
// import RichtextComponents from "@/components/ui/richtextComponents";
// import { formatDate } from "@/lib/DateFormater";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Blog } from "@/utils/types/BlogType";
import { client } from "@/services/sanityconfig";
import RichtextComponents from "@/components/ui/richtextComponents";
import moment from 'moment';

export const revalidate = 600

export async function generateStaticParams() {
    const posts: { slug: string; }[] = await client.fetch(
        `*[_type =="post"]{"slug":slug.current}`
    );

    return  posts.map((post) => ({
        slug: post.slug,
    })

    )
}

// export async function GetBlogDetail(slug: string): Promise<Blog | null> {
//     try {
//         const blog = await client.fetch(
//             `*[_type =="blog" && slug.current == "${slug}"]{"id":_id,title,"slug":slug.current,"authors":author->name,publishedAt, "img_url":mainImage.asset->url,body,keywords}[0]`
//         );
//         return blog;
//     } catch (error) {
//         console.log("error while fetching :", error);
//         return null;
//     }
// }

async function BlogFeaturePhoto({ slug }: { slug: string }) {
    const BlogDetails = await client.fetch(
        `*[_type =="post" && slug.current == "${slug}"]{ "img_url":mainImage.asset->url}[0]`
    );
     
    if(BlogDetails){
        return (
            <Image src={BlogDetails.img_url} alt={BlogDetails.slug} height={1020} width={1020} className="h-80 w-full object-cover" />
        )
    }else{
        redirect('/blog')
    }
}

async function BlogDetail({ slug }: { slug: string }) {
    const BlogDetails:Blog = await client.fetch(
        `*[_type =="post" && slug.current == "${slug}"]{"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title, publishedAt,"img_url":mainImage.asset->url,body}[0]`
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="pt-2 pr-0 pb-0 pl-0">
                {BlogDetails.category.map((cat)=>(
                    <a className="inline text-base font-medium mt-0 mr-1 mb-0 ml-0 bg-primary dark:bg-slate-200 px-2 py-1 rounded-full dark:text-black" key={cat}>{cat}</a>

                ))}
                
            </div>
            <div className="pt-2 pr-0 pb-0 pl-0 mt-10">
                <a className="inline text-base font-medium mt-0 mr-1 mb-0 ml-0 underline">{BlogDetails.authors}</a>
                <p className="inline text-base font-medium mt-0 mr-1 mb-0 ml-1">· {moment.utc(BlogDetails?.publishedAt).local().format("h:mm a")}·</p>
            </div>
            <h1 className="text-5xl font-bold tracking-wider my-10">
                {BlogDetails.title}
            </h1>
            <PortableText
                value={BlogDetails.body}
                components={RichtextComponents}
            />
        </div>
    )
}


async function OtherBlog({ slug }: { slug: string }) {
    const OtherBlog = await client.fetch(
        `*[_type =="post" && slug.current != "${slug}"]{"id":_id,title,"slug":slug.current,"authors":author->name,"category":categories[]->title, publishedAt,"img_url":mainImage.asset->url,body}[0..4]`)

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {OtherBlog.map((item: any) => (
                <BlogCard key={item?.id} blog={item} />
            ))
            }

        </div>
    )
}


const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    return (
        <>

            <>
            <Suspense fallback={<div>Loading...</div>}>
                < BlogFeaturePhoto slug={slug} />
            </Suspense>
            </>


            <div className="container">
                <div className="grid dark:text-white text-black">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BlogDetail slug={slug} />
                    </Suspense>
                    <h1 className="text-4xl py-10 font-bold ">Other Blogs</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <OtherBlog slug={slug} />
                    </Suspense>
                </div>


            </div>
        </>
    );
};

export default Page;