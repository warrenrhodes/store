import { NextRequest, NextResponse } from "next/server";

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
      return res.status(403).json({ message: "Access denied" });
    }

    // Get file stats
    const stats = statSync(filePath);

    // Determine content type based on file extension
    const ext = filePath.split(".").pop()?.toLowerCase();
    const contentTypes = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
    };

    const contentType = contentTypes[ext] || "application/octet-stream";

    // Set headers
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Accept-Ranges", "bytes");

    // Create read stream and pipe to response
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error serving media:", error);
    return res.status(404).json({ message: "File not found" });
  }
};
