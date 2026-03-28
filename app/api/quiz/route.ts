/**
 * Quiz 2.0 API — Kérdőív beküldés feldolgozás
 *
 * POST /api/quiz
 * 1. Validálja a mezőket
 * 2. Menti a Supabase typeform_responses táblába
 * 3. Prospect létrehozás/összekapcsolás
 * 4. Activity log
 * 5. Háttérben kutatás + email összefoglaló Attila ProtonMail-jére
 */

import { NextRequest, NextResponse, after } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PROTON_EMAIL = "nagyattilaferenc@proton.me";
const FREE_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "outlook.hu",
  "proton.me", "protonmail.com", "freemail.hu", "citromail.hu",
  "indamail.hu", "t-online.hu", "mailbox.hu",
];

function getDb() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_KEY || "";
  return createClient(url, key);
}

/* ── Exa neural search ── */
async function exaSearch(query: string, domains?: string[]): Promise<string[]> {
  const key = process.env.EXA_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: { "x-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        type: "neural",
        numResults: 5,
        ...(domains && { includeDomains: domains }),
        summary: true,
      }),
    });
    const data = (await res.json()) as { results?: { title: string; url: string; summary?: string }[] };
    return (data.results || []).map((r) => `  - ${r.title}: ${r.summary || r.url}`);
  } catch {
    return [];
  }
}

/* ── Apify Google scraping ── */
async function apifyGoogleSearch(query: string): Promise<string[]> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return [];
  try {
    const run = await fetch(
      `https://api.apify.com/v2/acts/apify/google-search-scraper/runs?token=${token}&waitForFinish=30`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queries: query, maxPagesPerQuery: 1, resultsPerPage: 5, languageCode: "hu", countryCode: "hu" }),
      }
    );
    const runData = (await run.json()) as { data?: { defaultDatasetId?: string } };
    if (!runData?.data?.defaultDatasetId) return [];
    const items = await fetch(`https://api.apify.com/v2/datasets/${runData.data.defaultDatasetId}/items?token=${token}&limit=5`);
    const results = ((await items.json()) as { organicResults?: { title: string; url: string; description?: string }[] }[])
      .flatMap((i) => i.organicResults || [])
      .slice(0, 5);
    return results.map((r) => `  - ${r.title}: ${r.description?.slice(0, 200) || r.url}`);
  } catch {
    return [];
  }
}

/* ── Research prospect ── */
async function researchProspect(name: string, email: string, businessName?: string): Promise<string> {
  const findings: string[] = [];
  const emailDomain = email.split("@")[1];
  const hasBizDomain = emailDomain && !FREE_DOMAINS.includes(emailDomain);

  const tasks: Promise<void>[] = [];

  // Exa name search
  tasks.push(exaSearch(`${name} vállalkozó Magyarország`).then((r) => {
    if (r.length) findings.push("EXA KERESES:\n" + r.join("\n"));
  }));

  // LinkedIn
  tasks.push(exaSearch(name, ["linkedin.com"]).then((r) => {
    if (r.length) findings.push("LINKEDIN:\n" + r.join("\n"));
  }));

  // Social media
  tasks.push(exaSearch(name, ["facebook.com", "instagram.com"]).then((r) => {
    if (r.length) findings.push("SOCIAL MEDIA:\n" + r.join("\n"));
  }));

  // Google search
  tasks.push(apifyGoogleSearch(`"${name}" ${businessName || ""} vállalkozó OR cég`).then((r) => {
    if (r.length) findings.push("GOOGLE KERESES:\n" + r.join("\n"));
  }));

  // Business domain scraping
  if (hasBizDomain) {
    findings.push(`SAJAT DOMAIN: ${emailDomain}`);
    tasks.push(exaSearch(`site:${emailDomain}`).then((r) => {
      if (r.length) findings.push("WEBOLDAL:\n" + r.join("\n"));
    }));
  }

  await Promise.all(tasks);
  return findings.length ? findings.join("\n\n") : "Nincs publikus informacio.";
}

/* ── Claude summary ── */
async function generateQuizSummary(data: QuizData, research: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return "";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{
          role: "user",
          content: `Kérdőív kitöltés összefoglaló készítése.

KITÖLTŐ:
- Név: ${data.name}
- Email: ${data.email}
- Vállalkozás: ${data.business_name || "nincs megadva"}
- Szakma: ${data.profession}
- Probléma: ${data.problem}
- Eddigi próbálkozások: ${data.previous_attempts || "nincs megadva"}
- Idő: ${data.time_commitment}
- Budget: ${data.budget}
- Honnan: ${data.how_found || "nincs megadva"}

KUTATÁSI EREDMÉNYEK:
${research}

Készíts rövid, gyakorlatias összefoglalót:
1. Ki ez az ember és mit csinál?
2. Mi a fő problémája?
3. Mennyire komoly érdeklődő? (budget + idő alapján)
4. Mire érdemes figyelni a konzultáción?
Magyar nyelven, tömören.`,
        }],
      }),
    });
    const msg = (await res.json()) as { content?: { text: string }[] };
    return msg.content?.[0]?.text || "";
  } catch {
    return "";
  }
}

