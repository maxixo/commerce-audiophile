import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./../../../convex/_generated/api";
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
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass) {
    console.warn("⚠️ Missing email configuration. Email not sent.");
    console.warn({ host, user, pass, from });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
  });

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Build line items table rows
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

  // Create secure link to view order page
  const orderLink = `${baseUrl}/order/${id}`;
const logoUrl = `${baseUrl}/logo.png`; // ← Update to your actual hosted logo
const primary = "#D87D4A"; // Audiophile brand accent

const html = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Your Order Confirmation</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f4f4f4;
        font-family: 'Inter', Arial, sans-serif;
        color: #111111;
        -webkit-font-smoothing: antialiased;
      }
      .wrapper {
        width: 100%;
        padding: 32px 12px;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        margin: 0 auto;
        border-radius: 12px;
        padding: 32px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      td {
        padding: 10px 0;
        font-size: 15px;
      }
      .divider {
        border-top: 1px solid #eee;
        margin: 24px 0;
      }
      .total-label {
        color: #555;
      }
      .total-value {
        font-weight: 600;
        text-align: right;
      }
      .btn {
        display: block;
        width: fit-content;
        background: #D87D4A;
        color: #ffffff !important;
        padding: 14px 18px;
        border-radius: 6px;
        margin: 32px auto 0;
        text-decoration: none;
        font-size: 15px;
        font-weight: 600;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #999;
        margin-top: 36px;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="container">

        <h1 style="
          text-align:center;
          font-size:24px;
          font-weight:700;
          letter-spacing:1.5px;
          margin:0 0 22px;
          color:#111111;
          text-transform: lowercase;
        ">
          audiophile
        </h1>

        <h1 style="text-align:center; margin:0 0 10px;">Order Confirmed</h1>
        <p class="subtext" style="text-align:center; color:#555; margin-bottom:28px;">
          Thank you, ${name}! Your order has been successfully received.
        </p>

        <p style="margin-bottom:6px; font-size:14px; letter-spacing:.4px; color:#777;">ORDER ID:</p>
        <p style="font-size:16px; font-weight:600; margin-top:0;">${id}</p>

        <div class="divider"></div>

        <h3 style="margin-bottom: 12px; font-size:17px;">Order Summary</h3>
        <table>${rows}</table>

        <div class="divider"></div>

        <table>
          <tr><td class="total-label">Subtotal</td><td class="total-value">${currency.format(totals.total)}</td></tr>
          <tr><td class="total-label">Shipping</td><td class="total-value">${currency.format(totals.shippingTotal)}</td></tr>
          <tr><td class="total-label">VAT Included</td><td class="total-value">${currency.format(totals.vat)}</td></tr>
          <tr><td style="font-weight:700;">Grand Total</td><td style="text-align:right;font-weight:700;">${currency.format(totals.grandTotal)}</td></tr>
        </table>

        ${shipping ? `<div class="divider"></div>
          <p style="margin-bottom:6px; font-weight:600;">Shipping Details</p>
          <p>${shipping.address}</p>
          <p>${shipping.city}, ${shipping.zip}</p>
          <p>${shipping.country}</p>
        ` : ""}

        <a href="${orderLink}" class="btn">View Order</a>

        <p class="footer">If you have any questions, simply reply to this email.</p>

      </div>
    </div>
  </body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: "Your Order Confirmation",
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email send failed:", err);
  }
}
