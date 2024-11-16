import formidable from "formidable";
import path from "path";
import Media from "@/lib/models/Media";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import fs, { writeFile } from "fs";

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
    formData.append("folder", "887b5198-6b28-4289-8117-87deb4df5e71");
    formData.append("file", file as File);

    if (!file) {
      return new NextResponse(`Invalid file`, { status: 500 });
    }
    const convertFile = file as File;
    const userDir = path.join(process.cwd(), "tmp", userId);

    // Check if the directory exists; if not, create it
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true }); // Create the directory recursively
    }
    const createUserDir = fs.mkdirSync(`${process.cwd()}/tmp/${userId}`);
    const data = await convertFile.arrayBuffer();
    fs.writeFileSync(
      `${process.cwd()}/tmp/${userId}/${convertFile.name}`,
      Buffer.from(data)
    );

    // const file = files.file;
    // const fileType = file.mimetype.startsWith("image/") ? "image" : "video";

    // Create media record in database
    const media = await Media.create({
      fileName: convertFile.name,
      type: convertFile.type.startsWith("image/") ? "image" : "video",
      url: `/media/${convertFile.name}`,
    });
    // await media.save();
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
