import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/sanity/lib/client";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const trekking_tips = await client.fetch<
      Blog[]
    >(`*[_type == "post"] | order(publishedAt) {
        "id": _id,
        title,
        "slug": slug.current,
        "authors": author->name,
        "category": categories[]->title,
        keywords,
        publishedAt,
        "img_url": mainImage.asset->url,
        body
      }`);
    return NextResponse.json(
      {
        data: trekking_tips,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorResponse(
      undefined,
      `Failed to fetch trekking tips: ${error}`,
      500
    );
  }
}
