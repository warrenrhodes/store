/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // scripts/e2e builds into .next-e2e, so a dev server running in this folder keeps its .next.
  distDir: process.env.E2E_DIST_DIR || '.next',
  typescript: { tsconfigPath: process.env.E2E_DIST_DIR ? 'tsconfig.e2e.json' : 'tsconfig.json' },
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
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'betterlife-future.com',
        port: '3000',
        pathname: '/tmp/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

// webpack for dev and build (`--webpack` in package.json): Turbopack only reads packages/core
// with its root at the repo level, which nests .next/standalone (App Hosting expects
// .next/standalone/server.js) and, in dev, sent the CSS pipeline into a loop of PostCSS workers.
export default nextConfig
