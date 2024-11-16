/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // or your server's hostname
        port: "5000", // port where your backend is running
        pathname: "/tmp/**", // use wildcard for paths
      },
    ],
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
