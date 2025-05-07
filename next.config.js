/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    allowedDevOrigins: [
      "3a1a-2001-871-260-8345-715c-81aa-578f-2160.ngrok-free.app",
      "user.orbis.money"
    ],
  }
  
module.exports = nextConfig;