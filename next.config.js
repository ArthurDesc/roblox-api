/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    const isDevMode = process.env.NODE_ENV === 'development';
    const hasNgrok = process.env.NGROK_URL;
    
    if (isDevMode && hasNgrok) {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NGROK_URL.replace(/\/api$/, '')}/api/:path*`,
        },
      ];
    }
    
    return [];
  },
}

module.exports = nextConfig