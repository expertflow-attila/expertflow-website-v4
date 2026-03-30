"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, Play } from "lucide-react";
import ChatWidget from "@/components/chat-widget";

/* ── COURSE DATA ── */

const phases = [
  {
    id: 1,
    name: "Tiszta alapok",
    subtitle: "Mielőtt bármit építesz, tudd, kinek és mit",
    steps: [
      {
        num: "01",
        title: "Gondolkodásmód-váltás",
        desc: "Az alkalmazotti gondolkodás 3 jele — és hogyan kapcsolj át vállalkozói módba.",
        result: "Felismert alkalmazotti reflexek",
        duration: "10-15 perc",
      },
      {
        num: "02",
        title: "Célcsoportod meghatározása",
        desc: "A 3 kérdés módszer: kinek tudsz értéket adni, kivel élvezed a munkát, ki tud fizetni érte?",
        result: "Kitöltött ideális ügyfél portré",
        duration: "10-15 perc",
      },
      {
        num: "03",
        title: "Ajánlatod megfogalmazása",
        desc: "Egy mondatos értékajánlat formula: [Célcsoport]-nak segítek [eredmény]-t elérni [módszer] által.",
        result: "Véglegesített értékajánlat (1 mondat)",
        duration: "10-15 perc",
      },
    ],
  },
  {
    id: 2,
    name: "Digitális jelenlét",
    subtitle: "A vállalkozásod online lakcíme",
    steps: [
      {
        num: "04",
        title: "Domain választás",
        desc: "Mi az a domain, hogyan válassz jó nevet, .hu vs .com — és miért számít.",
        result: "Kiválasztott domainnév",
        duration: "10 perc",
      },
      {
        num: "05",
        title: "Domain vásárlás",
        desc: "Cloudflare Registrar lépésről lépésre — minden kattintás, minden mező.",
        result: "Megvásárolt, aktív domain",
        duration: "10 perc",
      },
      {
        num: "06",
        title: "Üzleti e-mail beállítása",
        desc: "Google Workspace + MX rekordok + email aláírás — professzionális első benyomás.",
        result: "Működő te@teneved.hu email",
        duration: "15 perc",
      },
      {
        num: "07",
        title: "Google ökoszisztéma",
        desc: "Drive mappastruktúra + Calendar színkódolás + Contacts címkézés.",
        result: "Strukturált digitális iroda",
        duration: "10 perc",
      },
    ],
  },
  {
    id: 3,
    name: "Weboldal",
    subtitle: "Az online jelenlét, ami értékesít helyetted",
    steps: [
      {
        num: "08",
        title: "Landing page tervezés",
        desc: "Az egy-cél elv: headline, alcím, előnyök, CTA. A szöveg fontosabb, mint a dizájn.",
        result: "Szövegek és struktúra papíron",
        duration: "15-20 perc",
      },
      {
        num: "09",
        title: "Weboldal építés Claude-dal",
        desc: "Élőben, képernyőmegosztással — a kurzus fő \"wow\" pillanata.",
        result: "Kész HTML landing page",
        duration: "15-20 perc",
      },
      {
        num: "10",
        title: "Élesítés",
        desc: "Cloudflare Pages hosting + domain csatlakoztatás + HTTPS — percek alatt él.",
        result: "Élő weboldal a saját domaineden",
        duration: "10 perc",
      },
      {
        num: "11",
        title: "Alapvető SEO",
        desc: "Title tag, meta description, Google Search Console — 15 perc, hetekig dolgozik.",
        result: "Google Search Console élve",
        duration: "10 perc",
      },
    ],
  },
  {
    id: 4,
    name: "AI eszköztár",
    subtitle: "Felturbózod a munkádat",
    steps: [
      {
        num: "12",
        title: "IDE telepítés",
        desc: "VS Code vagy Cursor + AI integráció + 5 terminálparancs, amivel boldogulsz.",
        result: "Telepített IDE, 1 sikeres teszt",
        duration: "15-20 perc",
      },
      {
        num: "13",
        title: "Claude mint üzleti társ",
        desc: "Claude Project beállítása Custom Instructions-szel — nem chatbot, hanem kolléga.",
        result: "Beállított Claude Project, 3 sikeres feladat",
        duration: "15-20 perc",
      },
    ],
  },
  {
    id: 5,
    name: "Üzleti rendszerek",
    subtitle: "Profi kommunikáció és ügyfélkezelés",
    steps: [
      {
        num: "14",
        title: "Email rendszer",
        desc: "Gmail szervezés (címkék + szűrők) + 3 email sablon Claude-dal.",
        result: "Rendezett Gmail + 3 sablon",
        duration: "10-15 perc",
      },
      {
        num: "15",
        title: "CRM bevezetése",
        desc: "Google Sheets vagy Notion pipeline: Érdeklődő → Ajánlat → Tárgyalás → Ügyfél.",
        result: "Működő CRM pipeline-nel",
        duration: "10-15 perc",
      },
      {
        num: "16",
        title: "Időpontfoglalás",
        desc: "Cal.com beállítás + Calendar csatlakoztatás + automatikus emlékeztetők.",
        result: "Működő Cal.com foglalási rendszer",
        duration: "10 perc",
      },
    ],
  },
  {
    id: 6,
    name: "Automatizálás",
    subtitle: "A gép dolgozik helyetted",
    steps: [
      {
        num: "17",
        title: "Automatizálás megértése",
        desc: "Trigger → Művelet → Eredmény. Mi automatizálható és mi nem.",
        result: "Lista az automatizálható feladatokról",
        duration: "10 perc",
      },
      {
        num: "18",
        title: "Első 3 automatizálás",
        desc: "n8n-ben: weboldal → CRM, Cal.com → előkészítő email, heti összefoglaló.",
        result: "3 működő n8n workflow",
        duration: "20 perc",
      },
      {
        num: "19",
        title: "Email és naptár automatizálás",
        desc: "AI kategorizálás + naptár-alapú előkészítés és follow-up.",
        result: "Automatikus email + naptár",
        duration: "15 perc",
      },
    ],
  },
  {
    id: 7,
    name: "Összekapcsolás",
    subtitle: "Minden rendszer egységes egésszé áll össze",
    steps: [
      {
        num: "20",
        title: "Rendszertérkép",
        desc: "Madártávlatból: weboldal → CRM → email → naptár → AI — hogyan áll össze.",
        result: "Vizuális rendszertérkép",
        duration: "10-15 perc",
      },
      {
        num: "21",
        title: "AI integráció",
        desc: "AI a napi munkafolyamatban: email feldolgozás, tartalomtervezés, stratégia.",
        result: "AI integrálva a mindennapokba",
        duration: "10-15 perc",
      },
      {
        num: "22",
        title: "Teljes tesztelés",
        desc: "Végigmenni mindenen: weboldal → CRM → email → foglalás — minden működik?",
        result: "Minden pipalva, rendszer tesztelve",
        duration: "10-15 perc",
      },
    ],
  },
  {
    id: 8,
    name: "Indulás",
    subtitle: "Minden kész — most használd",
    steps: [
      {
        num: "23",
        title: "Go-live",
        desc: "Utolsó ellenőrzés + jogi minimum (GDPR, ÁSZF) + élesítés.",
        result: "Minden éles, a vállalkozás online működik",
        duration: "10 perc",
      },
      {
        num: "24",
        title: "Első ügyfelek szerzése",
        desc: "Meleg megkeresés, LinkedIn jelenlét, hideg megkeresés — a \"100 beszélgetés\" módszer.",
        result: "5 megkeresés elküldve",
        duration: "15 perc",
      },
      {
        num: "25",
        title: "Mérés és fejlesztés",
        desc: "3 szám: hány érdeklődő, hány ügyfél, mennyit keresel. Péntek 15 perces review.",
        result: "Mérési rendszer + heti rutin",
        duration: "10 perc",
      },
      {
        num: "26",
        title: "És most?",
        desc: "Összegzés — mit értél el, és hogyan mehetsz tovább.",
        result: "Konzultáció vagy önálló folytatás",
        duration: "10 perc",
      },
    ],
  },
];

