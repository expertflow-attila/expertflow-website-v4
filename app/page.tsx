"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const marqueeImages = [
  { src: "/images/showcase-1.webp", className: "" },
  { src: "/images/showcase-2.webp", className: "large" },
  { src: "/images/showcase-3.webp", className: "" },
  { src: "/images/marquee-cube.webp", className: "cube" },
  { src: "/images/showcase-4.webp", className: "" },
  { src: "/images/about-b.webp", className: "large" },
  { src: "/images/showcase-5.webp", className: "" },
  { src: "/images/service-image.webp", className: "" },
  { src: "/images/showcase-6.webp", className: "cube" },
];

const serviceTabs = [
  {
    name: "Ügyfélszerzés",
    image: "/images/pillar-1.webp",
    label: "ÜGYFÉLSZERZÉS",
    title: "Leegyszerűsítem az ügyfélszerzés folyamatát.",
    desc: "Olyan rendszert építünk ami a háttérben dolgozik – hogy a meglévő ügyfeleid kiszolgálására fordíthasd az energiád.",
  },
  {
    name: "Kiszolgálás",
    image: "/images/pillar-2.webp",
    label: "KISZOLGÁLÁS",
    title: "Professzionálissá tesszük az ügyfeleid kiszolgálását.",
    desc: "Egységes folyamatokat alakítunk ki, hogy minden kliensed ugyanazt a magas színvonalú élményt kapja.",
  },
  {
    name: "Háttérműködés",
    image: "/images/pillar-3.webp",
    label: "HÁTTÉRMŰKÖDÉS",
    title: "Fókuszálttá tesszük a vállalkozásod működését.",
    desc: "Automatizáljuk az ismétlődő háttérfeladatokat, hogy a szakmai fejlődésedre és az ügyfeleidre koncentrálhass.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Jelentkezés",
    desc: "Konzultáció során részletesen átbeszéljük az igényeidet és céljaidat.",
  },
  {
    num: "02",
    title: "Tervezés",
    desc: "Megtervezzük a weboldalad, funneled és a hozzá kapcsolódó AI workflow-kat.",
  },
  {
    num: "03",
    title: "Megvalósítás",
    desc: "Felépítjük a teljes alrendszered, majd integráljuk és tréningezzük az AI-t.",
  },
  {
    num: "04",
    title: "Támogatás",
    desc: "Teljeskörű partneri támogatás, folyamatos fejlesztés és havi optimalizálás.",
  },
];

const differenceTabs = [
  {
    name: "Szolgáltatói fókusz",
    title: "Szolgáltatói fókusz",
    desc: "Kizárólag szolgáltató vállalkozók számára kínálok személyre szabott megoldásokat, amelyek igazodnak a célközönség igényeihez.",
  },
  {
    name: "Teljes körű megoldások",
    title: "Teljes körű megoldások",
    desc: "Nem különálló automatizációkat építek, hanem egy rendszert, ami összeköti a marketinged, az ügyfélkezelésed és a napi működésed.",
  },
  {
    name: "Fenntartható szemlélet",
    title: "Fenntartható szemlélet",
    desc: "Nem hiszünk a végtelen növekedésben. Az AI-t arra használjuk, hogy a vállalkozásod stabil, egyszerű és fenntartható legyen. Kevesebb tool, kevesebb stressz, több szabadság.",
  },
];

