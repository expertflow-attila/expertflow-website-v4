"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";

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
    desc: "Olyan rendszert építünk ami a háttérben dolgozik — hogy a meglévő ügyfeleid kiszolgálására fordíthasd az energiád.",
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
  { num: "01", title: "Jelentkezés", desc: "Konzultáció során részletesen átbeszéljük az igényeidet és céljaidat." },
  { num: "02", title: "Tervezés", desc: "Megtervezzük a weboldalad, funneled és a hozzá kapcsolódó AI workflow-kat." },
  { num: "03", title: "Megvalósítás", desc: "Felépítjük a teljes alrendszered, majd integráljuk és tréningezzük az AI-t." },
  { num: "04", title: "Támogatás", desc: "Teljeskörű partneri támogatás, folyamatos fejlesztés és havi optimalizálás." },
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
    desc: "Nem hiszünk a végtelen növekedésben. Az AI-t arra használjuk, hogy a vállalkozásod stabil, egyszerű és fenntartható legyen.",
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

function Tick() {
  return (
    <svg className="tick-icon mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="noise-overlay">
      {/* ========== 1. HERO ========== */}
      <section className="relative overflow-hidden section-padding-lg bg-bg">
        <Image
          src="/images/dots.svg"
          alt=""
          width={400}
          height={400}
          className="dots-decoration -top-10 right-0"
          aria-hidden="true"
        />

        <div className="container-main relative">
          <Reveal>
            <h1 className="text-h1 text-text">
              Vállalkozást építünk
              <br />
              szakértelmed köré
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 text-body text-text-64">
              Olyan rendszert hozunk létre a vállalkozásod köré, amely láthatóvá,
              értékesíthetővé és skálázhatóvá teszi szakmai tudásodat.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="https://cal.com/attila-nagy-8uefco/30min" className="btn-dark" strength={0.25}>
                Ingyenes konzultáció
              </MagneticButton>
              <MagneticButton href="/szolgaltatas" className="btn-outline" strength={0.2}>
                Szolgáltatásaink
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== 2. IMAGE MARQUEE ========== */}
      <section className="relative overflow-hidden py-6 bg-bg">
        <div className="shadow-left" />
        <div className="shadow-right" />
        <div className="marquee-track">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div key={i} className={`image-wrap-marquee ${img.className}`}>
              <Image src={img.src} alt="" width={450} height={300} className="image-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ========== 3. EBBEN SEGÍTÜNK ========== */}
      <section className="section-padding-md bg-bg">
        <div className="container-main">
          <Reveal>
            <span className="label-small text-text-48">EBBEN SEGÍTÜNK</span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-h2 mt-5 text-text">
              Segítünk felépíteni szolgáltatói vállalkozásod olyan AI-rendszerek
              integrálásával, amelyek a háttérből támogatják a működését.
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-8 text-body text-text-64">
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
            <span className="label-small text-light-48">SZOLGÁLTATÁSUNK</span>
            <h2 className="text-h2 mt-5 text-light">
              A három legnagyobb kihívásodra fókuszálunk — mert tudjuk, ezek viszik el a legtöbb energiádat.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 flex flex-wrap gap-0">
              {serviceTabs.map((tab, i) => (
                <button key={i} onClick={() => setServiceTab(i)} className={`tab-item ${serviceTab === i ? "active" : ""}`}>
                  {tab.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal key={`svc-${serviceTab}`} delay={80}>
            <div className="mt-12">
              {/* Image with proper aspect ratio */}
              <div className="card-feature relative aspect-hero">
                <Image
                  src={serviceTabs[serviceTab].image}
                  alt={serviceTabs[serviceTab].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 940px"
                  className="object-cover"
                  className="rounded-xl"
                />
                <div className="overlay-gradient rounded-xl" />
              </div>

              <div className="mt-10">
                <span className="label-small text-light-48">
                  {serviceTabs[serviceTab].label}
                </span>
                <h3 className="text-h3 mt-3 text-light">
                  {serviceTabs[serviceTab].title}
                </h3>
                <p className="mt-4 text-body text-light-64">
                  {serviceTabs[serviceTab].desc}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== 5. KÖZÖS MUNKA LÉPÉSEI ========== */}
      <section className="section-padding-lg bg-bg">
        <div className="container-main">
          <Reveal>
            <span className="label-small text-text-48">Együttműködés</span>
            <h2 className="text-h2 mt-5 text-text">Közös munka lépései</h2>
          </Reveal>

          <StaggerContainer staggerDelay={0.1}>
            <div className="mt-16">
              {processSteps.map((step) => (
                <StaggerItem key={step.num}>
                  <div className="service-item">
                    <div className="flex items-baseline gap-6">
                      <span className="text-medium">{step.num}</span>
                      <h3 className="text-h4 text-text">{step.title}</h3>
                    </div>
                    <p className="text-body pt-2 text-text-64">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ========== 6. MIBEN VAGYUNK MÁS? (DARK) ========== */}
      <section className="section-dark section-padding-lg">
        <div className="container-main">
          <div className="grid-2col">
            <div>
              <Reveal>
                <span className="label-small text-light-48">MIBEN VAGYUNK MÁS?</span>
                <h2 className="text-h2 mt-5 text-light">Expert Flow különbség</h2>
                <p className="mt-6 text-body text-light-64">
                  Mi nem folyamatokat automatizálunk, hanem a vállalkozás egészére épülő, időtálló megközelítést képviselünk.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="mt-10 flex flex-col gap-2">
                  {differenceTabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setDiffTab(i)}
                      className={`diff-tab-btn ${diffTab === i ? "active" : ""}`}
                    >
                      <span className={`diff-tab-dot ${diffTab === i ? "active" : ""}`} />
                      {tab.name}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="flex items-center">
              <Reveal key={`diff-${diffTab}`}>
                <div className="card-pricing">
                  <h3 className="text-h4 text-light">{differenceTabs[diffTab].title}</h3>
                  <p className="mt-4 text-body text-light-64">{differenceTabs[diffTab].desc}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 7. PILLAR CARDS (DARK continues) ========== */}
      <section className="section-dark section-padding-lg relative">
        <div className="container-main relative">
          <Reveal>
            <span className="label-small text-light-48">AGENTIC AI</span>
            <h2 className="text-h1 mt-5 text-light">Egyéni szolgáltatásunk</h2>
            <p className="mt-6 text-body text-light-64">
              Három alappillér, amelyek az eszközök és platformok változásától függetlenül mindig meghatározzák egy vállalkozás sikerét.
            </p>
          </Reveal>

          <StaggerContainer staggerDelay={0.12}>
            <div className="mt-16 grid-3col">
              {pillarCards.map((card, i) => (
                <StaggerItem key={i}>
                  <div className="card-pricing flex flex-col h-full">
                    <span className="label-small text-light-48">{card.pillar}</span>
                    <h3 className="text-h4 mt-3 text-light">{card.name}</h3>
                    <p className="mt-3 text-small text-light-64">{card.about}</p>

                    <div className="divider mt-6 mb-6" />

                    <span className="label-small mb-4 text-light-48">FÓKUSZ</span>
                    <ul className="flex flex-col gap-3">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-small text-light-88">
                          <Tick />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <Image src="/images/dots.svg" alt="" width={300} height={300} className="dots-decoration -bottom-10 -right-10" aria-hidden="true" />
        </div>
      </section>

      {/* ========== 8. CTA BUTTONS ========== */}
      <section className="section-dark pb-20">
        <div className="container-main flex justify-center gap-4 flex-wrap">
          <Reveal>
            <Link href="/szolgaltatas" className="btn-outline-light">További részletek</Link>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/araink" className="btn-outline-light">Áraink</Link>
          </Reveal>
        </div>
      </section>

      {/* ========== 9. ABOUT — asymmetric layout ========== */}
      <section className="section-padding-lg bg-bg">
        <div className="container-main">
          <div className="grid gap-16 items-center grid-about">
            <Reveal direction="left">
              <div className="aspect-portrait overflow-hidden rounded-lg">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={460}
                  height={613}
                  className="image-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <div className="divider mb-10" />
                <span className="label-small text-text-48">Rólam</span>
                <h3 className="text-h3 mt-4 text-text">Üdvözöllek az oldalamon!</h3>
                <p className="mt-6 text-body text-text-64">
                  Nagy Attilának hívnak. Célom azoknak az egyéni vállalkozóknak a
                  támogatása, akik szeretnék a legtöbbet kihozni hivatásukból, miközben
                  másokat támogatnak megszerzett tudásukkal.
                </p>
                <div className="mt-10">
                  <Link href="/rolam" className="btn-outline">Ismerj meg jobban</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
