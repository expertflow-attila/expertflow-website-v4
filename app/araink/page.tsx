"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

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
  {
    q: "Mennyibe kerül pontosan?",
    a: "A pontos árat a bevezető konzultáción beszéljük meg, mert függ attól, melyik területen kezdünk és milyen mélységben. A fenti árak tájékoztató jellegűek. Alapító ügyfeleknek kedvezményes feltételekkel dolgozunk.",
  },
  {
    q: "Van lehetőség részletfizetésre?",
    a: "Igen, természetesen! Tudom, hogy ez nagy befektetés lehet valaki számára, ezért biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen mindenki számára.",
  },
  {
    q: "Mennyi idő alatt látok eredményt?",
    a: "Az első érzékelhető változások már 4-6 héten belül megjelennek — főleg a háttérműködés rendezése után. A teljes rendszer 4-6 hónap alatt áll össze, de minden lépés önmagában is értéket teremt.",
  },
  {
    q: "Mi van, ha nem vagyok elégedett?",
    a: "100% garanciát vállalok. Ha az első hónap után úgy érzed, nem térül meg, nem kell fizetned. Minden addig elért eredmény, amit közösen hoztunk létre, tied marad, díjtalanul.",
  },
];

/* ------------------------------------------------------------------ */
/*  Tick SVG                                                           */
/* ------------------------------------------------------------------ */
function Tick({ light }: { light?: boolean }) {
  return (
    <svg className="tick-icon mt-0.5" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function AraikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4">Áraink</p>
            <h1 className="text-h1 text-text max-w-[720px]">
              Válaszd ki a hozzád illő csomagot
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-body text-text-64 mt-6 max-w-[620px]">
              Minden csomag személyre szabható. A bevezető konzultáción
              közösen döntjük el, melyik a legjobb megoldás a te helyzetedre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="section-padding-sm" style={{ paddingTop: 0 }}>
        <div className="container-main">
          <Reveal delay={200}>
            <div className="grid-3col">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`card-pricing flex flex-col ${pkg.highlighted ? "highlighted" : ""}`}
                >
                  <span className="label-small mb-3" style={{ color: pkg.highlighted ? "var(--color-light-48)" : "var(--color-text-48)" }}>
                    {pkg.label}
                  </span>
                  <h3 className="text-h4 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-h3 font-normal">{pkg.price}</span>
                    <span className="text-small" style={{ color: pkg.highlighted ? "var(--color-light-48)" : "var(--color-text-48)" }}>
                      {pkg.unit}
                    </span>
                  </div>
                  <p className="text-small mb-6" style={{ color: pkg.highlighted ? "var(--color-light-64)" : "var(--color-text-64)" }}>
                    {pkg.desc}
                  </p>

                  <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark w-full justify-center mb-6"
                  >
                    {pkg.cta}
                  </a>

                  <div className="divider mb-6" />

                  <span className="label-small mb-4" style={{ color: pkg.highlighted ? "var(--color-light-48)" : "var(--color-text-48)" }}>
                    TARTALMAZZA
                  </span>
                  <ul className="flex flex-col gap-3 flex-1">
                    {pkg.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-small"
                        style={{ color: pkg.highlighted ? "var(--color-light-88)" : "var(--color-text)" }}
                      >
                        <Tick />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== GUARANTEES ===== */}
      <section className="section-dark section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-light-48 mb-3">Garanciák</p>
            <h2 className="text-h2 text-light mb-16">
              Miért lehetsz biztos a döntésedben?
            </h2>
          </Reveal>

          <div className="grid-3col">
            {guarantees.map((g, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card-pricing h-full">
                  <h3 className="text-h4 text-light mb-3">{g.title}</h3>
                  <p className="text-small text-light-64" style={{ lineHeight: 1.6 }}>
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-3">GYIK</p>
            <h2 className="text-h2 text-text mb-10">Árazással kapcsolatos kérdések</h2>
          </Reveal>

          <div>
            {faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={i} delay={i * 60}>
                  <div className="divider" />
                  <div className="py-5">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-body font-medium text-text pr-4">
                        {item.q}
                      </span>
                      <span
                        className="shrink-0 text-xl text-text-48 transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-small text-text-64 pt-4" style={{ lineHeight: 1.6 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <div className="divider" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding-lg" style={{ backgroundColor: "var(--color-bg-stone)" }}>
        <div className="container-main">
          <Reveal>
            <div className="text-center">
              <h2 className="text-h2 text-text">
                Beszéljünk a lehetőségeidről
              </h2>
              <p className="mt-4 text-h5 text-text-48">
                30 perces konzultáció. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark mt-10 inline-flex"
              >
                Konzultáció foglalás
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
