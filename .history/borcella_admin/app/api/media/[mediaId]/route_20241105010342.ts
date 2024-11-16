import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Media from "@/lib/models/Media";

export const GET = async (
  req: NextRequest,
  { params }: { params: { mediaId: string } }
) => {
  try {
    await connectToDB();

    const media = await Media.findById(params.mediaId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