const pillarCards = [
  {
    pillar: "1. pillér",
    name: "Ügyfélszerzés",
    about: "Kiszámítható ügyfélszerzés minden hónapban.",
    items: [
      "Konverzióra optimalizált értékesítési rendszer",
      "AI asszisztens az érdeklődők előszűrésére",
      "Automatizált email marketing és utánkövetés",
    ],
  },
  {
    pillar: "2. pillér",
    name: "Kiszolgálás",
    about: "Átlátható folyamatok meglévő és új ügyfeleidnek.",
    items: [
      "Professzionális onboarding minden ügyfélnek",
      "Személyre szabott ügyfélkezelő rendszer",
      "Automatikus feedback és elégedettség-mérés",
    ],
  },
  {
    pillar: "3. pillér",
    name: "Háttérműködés",
    about: "Rendezett háttér, hogy az ügyfeleidre fókuszálhass.",
    items: [
      "Automatizált számlázás és adminisztráció",
      "AI alapú valós idejű analitika és döntéstámogatás",
      "Digitális csapatod munkájának összehangolása",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Tick SVG                                                           */
/* ------------------------------------------------------------------ */
function Tick() {
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

export default function Home() {
  const [serviceTab, setServiceTab] = useState(0);
  const [diffTab, setDiffTab] = useState(0);

  return (
    <>
      {/* ========== 1. HERO ========== */}
      <section className="relative overflow-hidden section-padding-lg" style={{ backgroundColor: "var(--color-bg)" }}>
        <Image
          src="/images/dots.svg"
          alt=""
          width={400}
          height={400}
          className="dots-decoration -top-10 right-0 opacity-20"
          aria-hidden="true"
        />

        <div className="container-main relative">
          <Reveal>
            <h1 className="text-h1" style={{ color: "var(--color-text)" }}>
              Vállalkozást építünk szakértelmed köré
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[640px] text-body" style={{ color: "var(--color-text-64)" }}>
              Olyan rendszert hozunk létre a vállalkozásod köré, amely láthatóvá,
              értékesíthetővé és skálázhatóvá teszi szakmai tudásodat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== 2. IMAGE MARQUEE ========== */}
      <section className="relative overflow-hidden py-8" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="shadow-left" />
        <div className="shadow-right" />
        <div className="marquee-track">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div key={i} className={`image-wrap-marquee ${img.className}`}>
              <Image
                src={img.src}
                alt=""
                width={450}
                height={200}
                className="image-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ========== 3. EBBEN SEGÍTÜNK ========== */}
      <section className="section-padding-md" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-main">
          <Reveal>
            <div className="service-item" style={{ borderTop: "none", paddingTop: 0 }}>
              <div>
                <span className="label-small" style={{ color: "var(--color-text-48)" }}>
                  EBBEN SEGÍTÜNK
                </span>
              </div>
              <div />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-h2 mt-2" style={{ color: "var(--color-text)" }}>
              Segítünk felépíteni szolgáltatói vállalkozásod olyan AI-rendszerek
              integrálásával, amelyek a háttérből támogatják a működését.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-[640px] text-body" style={{ color: "var(--color-text-64)" }}>
              Abban támogatunk, hogy a hivatásodból olyan vállalkozást építs, amely
              készen áll az AI-korszak kihívásaira és lehetőségeire.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== 4. SZOLGÁLTATÁSUNK (DARK) ========== */}
      <section className="section-dark section-padding-lg">
        <div className="container-main">
          <Reveal>
            <span className="label-small" style={{ color: "var(--color-light-48)" }}>
              SZOLGÁLTATÁSUNK
            </span>
            <h2 className="text-h2 mt-4" style={{ color: "var(--color-light)" }}>
              A három legnagyobb kihívásodra fókuszálunk - mert tudjuk, ezek viszik
              el a legtöbb energiádat.
            </h2>
          </Reveal>

          {/* Tab nav */}
          <Reveal delay={150}>
            <div className="mt-12 flex flex-wrap gap-0">
              {serviceTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setServiceTab(i)}
                  className={`tab-item ${serviceTab === i ? "active" : ""}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="mt-12">
            <Reveal key={`svc-${serviceTab}`}>
              <div className="card-feature relative" style={{ height: "420px" }}>
                <Image
                  src={serviceTabs[serviceTab].image}
                  alt={serviceTabs[serviceTab].name}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "12px" }}
                />
                <div className="overlay-gradient" style={{ borderRadius: "12px" }} />
              </div>

              <div className="mt-8">
                <span className="label-small" style={{ color: "var(--color-light-48)" }}>
                  {serviceTabs[serviceTab].label}
                </span>
                <h3 className="text-h3 mt-3" style={{ color: "var(--color-light)" }}>
                  {serviceTabs[serviceTab].title}
                </h3>
                <p className="mt-4 text-body max-w-[640px]" style={{ color: "var(--color-light-64)" }}>
                  {serviceTabs[serviceTab].desc}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== 5. KÖZÖS MUNKA LÉPÉSEI ========== */}
      <section className="section-padding-lg" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-main">
          <Reveal>
            <span className="label-small" style={{ color: "var(--color-text-48)" }}>
              Együttműködés
            </span>
            <h2 className="text-h2 mt-4" style={{ color: "var(--color-text)" }}>
              Közös munka lépései
            </h2>
          </Reveal>

          <div className="mt-16">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="service-item">
                  <div className="flex items-baseline gap-6">
                    <span className="text-medium">{step.num}</span>
                    <h3 className="text-h4" style={{ color: "var(--color-text)" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-body pt-2" style={{ color: "var(--color-text-64)" }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. MIBEN VAGYUNK MÁS? (DARK) ========== */}
      <section className="section-dark section-padding-lg">
        <div className="container-main">
          <div className="grid-2col">
            {/* Left side */}
            <div>
              <Reveal>
                <span className="label-small" style={{ color: "var(--color-light-48)" }}>
                  MIBEN VAGYUNK MÁS?
                </span>
                <h2 className="text-h2 mt-4" style={{ color: "var(--color-light)" }}>
                  Expert Flow különbség
                </h2>
                <p className="mt-6 text-body" style={{ color: "var(--color-light-64)" }}>
                  Mi nem folyamatokat automatizálunk, hanem a vállalkozás egészére
                  épülő, időtálló megközelítést képviselünk.
                </p>
              </Reveal>

              {/* Vertical tab pills */}
              <Reveal delay={150}>
                <div className="mt-10 flex flex-col gap-2">
                  {differenceTabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setDiffTab(i)}
                      className="flex items-center gap-3 rounded-full px-4 py-3 text-left text-small transition-all duration-300"
                      style={{
                        backgroundColor: diffTab === i ? "#ffffff14" : "transparent",
                        color: diffTab === i ? "var(--color-light)" : "var(--color-light-48)",
                      }}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: diffTab === i ? "var(--color-light)" : "var(--color-light-32)",
                        }}
                      />
                      {tab.name}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right side — content card */}
            <div className="flex items-center">
              <Reveal key={`diff-${diffTab}`}>
                <div className="card-pricing">
                  <h3 className="text-h4" style={{ color: "var(--color-light)" }}>
                    {differenceTabs[diffTab].title}
                  </h3>
                  <p className="mt-4 text-body" style={{ color: "var(--color-light-64)" }}>
                    {differenceTabs[diffTab].desc}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 7. AGENTIC AI — Pillar Cards (DARK) ========== */}
      <section className="section-dark section-padding-lg relative">
        <div className="container-main relative">
          <Reveal>
            <span className="label-small" style={{ color: "var(--color-light-48)" }}>
              AGENTIC AI
            </span>
            <h2 className="text-h1 mt-4" style={{ color: "var(--color-light)" }}>
              Egyéni szolgáltatásunk
            </h2>
            <p className="mt-6 max-w-[640px] text-body" style={{ color: "var(--color-light-64)" }}>
              Három alappillér, amelyek az eszközök és platformok változásától
              függetlenül mindig meghatározzák egy vállalkozás sikerét.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-16 grid-3col">
              {pillarCards.map((card, i) => (
                <div key={i} className="card-pricing flex flex-col">
                  <span className="label-small" style={{ color: "var(--color-light-48)" }}>
                    {card.pillar}
                  </span>
                  <h3 className="text-h4 mt-3" style={{ color: "var(--color-light)" }}>
                    {card.name}
                  </h3>
                  <p className="mt-3 text-small" style={{ color: "var(--color-light-64)" }}>
                    {card.about}
                  </p>

                  <div className="divider mt-6 mb-6" />

                  <span className="label-small mb-4" style={{ color: "var(--color-light-48)" }}>
                    FÓKUSZ
                  </span>
                  <ul className="flex flex-col gap-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-small" style={{ color: "var(--color-light-88)" }}>
                        <Tick />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Image
            src="/images/dots.svg"
            alt=""
            width={300}
            height={300}
            className="dots-decoration -bottom-10 -right-10 opacity-10"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ========== 8. TOVÁBBI RÉSZLETEK ========== */}
      <section className="section-dark" style={{ paddingBottom: "80px" }}>
        <div className="container-main flex justify-center gap-4 flex-wrap">
          <Reveal>
            <Link href="/szolgaltatas" className="btn-outline-light">
              További részletek
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/araink" className="btn-outline-light">
              Áraink
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========== 9. ABOUT ========== */}
      <section className="section-padding-lg" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-main">
          <div className="grid-2col items-stretch">
            {/* Left — portrait */}
            <Reveal>
              <div className="h-full overflow-hidden rounded-lg">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={460}
                  height={600}
                  className="image-cover h-full w-full"
                />
              </div>
            </Reveal>

            {/* Right — text */}
            <Reveal delay={150}>
              <div className="flex flex-col justify-center">
                <div className="divider mb-8" />
                <span className="label-small" style={{ color: "var(--color-text-48)" }}>
                  Rólam
                </span>
                <h3 className="text-h3 mt-4" style={{ color: "var(--color-text)" }}>
                  Üdvözöllek az oldalamon!
                </h3>
                <p className="mt-6 text-body" style={{ color: "var(--color-text-64)" }}>
                  Nagy Attilának hívnak és célom, azoknak az egyéni vállalkozóknak a
                  támogatása, akik szeretnék a legtöbbet kihozni hivatásukból, miközben
                  másokat támogatnak megszerzett tudásukkal.
                </p>
                <div className="mt-8">
                  <Link href="/rolam" className="btn-outline">
                    Ismerj meg jobban
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
