import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Netlify deployment
  output: 'standalone',
  images: {
    unoptimized: true, // Netlify handles image optimization
  },
};

export default nextConfig;
