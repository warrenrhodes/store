import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Media from "@/lib/models/Media";
import fs from "fs";

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
    console.log("files", files);

    const responses = await Promise.all(
      files.map(async (file: any) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const userDir = path.join(process.cwd(), "tmp", userId);

        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
        }
        const fileName = `${userDir}/${file.name}`;

        // Save to your public directory
        await writeFile(fileName, buffer);

        // 1. Save to your media collection in the database
        const updateResult = await Media.updateOne(
          { fileName: file.name },
          {
            $setOnInsert: {
              type: file.type.startsWith("image/") ? "image" : "video",
              url: `${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${userId}/${file.name}`,
            },
          },
          { upsert: true, new: true }
        );

        let mediaId;

        if (updateResult.upsertedId) {
          console.log("updateResult.upsertedId", updateResult.upsertedId);

          // A new document was created
          mediaId = updateResult.upsertedId;
        } else {
          // An existing document was updated, fetch its ID
          const existingMedia = await Media.findOne({
            fileName: file.name,
            userId,
          });
          mediaId = existingMedia._id;
          console.log("existingMedia._id", existingMedia._id);
        }

        // Return the URL that can be used to access the file
        return {
          success: true,
          file: {
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${userId}/${file.name}`,
            name: fileName,
            id: uuidv4(), // You might want to use your database ID here
          },
        };
      })
    );
    console.log("responses", responses);
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
