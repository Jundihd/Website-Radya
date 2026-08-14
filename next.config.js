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
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', 'lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/portfolio/:slug',
        destination: '/portofolio/:slug',
        permanent: true,
      },
      {
        source: '/en/portfolio/:slug',
        destination: '/portofolio/:slug',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/#insight',
        permanent: true,
      },
      {
        source: '/en/blog/:slug',
        destination: '/#insight',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

