import type { NextConfig } from "next";

// ✅ Validate required environment variables (recommended for production safety)
const requiredEnvVars = [
  "NEXT_PUBLIC_CONVEX_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: Missing required env variable "${key}"`);
  }
}

// ✅ Centralized env object used internally
export const env = {
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL || "",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.MAIL_FROM || "",
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
  },

  // ✅ Makes vars available during build/runtime on Next.js server components
  env: {
    NEXT_PUBLIC_CONVEX_URL: env.convexUrl,
    SMTP_HOST: env.smtp.host,
    SMTP_PORT: env.smtp.port.toString(),
    SMTP_USER: env.smtp.user,
    SMTP_PASS: env.smtp.pass,
    MAIL_FROM: env.smtp.from,
  },
};

export default nextConfig;
