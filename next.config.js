/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.radyalabs.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', 'lucide-react'],
  },
};

module.exports = nextConfig;
