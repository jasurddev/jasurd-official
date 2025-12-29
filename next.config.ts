import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
    unoptimized: true, // Tambahkan ini kalau mau deploy statis/gampang di Netlify Free Tier
  },
};

export default nextConfig;