import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import fs from "fs";
import path from "path";

import { connectToDB } from "@/lib/mongoDB";
import Media from "@/lib/models/Media";
import Product from "@/lib/models/Product";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { mediaId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const media = await Media.findById(params.mediaId);

    if (!media) {
      return new NextResponse(JSON.stringify({ message: "Media not found" }), {
        status: 404,
      });
    }

    await Media.findByIdAndDelete(params.mediaId);
    const userDir = path.join(process.cwd(), "tmp", userId);
    if (!fs.existsSync(userDir)) {
      return new NextResponse("Internal error", { status: 500 });
    }

    await Product.updateMany(
      { media: media.mediaUrl },
      { $pull: { media: media.mediaUrl } }
    );

    // Deletes the local file.
    const filePath = path.join(process.cwd(), media.url);
    fs.unlinkSync(filePath);

    return new NextResponse("Media is deleted", { status: 200 });
  } catch (err) {
    console.log("[mediaId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { mediaId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const media = await Media.findById(params.mediaId);

    return new NextResponse({ media: media }, { status: 200 });
  } catch (err) {
    console.log("[mediaId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
