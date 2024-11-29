import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { blogSchema } from "@/lib/validations/blog";
import { generateSlug } from "@/lib/utils/slugify";
import { connectToDB } from "@/lib/mongoDB";
import Blog from "@/lib/models/Blog";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const query: any = {};
    if (status) query.status = status;
    if (featured) query["metadata.featured"] = featured === "true";
    if (category) query.categories = category;
    if (tag) query.tags = tag;

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate("categories")
      .lean();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = blogSchema.parse({
      ...json,
      slug: generateSlug(json.title),
      metadata: {
        ...json.metadata,
        author: {
          ...json.metadata.author,
          name: userId,
        },
      },
    });

    const blog = await Blog.create(body);
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
