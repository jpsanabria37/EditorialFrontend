/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizedRoutes: true,
  },
  webpack5: true,
}

module.exports = nextConfig
