"use client";

import { useState } from "react";
import { Reveal } from "@/components/scroll-reveal";
import Image from "next/image";
import Link from "next/link";

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: "ugyfelszerzes",
    navLabel: "I. Ügyfélszerzés",
    image: "/images/pillar-1.webp",
    description:
      "Felépítünk egy ügyfélszerzési útvonalat, ami az ajánlások mellett is dolgozik – hogy a megfelelő emberek megtaláljanak, és felismerjék a szolgáltatásod értékét.",
    results: [
      "Konverzióra optimalizált értékesítési rendszer",
      "Személyi asszisztens az érdeklődők előszűrésére",
      "Automatizált email marketing és utánkövetés",
    ],
    solutions: [
      {
        title: "Weboldal és landoló oldal",
        desc: "Nem csak egy szép bemutatkozó felület, hanem olyan oldal, ami végigvezeti az érdeklődőt az első konzultációig.",
      },
      {
        title: "Személyi asszisztens",
        desc: "Digitális alkalmazottad, aki ismeri a szolgáltatásaidat, válaszol a gyakori kérdésekre, és az érdeklődőket konzultációra tereli.",
      },
      {
        title: "Közösségek és kampányok",
        desc: "Kampányidőszakban a digitális csapatod támogatja a kommunikációt, a követést és a kiértékelést.",
      },
      {
        title: "Előszűrés és kvalifikáció",
        desc: "Asszisztens kiszűri, ki az, akinek tényleg segíteni tudsz, így konzultációra már felkészült, kvalifikált érdeklődők érkeznek.",
      },
    ],
  },
  {
    id: "kiszolgalas",
    navLabel: "II. Kiszolgálás",
    image: "/images/pillar-2.webp",
    description:
      "Minden ügyfeled ugyanazt a minőségi élményt kapja, függetlenül attól, hogy kettővel dolgozol éppen vagy tízzel, mert minden lépést egy egységes háttérrendszer támogat.",
    results: [
      "Professzionális benyomás az első pillanattól az utolsóig",
      "Több ajánlás elégedett ügyfelektől",
      "Elkötelezett ügyfelek, akik szívesen fogadják új ajánlataidat",
    ],
    solutions: [
      {
        title: "Onboarding folyamat",
        desc: "Az új ügyfél az első pillanattól tudja, mi a következő lépés, hogyan fog kinézni a közös munka, és hol talál mindent.",
      },
      {
        title: "Automatikus utánkövetés",
        desc: "Emlékeztetők, visszajelzés kérése és üzenetek a megfelelő pillanatban – anélkül, hogy neked kellene fejben tartanod.",
      },
      {
        title: "AI támogatott ügyfélkezelés",
        desc: "A rutinkérdéseket a te hangodban kezeli, a komolyabb ügyeket pedig hozzád irányítja – így az ügyfél mindig gyors választ kap.",
      },
      {
        title: "Visszajelzés kérő automatikák",
        desc: "Ügyfeled visszajelzést ad a szolgáltatásról, az élményről, az eredményekről. Nem neked kell kérned, és nem marad el soha.",
      },
      {
        title: "Konzultáció előkészítés",
        desc: "A konzultáció előtt az ügyfél megkapja, amire szüksége van – kérdőív, felkészítő anyag, emlékeztető.",
      },
      {
        title: "Konzultáció utánkövetés",
        desc: "Konzultáció utána automatikusan megy az összefoglaló, a következő lépések és a kapcsolódó anyagok.",
      },
      {
        title: "Ügyfél tudásbázis",
        desc: "Minden ügyfél saját portálon fér hozzá videókhoz, dokumentumokhoz és felvételekhez, AI-alapú kereséssel.",
      },
    ],
  },
  {
    id: "hattermukodes",
    navLabel: "III. Háttérműködés",
    image: "/images/pillar-3.webp",
    description:
      "A számlázás és az adminisztráció a háttérben fut, minimális beavatkozással, miközben minden adat egy helyre gyűlik, és idővel jobban átlátod, mi működik.",
    results: [
      "Stabil háttér, ami nélküled is működik",
      "Napi 2–3 óra felszabadított idő az admin feladatokból",
      "Automatizált élő és online események",
    ],
    solutions: [
      {
        title: "Számlázás és pénzügyi követés",
        desc: "A számlák automatikusan kimennek, a befizetések követhetők, és hónap végén nem kell órákat töltened az összesítéssel.",
      },
      {
        title: "Üzleti adatbázis",
        desc: "Egy központi hely, ahol a vállalkozásod adatai gyűlnek, és idővel egyre tisztábban látod, mi hozza az eredményt.",
      },
      {
        title: "Adatvezérelt döntések",
        desc: "Vállalkozásod tudásbázisa mutatja, hol veszíted el az érdeklődőket, és mire van szüksége az ügyfeleidnek.",
      },
      {
        title: "Szakmai események automatizálása",
        desc: "Automatizált regisztráció, emlékeztetők és visszanézhető felvételek – legyen szó élő vagy online eseményekről.",
      },
      {
        title: "AI csapat",
        desc: "AI ügynököd koordinálja a vállalkozásod fő területeire fókuszáló csapattagokat, és kérésednek megfelelően irányítja őket.",
      },
      {
        title: "Átlátható ügyfélkezelés",
        desc: "Ügyfélkezelő (CRM) rendszered tárolja az összes ügyféladatot és előzményt kereshetően.",
      },
      {
        title: "Heti összesítők",
        desc: "AI asszisztensed hetente egyszer kapsz egy összesítőt, ami a legfontosabbakat mutatja – pénzügyek, ügyfelek, kampányok.",
      },
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Stratégiai konzultáció",
    desc: "Vállalkozásod működésének feltérképezése, szűk keresztmetszetek azonosítása, prioritások meghatározása, fejlesztési terv készítése.",
  },
  {
    num: "02",
    title: "Diagnosztika",
    desc: "Részletes audit: meglévő folyamatok dokumentálása, rendszerek felmérése, fejlesztési terv és ütemezés készítése.",
  },
  {
    num: "03",
    title: "Háttérműködés",
    desc: "Háttérműködés rendezése: CRM beállítás, számlázás automatizálás, naptárkezelés, dokumentumkezelés, belső Agentic AI asszisztens alapok.",
  },
  {
    num: "04",
    title: "Kiszolgálás",
    desc: "Ügyfélélmény rendszerezése: onboarding folyamat, konzultáció-támogatás, feedback rendszer, ügyfélportál felépítése.",
  },
  {
    num: "05",
    title: "Ügyfélszerzés",
    desc: "Ügyfélszerzés automatizálása: landing oldal, email marketing, AI lead kvalifikáció, funnel felépítése, analitika beállítása.",
  },
  {
    num: "06",
    title: "Optimalizálás és átadás",
    desc: "Rendszerek finomhangolása, dokumentáció, betanítás, önálló működés biztosítása.",
  },
  {
    num: "07",
    title: "Utókövetés és támogatás",
    desc: "Egy hónapos támogatás: kérdések megválaszolása, elakadások feloldása, önálló működés elsajátítása.",
  },
];

