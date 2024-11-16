/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/tmp/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/tmp/:path*",
        destination: "/api/media/:path*",
      },
    ];
  },
};

export default nextConfig;
