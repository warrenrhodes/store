import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId)
      .populate({
        path: "categories",
        model: Category,
      })
      .populate({ path: "media", model: Media });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const relatedProducts = await Product.find({
      $or: [{ categories: { $in: product.categories } }],
      _id: { $ne: product._id },
    })
      .populate({
        path: "categories",
        model: Category,
      })
      .populate({ path: "media", model: Media });

    if (!relatedProducts) {
      return new NextResponse(
        JSON.stringify({ message: "No related products found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (err) {
    console.log("[related_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
