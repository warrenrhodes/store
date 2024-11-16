import formidable from "formidable";
import path from "path";
import Media from "@/lib/models/Media";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const form = formidable({
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), "../media"),
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file;
    const fileType = file.mimetype.startsWith("image/") ? "image" : "video";

    // Create media record in database
    const media = await Media.create({
      fileName: file.newFilename,
      type: fileType,
      url: `/media/${file.newFilename}`,
    });
    await media.save();
    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    console.log("[media_POST]", err);
    return new NextResponse(`Internal Error, ${err}`, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const media = await Media.find().sort({ createdAt: "desc" });

    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    console.log("[media_GET]", err);
    return new NextResponse(`Internal Error ${err}`, { status: 500 });
  }
};
