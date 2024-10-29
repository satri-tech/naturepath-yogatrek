import { errorResponse } from "@/lib/errorResponse";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const extractData = await req.json();

  if (!extractData.id) {
    return errorResponse(undefined, "id is required in the request body.", 400);
  }
  const { id } = extractData;

  try {
    await client.delete(id as string);
    return NextResponse.json(
      { message: "Trekking tip deleted" },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(undefined, "failed to dlete! Please try again", 500);
  }
}
