import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";
import { categorySchema } from "@/lib/validations/category";
import Media from "@/lib/models/Media";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const json = await req.json();
    const body = categorySchema.parse(json);

    const existingCategory = await Category.findOne({ name: body.slug });
    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 200 });
    }

    const newCategory = await Category.create({
      ...body,
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
    const categories = await Category.find()
      .lean()
      .populate({ path: "parent", model: Category })
      .populate({ path: "image", model: Media })
      .sort({ createdAt: "desc" });
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log("[categories_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
