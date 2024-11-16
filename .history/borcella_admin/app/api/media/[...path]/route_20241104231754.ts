import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";
import mime from "mime";
import { stat } from "fs/promises";

export const Get = async (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.searchParams.values();

  if (!path || !Array.isArray(path)) {
    return new NextResponse("Invalid path", { status: 400 });
  }
  try {
    // Reconstruct the file path
    const imagePath = join(process.cwd(), "tmp", ...path);

    // Check if file exists and get its stats
    const stats = await stat(imagePath);
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Basic security check to prevent directory traversal
    const contentType = mime.lookup(imagePath) || "application/octet-stream";

    const stream = createReadStream(imagePath);

    // Create response headers
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Length": stats.size.toString(),
      "Cache-Control": "public, max-age=31536000, immutable", // Optional: Add caching
    });

    return new NextResponse(
      // @ts-ignore - TypeScript doesn't recognize ReadableStream from node
      stream as unknown as ReadableStream,
      {
        headers,
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error serving media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
