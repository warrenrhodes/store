import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   // Add CORS headers
//   response.headers.set("Access-Control-Allow-Credentials", "true");
//   response.headers.set(
//     "Access-Control-Allow-Origin",
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3001"
//       : "https://betterlife-future.com"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
//   );

//   return response;
// }
