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
      console.log("Not enough data to create a product");
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "../media");
    form.keepExtensions = true;

    const newMedia = await Media.create({
      filename,
      type,
      url,
    });

    await newMedia.save();

    return NextResponse.json(newMedia, { status: 200 });
  } catch (err) {
    console.log("[media_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), "../media"),
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file;
    const fileType = file.mimetype.startsWith("image/") ? "image" : "video";

    // Create media record in database
    const media = await Media.create({
      filename: file.newFilename,
      type: fileType,
      url: `/media/${file.newFilename}`,
    });

    return res.status(200).json(media);
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}
