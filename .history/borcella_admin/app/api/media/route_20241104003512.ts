"use server";

import formidable from "formidable";
import path from "path";
import fs from "fs";
import Media from "@/lib/models/Media";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "../media");
  form.keepExtensions = true;

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
