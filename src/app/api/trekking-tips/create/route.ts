// pages/api/blogs/index.ts
import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/services/sanityconfig";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, slug, authors, category, keywords, img_url, body } =
    await req.json();
  console.log("request: ", { title, slug, authors, img_url, body, category });

  try {
    const newBlog = await client.create({
      _type: "post",
      title,
      slug: { current: slug },
      author: { _type: "reference", _ref: authors },
      categories: category.map((cat: string) => ({
        _type: "reference",
        _ref: cat,
      })),
      // keywords,
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: img_url },
      },
      body,
      publishedAt: new Date().toISOString(),
    });

    const createdBlog: Blog = {
      id: newBlog._id,
      title: newBlog.title,
      slug: newBlog.slug.current,
      authors: newBlog.author._ref,
      category: newBlog.categories.map((cat: any) => cat._ref),
      // keywords: newBlog.keywords,
      img_url: newBlog.mainImage.asset._ref,
      body: newBlog.body,
      publishedAt: newBlog.publishedAt,
    };

    console.log("created blog", createdBlog);

    return NextResponse.json(
      {
        success: true,
        data: createdBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(
      undefined,
      `Failed to create trekking tip: ${error}`,
      500
    );
  }
}
