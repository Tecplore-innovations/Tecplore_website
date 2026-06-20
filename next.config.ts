import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: require("path").join(__dirname),
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
