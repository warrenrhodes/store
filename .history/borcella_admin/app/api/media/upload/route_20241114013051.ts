import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Media from "@/lib/models/Media";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const formData = await request.formData();
    const files = formData.getAll("files");

    const responses = await Promise.all(
      files.map(async (file: any) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const userDir = path.join(process.cwd(), "tmp", userId);

        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
        }
        const fileName = `${userDir}/${file.name}`;

        // Save to your public directory
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        await writeFile(filePath, buffer);

        // 1. Save to your media collection in the database
        const updateResult = await Media.updateOne(
          { fileName: file.name },
          {
            $setOnInsert: {
              type: file.type.startsWith("image/") ? "image" : "video",
              url: `/tmp/${userId}/${file.name}`,
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
            fileName: convertFile.name,
            userId,
          });
          mediaId = existingMedia._id;
        }

        await media.save();

        // 2. Perhaps upload to cloud storage instead of local storage
        // You can use a cloud storage service like AWS S3 or Google Cloud Storage
        // and upload the file there instead of saving it locally.

        // Return the URL that can be used to access the file
        return {
          success: true,
          file: {
            url: `/uploads/${fileName}`,
            name: fileName,
            id: uuidv4(), // You might want to use your database ID here
          },
        };
      })
    );

    return NextResponse.json({
      success: true,
      files: responses,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
