// pages/api/blogs/index.ts
import { errorResponse } from "@/lib/errorResponse";
import { Blog } from "@/utils/types/BlogType";
import { NextRequest, NextResponse } from "next/server";
import { basename } from "path";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique keys

const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

// Function to create or retrieve an author
async function getOrCreateAuthor(authorName: string) {
  const existingAuthors = await client.fetch(
    `*[_type == "author" && name == $name][0]`,
    { name: authorName }
  );

  if (existingAuthors) {
    return existingAuthors._id; // Return existing author reference
  } else {
    const newAuthor = await client.create({
      _type: "author",
      name: authorName,
    });
    return newAuthor._id; // Return newly created author reference
  }
}

// Function to create or retrieve categories
async function getOrCreateCategories(categoryArray: string[]) {
  const categoryRefs = [];

  for (const category of categoryArray) {
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: category }
    );

    if (existingCategory) {
      categoryRefs.push(existingCategory._id); // Reference to existing category
    } else {
      const newCategory = await client.create({
        _type: "category",
        title: category,
      });
      categoryRefs.push(newCategory._id); // Reference to newly created category
    }
  }

  return categoryRefs; // Return array of category references
}

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

export async function POST(req: NextRequest) {
  const trekkingTipFormData = await req.formData();
  console.log("trekking tip form data file: ", trekkingTipFormData.get("file"));

  const imgFile = trekkingTipFormData.get("file");
  if (!imgFile || !(imgFile instanceof Blob)) {
    return NextResponse.json(
      { error: "No valid image file provided." },
      { status: 400 }
    );
  }

  // Safely retrieve form fields as strings, ensuring they aren't null
  const title = (trekkingTipFormData.get("title") as string) || "";
  const slug = (trekkingTipFormData.get("slug") as string) || "";
  const authorName = (trekkingTipFormData.get("authors") as string) || "";
  const keywords = (trekkingTipFormData.get("keywords") as string) || "";
  const body = (trekkingTipFormData.get("body") as string) || "";

  // Convert the HTML string to block content
  const bodyBlocks = [
    {
      _key: uuidv4(),
      _type: "block",
      children: [
        {
          _type: "span",
          text: body, // If you're using simple HTML, you can insert it directly here
        },
      ],
    },
  ];

  // Handling category field (convert to string[] if it's a comma-separated string)
  const category = trekkingTipFormData.get("category") as string | null;
  let categoryArray: string[] = [];

  if (category) {
    // Convert comma-separated values into an array
    categoryArray = category.split(",").map((cat) => cat.trim());
  }

  // Upload the image to Sanity
  const imageAsset = await client.assets.upload("image", imgFile, {
    filename: basename(imgFile.name), // You can use the original filename
  });

  try {
    // Get or create the author
    const authorId = await getOrCreateAuthor(authorName);

    // Get or create categories if the length is greater than 1
    let categoryIds = [];
    if (categoryArray.length > 1) {
      categoryIds = await getOrCreateCategories(categoryArray);
    }

    const newBlog = await client.create({
      _type: "post",
      title,
      slug: { current: slug }, // Make sure slug is correctly formatted
      author: { _type: "reference", _ref: authorId }, // Reference for author
      ...(categoryArray.length > 0 && {
        categories: categoryIds.map((cat_id) => ({
          _type: "reference",
          _ref: cat_id,
        })),
      }),
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAsset._id }, // Reference to the image asset
      },
      body: bodyBlocks,
      publishedAt: new Date().toISOString(),
    });

    const createdBlog: Blog = {
      id: newBlog._id,
      title: newBlog.title,
      slug: newBlog.slug.current, // Correct slug format
      authors: newBlog.author._ref,
      category:
        newBlog.categories && newBlog.categories.length > 0
          ? newBlog.categories.map((cat) => cat._ref)
          : [],
      img_url: imageAsset.url, // Use the image URL here
      body: renderBlocksToHTML(newBlog.body),
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
    console.log("error: ", error);

    return errorResponse(
      undefined,
      `Failed to create trekking tip: ${error}`,
      500
    );
  }
}
