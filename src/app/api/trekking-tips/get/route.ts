import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/sanity/lib/client";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";

const renderBlocksToHTML = (
  blocks: {
    _key: string;
    _type: string;
    children?: {
      _type: string;
      text: string;
    }[];
    asset?: { _type: string; _ref: string; url: string; alt?: string };
  }[]
) => {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      switch (block._type) {
        case "block":
          return `<p>${block?.children?.map((child) => child.text).join("")}</p>`;
        case "image":
          return `<img src="${block?.asset?.url}" alt="${block?.asset?.alt || ""}" />`;
        // Add more block types as necessary
        default:
          return "";
      }
    })
    .join("");
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the id from query parameters

  console.log("blog id: ", id);

  if (!id) {
    return errorResponse(
      undefined,
      "id is required in the query parameters.",
      400
    );
  }

  try {
    // Fetch the blog by ID, populate references for author and categories
    const blog = await client.fetch(
      `*[_type == "post" && _id == $id]{
        _id,
        title,
        slug,
        author->{
          _id,
          name
        },
        categories[]->{
          _id,
          title
        },
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
        publishedAt
      }`,
      { id }
    );

    // Check if the blog exists
    if (!blog || blog.length === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Extract and format the blog data
    const blogData: Blog = {
      id: blog[0]._id,
      title: blog[0].title,
      slug: blog[0].slug.current,
      authors: blog[0].author.name, // Assuming the author's name
      category: blog[0].categories?.map((cat: any) => cat.title) || [], // Categories
      img_url: blog[0].mainImage.asset.url, // Image URL
      body: renderBlocksToHTML(blog[0].body), // Convert block content to HTML
      publishedAt: blog[0].publishedAt,
    };

    return NextResponse.json(
      {
        success: true,
        data: blogData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return errorResponse(undefined, "Failed to get! Please try again", 500);
  }
}
