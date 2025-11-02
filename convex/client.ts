// convex/client.ts
import { ConvexReactClient } from "convex/react";

const address = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!address) {
  throw new Error(
    "❌ Missing NEXT_PUBLIC_CONVEX_URL in your environment. Check your .env.local file."
  );
}

export const convex = new ConvexReactClient(address);
