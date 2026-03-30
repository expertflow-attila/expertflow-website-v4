"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import ChatWidget from "@/components/chat-widget";

/* ================================================================
   COLORS & CONSTANTS
   ================================================================ */
const PURPLE_GLOW = "#a78bfa";
const PURPLE_BORDER = "rgba(109, 40, 217, 0.6)";
const PURPLE_BG = "rgba(109, 40, 217, 0.08)";
const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const STEPS = [
  { fields: ["name", "email"] as const, label: "Alapadatok" },
  { fields: ["business_name", "profession"] as const, label: "Vállalkozás" },
  { fields: ["problem", "previous_attempts"] as const, label: "Helyzet" },
  { fields: ["time_commitment", "budget", "how_found"] as const, label: "Részletek" },
];

/* ================================================================
   QUIZ PAGE
   ================================================================ */

const timeOptions = [
  "Nincs most kapacitásom",
  "Heti 2-3 óra",
  "Heti 5-10 óra",
  "Teljes elköteleződés",
];

const budgetOptions = [
  "Még nincs keret rá",
  "100-300 ezer Ft",
  "300-800 ezer Ft",
  "800 ezer Ft+",
];

interface FormData {
  name: string;
  email: string;
  business_name: string;
  profession: string;
  problem: string;
  previous_attempts: string;
  time_commitment: string;
  budget: string;
  how_found: string;
}

