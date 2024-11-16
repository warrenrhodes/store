import { NextRequest, NextResponse } from "next/server";
import { createReadStream, statSync } from "fs";
import { join } from "path";

export const Get = async (req: NextRequest) => {
  const path = req.nextUrl.searchParams.values();

  if (!path || !Array.isArray(path)) {
    return new NextResponse("Invalid path", { status: 400 });
  }
  try {
    // Reconstruct the file path
    const filePath = join("/tmp", ...path);

    // Basic security check to prevent directory traversal
    if (!filePath.startsWith("/tmp/")) {
      return new NextResponse("Access denied", { status: 403 });
    }

    // Get file stats
    const stats = statSync(filePath);

    // Create read stream and pipe to response
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error serving media:", error);
    return res.status(404).json({ message: "File not found" });
  }
};
