import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Media from "@/lib/models/Media";
import Category from "@/lib/models/Category";
import { productSchema } from "@/lib/validations/product";
import Product from "@/lib/models/Product";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = productSchema.parse(json);

    await connectToDB();

    const newProduct = await Product.create({ ...body });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    const error = err as any;
    console.error("[products_POST]", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .lean()
      .sort({ createdAt: "desc" })
      .populate({ path: "categories", model: Category })
      .populate({ path: "media", model: Media });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    const error = err as any;
    console.error("[products_POST]", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
