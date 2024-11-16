import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, shortDescription, media, parent } = await req.json();

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title are required", { status: 400 });
    }

    const newCategory = await Category.create({
      title,
      shortDescription,
      media,
      parent,
    });

    await newCategory.save();

    return NextResponse.json(JSON, { status: 200 });
  } catch (err) {
    console.log("[categories_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const categories = await Category.find()
      .populate({ path: "media", model: Media })
      .populate({ path: "parent", model: Category })
      .sort({ createdAt: "desc" });
    console.log(categories);
    console.log(categories.length);
    return NextResponse.json(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log("[categories_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
