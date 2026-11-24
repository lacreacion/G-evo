/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.g-evo.io',
      },
      {
        protocol: 'https',
        hostname: 'api.g-evo.store',
      },
    ],
  },
};

export default nextConfig;

