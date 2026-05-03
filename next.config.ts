import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  reactStrictMode: false,
  // Ensure proper base path for Capacitor apps
  assetPrefix: '',
}

export default nextConfig
