import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Category from "@/lib/models/Category";

export const GET = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await connectToDB();

    const category = await Category.findById(params.categoryId).populate({
      path: "products",
      model: Product,
    });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("[categoryId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let category = await Category.findById(params.categoryId);

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const { title, shortDescription, media, parent } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    category = await Category.findByIdAndUpdate(
      params.categoryId,
      { title, shortDescription, media, parent },
      { new: true }
    );

    await category.save();

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("[categoryId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Category.findByIdAndDelete(params.categoryId);

    await Category.updateMany(
      { categories: params.categoryId },
      { $pull: { categories: params.categoryId } }
    );

    return new NextResponse("Category is deleted", { status: 200 });
  } catch (err) {
    console.log("[categoryId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
