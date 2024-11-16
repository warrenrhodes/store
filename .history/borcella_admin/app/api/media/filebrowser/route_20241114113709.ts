import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const { path: folderPath = "", search = "" } = data;

    // In a real application, you would:
    // 1. Query your media collection from the database
    // 2. Apply search filters if search parameter exists
    // 3. Handle pagination

    // This is a simple example using local files
    const uploadsDir = path.join(process.cwd(), "tmp", userId);
    const files = await fs.readdir(uploadsDir);

    const items = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join(uploadsDir, file));
        return {
          file: file,
          fileURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${userId}/${file}`,
          thumb: `/uploads/${file}`, // In real app, you might have separate thumbnails
          changed: stats.mtime,
          size: stats.size,
          isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        sources: [
          {
            path: folderPath,
            files: items,
            folders: [], // Add folders if you implement directory structure
          },
        ],
        code: 220,
      },
    });
  } catch (error) {
    console.error("File browser error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to list files" },
      { status: 500 }
    );
  }
}