const faqCategories = [
  {
    name: "Folyamat",
    items: [
      {
        q: "Mennyi idő alatt épül fel a rendszer?",
        a: "Általában 6–8 hét alatt elkészül a teljes rendszer. Az első 2 hétben a stratégiai tervezés és diagnosztika történik, utána következik az implementáció.",
      },
      {
        q: "Mennyire kell technikailag érteni hozzá?",
        a: "Egyáltalán nem kell technikai tudás. Mindent mi építünk fel, és úgy adjuk át, hogy önállóan tudj vele dolgozni. A betanítás is a folyamat része.",
      },
      {
        q: "Mi történik, ha közben megváltoznak az igényeim?",
        a: "A rendszer rugalmas, és a folyamat során folyamatosan egyeztetünk. Ha változik az irány, alkalmazkodunk.",
      },
    ],
  },
  {
    name: "Árazás",
    items: [
      {
        q: "Mennyibe kerül a szolgáltatás?",
        a: "Az árajánlatot mindig egyedileg készítjük a konzultáció alapján. Nincs egységcsomag – mindenki azt kapja, amire szüksége van.",
      },
      {
        q: "Van részletfizetési lehetőség?",
        a: "Igen, rugalmas fizetési lehetőséget biztosítunk. A részleteket a konzultáción beszéljük meg.",
      },
    ],
  },
  {
    name: "Garancia",
    items: [
      {
        q: "Mi van, ha nem vagyok elégedett?",
        a: "Az első 30 napban teljes pénzvisszatérítési garanciát vállalunk. Ha úgy érzed, nem hozza az eredményt, visszakapod a teljes összeget.",
      },
      {
        q: "Kapok támogatást az átadás után is?",
        a: "Igen, az átadás utáni 1 hónapban teljes támogatást biztosítunk: kérdések, elakadások, finomhangolás.",
      },
    ],
  },
];

