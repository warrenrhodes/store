import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Review from "@/lib/models/Reviews";
import Product from "@/lib/models/Product";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const {
      product,
      userName,
      rating,
      comment,
      imageUrl,
      verify,
      helpful,
      notHelpful,
    } = await req.json();

    if (!product || !userName || !rating || !comment) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newReview = await Review.create({
      product,
      userName,
      rating,
      comment,
      imageUrl,
      verify,
      helpful,
      notHelpful,
    });

    await newReview.save();

    return NextResponse.json(newReview, { status: 200 });
  } catch (err) {
    console.log("[reviews_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const reviews = await Review.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "product", model: Product });

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.log("[reviews_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
