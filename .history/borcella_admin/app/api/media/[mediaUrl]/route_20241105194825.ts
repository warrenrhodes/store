import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import fs from "fs";
import path from "path";

import { connectToDB } from "@/lib/mongoDB";
import Media from "@/lib/models/Media";
import Product from "@/lib/models/Product";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { mediaUrl: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const media = await Media.findOneAndDelete({ url: params.mediaUrl });

    if (!media) {
      return new NextResponse(JSON.stringify({ message: "Media not found" }), {
        status: 404,
      });
    }
    const userDir = path.join(process.cwd(), "tmp", userId);
    if (!fs.existsSync(userDir)) {
      return new NextResponse("Internal error", { status: 500 });
    }

    await Product.updateMany(
      { media: params.mediaUrl },
      { $pull: { media: params.mediaUrl } }
    );

    // Deletes the local file.
    const filePath = path.join(process.cwd(), params.mediaUrl);
    fs.unlinkSync(filePath);

    return new NextResponse("Media is deleted", { status: 200 });
  } catch (err) {
    console.log("[mediaId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
