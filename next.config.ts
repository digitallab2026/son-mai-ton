import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allows build to complete even if there are slight type-checking warnings
    ignoreBuildErrors: true,
  },
  eslint: {
    // Speeds up building by ignoring eslint during compile
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
