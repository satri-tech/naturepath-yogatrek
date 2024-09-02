// pages/api/blogs/[id].ts
import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/services/sanityconfig";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const extractData = await req.json();

  if (!extractData.id) {
    return errorResponse(undefined, "id is required in the request body.", 400);
  }
  const { id } = extractData;

  try {
    const blog = await client.fetch(
      `*[_type == "post" && _id == $id]{
          _id,
          title,
          slug,
          author->name,
          categories[]->title,
          keywords,
          mainImage.asset->url,
          body,
          publishedAt
        }`,
      { id: id as string }
    );

    if (blog.length === 0) {
      return NextResponse.json({ message: "Blog not found" });
    }

    const blogData: Blog = {
      id: blog[0]._id,
      title: blog[0].title,
      slug: blog[0].slug.current,
      authors: blog[0].author, // Assuming a single author
      category: blog[0].categories.map((cat: any) => cat.title),
      // keywords: blog[0].keywords,
      img_url: blog[0].mainImage.asset.url,
      body: blog[0].body,
      publishedAt: blog[0].publishedAt,
    };

    NextResponse.json(
      {
        success: true,
        data: blogData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorResponse(undefined, "failed to get! Please try again", 500);
  }
}
