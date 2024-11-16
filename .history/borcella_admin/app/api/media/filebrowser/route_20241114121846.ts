import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const data = await request.json();
    // const { path: folderPath = "", search = "" } = data;

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
          thumb: `/tmp/${userId}/${file}`, // In real app, you might have separate thumbnails
          changed: stats.mtime,
          size: stats.size,
          isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
          source: process.env.NEXT_PUBLIC_SERVER_URL,
          permissions: { read: true },
        };
      })
    );
    console.log("items", items);
    return NextResponse.json({
      success: true,
      data: {
        messages: [],
        code: 220,
        paths: [
          {
            baseurl: "",
            path: path.join("tmp", userId),
            files: items,
            folders: [],
            permissions: {
              allowFiles: true,
              allowFileMove: true,
              allowFileUpload: true,
              allowFileRemove: true,
              allowFolders: true,
              allowFolderMove: true,
              allowFolderCreate: true,
              allowFolderRemove: true,
              allowImageResize: true,
              allowImageCrop: true,
            },
          },
        ],
        sources: [
          {
            name: "default",
            path: path.join("tmp", userId),
            baseurl: "",
            files: items,
            folders: [],
          },
        ],
        baseurl: "",
        current: path.join("tmp", userId),
        access: {
          allowFiles: true,
          allowFileMove: true,
          allowFileUpload: true,
          allowFileRemove: true,
          allowFolders: true,
          allowFolderMove: true,
          allowFolderCreate: true,
          allowFolderRemove: true,
          allowImageResize: true,
          allowImageCrop: true,
        },
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
