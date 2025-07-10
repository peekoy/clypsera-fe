import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: `${process.env.NEXT_CONFIG_API_BASE_URL}`
      ? [
          {
            protocol: 'https', // Gunakan 'https' sesuai URL ngrok Anda
            hostname: `${process.env.NEXT_CONFIG_API_BASE_URL}`,
            port: '',
            // Pathname disesuaikan dengan struktur URL gambar dari API
            pathname: '/**',
          },
        ]
      : [],
  },
};

export default nextConfig;
