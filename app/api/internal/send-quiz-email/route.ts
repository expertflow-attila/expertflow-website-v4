/**
 * Internal: Quiz email küldés Attilának
 * Resend API-val küldi az értesítő emailt a ProtonMail-re.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Expert Flow <onboarding@resend.dev>",
        to: [to],
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email send failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("Send quiz email error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
