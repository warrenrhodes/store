import { NextRequest, NextResponse } from "next/server";
import { createReadStream, statSync } from "fs";
import { join } from "path";
import mime from "mime";

export const Get = async (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.searchParams.values();

  if (!path || !Array.isArray(path)) {
    return new NextResponse("Invalid path", { status: 400 });
  }
  try {
    // Reconstruct the file path
    const imagePath = join(process.cwd(), "tmp", ...path);

    // Basic security check to prevent directory traversal
    const contentType = mime.lookup(imagePath) || "application/octet-stream";

    // Get file stats
    res.setHeader("Content-Type", contentType);

    // Create read stream and pipe to response
    const stream = createReadStream(imagePath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error serving media:", error);
    return res.status(404).json({ message: "File not found" });
  }
};
