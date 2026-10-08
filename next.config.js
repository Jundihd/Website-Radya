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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/career',
        destination: '/id/career',
        permanent: true,
      },
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
        source: '/blog',
        destination: '/insight',
        permanent: true,
      },
      {
        source: '/en/blog',
        destination: '/insight',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insight/:slug',
        permanent: true,
      },
      {
        source: '/en/blog/:slug',
        destination: '/insight/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

