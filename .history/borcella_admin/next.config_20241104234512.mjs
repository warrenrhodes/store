/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add your backend domain
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
