import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Media from "@/lib/models/Media";
import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      longDescription,
      media,
      categories,
      benefices,
      shipmentDetails,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !categories || !price || !expense) {
      console.log("Not enough data to create a product");
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      longDescription,
      media,
      categories,
      benefices,
      shipmentDetails,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    if (categories) {
      for (const categoryId of categories) {
        const category = await Category.findById(categoryId);
        if (category) {
          category.products.push(newProduct._id);
          await category.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "categories", model: Category })
      .populate({ path: "media", model: Media });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
