/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/tmp/**',
      },
      {
        protocol: 'https',
        hostname: 'betterlife-future.com',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/tmp/:path*',
        destination: '/api/media/:path*',
      },
    ]
  },
  // // Optional: Add custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
  },
}

export default nextConfig
