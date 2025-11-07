// app/api/debug/send-test-email/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });
    await transporter.verify();
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER!,
      to: process.env.SMTP_USER!,
      subject: "Render mail test",
      html: "<b>If you see this, SMTP works in prod.</b>",
    });
    return NextResponse.json({ ok: true, id: info.messageId, accepted: info.accepted });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
