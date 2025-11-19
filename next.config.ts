import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "next-out",
  trailingSlash: true,
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
