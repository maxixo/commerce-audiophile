import type { NextConfig } from 'next';

// ✅ Validate required environment variables (optional but recommended)
const requiredEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: Missing required env variable "${key}"`);
  }
}

// ✅ Runtime-accessible env values
export const env = {
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL || '',
  email: {
    host: process.env.EMAIL_HOST || '',
    port: Number(process.env.EMAIL_PORT || 465),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || '',
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    // ✅ Removed reactCompiler (causing type error)
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*'],
    },
  },

  // ✅ Makes env accessible during build
  env: {
    NEXT_PUBLIC_CONVEX_URL: env.convexUrl,
    EMAIL_HOST: env.email.host,
    EMAIL_PORT: env.email.port.toString(),
    EMAIL_USER: env.email.user,
    EMAIL_PASS: env.email.pass,
    EMAIL_FROM: env.email.from,
  },

  // ✅ Removed distDir to avoid wrong deploy path issues
};

export default nextConfig;
