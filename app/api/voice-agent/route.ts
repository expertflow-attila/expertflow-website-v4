/**
 * Voice Agent — Gemini 3.1 Flash Live WebSocket proxy
 *
 * A kliens WebSocket-en keresztül küld audio-t, a szerver Gemini Live API-val kommunikál.
 * A Supabase tudásbázisból kontextust ad a modellnek.
 */

import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const SYSTEM_INSTRUCTION = `Te az Expert Flow AI asszisztense vagy. Magyar nyelven válaszolsz, barátságosan és szakértően.

Az Expert Flow egy AI-vezérelt üzleti automatizációs platform magyar szolgáltató egyéni vállalkozóknak: ügyvédeknek, könyvelőknek, ingatlanosoknak, orvosoknak, fotósoknak.

Amit tudsz:
- AI alapú ügyfélszerzés automatizálása
- Sales funnel és pipeline kezelés
- Email marketing automatizáció
- Weboldal és landing page építés
- YouTube tartalom készítés
- CRM és üzleti intelligencia

Ha a látogató érdeklődik, ajánld fel a 30 perces ingyenes konzultációt: https://cal.com/expertflow/konzultacio

Legyél tömör, közvetlen, és segítőkész. Ne használj túl sok szakkifejezést. Beszélj természetesen, mintha egy barátságos tanácsadó lennél.`;

export async function GET() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  // Supabase tudásbázis lekérdezés (ha elérhető)
  let knowledgeContext = "";
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/business_knowledge?select=category,content&confidence=gte.0.7&order=created_at.desc&limit=20`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        },
      });
      if (res.ok) {
        const knowledge = await res.json();
        if (knowledge.length > 0) {
          knowledgeContext = "\n\nTudásbázis kontextus:\n" + knowledge.map((k: { category: string; content: string }) => `[${k.category}] ${k.content}`).join("\n");
        }
      }
    } catch {
      // Tudásbázis nem elérhető — nem kritikus
    }
  }

  // Gemini Live API config visszaadása a kliensnek
  return NextResponse.json({
    model: "gemini-3.1-flash-live-preview",
    apiKey: GEMINI_API_KEY, // A kliens WebSocket-en használja — HTTPS-en megy
    systemInstruction: SYSTEM_INSTRUCTION + knowledgeContext,
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Aoede" // Természetes, barátságos hang
          }
        }
      },
      generationConfig: {
        thinkingLevel: "low", // Gyors válaszok
        temperature: 0.7,
      }
    }
  });
}
