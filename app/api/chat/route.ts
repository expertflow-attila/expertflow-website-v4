/**
 * Chat API — Gemini 3.1 Flash alapú AI asszisztens
 *
 * POST /api/chat
 * - Text chat: Gemini REST API
 * - Email értesítés: ha a user kontakt adatot ad meg
 */

import { NextRequest, NextResponse } from "next/server";

const PROTON_EMAIL = "nagyattilaferenc@proton.me";
const CAL_LINK = "https://cal.com/attila-nagy-8uefco/30min";

const SYSTEM_PROMPT = `Te Anna vagy, az Expert Flow AI asszisztense. Magyar nyelven kommunikálsz.

=== FELADATOD ===
1. Válaszolj a kérdésekre az Expert Flow szolgáltatásairól
2. Segíts a kérdőív kitöltésében ha elakadnak
3. Ha időpontot akarnak foglalni, irányítsd ide: ${CAL_LINK}
4. Ha üzenetet akarnak küldeni Attilának, kérd el az email/telefon adataikat
5. Email/telefon adatokat mindig SZÖVEGESEN kérd (a chat input mezőbe)

=== AZ ALAPÍTÓ ===
Nagy Attila Ferenc, egyéni vállalkozó, Budapest. 16 évig rúdugró, sérülés után vállalkozásépítés. Expert Flow 2025-ben született.
Kontakt: hello@expertflow.hu | expertflow.hu

=== EXPERT FLOW ===
AI-alapú rendszerek szolgáltató egyéni vállalkozóknak (coach, terapeuta, tanácsadó, edző, designer, fotós, ügyvéd, könyvelő stb.)

=== 3 PILLÉR ===
1. ÜGYFÉLSZERZÉS: Weboldal, AI asszisztens, kampányok, előszűrés
2. KISZOLGÁLÁS: Onboarding, utánkövetés, AI ügyfélkezelés, visszajelzés
3. HÁTTÉRMŰKÖDÉS: Számlázás, CRM, AI csapat, heti összesítők
Sorrend: háttér → kiszolgálás → ügyfélszerzés. 7 lépés, 4-6 hónap.

=== ÁRAZÁS ===
- Blueprint: 200.000 Ft/projekt — 1 pillér
- Framework (ajánlott): 400.000 Ft/projekt — mind 3 pillér
- Blueprint Pro: 600.000 Ft/hó — folyamatos együttműködés
Pontos ár konzultáción dől el. Részletfizetés elérhető. 100% pénzvisszafizetési garancia.

=== FAQ ===
- Kell AI tudás? Nem.
- Van vállalkozásom, mi lesz? Nem bontunk le semmit, fokozatos fejlesztés.
- Mikor látok eredményt? 4-6 héten belül.
- Elvesztem a személyes kapcsolatot? Pont az ellenkezője.
- Van részletfizetés? Igen.

=== 14 REFERENCIA ===
Jóga stúdió, webfejlesztő, life coach, edzőterem, designer, építész, könyvelő, szépségszalon stb.

=== SZABÁLYOK ===
- Mindig magyarul, természetes hangnemben, tömören (max 2-3 mondat)
- Barátságos, empatikus, NEM tolakodó
- NE adj technikai AI részleteket
- NE hype-olj, NE nyomulj
- Ha nem tudsz válaszolni: "Ezt jobb lenne Attilával megbeszélni a konzultáción"
- KONZULTÁCIÓ LINK: ${CAL_LINK}`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  contactInfo?: { email?: string; phone?: string; name?: string };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Üres üzenet" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    // Build conversation history for Gemini
    const contents: { role: string; parts: { text: string }[] }[] = [];

    if (body.history?.length) {
      for (const msg of body.history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: body.message }],
    });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sajnálom, nem tudtam választ generálni. Kérlek próbáld újra.";

    // If contact info provided, send email notification
    if (body.contactInfo?.email || body.contactInfo?.phone) {
      await sendNotification(body.contactInfo, body.message, body.history || []);
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);

    // Fallback if Gemini not configured
    if (String(err).includes("GEMINI_API_KEY")) {
      return NextResponse.json({
        reply: "Sajnálom, jelenleg nem tudok válaszolni. Kérlek keress minket a hello@expertflow.hu címen, vagy foglalj konzultációt: cal.com/attila-nagy-8uefco/30min",
      });
    }

    return NextResponse.json({ error: "Hiba történt" }, { status: 500 });
  }
}

/** Email notification to Attila when someone provides contact info or sends a message */
async function sendNotification(
  contact: { email?: string; phone?: string; name?: string },
  lastMessage: string,
  history: ChatMessage[]
) {
  try {
    // Build conversation summary
    const convoSummary = history
      .slice(-6)
      .map((m) => `${m.role === "user" ? "Érdeklődő" : "Anna"}: ${m.content}`)
      .join("\n");

    const emailBody = [
      "CHAT ÉRTESÍTÉS — Expert Flow Asszisztens",
      "=".repeat(40),
      "",
      contact.name ? `Név: ${contact.name}` : "",
      contact.email ? `Email: ${contact.email}` : "",
      contact.phone ? `Telefon: ${contact.phone}` : "",
      "",
      "─".repeat(40),
      "UTOLSÓ ÜZENET:",
      lastMessage,
      "",
      convoSummary ? "─".repeat(40) + "\nBESZÉLGETÉS:\n" + convoSummary : "",
      "",
      "─".repeat(40),
      `Időpont: ${new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" })}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Try sending via the main project's email system
    const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    if (vercelUrl) {
      await fetch(`https://${vercelUrl}/api/internal/send-quiz-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: PROTON_EMAIL,
          subject: `Chat: ${contact.name || contact.email || contact.phone || "Ismeretlen"} — Expert Flow`,
          body: emailBody,
        }),
      });
    }

    // Also log to Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const db = createClient(supabaseUrl, supabaseKey);
      await db.from("activity_log").insert({
        agent: "voice_agent",
        action: "chat_contact",
        details: `Chat értesítés: ${contact.name || ""} ${contact.email || ""} ${contact.phone || ""} — "${lastMessage.substring(0, 100)}"`,
      });
    }
  } catch (err) {
    console.error("Notification error:", err);
  }
}