/* ── Send email via GWS ── */
async function sendSummaryEmail(data: QuizData, research: string, summary: string) {
  // Try GWS gmailSendInternal if available, fallback to Supabase edge function
  const gwsCredentials = process.env.GWS_CREDENTIALS_JSON;
  if (!gwsCredentials) {
    console.log("GWS credentials not available, skipping email");
    return;
  }

  // Use fetch to the main API for email sending
  const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "";
  if (!vercelUrl) return;

  try {
    await fetch(`https://${vercelUrl}/api/internal/send-quiz-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: PROTON_EMAIL,
        subject: `Kérdőív 2.0: ${data.name} (${data.profession})`,
        body: `KÉRDŐÍV 2.0 KITÖLTÉS\n${"=".repeat(40)}\n\n` +
          `Név: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Vállalkozás: ${data.business_name || "-"}\n` +
          `Szakma: ${data.profession}\n` +
          `Probléma: ${data.problem}\n` +
          `Eddig próbált: ${data.previous_attempts || "-"}\n` +
          `Idő: ${data.time_commitment}\n` +
          `Budget: ${data.budget}\n` +
          `Honnan: ${data.how_found || "-"}\n\n` +
          `${"─".repeat(40)}\nKUTATÁS\n${"─".repeat(40)}\n${research}\n\n` +
          `${"─".repeat(40)}\nAI ÖSSZEFOGLALÓ\n${"─".repeat(40)}\n${summary}`,
      }),
    });
  } catch (err) {
    console.error("Email küldési hiba:", err);
  }
}

interface QuizData {
  name: string;
  email: string;
  business_name?: string;
  profession: string;
  problem: string;
  previous_attempts?: string;
  time_commitment: string;
  budget: string;
  how_found?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuizData;
    const db = getDb();

    // Validation
    if (!body.name || !body.email || !body.profession || !body.problem || !body.time_commitment || !body.budget) {
      return NextResponse.json({ error: "Hiányzó kötelező mezők" }, { status: 400 });
    }

    const responseId = `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // 1. Save to typeform_responses (same table, different form_id)
    const { error: insertError } = await db.from("typeform_responses").upsert(
      {
        response_id: responseId,
        form_id: "quiz_2.0",
        email: body.email,
        name: body.name,
        phone: null,
        answers: [
          { question: "Név", ref: "name", type: "text", answer: body.name },
          { question: "Email", ref: "email", type: "email", answer: body.email },
          { question: "Vállalkozás", ref: "business_name", type: "text", answer: body.business_name || "" },
          { question: "Szakma", ref: "profession", type: "text", answer: body.profession },
          { question: "Probléma", ref: "problem", type: "text", answer: body.problem },
          { question: "Eddigi próbálkozások", ref: "previous_attempts", type: "text", answer: body.previous_attempts || "" },
          { question: "Idő elköteleződés", ref: "time_commitment", type: "choice", answer: body.time_commitment },
          { question: "Budget", ref: "budget", type: "choice", answer: body.budget },
          { question: "Honnan hallottál rólam", ref: "how_found", type: "text", answer: body.how_found || "" },
        ],
        business_name: body.business_name || null,
        profession: body.profession,
        problem: body.problem,
        previous_attempts: body.previous_attempts || null,
        time_commitment: body.time_commitment,
        budget: body.budget,
        timeline: null,
        how_found: body.how_found || null,
        submitted_at: new Date().toISOString(),
      },
      { onConflict: "response_id" }
    );

    if (insertError) {
      console.error("Quiz mentési hiba:", insertError);
    }

    // 2. Find or create prospect
    let prospectId: string | null = null;

    // Search by email
    const { data: existing } = await db
      .from("prospects")
      .select("id")
      .eq("email", body.email)
      .limit(1);

    if (existing?.length) {
      prospectId = existing[0].id;
    }

    // Create new prospect if not found
    if (!prospectId) {
      const { data: newProspect } = await db
        .from("prospects")
        .insert({
          name: body.name,
          business_name: body.business_name || "",
          profession: body.profession,
          location: "",
          email: body.email,
          phone: "",
          summary: body.problem,
          services: "",
          pain_points: body.problem,
          expert_flow_angle: `Kérdőív 2.0: ${body.problem.substring(0, 100)}`,
          source: "referral",
          status: "new",
          notes: [
            body.budget ? `Budget: ${body.budget}` : "",
            body.time_commitment ? `Idő: ${body.time_commitment}` : "",
            body.how_found ? `Honnan: ${body.how_found}` : "",
          ]
            .filter(Boolean)
            .join(" | "),
        })
        .select("id")
        .single();

      prospectId = newProspect?.id || null;
    }

    // Link prospect to quiz response
    if (prospectId) {
      await db
        .from("typeform_responses")
        .update({ prospect_id: prospectId })
        .eq("response_id", responseId);
    }

    // 3. Activity log
    const summary = [
      body.name,
      body.profession ? `(${body.profession})` : "",
      body.problem ? `— "${body.problem.substring(0, 80)}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    await db.from("activity_log").insert({
      agent: "quiz_2.0",
      action: "form_submitted",
      details: `Kérdőív 2.0 kitöltve: ${summary}`,
      prospect_id: prospectId,
    });

    // 4. Background: Research + Email summary (runs after response via Next.js `after`)
    after(async () => {
      try {
        const bgDb = getDb();
        const research = await researchProspect(body.name, body.email, body.business_name);
        const aiSummary = await generateQuizSummary(body, research);
        await sendSummaryEmail(body, research, aiSummary);

        await bgDb.from("activity_log").insert({
          agent: "quiz_2.0",
          action: "research_completed",
          details: `Kutatás kész: ${body.name} — email elküldve`,
          prospect_id: prospectId,
        });
      } catch (err) {
        console.error("Research/email hiba:", err);
      }
    });

    return NextResponse.json({
      ok: true,
      prospect_id: prospectId,
      name: body.name,
      email: body.email,
    });
  } catch (err) {
    console.error("Quiz API hiba:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
