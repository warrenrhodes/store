import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { auth } from "@clerk/nextjs/server";
import Media from "@/lib/models/Media";
import { connectToDB } from "@/lib/mongoDB";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);

    const { action, name, path: filePath } = Object.fromEntries(queryParams);

    const uploadsDir = path.join(process.cwd(), "tmp", userId);
    const files = await fs.readdir(uploadsDir);

    if (action === "fileRemove") {
      await Media.findOneAndDelete({ fileName: name });
      await fs.unlink(path.join(uploadsDir, name));
    }

    const items = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join(uploadsDir, file));
        return {
          file: file,
          changed: stats.mtime,
          size: stats.size,
          isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
          source: process.env.NEXT_PUBLIC_SERVER_URL ?? "-",
          permissions: { read: true },
          name: file,
          type: /\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? "image" : "video",
        };
      })
    );
    return NextResponse.json({
      success: true,
      data: {
        sources: [
          {
            path: `/tmp/${userId}/`,
            baseurl: process.env.NEXT_PUBLIC_SERVER_URL,
            files: items,
            name: "default",
            folders: [],
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