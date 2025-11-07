import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./../../../convex/_generated/api";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** ✅ Helper: validate email format */
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** ✅ Main POST handler */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    console.log("📦 Incoming order body:", body);

    const { customer, shipping, payment, items } = body || {};

    // ---------- Basic Validation ----------
    if (!customer || !shipping || !Array.isArray(items) || items.length === 0) {
      console.error("❌ Invalid payload:", body);
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!customer.name || !customer.phone || !validateEmail(customer.email)) {
      console.error("❌ Invalid customer details:", customer);
      return NextResponse.json({ error: "Invalid customer details" }, { status: 400 });
    }

    for (const it of items) {
      if (
        !it.slug ||
        !it.name ||
        typeof it.price !== "number" ||
        typeof it.qty !== "number" ||
        it.qty < 1
      ) {
        console.error("❌ Invalid cart item:", it);
        return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
      }
    }

    // ---------- Compute Totals ----------
    const total = items.reduce((n: number, i: any) => n + i.price * i.qty, 0);
    const shippingTotal = items.length ? 50 : 0;
    const vat = Math.round(total * 0.2);
    const grandTotal = total + shippingTotal;

    // ---------- Store in Convex ----------
    let convexId: string | null = null;
    try {
      convexId = await tryStoreInConvex({
        customer,
        shipping,
        payment,
        items,
        totals: { total, shippingTotal, vat, grandTotal },
        status: "placed",
        createdAt: Date.now(),
      });
    } catch (err) {
      console.error("⚠️ Convex store failed:", err);
    }

    if (!convexId) {
      convexId = "test-" + Math.random().toString(36).slice(2, 8);
    }

    // ---------- Send Confirmation Email ----------
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    try {
      await sendOrderEmail({
        to: customer.email,
        name: customer.name,
        items,
        totals: { total, shippingTotal, vat, grandTotal },
        id: convexId,
        shipping,
        baseUrl,
      });
    } catch (err) {
      console.warn("⚠️ Failed to send confirmation email:", err);
    }

    // ---------- Respond ----------
    console.log("✅ Order processed successfully:", convexId);
    return NextResponse.json(
      { id: convexId, totals: { total, shippingTotal, vat, grandTotal } },
      { status: 201 }
    );
  } catch (err) {
    console.error("🔥 Error in /api/orders:", err);
    return NextResponse.json(
      { error: "Server error while placing order" },
      { status: 500 }
    );
  }
}

/** ✅ Store order data in Convex */
async function tryStoreInConvex(doc: any): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    console.error("❌ Missing NEXT_PUBLIC_CONVEX_URL");
    return null;
  }

  try {
    const client = new ConvexHttpClient(url);
    const id = await client.mutation(api.orders.create, doc);
    return id as string;
  } catch (err) {
    console.error("❌ Convex store failed:", err);
    return null;
  }
}

/** ✅ Send confirmation email via Nodemailer */
/** ✅ Send confirmation email via Nodemailer */
/** ✅ Send confirmation email via Nodemailer (order: transporter → rows → orderLink → html → send) */

async function sendOrderEmail({
  to,
  name,
  items,
  totals,
  id,
  shipping,
  baseUrl,
}: {
  to: string;
  name: string;
  items: any[];
  totals: any;
  id: string;
  shipping?: { address: string; zip: string; city: string; country: string };
  baseUrl: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass) {
    console.warn("MAIL_DEBUG missing envs", { host: !!host, user: !!user, pass: !!pass, from });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 (SSL) vs 587 (STARTTLS)
    auth: { user, pass },
    // logger: true, // uncomment for very verbose SMTP logs
    // debug: true,
  });

  // Build data first
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 0; color:#111111;">${i.name}</td>
        <td style="padding:10px 0; text-align:right; color:#555;">x${i.qty}</td>
        <td style="padding:10px 0; text-align:right; color:#111111;">
          ${currency.format(i.price * i.qty)}
        </td>
      </tr>`
    )
    .join("");
  const orderLink = `${baseUrl}/order/${id}`;

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Your Order Confirmation</title>
      <style>
        body{margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif;color:#111}
        .wrap{width:100%;padding:32px 12px}
        .card{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,.06)}
        .divider{border-top:1px solid #eee;margin:24px 0}
        .btn{display:inline-block;background:#D87D4A;color:#fff!important;text-decoration:none;padding:14px 18px;border-radius:6px;font-weight:600}
        .total-label{color:#555}
        .total-val{text-align:right;font-weight:600}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <h1 style="text-align:center;font-size:24px;font-weight:700;letter-spacing:1.5px;margin:0 0 22px;text-transform:lowercase;">audiophile</h1>
          <h2 style="text-align:center;margin:0 0 10px;">Order Confirmed</h2>
          <p style="text-align:center;color:#555;margin:0 0 24px;">Thank you, ${name}! Your order has been received.</p>
          <p style="margin:0 0 6px;font-size:14px;letter-spacing:.4px;color:#777;">ORDER ID:</p>
          <p style="margin:0 0 14px;font-size:16px;font-weight:600;">${id}</p>

          <div class="divider"></div>

          <h3 style="margin:0 0 12px;font-size:17px;">Order Summary</h3>
          <table style="width:100%;border-collapse:collapse">${rows}</table>

          <div class="divider"></div>

          <table style="width:100%">
            <tr><td class="total-label">Subtotal</td><td class="total-val">${currency.format(totals.total)}</td></tr>
            <tr><td class="total-label">Shipping</td><td class="total-val">${currency.format(totals.shippingTotal)}</td></tr>
            <tr><td class="total-label">VAT Included</td><td class="total-val">${currency.format(totals.vat)}</td></tr>
            <tr><td style="font-weight:700">Grand Total</td><td class="total-val" style="font-weight:700">${currency.format(totals.grandTotal)}</td></tr>
          </table>

          ${
            shipping
              ? `<div class="divider"></div>
                 <p style="margin:0 0 6px;font-weight:600">Shipping Details</p>
                 <p style="margin:0">${shipping.address}</p>
                 <p style="margin:0">${shipping.city}, ${shipping.zip}</p>
                 <p style="margin:0 0 12px">${shipping.country}</p>`
              : ""
          }

          <div style="text-align:center;margin-top:18px">
            <a class="btn" href="${orderLink}" target="_blank" rel="noopener">View Order</a>
          </div>
        </div>
      </div>
    </body>
  </html>`;

  // Verify & send with explicit logging
  try {
    console.log("MAIL_DEBUG verify", { host, port, from, userMasked: user?.replace(/.(?=.{3})/g, "*") });
    await transporter.verify();
    console.log("MAIL_DEBUG verified OK");

    const info = await transporter.sendMail({
      from,
      to,
      subject: "Your Order Confirmation",
      html,
    });

    console.log("MAIL_DEBUG result", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      pending: (info as any).pending, // some providers include this
      response: info.response,
    });
  } catch (err: any) {
    console.error("MAIL_DEBUG error", {
      name: err?.name,
      code: err?.code,
      command: err?.command,
      response: err?.response,
      message: err?.message,
    });
    throw err;
  }
}