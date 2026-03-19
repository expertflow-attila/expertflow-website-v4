"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { trackCTAClick, trackPricingView, trackFAQOpen } from "@/lib/analytics";

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

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const packages = [
  {
    label: "Alap",
    name: "Blueprint",
    price: "200 000",
    unit: "Ft / projekt",
    desc: "Egy területre fókuszáló, célzott megoldás — hogy a legégetőbb problémádat először oldjuk meg.",
    cta: "Kezdjük el",
    highlighted: false,
    features: [
      "Diagnosztika és audit",
      "1 pillér kiépítése (választható)",
      "Alapvető AI asszisztens beállítás",
      "1 hónapos utókövetés",
      "Email támogatás",
    ],
  },
  {
    label: "Ajánlott",
    name: "Framework",
    price: "400 000",
    unit: "Ft / projekt",
    desc: "A teljes rendszer felépítése — ügyfélszerzés, kiszolgálás és háttérműködés egyben.",
    cta: "Választom",
    highlighted: true,
    features: [
      "Teljes diagnosztika és stratégia",
      "Mind a 3 pillér kiépítése",
      "AI asszisztens és automatizációk",
      "CRM és analitika beállítás",
      "3 hónapos támogatás",
      "Heti státusz meeting",
      "Prioritásos email és chat támogatás",
    ],
  },
  {
    label: "Prémium",
    name: "Blueprint Pro",
    price: "600 000",
    unit: "Ft / hónap",
    desc: "Folyamatos partneri együttműködés — havi optimalizálás, fejlesztés és stratégiai tanácsadás.",
    cta: "Egyeztetés",
    highlighted: false,
    features: [
      "Minden, ami a Framework-ben",
      "Havi AI rendszer optimalizálás",
      "Új funkciók és fejlesztések",
      "Dedikált stratégiai tanácsadó",
      "Korlátlan támogatás",
      "Havi teljesítmény riport",
      "Prioritásos fejlesztési kérések",
    ],
  },
];

const guarantees = [
  {
    title: "100% garancia",
    desc: "Ha az első hónap után úgy érzed, hogy nem térül meg a befektetés, nem kell fizetned. Minden addig elért eredmény tied marad.",
  },
  {
    title: "Részletfizetés",
    desc: "Tudom, hogy ez nagy befektetés lehet. Biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen.",
  },
  {
    title: "Átlátható árazás",
    desc: "Nincsenek rejtett költségek. A pontos árat a bevezető konzultáción beszéljük meg, a te helyzeted alapján.",
  },
];

const faq = [
  { q: "Mennyibe kerül pontosan?", a: "A pontos árat a bevezető konzultáción beszéljük meg, mert függ attól, melyik területen kezdünk és milyen mélységben. A fenti árak tájékoztató jellegűek. Alapító ügyfeleknek kedvezményes feltételekkel dolgozunk." },
  { q: "Van lehetőség részletfizetésre?", a: "Igen, természetesen! Tudom, hogy ez nagy befektetés lehet valaki számára, ezért biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen mindenki számára." },
  { q: "Mennyi idő alatt látok eredményt?", a: "Az első érzékelhető változások már 4-6 héten belül megjelennek — főleg a háttérműködés rendezése után. A teljes rendszer 4-6 hónap alatt áll össze, de minden lépés önmagában is értéket teremt." },
  { q: "Mi van, ha nem vagyok elégedett?", a: "100% garanciát vállalok. Ha az első hónap után úgy érzed, nem térül meg, nem kell fizetned. Minden addig elért eredmény, amit közösen hoztunk létre, tied marad, díjtalanul." },
];

export default function AraikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Áraink</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight max-w-[720px]">
              Válaszd ki a hozzád illő csomagot
            </h1>
          </Section>
          <Section delay={150}>
            <p className="text-lg text-muted-foreground mt-6 max-w-[620px] leading-relaxed">
              Minden csomag személyre szabható. A bevezető konzultáción
              közösen döntjük el, melyik a legjobb megoldás a te helyzetedre.
            </p>
          </Section>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 rounded-lg overflow-hidden">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`flex flex-col p-8 ${
                    pkg.highlighted ? "bg-foreground text-background" : "bg-card"
                  }`}
                >
                  <span className={`font-mono text-xs uppercase tracking-widest mb-3 ${
                    pkg.highlighted ? "opacity-60" : "text-muted-foreground"
                  }`}>
                    {pkg.label}
                  </span>
                  <h3 className="text-xl font-display tracking-tight mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-[clamp(1.5rem,3vw,2rem)] font-display tracking-tight">{pkg.price}</span>
                    <span className={`text-sm ${pkg.highlighted ? "opacity-60" : "text-muted-foreground"}`}>
                      {pkg.unit}
                    </span>
                  </div>
                  <p className={`text-sm mb-6 leading-relaxed ${pkg.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
                    {pkg.desc}
                  </p>

                  <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { trackCTAClick(`araink_${pkg.name}`); trackPricingView(pkg.name); }}
                    className={`w-full flex items-center justify-center gap-2 h-12 rounded-full text-sm transition-colors mb-6 ${
                      pkg.highlighted
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className={`h-px mb-6 ${pkg.highlighted ? "bg-white/20" : "bg-foreground/10"}`} />

                  <span className={`font-mono text-[10px] uppercase tracking-widest mb-4 ${
                    pkg.highlighted ? "opacity-50" : "text-muted-foreground"
                  }`}>
                    TARTALMAZZA
                  </span>
                  <ul className="flex flex-col gap-3 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlighted ? "opacity-60" : "text-muted-foreground"}`} />
                        <span className={pkg.highlighted ? "opacity-90" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ===== GUARANTEES ===== */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest opacity-50">Garanciák</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-16">
              Miért lehetsz biztos a döntésedben?
            </h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden">
            {guarantees.map((g, i) => (
              <Section key={i} delay={i * 100}>
                <div className="bg-foreground p-8 h-full">
                  <h3 className="text-xl font-display tracking-tight mb-3">{g.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{g.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">GYIK</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-10">
              Árazással kapcsolatos kérdések
            </h2>
          </Section>

          <div>
            {faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Section key={i} delay={i * 60}>
                  <div className="border-b border-foreground/10">
                    <div className="py-5">
                      <button
                        onClick={() => { setOpenFaq(isOpen ? null : i); if (!isOpen) trackFAQOpen(item.q, "araink"); }}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="text-base font-medium pr-4">{item.q}</span>
                        <span className={`shrink-0 text-xl text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>
                      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                        <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Section>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 lg:py-40 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="text-center">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight">
                Beszéljünk a lehetőségeidről
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                30 perces konzultáció. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("araink_bottom_cta")}
                className="mt-10 inline-flex items-center gap-2 bg-foreground text-background px-8 h-12 rounded-full text-sm hover:bg-foreground/90 transition-colors"
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
