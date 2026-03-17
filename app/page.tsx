"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const partners = [
  "Supabase",
  "Vercel",
  "GitHub",
  "PostHog",
  "Claude",
  "Notion",
  "OpenAI",
  "Slack",
  "Midjourney",
  "Ollama",
  "Resend",
  "Runway",
  "Figma",
  "Telegram",
];

const pillars = [
  {
    label: "I. Ügyfélszerzés",
    image: "/images/pillar-1.webp",
    description:
      "Felépítünk egy ügyfélszerzési útvonalat, ami az ajánlások mellett is dolgozik — hogy a megfelelő emberek megtaláljanak, és felismerjék a szolgáltatásod értékét.",
    results: [
      "Konverzióra optimalizált értékesítési rendszer",
      "Személyi assziszten az érdeklődők előszűrésére",
      "Automatizált email marketing és utánkövetés",
    ],
    solutions: [
      "Weboldal és landoló oldal",
      "Személyi asszisztens",
      "Közösségek és kampányok",
      "Előszűrés és kvalifikáció",
    ],
  },
  {
    label: "II. Kiszolgálás",
    image: "/images/pillar-2.webp",
    description:
      "Minden ügyfeled ugyanazt a minőségi élményt kapja, függetlenül attól, hogy kettővel dolgozol éppen vagy tízzel, mert minden lépést egy egységes háttérrendszer támogat.",
    results: [
      "Professzionális benyomás az első pillanattól az utolsóig",
      "Több ajánlás elégedett ügyfelektől",
      "Elkötelezett ügyfelek, akik szívesen fogadják új ajánlataidat",
    ],
    solutions: [
      "Onboarding folyamat",
      "Automatikus utánkövetés",
      "AI támogatott ügyfélkezelés",
      "Visszajelzés kérő automatikák",
      "Konzultáció előkészítés",
      "Konzultáció utánkövetés",
      "Ügyfél tudásbázis",
    ],
  },
  {
    label: "III. Háttérműködés",
    image: "/images/pillar-3.webp",
    description:
      "A számlázás és az adminisztráció a háttérben fut, minimális beavatkozással, miközben minden adat egy helyre gyűlik, és idővel jobban átlátod, mi működik.",
    results: [
      "Stabil háttér, ami nélküled is működik",
      "Napi 2-3 óra felszabadított idő az admin feladatokból",
      "Automatizált élő és online események",
    ],
    solutions: [
      "Számlázás és pénzügyi követés",
      "Üzleti adatbázis",
      "Adatvezérelt döntések",
      "Szakmai események automatizálása",
      "AI csapat",
      "Átlátható ügyfélkezelés",
      "Heti összesítők",
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

const faqData: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Folyamat",
    items: [
      {
        q: "Mennyi idő alatt látok eredményt?",
        a: "Az első érzékelhető változások már 4-6 héten belül megjelennek — főleg a háttérműködés rendezése után, ahol sok vállalkozó hetente 5-10 órát nyer vissza. A teljes rendszer 4-6 hónap alatt áll össze, de nem kell megvárni a végét: minden lépés önmagában is értéket teremt.",
      },
      {
        q: "Nekem kell érteni az AI-hoz, hogy működjön?",
        a: "Nem. Az én feladatom, hogy a rendszerek úgy működjenek, hogy te csak használod őket — nem karbantartod. A betanítás és az önálló működés biztosítása az együttműködés része.",
      },
      {
        q: "Mi történik, ha már van vállalkozásom és ügyfeleim?",
        a: "Nem építünk le semmit, ami már működik. A diagnosztika fázisban felmérjük, mi van már a helyén, és csak azt fejlesztjük tovább, ami valóban szűk keresztmetszet. A változtatások fokozatosan, a napi munkád mellé kerülnek be.",
      },
      {
        q: "Mennyi időt kell nekem beletenni ebbe?",
        a: "Hetente 2-4 óra aktív együttműködést igényel a folyamat — főleg az elején, amikor a rendszereket a te vállalkozásodhoz szabjuk. A cél az, hogy ez az idő folyamatosan csökkenjen, ahogy a rendszerek átvesznek feladatokat.",
      },
    ],
  },
  {
    category: "Árazás",
    items: [
      {
        q: "Mennyibe kerül?",
        a: "A pontos árat a bevezető konzultáción beszéljük meg, mert függ attól, melyik területen kezdünk és milyen mélységben. A legtöbb projektünk 300 000 – 600 000 forint közötti tartományban van. Alapító ügyfeleknek kedvezményes feltételekkel dolgozunk.",
      },
      {
        q: "Van lehetőség részletfizetésre?",
        a: "Igen, természetesen! Tudom, hogy ez nagy befektetés lehet valaki számára, ezért biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen mindenki számára.",
      },
    ],
  },
  {
    category: "Garancia",
    items: [
      {
        q: "Garantált az eredmény?",
        a: "Amit garantálok: strukturált folyamatot, átlátható rendszereket és egy működő alapot, amelyen tovább tudsz építeni. Az eredmény nagyrészt azon múlik, hogy mennyire következetesen alkalmazzuk együtt a felépített rendszereket.",
      },
      {
        q: "Vállalsz garanciát?",
        a: "Igen, természetesen 100% garanciát vállalok a munkámra. Ha az első hónap után úgy érzed, hogy nem térül meg számodra a befektetés, és nem látod a vállalkozásod fejlődését, nem kell fizetned. Minden addig elért eredmény, amit közösen hoztunk létre, tied marad, díjtalanul. A célom, hogy a létező legjobb minőségű szolgáltatást nyújtsam a piacon, és tudom, hogy ez a legfontosabb a növekedésem szempontjából.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (key: string) =>
    setOpenFaq((prev) => (prev === key ? null : key));

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        {/* dots decoration */}
        <Image
          src="/images/dots.svg"
          alt=""
          width={400}
          height={400}
          className="pointer-events-none absolute -top-10 right-0 opacity-20 select-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal>
            <h1 className="font-serif text-[2.5rem] leading-[1.2] font-bold text-[#1a1a1a] md:text-[3.5rem]">
              Hiszünk abban, hogy
              <br />a tudásod érték
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]">
              Szolgáltatásunk fő célja az egyéni vállalkozók támogatása egy
              hatékony és fenntartható üzleti rendszer felépítésében.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10">
              <Link
                href="https://cal.com"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konzultáció
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-16 overflow-hidden rounded-xl">
              <Image
                src="/images/about-b.webp"
                alt="Expert Flow csapat"
                width={1200}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <section className="overflow-hidden bg-[#f7f7f5] py-8">
        <div className="marquee-track flex w-max items-center gap-10">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-serif text-sm tracking-wide text-[#b0b0b0]"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ========== KINEK SZÓL ========== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              Célcsoport
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
              Kinek szól?
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-14">
            {[
              "Nem a szerencsére akarsz hagyatkozni — hanem tudni, honnan jön a következő ügyfél.",
              "Vannak ügyfeleid, de szeretnéd, ha a kiszolgálás nem venné el a napod nagy részét.",
              "Szeretnéd, ha a vállalkozásod működése átlátható lenne, és nem kellene mindent fejben tartani.",
            ].map((text, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="flex items-start gap-8">
                  <span className="step-number shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-3 text-lg leading-relaxed text-[#1a1a1a]">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SHOWCASE ========== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="overflow-hidden rounded-xl border border-[#e5e5e5]"
                >
                  <Image
                    src={`/images/showcase-${n}.webp`}
                    alt={`Showcase ${n}`}
                    width={400}
                    height={280}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== THREE PILLARS ========== */}
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              Szolgáltatás
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
              Három pillér
            </h2>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={150}>
            <div className="mt-12 flex gap-8 border-b border-[#e5e5e5]">
              {pillars.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`tab-btn pb-3 font-serif text-sm md:text-base ${
                    activeTab === i
                      ? "active text-[#1a1a1a]"
                      : "text-[#6b7280]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
            <Reveal key={`img-${activeTab}`}>
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={pillars[activeTab].image}
                  alt={pillars[activeTab].label}
                  width={580}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal key={`txt-${activeTab}`} delay={100}>
              <div>
                <p className="text-base leading-relaxed text-[#6b7280]">
                  {pillars[activeTab].description}
                </p>

                <h3 className="mt-8 font-serif text-lg font-bold text-[#1a1a1a]">
                  Eredmények
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {pillars[activeTab].results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#1a1a1a]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1a1a1a]" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 font-serif text-lg font-bold text-[#1a1a1a]">
                  Megoldások
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillars[activeTab].solutions.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-[#e5e5e5] bg-white px-4 py-1.5 text-sm text-[#1a1a1a]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== PROCESS TIMELINE ========== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              Folyamat
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
              Együttműködés folyamata
            </h2>
          </Reveal>

          <div className="relative mt-16 flex flex-col gap-12 pl-14">
            {/* vertical line */}
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-[#e5e5e5]" />

            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative">
                  {/* dot */}
                  <div className="absolute -left-14 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
                    <span className="font-serif text-xs font-bold text-[#1a1a1a]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[#6b7280]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="mt-10 max-w-3xl font-serif text-2xl leading-relaxed font-bold text-[#1a1a1a] md:text-3xl">
                Ha most azon gondolkodtál, hogy mindez jól hangzik, de nem
                tudod, a te helyzetedre is működhet-e, akkor pontosan erről
                érdemes beszélnünk.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Konzultáció",
                  desc: "Átbeszéljük a helyzetedet, a céljaidat és a kihívásaidat, hogy valóban megértsem, hol tartasz most.",
                },
                {
                  title: "Őszinte vélemény",
                  desc: "Őszinte véleményt mondok arról, hogy a te élethelyzetedben merre érdemes elindulnod.",
                },
                {
                  title: "Iránymutatás",
                  desc: "Ha most nem a szolgáltatásom a számodra legjobb megoldás, azt is megmondom és a megfelelő szakemberrel összekapcsollak.",
                },
                {
                  title: "Egyéni árajánlat",
                  desc: "Ha viszont mindketten úgy érezzük, hogy érdemes lenne együtt dolgozni, küldök egy személyre szóló árajánlatot.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-[#e5e5e5] bg-white p-8">
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#6b7280]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex justify-center">
              <Link
                href="https://cal.com"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jelentkezek konzultációra
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              GYIK
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#1a1a1a] md:text-4xl">
              Gyakran ismételt kérdések
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-12">
            {faqData.map((cat) => (
              <Reveal key={cat.category}>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
                    {cat.category}
                  </h3>

                  <div className="mt-6 flex flex-col divide-y divide-[#e5e5e5]">
                    {cat.items.map((item, i) => {
                      const key = `${cat.category}-${i}`;
                      const isOpen = openFaq === key;

                      return (
                        <div key={key} className="py-5">
                          <button
                            onClick={() => toggleFaq(key)}
                            className="flex w-full items-center justify-between text-left"
                          >
                            <span className="font-serif text-base font-bold text-[#1a1a1a] pr-4">
                              {item.q}
                            </span>
                            <span
                              className="shrink-0 text-xl text-[#6b7280] transition-transform duration-300"
                              style={{
                                transform: isOpen
                                  ? "rotate(45deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              +
                            </span>
                          </button>
                          <div
                            className={`faq-answer ${isOpen ? "open" : ""}`}
                          >
                            <p className="pt-4 leading-relaxed text-[#6b7280]">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
