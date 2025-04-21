import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@tiptap/pm'],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['flagcdn.com'],  // Added flagcdn.com to the allowed domains
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;