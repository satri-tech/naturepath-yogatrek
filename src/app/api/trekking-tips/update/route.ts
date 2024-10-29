import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/sanity/lib/client";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const extractData = await req.json();

  if (!extractData.id) {
    return errorResponse(undefined, "id is required in the request body.", 400);
  }

  const { id, title, slug, authors, category, keywords, img_url, body } =
    extractData;

  try {
    const updatedBlog = await client
      .patch(id as string)
      .set({
        title,
        slug: { current: slug },
        author: { _type: "reference", _ref: authors },
        categories: category.map((cat: string) => ({
          _type: "reference",
          _ref: cat,
        })),
        keywords,
        mainImage: {
          _type: "image",
          asset: { _type: "reference", _ref: img_url },
        },
        body,
        publishedAt: new Date().toISOString(),
      })
      .commit();

    const updatedBlogFormatted: Blog = {
      id: updatedBlog._id,
      title: updatedBlog.title,
      slug: updatedBlog.slug.current,
      authors: updatedBlog.author._ref, // Single author
      category: updatedBlog.categories.map((cat: any) => cat._ref),
      // keywords: updatedBlog.keywords,
      img_url: updatedBlog.mainImage.asset._ref,
      body: updatedBlog.body,
      publishedAt: updatedBlog.publishedAt,
    };

    return NextResponse.json({
      success: true,
      message: "Trekking tip updated!",
    });
  } catch (error) {
    return errorResponse(undefined, "failed to update! Please try again", 500);
  }
}
