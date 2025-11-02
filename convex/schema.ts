// @ts-nocheck
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    customer: v.object({ name: v.string(), email: v.string(), phone: v.string() }),
    shipping: v.object({ address: v.string(), zip: v.string(), city: v.string(), country: v.string() }),
    payment: v.object({ method: v.string(), emoneyNumber: v.optional(v.string()), emoneyPin: v.optional(v.string()) }),
    items: v.array(v.object({ slug: v.string(), name: v.string(), price: v.number(), qty: v.number(), image: v.optional(v.string()) })),
    totals: v.object({ total: v.number(), shippingTotal: v.number(), vat: v.number(), grandTotal: v.number() }),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
