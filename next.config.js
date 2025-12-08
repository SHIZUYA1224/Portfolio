/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },
  experimental: {
    turbo: false, // Turbopack を無効化
  },
};

module.exports = nextConfig;