const ctaValues = [
  {
    title: "Konzultáció",
    desc: "Átbeszéljük a helyzetedet, és megértjük, hol tartasz most, és hová szeretnél eljutni.",
  },
  {
    title: "Őszinte vélemény",
    desc: "Őszinte véleményt mondok arról, hogy a te helyzetedben mi az, ami valóban segíthet.",
  },
  {
    title: "Iránymutatás",
    desc: "Ha most nem a szolgáltatásom a megoldás, akkor is kapsz egy irányt, amerre érdemes elindulni.",
  },
  {
    title: "Egyéni árajánlat",
    desc: "Ha viszont mindketten úgy érezzük, hogy érdemes együtt dolgozni, készítek egy személyre szabott ajánlatot.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SzolgaltatasPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const pillar = pillars[activeTab];

  return (
    <div className="bg-white" style={{ fontFamily: "'Merriweather', serif" }}>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h1 className="text-3xl md:text-[2.5rem] font-bold leading-snug tracking-tight text-[#1a1a1a] max-w-2xl">
              Hiszünk abban, hogy a tudásod érték
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#6b7280] max-w-2xl font-light">
              Szolgáltatásunk fő célja az egyéni vállalkozók támogatása egy
              hatékony és fenntartható üzleti rendszer felépítésében.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 rounded-2xl overflow-hidden">
              <Image
                src="/images/service-image.webp"
                alt="Expert Flow szolgáltatás"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== THREE PILLARS - TABS ===== */}
      <section className="py-20 px-6 bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-12 text-center">
              Három pillér, egy rendszer
            </h2>
          </Reveal>

          {/* Tab navigation */}
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(i)}
                  className={`tab-btn text-sm md:text-base pb-2 ${
                    activeTab === i
                      ? "active text-[#1a1a1a] font-bold"
                      : "text-[#6b7280] font-light"
                  }`}
                >
                  {p.navLabel}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Image */}
            <Reveal key={`img-${activeTab}`}>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.navLabel}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>

            {/* Right - Description + Results */}
            <div>
              <Reveal key={`desc-${activeTab}`}>
                <p className="text-base leading-relaxed text-[#1a1a1a] font-light mb-8">
                  {pillar.description}
                </p>
              </Reveal>

              <Reveal key={`results-${activeTab}`} delay={100}>
                <div className="space-y-3 mb-8">
                  <p className="text-xs uppercase tracking-widest text-[#6b7280] font-bold mb-4">
                    Eredmények
                  </p>
                  {pillar.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 block h-2 w-2 rounded-full bg-[#1a1a1a] shrink-0" />
                      <span className="text-sm text-[#1a1a1a] font-light">
                        {r}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Solutions grid */}
          <Reveal key={`solutions-${activeTab}`} delay={200}>
            <div className="mt-16">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] font-bold mb-8 text-center">
                Megoldások
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pillar.solutions.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 border border-[#e5e5e5]"
                  >
                    <h4 className="text-sm font-bold text-[#1a1a1a] mb-2">
                      {s.title}
                    </h4>
                    <p className="text-sm text-[#6b7280] font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 text-center">
              Együttműködés folyamata
            </h2>
            <p className="text-base text-[#6b7280] font-light text-center mb-16 max-w-xl mx-auto">
              Hét lépésben a stratégiától az önálló működésig.
            </p>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative pl-16 pb-12">
                  {/* Connector line */}
                  {i < processSteps.length - 1 && <div className="step-line" />}
                  {/* Number */}
                  <div className="step-number absolute left-0 top-0">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-relaxed mb-12">
                Ha most azon gondolkodtál, hogy mindez jól hangzik, de nem
                tudod, a te helyzetedre is működhet-e, akkor pontosan erről
                érdemes beszélnünk.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
              {/* Portrait */}
              <div className="shrink-0">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover w-[200px] h-[200px]"
                />
              </div>

              {/* Value propositions */}
              <div className="space-y-6 flex-1">
                {ctaValues.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-2 w-2 rounded-full bg-[#1a1a1a] shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-[#1a1a1a]">
                        {item.title}
                      </span>
                      <span className="text-sm text-[#6b7280] font-light">
                        {" — "}
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Jelentkezek konzultációra
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[800px]">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-12 text-center">
              Gyakran ismételt kérdések
            </h2>
          </Reveal>

          {faqCategories.map((cat) => (
            <div key={cat.name} className="mb-10">
              <Reveal>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] font-bold mb-4">
                  {cat.name}
                </p>
              </Reveal>

              {cat.items.map((item, i) => {
                const key = `${cat.name}-${i}`;
                const isOpen = openFaq === key;

                return (
                  <Reveal key={key} delay={i * 60}>
                    <div className="border-b border-[#e5e5e5]">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : key)}
                        className="w-full flex items-center justify-between py-5 text-left"
                      >
                        <span className="text-sm font-bold text-[#1a1a1a] pr-4">
                          {item.q}
                        </span>
                        <span
                          className={`text-xl text-[#6b7280] transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                        <p className="text-sm text-[#6b7280] font-light leading-relaxed pb-5">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
