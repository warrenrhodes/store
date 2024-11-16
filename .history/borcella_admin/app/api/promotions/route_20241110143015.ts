import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Promotion from "@/lib/models/Promotions";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { product, promotionName, discountValue, minProductsToApply } =
      await req.json();

    if (!product || !promotionName || !discountValue || !minProductsToApply) {
      console.log("Not enough data to create a promotion");
      return new NextResponse("Not enough data to create a promotion", {
        status: 400,
      });
    }

    const newPromotion = await Promotion.create({
      product,
      promotionName,
      discountValue,
      minProductsToApply,
    });

    await newPromotion.save();

    return NextResponse.json(newPromotion, { status: 200 });
  } catch (err) {
    console.log("[promotions_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const promotions = await Promotion.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "products", model: Product });

    return NextResponse.json(promotions, { status: 200 });
  } catch (err) {
    console.log("[promotions_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
