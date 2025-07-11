import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ngrok-free.app', // Mengizinkan semua subdomain ngrok
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Menambahkan domain placeholder
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
