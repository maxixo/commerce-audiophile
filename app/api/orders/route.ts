import { NextResponse } from "next/server";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, shipping, payment, items, totals } = body || {};

    if (!customer || !shipping || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!customer.name || !customer.phone || !validateEmail(customer.email)) {
      return NextResponse.json({ error: "Invalid customer details" }, { status: 400 });
    }

    for (const it of items) {
      if (!it.slug || !it.name || typeof it.price !== "number" || typeof it.qty !== "number" || it.qty < 1) {
        return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
      }
    }

    const total = items.reduce((n: number, i: any) => n + i.price * i.qty, 0);
    const shippingTotal = items.length ? 50 : 0;
    const vat = Math.round(total * 0.2);
    const grandTotal = total + shippingTotal; // VAT included in price

    // TODO: Integrate Convex. Example:
    // const orderId = await convex.mutation("orders:create", { customer, shipping, payment, items, totals: { total, shippingTotal, vat, grandTotal } });
    let orderId = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)).toString();

    // Attempt to persist to Convex if configured
    const convexId = await tryStoreInConvex({
      customer,
      shipping,
      payment,
      items,
      totals: { total, shippingTotal, vat, grandTotal },
      status: "placed",
      createdAt: Date.now(),
    });
    if (convexId) orderId = convexId as string;

    // TODO: Send email using a provider (Resend/Nodemailer). Expose env and call here.

    return NextResponse.json({ id: orderId, totals: { total, shippingTotal, vat, grandTotal } }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }
}

// Best-effort Convex storage without adding a hard dependency.
async function tryStoreInConvex(doc: any): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  try {
    // Runtime dynamic import avoids compile-time dependency.
    const dynamicImport: any = (new Function("s", "return import(s)") as any);
    const mod = await dynamicImport("convex/browser");
    // Local generated-like API mapping (use relative path, not TS alias)
    const { api } = await dynamicImport("../../../convex/_generated/api");
    const client = new mod.ConvexHttpClient(url);
    const id = await client.mutation(api.orders.create, doc);
    return id as string;
  } catch {
    return null;
  }
}
