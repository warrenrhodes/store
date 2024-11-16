import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, shortDescription, media, parent } = await req.json();

    if (!title) {
      console.log("Not enough data to create a category");
      return new NextResponse("Not enough data to create a category", {
        status: 400,
      });
    }

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    if (!title || !media) {
      return new NextResponse("Title and media are required", { status: 400 });
    }

    const newCategory = await Category.create({
      title,
      shortDescription,
      media,
      parent,
    });

    await newCategory.save();

    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.log("[categories_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const categories = await Category.find().sort({ createdAt: "desc" });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log("[categories_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
