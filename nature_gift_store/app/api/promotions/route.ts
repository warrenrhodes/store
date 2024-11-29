import Product from "@/lib/models/Product";
import Promotion from "@/lib/models/Promotions";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const promotions = await Promotion.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "product", model: Product });

    if (!promotions) {
      return new NextResponse("Promotions not found", { status: 404 });
    }

    return NextResponse.json(promotions, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};