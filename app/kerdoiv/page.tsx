"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import ChatWidget from "@/components/chat-widget";

/* ================================================================
   COLORS & CONSTANTS
   ================================================================ */
const PURPLE_GLOW = "#a78bfa";
const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

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
          <div
            className="inline-flex items-center justify-center w-16 h-16 mb-8"
            style={{ border: "1.5px solid #6d28d9", borderRadius: "50%", boxShadow: "0 0 32px rgba(109,40,217,0.3)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PURPLE_GLOW} strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 style={{ color: "#f0f0f0", fontSize: 24, fontWeight: 500, marginBottom: 12 }}>
            Köszönöm, {form.name}!
          </h1>
          <p style={{ color: "#b0b0b0", fontSize: 16, lineHeight: 1.6 }}>
            A válaszaid megérkeztek. Átirányítalak az időpontfoglaláshoz...
          </p>
          <div className="mt-8">
            <a href={CTA_URL} style={{ color: PURPLE_GLOW, fontSize: 14, textDecoration: "underline", textUnderlineOffset: "4px" }}>
              vagy kattints ide a foglaláshoz &rarr;
            </a>
          </div>
        </div>
        <ChatWidget />
      </div>
    );
  }

  /* ── FORM ── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero */}
      <div className="pt-16 pb-12 px-6">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-5 mb-10">
            <div className="overflow-hidden" style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image src="/images/attila.jpg" alt="Nagy Attila" width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <div>
              <p style={{ color: "#f0f0f0", fontSize: 14, fontWeight: 500 }}>Nagy Attila</p>
              <p style={{ color: "#b0b0b0", fontSize: 12 }}>Expert Flow</p>
            </div>
          </div>
          <h1 style={{ color: "#f0f0f0", fontSize: 22, fontWeight: 500, lineHeight: 1.5, marginBottom: 12 }}>
            Beszéljünk arról, hogyan segíthetek a vállalkozásodnak
          </h1>
          <p style={{ color: "#b0b0b0", fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
            Töltsd ki az alábbi kérdőívet, hogy felkészülhessek a beszélgetésünkre.
            Utána átirányítalak a konzultációs időpont-foglaló felületre.
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-6">
        <div className="max-w-[700px] mx-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* Form */}
      <div className="py-12 px-6">
        <form onSubmit={handleSubmit} className="max-w-[560px] mx-auto flex flex-col" style={{ gap: 32 }}>
          <Field label="neved *">
            <TextInput value={form.name} onChange={(v) => updateField("name", v)} placeholder="Teljes neved" required />
          </Field>
          <Field label="email *">
            <TextInput type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="email@pelda.hu" required />
          </Field>
          <Field label="vállalkozásod neve / weboldal">
            <TextInput value={form.business_name} onChange={(v) => updateField("business_name", v)} placeholder="Pl. Példa Kft. vagy pelda.hu" />
          </Field>
          <Field label="mivel foglalkozol? *">
            <TextInput value={form.profession} onChange={(v) => updateField("profession", v)} placeholder="Pl. pénzügyi tanácsadó, coach, ügyvéd..." required />
          </Field>
          <Field label="mi az a konkrét probléma, ami sürget? *">
            <TextArea value={form.problem} onChange={(v) => updateField("problem", v)} placeholder="Miben érzed, hogy elakadtál, vagy mit szeretnél másképp csinálni?" required />
          </Field>
          <Field label="mit próbáltál eddig ennek megoldására?">
            <TextArea value={form.previous_attempts} onChange={(v) => updateField("previous_attempts", v)} placeholder="Milyen megoldásokat próbáltál már ki? (vagy még semmit)" />
          </Field>
          <Field label="mennyi időt tudsz erre szánni? *">
            <OptionButtons options={timeOptions} selected={form.time_commitment} onSelect={(v) => updateField("time_commitment", v)} />
          </Field>
          <Field label="mekkora kereted van erre? *">
            <OptionButtons options={budgetOptions} selected={form.budget} onSelect={(v) => updateField("budget", v)} />
          </Field>
          <Field label="honnan hallottál rólam?">
            <TextInput value={form.how_found} onChange={(v) => updateField("how_found", v)} placeholder="Pl. Google, ismerős ajánlása, YouTube..." />
          </Field>

          {error && <p style={{ color: "#ef4444", fontSize: 14 }}>{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting || !form.name || !form.email || !form.profession || !form.problem || !form.time_commitment || !form.budget}
              className="transition-all duration-300 w-full"
              style={{
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "#f0f0f0",
                backgroundColor: submitting ? "rgba(109, 40, 217, 0.3)" : "rgba(109, 40, 217, 0.6)",
                border: "1px solid rgba(109, 40, 217, 0.8)",
                cursor: submitting ? "wait" : "pointer",
                padding: "14px 32px",
                borderRadius: 0,
                opacity: (!form.name || !form.email || !form.profession || !form.problem || !form.time_commitment || !form.budget) ? 0.3 : 1,
                boxShadow: "0 0 20px rgba(109, 40, 217, 0.2)",
              }}
            >
              {submitting ? "Küldés..." : "Kérdőív beküldése →"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 pb-16">
        <div className="max-w-[700px] mx-auto pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#525252", fontSize: 12, textAlign: "center" }}>
            Expert Flow &mdash; AI rendszerek szolgáltató vállalkozóknak
          </p>
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
      <label style={{ display: "block", fontSize: 12, letterSpacing: "0.05em", color: "#b0b0b0", marginBottom: 8, textTransform: "lowercase" }}>
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
      className="w-full transition-colors duration-200"
      style={{ padding: "10px 12px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f0", fontSize: 15, fontFamily: "Arial, Helvetica, sans-serif", outline: "none", borderRadius: 0 }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(109, 40, 217, 0.5)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
    />
  );
}

function TextArea({ value, onChange, placeholder, required }: { value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) {
  return (
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} rows={3}
      className="w-full transition-colors duration-200"
      style={{ padding: "10px 12px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f0", fontSize: 15, fontFamily: "Arial, Helvetica, sans-serif", outline: "none", resize: "vertical", minHeight: 90, borderRadius: 0 }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(109, 40, 217, 0.5)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
    />
  );
}

function OptionButtons({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt} type="button" onClick={() => onSelect(opt)}
            className="text-left w-full transition-all duration-200"
            style={{
              padding: "10px 14px", backgroundColor: "transparent",
              border: `1px solid ${isSelected ? "rgba(109, 40, 217, 0.6)" : "rgba(255,255,255,0.1)"}`,
              color: isSelected ? "#f0f0f0" : "#b0b0b0",
              fontSize: 14, fontFamily: "Arial, Helvetica, sans-serif", cursor: "pointer", borderRadius: 0,
            }}
          >
            {isSelected && <span style={{ color: PURPLE_GLOW, marginRight: 8 }}>&gt;</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
