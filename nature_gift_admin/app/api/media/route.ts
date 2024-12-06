import path from "path";
import Media from "@/lib/models/Media";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import fs from "fs";
import { normalizeFileName } from "@/lib/utils/normalize_file_name";

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
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return new NextResponse(`Invalid file`, { status: 500 });
    }
    const convertFile = file as File;
    const userDir = path.join(process.cwd(), "tmp", userId);
    const fileName = normalizeFileName(convertFile.name);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    const data = await convertFile.arrayBuffer();

    fs.writeFileSync(`${userDir}/${fileName}`, Buffer.from(data));
    // Create media record in database
    const updateResult = await Media.updateOne(
      {
        fileName: fileName,
      },
      {
        $setOnInsert: {
          type: convertFile.type.startsWith("image/") ? "image" : "video",
          url: `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/tmp/${userId}/${fileName}`,
        },
      },
      { upsert: true, new: true }
    );
    let mediaId;

    if (updateResult.upsertedId) {
      // A new document was created
      mediaId = updateResult.upsertedId;
    } else {
      // An existing document was updated, fetch its ID
      const existingMedia = await Media.findOne({
        fileName: fileName,
        userId,
      });
      mediaId = existingMedia?._id;
    }
    return NextResponse.json({ url: mediaId }, { status: 200 });
  } catch (err) {
    console.log("[media_POST]", err);
    return new NextResponse(`Internal Error, ${err}`, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const media = await Media.find().sort({ createdAt: "desc" });

    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    console.log("[media_GET]", err);
    return new NextResponse(`Internal Error ${err}`, { status: 500 });
  }
};
