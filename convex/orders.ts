// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    payment: v.object({
      method: v.string(),
      emoneyNumber: v.optional(v.string()),
      emoneyPin: v.optional(v.string()),
    }),
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        qty: v.number(),
        image: v.optional(v.string()),
      })
    ),
    totals: v.object({
      total: v.number(),
      shippingTotal: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("orders", args);
    return id;
  },
});

export const get = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    return doc;
  },
});
