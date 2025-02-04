import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@tiptap/pm'],
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  swcMinify: true,
};

export default nextConfig;