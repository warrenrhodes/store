import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Review from "@/lib/models/Reviews";
import Product from "@/lib/models/Product";
import { reviewSchema } from "@/lib/validations/reviews";

export const GET = async (
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) => {
  try {
    await connectToDB();

    const review = await Review.findById(params.reviewId).populate({
      path: "product",
      model: Product,
    });

    if (!review) {
      return new NextResponse(JSON.stringify({ message: "Review not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (err) {
    console.log("[reviewId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let review = await Review.findById(params.reviewId);

    if (!review) {
      return new NextResponse("Review not found", { status: 404 });
    }

    const json = await req.json();
    const body = reviewSchema.parse(json);

    review = await Review.findByIdAndUpdate(params.reviewId, body, {
      new: true,
    });

    // If the product has changed, update both old and new product review lists
    // Remove from old product
    await Product.findByIdAndUpdate(body.product, {
      $pull: { reviews: params.reviewId },
    });
    const ee = await Product.findById(body.product);
    // Add to new product
    await Product.findByIdAndUpdate(body.product, {
      $addToSet: { reviews: params.reviewId },
    });

    return NextResponse.json(review, { status: 200 });
  } catch (err) {
    console.log("[reviewId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Review.findByIdAndDelete(params.reviewId);

    return new NextResponse("Review is deleted", { status: 200 });
  } catch (err) {
    console.log("[reviewId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
