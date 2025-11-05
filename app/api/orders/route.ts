import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import nodemailer from "nodemailer";

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
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 465);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass) {
    console.warn("⚠️ Missing email configuration. Email not sent.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false otherwise
    auth: { user, pass },
  });

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0; color:#111111;">${i.name}</td>
        <td style="padding:8px 0; text-align:right; color:#555;">x${i.qty}</td>
        <td style="padding:8px 0; text-align:right; color:#111111;">${currency.format(
          i.price * i.qty
        )}</td>
      </tr>`
    )
    .join("");

  const shipBlock = shipping
    ? `
      <p style="margin:0; color:#111111; font-weight:600;">Shipping to</p>
      <p style="margin:4px 0 0; color:#555;">${shipping.address}</p>
      <p style="margin:0; color:#555;">${shipping.city}, ${shipping.zip}</p>
      <p style="margin:0; color:#555;">${shipping.country}</p>
    `
    : "";

  const orderLink = `${baseUrl}/order/${id}`;

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Order Confirmation</title>
      <style>
        body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#f6f6f6;color:#111}
        .container{max-width:600px;margin:0 auto;padding:24px}
        .card{background:#ffffff;border-radius:8px;padding:24px}
        .header{display:flex;align-items:center;gap:12px}
        .badge{width:40px;height:40px;border-radius:9999px;background:#d87d4a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
        .title{font-size:20px;line-height:28px;font-weight:700;margin:8px 0 0}
        .muted{color:#666}
        .totals td{padding:6px 0}
        .cta{display:inline-block;background:#d87d4a;color:#fff;text-decoration:none;padding:12px 16px;border-radius:6px;font-size:14px;font-weight:600}
        @media(max-width:640px){.container{padding:12px}.card{padding:16px}}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <div class="badge">✓</div>
            <div>
              <div class="muted" style="text-transform:uppercase;letter-spacing:.1em;font-size:12px;">Thank you, ${name}</div>
              <h1 class="title">Your order is confirmed</h1>
            </div>
          </div>
          <p class="muted" style="margin-top:12px">Order ID: <strong style="color:#111">${id}</strong></p>

          <h3 style="margin:20px 0 8px;font-size:16px">Order Summary</h3>
          <table style="width:100%;border-collapse:collapse">${rows}</table>

          <table class="totals" style="width:100%;margin-top:12px">
            <tr><td class="muted">Subtotal</td><td style="text-align:right">${currency.format(
              totals.total
            )}</td></tr>
            <tr><td class="muted">Shipping</td><td style="text-align:right">${currency.format(
              totals.shippingTotal
            )}</td></tr>
            <tr><td class="muted">VAT (included)</td><td style="text-align:right">${currency.format(
              totals.vat
            )}</td></tr>
            <tr><td style="font-weight:700">Grand Total</td><td style="text-align:right;font-weight:700">${currency.format(
              totals.grandTotal
            )}</td></tr>
          </table>

          ${shipBlock ? `<div style="margin-top:16px">${shipBlock}</div>` : ""}

          <div style="margin-top:20px">
            <a class="cta" href="${orderLink}" target="_blank" rel="noopener">View your order</a>
          </div>

          <div style="margin-top:20px">
            <p class="muted" style="margin:0">Need help? Contact our support:</p>
            <p style="margin:4px 0 0"><a href="mailto:support@audiophile.dev">support@audiophile.dev</a> • <a href="${baseUrl}">${baseUrl}</a></p>
          </div>
        </div>
      </div>
    </body>
  </html>`;

  const mailOptions = {
    from,
    to,
    subject: "Your Audiophile order confirmation",
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}
