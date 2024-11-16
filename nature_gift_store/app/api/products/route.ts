import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "categories", model: Category })
      .populate({ path: "media", model: Media });

    if (!products) {
      return new NextResponse("Products not found", { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
