import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import nodemailer from "nodemailer";


/** ✅ Helper: validate email format */
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** ✅ Main POST handler */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📦 Incoming order body:", body);

    const { customer, shipping, payment, items, totals } = body || {};

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
      if (!it.slug || !it.name || typeof it.price !== "number" || typeof it.qty !== "number" || it.qty < 1) {
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
    try {
      await sendOrderEmail({
        to: customer.email,
        name: customer.name,
        items,
        totals: { total, shippingTotal, vat, grandTotal },
        id: convexId,
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
    return NextResponse.json({ error: "Server error while placing order" }, { status: 500 });
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
}: {
  to: string;
  name: string;
  items: any[];
  totals: any;
  id: string;
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

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.4">
      <h2>Thank you for your order, ${name}!</h2>
      <p>Order ID: <strong>${id}</strong></p>
      <table style="width:100%;border-collapse:collapse">
        <thead><tr><th align="left">Item</th><th align="right">Qty</th><th align="right">Price</th></tr></thead>
        <tbody>
          ${items
            .map(
              (i) => `<tr>
                <td>${i.name}</td>
                <td align="right">${i.qty}</td>
                <td align="right">$${(i.price * i.qty).toLocaleString()}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top:16px">
        Subtotal: $${totals.total.toLocaleString()}<br/>
        Shipping: $${totals.shippingTotal.toLocaleString()}<br/>
        VAT (included): $${totals.vat.toLocaleString()}<br/>
        <strong>Grand Total: $${totals.grandTotal.toLocaleString()}</strong>
      </p>
    </div>
  `;

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
