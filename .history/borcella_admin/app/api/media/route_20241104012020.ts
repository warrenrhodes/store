"use server";

import formidable from "formidable";
import path from "path";
import fs from "fs";
import Media from "@/lib/models/Media";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { filename, type, url } = await req.json();

    if (!filename || !type || !url) {
      console.log("Not enough data to create a media");
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const form = formidable({
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), "../media"),
    });

    const result: { fields: any; files: any } = await new Promise(
      (resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      }
    );

    const file = result.files.file;
    const fileType = file.mimetype.startsWith("image/") ? "image" : "video";

    // Create media record in database
    const media = await Media.create({
      filename: file.newFilename,
      type: fileType,
      url: `/media/${file.newFilename}`,
    });
    await media.save();
    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    console.log("[media_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const media = await Media.find();

    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    console.log("[media_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
