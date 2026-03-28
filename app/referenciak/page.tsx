"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

/* ── IntersectionObserver hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const references = [
  {
    image: "/images/ref-1.webp",
    name: "Gömbicz Kata",
    role: "Pszichológus",
    specialties: "Klinikai pszichológus · Autogén tréning · LMBTQ+ specializáció",
  },
  {
    image: "/images/ref-2.webp",
    name: "Vitányi Dávid",
    role: "Hangstúdió",
    specialties: "Felvétel, keverés, mastering, filmes hangmunka",
  },
  {
    image: "/images/ref-3.webp",
    name: "Dr. Nagyfejő Éva",
    role: "Tanácsadó",
    specialties: "Kiberbiztonsági irányítás és digitális ellenállóképesség",
  },
  {
    image: "/images/ref-4.webp",
    name: "Gyömbér Viktória",
    role: "Sportedző",
    specialties: "Személyi edzés, spinning, futás, úszás",
  },
];

const steps = [
  { number: "01", title: "Megértés", description: "Megértem a szakmádat, a célközönségedet és a kihívásaidat." },
  { number: "02", title: "Tervezés", description: "Személyre szabott stratégia és rendszer." },
  { number: "03", title: "Megvalósítás", description: "Lépésről lépésre építjük, tesztelve." },
  { number: "04", title: "Átadás", description: "Megtanítalak használni és garantálom a támogatást." },
];

export default function ReferenciakPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Referenciák</span>
              <div className="flex-1 h-px bg-foreground/8" />
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight max-w-3xl">
              Akikkel eddig dolgoztam
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Minden projektben más a szakma, más a kihívás &mdash; de a
              megközelítés ugyanaz: először megértem, hogyan dolgozol és kinek
              segítesz, és csak utána építek.
            </p>
          </Section>
        </div>
      </section>

      <div className="divider-fade max-w-[1400px] mx-auto" />

      {/* ── REFERENCE CARDS ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {references.map((ref) => (
              <Section key={ref.name}>
                <div className="group overflow-hidden rounded-lg glass-card transition-all duration-300 ease-out hover:border-foreground/15 hover:shadow-lg hover-lift">
                  <div className="relative aspect-[16/10] w-full img-zoom">
                    <Image
                      src={ref.image}
                      alt={`${ref.name} – ${ref.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      {ref.role}
                    </p>
                    <h3 className="text-xl font-display tracking-tight mb-2">{ref.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {ref.specialties}
                    </p>
                    <span className="inline-block rounded-full bg-foreground/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      Hamarosan
                    </span>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-fade max-w-[1400px] mx-auto" />

      {/* ── APPROACH / PROCESS ── */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] opacity-50">Megközelítés</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-20">
              Hogyan dolgozom?
            </h2>
          </Section>

          <div className="relative pl-14">
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10" />

            <div className="flex flex-col gap-14">
              {steps.map((step) => (
                <Section key={step.number}>
                  <div className="relative">
                    <div className="absolute -left-14 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-foreground">
                      <span className="font-mono text-[11px] font-semibold tracking-wider">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-display tracking-tight mb-2.5">{step.title}</h3>
                    <p className="text-base opacity-50 max-w-xl leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="text-center">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight mb-5">
                A következő referencia a tiéd lehet
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
                30 perces konzultáció. Ingyenes. Értékesítés nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("referenciak_cta")}
                className="btn-premium inline-flex items-center gap-2.5 bg-foreground text-background px-9 h-13 rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors duration-300 ease-out"
              >
                Konzultáció foglalás
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>
    </>
  );
}
