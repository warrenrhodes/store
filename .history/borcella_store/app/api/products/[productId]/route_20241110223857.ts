import Collection from "@/lib/models/Collection";
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
        path: "collections",
        model: Collection,
      })
      .populate({ path: "media", model: Media });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (err) {
    console.log("[promotionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