export default function KerdoivPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    business_name: "",
    profession: "",
    problem: "",
    previous_attempts: "",
    time_commitment: "",
    budget: "",
    how_found: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    posthog.capture("quiz_page_viewed", { version: "2.0" });
  }, []);

  /* Progress calculation */
  const filledSteps = useMemo(() => {
    return STEPS.map((step) =>
      step.fields.every((f) => form[f].trim() !== "")
    );
  }, [form]);

  const progressPercent = useMemo(() => {
    const requiredFields: (keyof FormData)[] = ["name", "email", "profession", "problem", "time_commitment", "budget"];
    const filled = requiredFields.filter((f) => form[f].trim() !== "").length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [form]);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    posthog.identify(form.email, { email: form.email, name: form.name, source: "quiz_2.0" });
    posthog.capture("quiz_submitted", {
      version: "2.0",
      has_budget: form.budget !== "" && form.budget !== "Még nincs keret rá",
      has_time: form.time_commitment !== "" && form.time_commitment !== "Nincs most kapacitásom",
      profession: form.profession,
      how_found: form.how_found,
    });

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Hiba történt");
      setSubmitted(true);
      posthog.capture("quiz_completed", { version: "2.0" });
      setTimeout(() => { window.location.href = CTA_URL; }, 2000);
    } catch {
      setError("Hiba történt a küldés során. Kérlek próbáld újra.");
      setSubmitting(false);
    }
  };

  /* ── SUCCESS STATE ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-[560px] w-full text-center">
          {/* Animated check circle */}
          <div
            className="inline-flex items-center justify-center w-20 h-20 mb-10"
            style={{
              border: "1.5px solid rgba(109,40,217,0.5)",
              borderRadius: "50%",
              boxShadow: "0 0 48px rgba(109,40,217,0.25), 0 0 96px rgba(109,40,217,0.1)",
              background: "radial-gradient(circle at center, rgba(109,40,217,0.08) 0%, transparent 70%)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={PURPLE_GLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 style={{
            color: "#f0f0f0",
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}>
            Köszönöm, {form.name}!
          </h1>
          <p style={{
            color: "#a0a0a0",
            fontSize: 16,
            lineHeight: 1.7,
            fontFamily: "Arial, Helvetica, sans-serif",
            maxWidth: 400,
            margin: "0 auto",
          }}>
            A válaszaid megérkeztek. Átirányítalak az időpontfoglaláshoz...
          </p>

          {/* Loading indicator */}
          <div className="mt-8 flex justify-center">
            <div style={{
              width: 200,
              height: 2,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 1,
              overflow: "hidden",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, ${PURPLE_GLOW}, transparent)`,
                animation: "shimmer 1.5s ease-in-out infinite",
              }} />
            </div>
          </div>

          <div className="mt-10">
            <a
              href={CTA_URL}
              className="transition-colors duration-300"
              style={{
                color: "#707070",
                fontSize: 13,
                fontFamily: "Arial, Helvetica, sans-serif",
                letterSpacing: "0.02em",
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = PURPLE_GLOW; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "#707070"; }}
            >
              vagy kattints ide a foglaláshoz &rarr;
            </a>
          </div>

          {/* Back link */}
          <div className="mt-16">
            <Link
              href="/"
              className="transition-colors duration-300"
              style={{ color: "#404040", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif" }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#707070"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "#404040"; }}
            >
              &larr; Vissza a főoldalra
            </Link>
          </div>
        </div>
        <ChatWidget />

        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 48px rgba(109,40,217,0.25), 0 0 96px rgba(109,40,217,0.1); }
            50% { box-shadow: 0 0 64px rgba(109,40,217,0.35), 0 0 128px rgba(109,40,217,0.15); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  /* ── FORM ── */
  const isDisabled = submitting || !form.name || !form.email || !form.profession || !form.problem || !form.time_commitment || !form.budget;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Back link */}
      <div className="px-6 pt-6">
        <div className="max-w-[700px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors duration-300"
            style={{ color: "#525252", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.02em" }}
            onMouseOver={(e) => { e.currentTarget.style.color = "#909090"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "#525252"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            expertflow.hu
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="pt-10 pb-10 px-6">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div
              className="overflow-hidden"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 24px rgba(109,40,217,0.12)",
              }}
            >
              <Image src="/images/attila.jpg" alt="Nagy Attila" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div>
              <p style={{ color: "#e8e8e8", fontSize: 14, fontWeight: 500, fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "-0.01em" }}>Nagy Attila</p>
              <p style={{ color: "#606060", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif" }}>Expert Flow</p>
            </div>
          </div>
          <h1 style={{
            color: "#f0f0f0",
            fontSize: 26,
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: 14,
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "-0.025em",
          }}>
            Beszéljünk arról, hogyan segíthetek a vállalkozásodnak
          </h1>
          <p style={{
            color: "#808080",
            fontSize: 15,
            lineHeight: 1.75,
            maxWidth: 540,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}>
            Töltsd ki az alábbi kérdőívet, hogy felkészülhessek a beszélgetésünkre.
            Utána átirányítalak a konzultációs időpont-foglaló felületre.
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-2">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2" style={{ flex: i < STEPS.length - 1 ? 1 : "none" }}>
                <div
                  className="transition-all duration-300 ease-out flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: filledSteps[i] ? "#f0f0f0" : "#525252",
                    backgroundColor: filledSteps[i] ? "rgba(109,40,217,0.4)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${filledSteps[i] ? "rgba(109,40,217,0.6)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: filledSteps[i] ? "0 0 16px rgba(109,40,217,0.2)" : "none",
                  }}
                >
                  {filledSteps[i] ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className="hidden sm:inline transition-colors duration-300"
                  style={{
                    fontSize: 11,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: filledSteps[i] ? "#808080" : "#404040",
                    letterSpacing: "0.03em",
                  }}
                >
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 mx-2 transition-all duration-300 ease-out"
                    style={{
                      height: 1,
                      backgroundColor: filledSteps[i] ? "rgba(109,40,217,0.3)" : "rgba(255,255,255,0.04)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Continuous progress bar */}
          <div style={{
            width: "100%",
            height: 2,
            backgroundColor: "rgba(255,255,255,0.04)",
            borderRadius: 1,
            overflow: "hidden",
          }}>
            <div
              className="transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: `linear-gradient(90deg, rgba(109,40,217,0.6), ${PURPLE_GLOW})`,
                borderRadius: 1,
                boxShadow: progressPercent > 0 ? `0 0 8px rgba(167,139,250,0.3)` : "none",
              }}
            />
          </div>
          <p className="transition-colors duration-300" style={{
            textAlign: "right",
            fontSize: 11,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#404040",
            marginTop: 6,
          }}>
            {progressPercent}% kész
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-6">
        <div className="max-w-[700px] mx-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }} />
      </div>

      {/* Form */}
      <div className="py-12 px-6">
        <form onSubmit={handleSubmit} className="max-w-[560px] mx-auto flex flex-col" style={{ gap: 36 }}>
          <Field label="Neved *">
            <TextInput value={form.name} onChange={(v) => updateField("name", v)} placeholder="Teljes neved" required />
          </Field>
          <Field label="Email *">
            <TextInput type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="email@pelda.hu" required />
          </Field>
          <Field label="Vállalkozásod neve / weboldal">
            <TextInput value={form.business_name} onChange={(v) => updateField("business_name", v)} placeholder="Pl. Példa Kft. vagy pelda.hu" />
          </Field>
          <Field label="Mivel foglalkozol? *">
            <TextInput value={form.profession} onChange={(v) => updateField("profession", v)} placeholder="Pl. pénzügyi tanácsadó, coach, ügyvéd..." required />
          </Field>
          <Field label="Mi az a konkrét probléma, ami sürget? *">
            <TextArea value={form.problem} onChange={(v) => updateField("problem", v)} placeholder="Miben érzed, hogy elakadtál, vagy mit szeretnél másként csinálni?" required />
          </Field>
          <Field label="Mit próbáltál eddig ennek megoldására?">
            <TextArea value={form.previous_attempts} onChange={(v) => updateField("previous_attempts", v)} placeholder="Milyen megoldásokat próbáltál már ki? (vagy még semmit)" />
          </Field>
          <Field label="Mennyi időt tudsz erre szánni? *">
            <OptionButtons options={timeOptions} selected={form.time_commitment} onSelect={(v) => updateField("time_commitment", v)} />
          </Field>
          <Field label="Mekkora kereted van erre? *">
            <OptionButtons options={budgetOptions} selected={form.budget} onSelect={(v) => updateField("budget", v)} />
          </Field>
          <Field label="Honnan hallottál rólam?">
            <TextInput value={form.how_found} onChange={(v) => updateField("how_found", v)} placeholder="Pl. Google, ismerős ajánlása, YouTube..." />
          </Field>

          {error && (
            <div
              className="transition-all duration-300"
              style={{
                padding: "12px 16px",
                backgroundColor: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
                color: "#f87171",
                fontSize: 14,
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              {error}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isDisabled}
              className="btn-premium w-full transition-all duration-300 ease-out"
              style={{
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "Arial, Helvetica, sans-serif",
                color: isDisabled ? "#606060" : "#f0f0f0",
                backgroundColor: submitting ? "rgba(109, 40, 217, 0.2)" : isDisabled ? "rgba(255,255,255,0.02)" : "rgba(109, 40, 217, 0.5)",
                border: `1px solid ${isDisabled ? "rgba(255,255,255,0.06)" : "rgba(109, 40, 217, 0.7)"}`,
                cursor: submitting ? "wait" : isDisabled ? "not-allowed" : "pointer",
                padding: "16px 32px",
                borderRadius: 0,
                boxShadow: !isDisabled ? "0 0 32px rgba(109, 40, 217, 0.15), 0 4px 16px rgba(0,0,0,0.3)" : "none",
                letterSpacing: "0.02em",
              }}
            >
              {submitting ? "Küldés..." : "Kérdőív beküldése"}
              {!submitting && (
                <span className="inline-block ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1">&rarr;</span>
              )}
            </button>
            <p style={{
              textAlign: "center",
              fontSize: 11,
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#353535",
              marginTop: 12,
            }}>
              Az adataidat bizalmasan kezeljük.
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 pb-16">
        <div className="max-w-[700px] mx-auto pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="transition-colors duration-300"
              style={{ color: "#353535", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif" }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#606060"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "#353535"; }}
            >
              &larr; expertflow.hu
            </Link>
            <p style={{ color: "#353535", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif" }}>
              Expert Flow &mdash; AI rendszerek szolgáltató vállalkozóknak
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

/* ================================================================
   FORM COMPONENTS
   ================================================================ */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: 11,
        letterSpacing: "0.08em",
        color: "#707070",
        marginBottom: 10,
        textTransform: "lowercase",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: 500,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", required }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
      className="w-full transition-all duration-300 ease-out"
      style={{
        padding: "12px 14px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#f0f0f0",
        fontSize: 15,
        fontFamily: "Arial, Helvetica, sans-serif",
        outline: "none",
        borderRadius: 0,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = PURPLE_BORDER;
        e.currentTarget.style.backgroundColor = PURPLE_BG;
        e.currentTarget.style.boxShadow = "0 0 24px rgba(109,40,217,0.08)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = e.currentTarget.value ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)";
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

function TextArea({ value, onChange, placeholder, required }: { value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) {
  return (
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} rows={3}
      className="w-full transition-all duration-300 ease-out"
      style={{
        padding: "12px 14px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#f0f0f0",
        fontSize: 15,
        fontFamily: "Arial, Helvetica, sans-serif",
        outline: "none",
        resize: "vertical",
        minHeight: 100,
        borderRadius: 0,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = PURPLE_BORDER;
        e.currentTarget.style.backgroundColor = PURPLE_BG;
        e.currentTarget.style.boxShadow = "0 0 24px rgba(109,40,217,0.08)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = e.currentTarget.value ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)";
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

function OptionButtons({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt} type="button" onClick={() => onSelect(opt)}
            className="text-left w-full transition-all duration-300 ease-out"
            style={{
              padding: "12px 16px",
              backgroundColor: isSelected ? PURPLE_BG : "rgba(255,255,255,0.02)",
              border: `1px solid ${isSelected ? PURPLE_BORDER : "rgba(255,255,255,0.08)"}`,
              color: isSelected ? "#e8e8e8" : "#909090",
              fontSize: 14,
              fontFamily: "Arial, Helvetica, sans-serif",
              cursor: "pointer",
              borderRadius: 0,
              boxShadow: isSelected ? "0 0 20px rgba(109,40,217,0.1)" : "none",
            }}
            onMouseOver={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#c0c0c0";
              }
            }}
            onMouseOut={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#909090";
              }
            }}
          >
            {isSelected && <span style={{ color: PURPLE_GLOW, marginRight: 8, fontWeight: 600 }}>&gt;</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
