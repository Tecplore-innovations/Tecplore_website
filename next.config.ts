import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@tiptap/pm"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
