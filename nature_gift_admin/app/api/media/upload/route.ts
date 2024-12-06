import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Media from "@/lib/models/Media";
import fs from "fs";
import { normalizeFileName } from "@/lib/utils/normalize_file_name";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
        const fileName = normalizeFileName(file.name);
        const fileDirectory = `${userDir}/${fileName}`;

        // Save to your public directory
        await writeFile(fileDirectory, buffer);

        // 1. Save to your media collection in the database
        const updateResult = await Media.updateOne(
          { fileName: fileName },
          {
            $setOnInsert: {
              type: file.type.startsWith("image/") ? "image" : "video",
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

        // Return the URL that can be used to access the file
        return {
          file: {
            url: `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/tmp/${userId}/${fileName}`,
            name: fileName,
            id: mediaId,
          },
        };
      })
    );
    return NextResponse.json({
      success: true,
      files: responses,
      message: "Upload successful",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
