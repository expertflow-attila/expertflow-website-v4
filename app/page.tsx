"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const heroWords = ["építünk", "fejlesztünk", "skálázunk", "működtetünk"];

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
    number: "I",
    name: "Ügyfélszerzés",
    image: "/images/pillar-1.webp",
    title: "Leegyszerűsítem az ügyfélszerzés folyamatát.",
    desc: "Olyan rendszert építünk ami a háttérben dolgozik — hogy a meglévő ügyfeleid kiszolgálására fordíthasd az energiád.",
  },
  {
    number: "II",
    name: "Kiszolgálás",
    image: "/images/pillar-2.webp",
    title: "Professzionálissá tesszük az ügyfeleid kiszolgálását.",
    desc: "Egységes folyamatokat alakítunk ki, hogy minden kliensed ugyanazt a magas színvonalú élményt kapja.",
  },
  {
    number: "III",
    name: "Háttérműködés",
    image: "/images/pillar-3.webp",
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
    desc: "Kizárólag szolgáltató vállalkozók számára kínálok személyre szabott megoldásokat, amelyek igazodnak a célközönség igényeihez.",
  },
  {
    name: "Teljes körű megoldások",
    desc: "Nem különálló automatizációkat építek, hanem egy rendszert, ami összeköti a marketinged, az ügyfélkezelésed és a napi működésed.",
  },
  {
    name: "Fenntartható szemlélet",
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

/* ------------------------------------------------------------------ */
/*  SCROLL OBSERVER HOOK                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [serviceTab, setServiceTab] = useState(0);
  const [diffTab, setDiffTab] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setHeroVisible(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((p) => (p + 1) % heroWords.length), 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate service tabs
  useEffect(() => {
    const interval = setInterval(() => setServiceTab((p) => (p + 1) % serviceTabs.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const helpSection = useInView();
  const serviceSection = useInView();
  const processSection = useInView();
  const diffSection = useInView();
  const pillarSection = useInView();
  const aboutSection = useInView();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(8)].map((_, i) => (
            <div key={`h-${i}`} className="absolute h-px bg-foreground/10" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="absolute w-px bg-foreground/10" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
          {/* Eyebrow */}
          <div className={`mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              AI rendszerek szolgáltató vállalkozóknak
            </span>
          </div>

          {/* Headline */}
          <div className="mb-12">
            <h1 className={`text-[clamp(3rem,10vw,8rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="block">Vállalkozást</span>
              <span className="block">
                <span className="relative inline-block">
                  <span key={wordIndex} className="inline-flex">
                    {heroWords[wordIndex].split("").map((char, i) => (
                      <span key={`${wordIndex}-${i}`} className="inline-block animate-char-in" style={{ animationDelay: `${i * 50}ms` }}>
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
                </span>
              </span>
            </h1>
          </div>

          {/* Description + CTAs */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
            <p className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Agentic AI rendszert hozunk létre a vállalkozásod köré, amely láthatóvá, értékesíthetővé és skálázhatóvá teszi szakmai tudásodat.
            </p>

            <div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a
                href="https://cal.com/attila-nagy-8uefco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group transition-colors"
              >
                Ingyenes konzultáció
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/szolgaltatas"
                className="inline-flex items-center h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
              >
                Szolgáltatásaink
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. IMAGE MARQUEE ========== */}
      <section className="relative overflow-hidden py-8">
        <div className="flex gap-4 marquee">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div
              key={i}
              className={`shrink-0 overflow-hidden ${
                img.className === "large" ? "w-[672px] h-[480px]" :
                img.className === "cube" ? "w-[300px] h-[300px]" :
                "w-[568px] h-[480px]"
              }`}
            >
              <Image src={img.src} alt="" width={672} height={480} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ========== 3. EBBEN SEGÍTÜNK ========== */}
      <section ref={helpSection.ref} className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Ebben segítünk
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight mb-8 transition-all duration-700 ${helpSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Segítünk felépíteni szolgáltatói
            <br />
            <span className="text-muted-foreground">vállalkozásod AI-rendszerekkel.</span>
          </h2>
          <p className={`text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${helpSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Abban támogatunk, hogy a hivatásodból olyan vállalkozást építs, amely készen áll az AI-korszak kihívásaira és lehetőségeire.
          </p>
        </div>
      </section>

      {/* ========== 4. SZOLGÁLTATÁSUNK (DARK) ========== */}
      <section ref={serviceSection.ref} className="relative py-24 lg:py-32 section-dark overflow-hidden">
        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)`
        }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
              <span className="w-8 h-px bg-background/30" />
              Szolgáltatásunk
            </span>
            <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${serviceSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Három kihívás.
              <br />
              <span className="text-background/50">Egy rendszer.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Tab list */}
            <div className="space-y-0">
              {serviceTabs.map((tab, i) => (
                <button
                  key={tab.number}
                  onClick={() => setServiceTab(i)}
                  className={`w-full text-left py-8 border-b border-background/10 transition-all duration-500 group ${
                    serviceTab === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl text-background/30">{tab.number}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                        {tab.name}
                      </h3>
                      <p className="text-background/60 leading-relaxed">{tab.desc}</p>
                      {serviceTab === i && (
                        <div className="mt-4 h-px bg-background/20 overflow-hidden">
                          <div className="h-full bg-background" style={{ animation: "progress 5s linear forwards" }} />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab image */}
            <div className="lg:sticky lg:top-32 self-start">
              <div className="border border-background/10 overflow-hidden">
                <Image
                  src={serviceTabs[serviceTab].image}
                  alt={serviceTabs[serviceTab].name}
                  width={940}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="p-8">
                  <h4 className="font-display text-2xl mb-3">{serviceTabs[serviceTab].title}</h4>
                  <p className="text-background/60 leading-relaxed">{serviceTabs[serviceTab].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </section>

      {/* ========== 5. KÖZÖS MUNKA LÉPÉSEI ========== */}
      <section ref={processSection.ref} className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Együttműködés
            </span>
            <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${processSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Közös munka lépései
            </h2>
          </div>

          <div>
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10 transition-all duration-700 ${processSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="shrink-0">
                  <span className="font-mono text-sm text-muted-foreground">{step.num}</span>
                </div>
                <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
                  <h3 className="text-3xl lg:text-4xl font-display">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. MIBEN VAGYUNK MÁS? ========== */}
      <section ref={diffSection.ref} className="relative py-32 lg:py-40 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Miben vagyunk más?</span>
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="font-mono text-xs text-muted-foreground">
              {String(diffTab + 1).padStart(2, "0")} / {String(differenceTabs.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8">
              <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] transition-all duration-700 ${diffSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Expert Flow
                <br />
                <span className="text-stroke">különbség</span>
              </h2>

              <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-xl">
                Mi nem folyamatokat automatizálunk, hanem a vállalkozás egészére épülő, időtálló megközelítést képviselünk.
              </p>

              {/* Tab buttons */}
              <div className="mt-12 flex flex-col gap-2">
                {differenceTabs.map((tab, i) => (
                  <button
                    key={tab.name}
                    onClick={() => setDiffTab(i)}
                    className={`flex items-center gap-4 px-4 py-3 text-left transition-all duration-300 ${
                      diffTab === i ? "bg-foreground/5 text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`w-2 h-2 shrink-0 transition-colors ${diffTab === i ? "bg-foreground" : "bg-foreground/20"}`} />
                    <span className="font-mono text-xs tracking-widest uppercase">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="p-8 border border-foreground/10">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                  {differenceTabs[diffTab].name}
                </span>
                <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
                  {differenceTabs[diffTab].desc}
                </p>
              </div>

              <div className="flex gap-2 mt-8">
                {differenceTabs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setDiffTab(i)}
                    className={`h-2 transition-all duration-300 ${
                      i === diffTab ? "w-8 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 7. PILLAR CARDS (PRICING STYLE) ========== */}
      <section ref={pillarSection.ref} className="relative py-32 lg:py-40 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-20">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
              Agentic AI
            </span>
            <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 transition-all duration-700 ${pillarSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Egyéni
              <br />
              <span className="text-stroke">szolgáltatásunk</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Három alappillér, amelyek az eszközök és platformok változásától függetlenül mindig meghatározzák egy vállalkozás sikerét.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
            {pillarCards.map((card, i) => (
              <div
                key={card.name}
                className={`relative p-8 lg:p-12 bg-background transition-all duration-700 ${pillarSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-8">
                  <span className="font-mono text-xs text-muted-foreground">{card.pillar}</span>
                  <h3 className="font-display text-3xl text-foreground mt-2">{card.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{card.about}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-foreground/10" />

                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">Fókusz</span>
                <ul className="space-y-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. CTA ========== */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-center gap-4">
            <Link href="/szolgaltatas" className="inline-flex items-center h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors">
              További részletek
            </Link>
            <Link href="/araink" className="inline-flex items-center h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors">
              Áraink
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 9. ABOUT ========== */}
      <section ref={aboutSection.ref} className="relative py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`overflow-hidden transition-all duration-700 ${aboutSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Image
                src="/images/attila.jpg"
                alt="Nagy Attila"
                width={460}
                height={613}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className={`transition-all duration-700 delay-200 ${aboutSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="h-px w-full bg-foreground/10 mb-10" />
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                <span className="w-8 h-px bg-foreground/30" />
                Rólam
              </span>
              <h3 className="text-3xl lg:text-4xl font-display mb-6">Üdvözöllek az oldalamon!</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Nagy Attilának hívnak. Célom azoknak az egyéni vállalkozóknak a támogatása, akik szeretnék a legtöbbet kihozni hivatásukból, miközben másokat támogatnak megszerzett tudásukkal.
              </p>
              <Link
                href="/rolam"
                className="inline-flex items-center gap-2 h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors group"
              >
                Ismerj meg jobban
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
