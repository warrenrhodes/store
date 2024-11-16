// import { NextResponse, type NextMiddleware } from "next/server";
// export const middleware: NextMiddleware = async (request) => {
//   // Add your security checks here
//   // Example: Check authentication
//   const authHeader = request.headers.get("authorization");
//   if (!authHeader) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // Example: Validate path to prevent directory traversal
//   const path = request.nextUrl.pathname;
//   if (path.includes("..")) {
//     return NextResponse.json({ error: "Invalid path" }, { status: 400 });
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: "/api/media/:path*",
// };
