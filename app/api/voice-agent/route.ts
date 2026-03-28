/**
 * Voice Agent Proxy — Signed URL lekérés szerver oldalon
 * Az ElevenLabs API key nem kerül ki a kliensre.
 */

import { NextResponse } from "next/server";

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_9701kmtc90n5ejvb1amefgqmbejm";

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
      { headers: { "xi-api-key": apiKey } }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("ElevenLabs signed URL error:", err);
      return NextResponse.json({ error: "Failed to get signed URL" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Voice agent proxy error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
