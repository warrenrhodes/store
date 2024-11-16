import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import fs from "fs";

import { connectToDB } from "@/lib/mongoDB";
import Media from "@/lib/models/Media";

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

    await Product.updateMany(
      { collections: params.mediaId },
      { $pull: { collections: params.mediaId } }
    );

    // Deletes the local file.
    const filePath = media.url;
    fs.unlinkSync(filePath);

    return new NextResponse("Media is deleted", { status: 200 });
  } catch (err) {
    console.log("[mediaId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
