import path from 'node:path'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  // Shared models and rules (packages/core), linked from outside the app folder.
  transpilePackages: ['@ngift/core'],
  productionBrowserSourceMaps: true,
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
  },
}

// packages/core sits outside the app folder: Turbopack (dev) must be allowed to read the repo
// root. Not for `next build` (webpack): a repo-level root would nest .next/standalone under the
// app's folder, and App Hosting looks for .next/standalone/server.js.
const config = (phase: string) =>
  phase === PHASE_DEVELOPMENT_SERVER
    ? { ...nextConfig, turbopack: { root: path.join(__dirname, '..') } }
    : nextConfig

export default config
