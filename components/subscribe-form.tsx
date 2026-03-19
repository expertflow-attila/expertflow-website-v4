"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { trackSubscribe, identifyUser } from "@/lib/analytics";

const API_URL = "https://expert-flow-ai-team.vercel.app/api/subscribe";

interface SubscribeFormProps {
  funnel?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  dark?: boolean;
}

export default function SubscribeForm({
  funnel = "welcome",
  heading = "Iratkozz fel a hírlevelemre",
  description = "Heti tippek, gondolatok és gyakorlati tanácsok vállalkozóknak — AI, rendszerek, működés.",
  buttonText = "Feliratkozás",
  className = "",
  dark = false,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, funnel, website }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        identifyUser(email, name);
        trackSubscribe(funnel);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Hiba történt. Próbáld újra.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Hálózati hiba. Próbáld újra.");
    }
  };

  if (status === "success") {
    return (
      <div className={`${className}`}>
        <div className={`flex items-center gap-3 p-6 rounded-lg border ${
          dark ? "border-white/20 bg-white/5" : "border-foreground/10 bg-card"
        }`}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            dark ? "bg-white/10" : "bg-foreground/5"
          }`}>
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display tracking-tight">Köszönöm a feliratkozást!</p>
            <p className={`text-sm ${dark ? "opacity-60" : "text-muted-foreground"}`}>
              Nézd meg az emailjeidet — küldtem egy üdvözlőt.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {heading && (
        <h3 className="text-xl font-display tracking-tight mb-2">{heading}</h3>
      )}
      {description && (
        <p className={`text-sm mb-5 leading-relaxed ${dark ? "opacity-60" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Keresztneved"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`h-12 px-4 rounded-lg text-sm transition-colors ${
            dark
              ? "bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30"
              : "bg-background border border-foreground/10 placeholder:text-muted-foreground focus:border-foreground/30"
          } outline-none`}
        />
        <div className="flex gap-3">
          <input
            type="email"
            required
            placeholder="email@cim.hu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 h-12 px-4 rounded-lg text-sm transition-colors ${
              dark
                ? "bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30"
                : "bg-background border border-foreground/10 placeholder:text-muted-foreground focus:border-foreground/30"
            } outline-none`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`inline-flex items-center gap-2 px-6 h-12 rounded-lg text-sm transition-colors shrink-0 ${
              dark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            } disabled:opacity-50`}
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {buttonText}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Honeypot — rejtett mező botszűréshez */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] opacity-0 h-0 w-0"
          tabIndex={-1}
          autoComplete="off"
        />

        {status === "error" && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
