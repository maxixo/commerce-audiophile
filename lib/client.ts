import { ConvexClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Only validate in browser runtime, not during build/deployment
if (typeof window !== 'undefined' && !convexUrl) {
  console.error("❌ Missing NEXT_PUBLIC_CONVEX_URL in your environment. Check your .env.local file.");
}

export const convex = new ConvexClient(convexUrl || "https://accomplished-cricket-919.convex.cloud");