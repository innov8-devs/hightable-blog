/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
