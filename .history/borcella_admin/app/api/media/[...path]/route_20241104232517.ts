import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";
import { stat } from "fs/promises";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Construct the full path to the image
    const imagePath = join(process.cwd(), "tmp", ...params.path);

    // Check if file exists and get its stats
    const stats = await stat(imagePath);
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Get the mime type based on file extension
    const contentType = mime.lookup(imagePath) || "application/octet-stream";

    // Create a read stream
    const stream = createReadStream(imagePath);

    // Create response headers
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Length": stats.size.toString(),
      "Cache-Control": "public, max-age=31536000, immutable", // Optional: Add caching
    });

    // Create and return the streaming response
    return new NextResponse(
      // @ts-ignore - TypeScript doesn't recognize ReadableStream from node
      stream as unknown as ReadableStream,
      {
        headers,
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// You might also want to handle HEAD requests
export async function HEAD(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = join(process.cwd(), "tmp", ...params.path);
    const stats = await stat(imagePath);

    if (!stats.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const contentType = mime.lookup(imagePath) || "application/octet-stream";

    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Length": stats.size.toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
    });

    return new NextResponse(null, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error handling HEAD request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add security middleware
import { type NextMiddleware } from "next/server";
import mime from "mime";

export const middleware: NextMiddleware = async (request) => {
  // Add your security checks here
  // Example: Check authentication
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Example: Validate path to prevent directory traversal
  const path = request.nextUrl.pathname;
  if (path.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/api/images/:path*",
};
