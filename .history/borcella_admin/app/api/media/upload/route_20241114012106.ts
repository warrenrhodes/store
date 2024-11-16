import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    const responses = await Promise.all(
      files.map(async (file: any) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${uuidv4()}-${file.name}`;

        // Save to your public directory
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        await writeFile(filePath, buffer);

        // Here you would typically:
        // 1. Save to your media collection in the database
        // 2. Perhaps upload to cloud storage instead of local storage

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
