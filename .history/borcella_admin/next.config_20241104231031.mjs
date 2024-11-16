/** @type {import('next').NextConfig} */
const nextConfig = {
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