const totalSteps = phases.reduce((sum, p) => sum + p.steps.length, 0);

/* ── SCROLL OBSERVER ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── PAGE ── */
export default function AgenticStartPage() {
  const heroSection = useInView();
  const statsSection = useInView();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#e4e4e7]">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#0d0d14] to-[#09090b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div
          ref={heroSection.ref}
          className={`relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 py-32 text-center transition-opacity duration-500 ease-out ${heroSection.visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 text-[#8b5cf6] text-sm font-mono mb-8">
            Ingyenes kurzus — 26 lépés
          </div>

          <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-display leading-[1.05] tracking-tight mb-6">
            Nulláról az agentikus<br />
            <span className="text-[#8b5cf6]">vállalkozásig</span>
          </h1>

          <p className="text-lg text-[#a1a1aa] max-w-xl mx-auto mb-10 leading-relaxed">
            Lépésről lépésre felépítesz egy teljes, működő vállalkozást — AI-val, automatizálással, rendszerben. ~5-6 óra, a te tempódban.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#curriculum"
              className="btn-premium inline-flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 h-14 text-base rounded-full"
            >
              Kezdés
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsSection.ref}
        className={`py-16 border-y border-white/[0.04] transition-opacity duration-500 ease-out ${statsSection.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[900px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "26", label: "lépés" },
            { num: "8", label: "fázis" },
            { num: "~6", label: "óra összesen" },
            { num: "0 Ft", label: "a kurzus" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-display text-[#8b5cf6]">{s.num}</div>
              <div className="text-sm text-[#71717a] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section id="curriculum" className="py-20 lg:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#71717a]">Tananyag</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-display mt-3">
              8 fázis, {totalSteps} lépés
            </h2>
          </div>

          <div className="space-y-16">
            {phases.map((phase) => (
              <PhaseBlock key={phase.id} phase={phase} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-display mb-4">
            Készen állsz?
          </h2>
          <p className="text-[#a1a1aa] mb-8 leading-relaxed">
            Ha végigcsináltad a kurzust és úgy érzed, hogy segítség kellene a rendszer profira hangolásához — beszélgessünk.
          </p>
          <a
            href="https://cal.com/attila-nagy-8uefco/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 h-14 text-base rounded-full"
          >
            Ingyenes konzultáció
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── FOOTER (minimal) ── */}
      <footer className="py-8 border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between text-xs text-[#52525b]">
          <Link href="/" className="hover:text-[#a1a1aa] transition-colors duration-200">
            Expert Flow
          </Link>
          <span>&copy; 2026</span>
        </div>
      </footer>

      {/* ── VOICE AGENT (kurzus specifikus) ── */}
      <ChatWidget variant="main" />
    </div>
  );
}

/* ── PHASE BLOCK ── */
function PhaseBlock({ phase }: { phase: typeof phases[number] }) {
  const [expanded, setExpanded] = useState(phase.id === 1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-500 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Phase header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-4 py-4 group text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-sm text-[#8b5cf6] font-mono">
            {phase.id}
          </span>
          <div>
            <h3 className="text-lg font-medium text-[#e4e4e7] group-hover:text-white transition-colors duration-200">
              {phase.name}
            </h3>
            <p className="text-sm text-[#71717a]">{phase.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#52525b] font-mono">{phase.steps.length} lépés</span>
          <span className={`text-[#52525b] transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}>
            ›
          </span>
        </div>
      </button>

      {/* Steps */}
      <div className={`overflow-hidden transition-all duration-400 ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-12 pb-4 space-y-3">
          {phase.steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-lg border border-white/[0.04] bg-[#0d0d14] hover:border-[#8b5cf6]/15 transition-colors duration-200 p-5"
            >
              <div className="flex items-start gap-4">
                {/* Video placeholder */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#8b5cf6]/5 border border-[#8b5cf6]/10 flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#8b5cf6]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#8b5cf6] tracking-wider">{step.num}</span>
                    <span className="text-xs text-[#52525b]">{step.duration}</span>
                  </div>
                  <h4 className="text-[15px] font-medium text-[#e4e4e7] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#71717a] leading-relaxed">{step.desc}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-[#52525b]">
                    <Check className="w-3 h-3 text-[#8b5cf6]/50" />
                    {step.result}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}
