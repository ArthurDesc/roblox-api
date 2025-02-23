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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.awswaf.com https://*.roblox.com https://*.robloxlabs.com https://*.fullstory.com https://js.stripe.com https://www.youtube.com https://www.instagram.com/embed.js; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; font-src 'self' data:; connect-src 'self' https://apis.roblox.com https://*.roblox.com;"
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig