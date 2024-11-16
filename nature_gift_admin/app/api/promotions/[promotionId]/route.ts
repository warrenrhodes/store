import Product from "@/lib/models/Product";
import Promotion from "@/lib/models/Promotions"; // Updated import for Promotions model
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { promotionId: string } }
) => {
  try {
    await connectToDB();

    const promotion = await Promotion.findById(params.promotionId).populate({
      path: "product",
      model: Product,
    });

    if (!promotion) {
      return new NextResponse(
        JSON.stringify({ message: "Promotion not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(promotion), {
      status: 200,
    });
  } catch (err) {
    console.log("[promotionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { promotionId: string } } // Updated params for promotionId
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const promotion = await Promotion.findById(params.promotionId);

    if (!promotion) {
      return new NextResponse(
        JSON.stringify({ message: "Promotion not found" }),
        { status: 404 }
      );
    }

    const {
      product,
      promotionName,
      discountValue,
      minProductsToApply,
      isActive,
    } = await req.json();

    if (
      !product ||
      !promotionName ||
      !discountValue ||
      !minProductsToApply ||
      !isActive
    ) {
      return new NextResponse("Not enough data to create a new promotion", {
        status: 400,
      });
    }

    const updatedPromotion = await Promotion.findByIdAndUpdate(
      promotion._id,
      {
        product,
        isActive,
        promotionName,
        discountValue,
        minProductsToApply,
      },
      { new: true }
    );

    await updatedPromotion.save();

    return NextResponse.json(updatedPromotion, { status: 200 });
  } catch (err) {
    console.log("[promotionId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { promotionId: string } }
) => {
  try {
    await connectToDB();

    const promotion = await Promotion.findById(params.promotionId);

    if (!promotion) {
      return new NextResponse(
        JSON.stringify({ message: "Promotion not found" }),
        { status: 404 }
      );
    }

    await Promotion.findByIdAndDelete(promotion._id);

    return new NextResponse(JSON.stringify({ message: "Promotion deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[promotionId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
