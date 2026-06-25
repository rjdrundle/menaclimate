import { NextResponse } from "next/server";

// POST /api/register
// Body: { first, last, email, org, forum }
// TODO: connect CRM / email service (e.g. HubSpot, Resend, Notion webhook).
//       Set REGISTER_WEBHOOK_URL in .env.local; forward `data` to it.
export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const first = String(body.first ?? "").trim();
  const last = String(body.last ?? "").trim();
  const email = String(body.email ?? "").trim();
  const org = String(body.org ?? "").trim();
  const forum = String(body.forum ?? "All four forums").trim();

  if (!first || !last) {
    return NextResponse.json({ error: "Name is required." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 422 },
    );
  }

  const payload = { first, last, email, org, forum, ts: new Date().toISOString() };

  const webhook = process.env.REGISTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("register webhook non-2xx", res.status);
        // We still 200 the user — the form shouldn't depend on the CRM being live.
      }
    } catch (err) {
      console.error("register webhook failed", err);
    }
  } else {
    // Dev fallback: log so you can confirm the shape.
    console.log("[register]", payload);
  }

  return NextResponse.json({ ok: true });
}