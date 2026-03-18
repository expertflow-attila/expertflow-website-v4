"use client";

import { useState } from "react";
import { Reveal } from "@/components/scroll-reveal";
import Image from "next/image";
import Link from "next/link";

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const targetAudience = [
  "Nem a szerencsére akarsz hagyatkozni — hanem tudni, honnan jön a következő ügyfél.",
  "Vannak ügyfeleid, de szeretnéd, ha a kiszolgálás nem venné el a napod nagy részét.",
  "Szeretnéd, ha a vállalkozásod működése átlátható lenne, és nem kellene mindent fejben tartani.",
];

const pillars = [
  {
    id: "ugyfelszerzes",
    navLabel: "I. Ügyfélszerzés",
    image: "/images/pillar-1.webp",
    description:
      "Felépítünk egy ügyfélszerzési útvonalat, ami az ajánlások mellett is dolgozik — hogy a megfelelő emberek megtaláljanak, és felismerjék a szolgáltatásod értékét.",
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
        desc: "Emlékeztetők, visszajelzés kérése és üzenetek a megfelelő pillanatban — anélkül, hogy neked kellene fejben tartanod.",
      },
      {
        title: "AI támogatott ügyfélkezelés",
        desc: "A rutinkérdéseket a te hangodban kezeli, a komolyabb ügyeket pedig hozzád irányítja — így az ügyfél mindig gyors választ kap.",
      },
      {
        title: "Visszajelzés kérő automatikák",
        desc: "Ügyfeled visszajelzést ad a szolgáltatásról, az élményről, az eredményekről. Nem neked kell kérned, és nem marad el soha.",
      },
      {
        title: "Konzultáció előkészítés",
        desc: "A konzultáció előtt az ügyfél megkapja, amire szüksége van — kérdőív, felkészítő anyag, emlékeztető.",
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
        desc: "Automatizált regisztráció, emlékeztetők és visszanézhető felvételek — legyen szó élő vagy online eseményekről.",
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
        desc: "AI asszisztensedtől hetente egyszer kapsz egy összesítőt, ami a legfontosabbakat mutatja — pénzügyek, ügyfelek, kampányok.",
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

const ctaSteps = [
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
];

const faqCategories = [
  {
    name: "Folyamat",
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
    name: "Garancia",
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
  {
    name: "Árazás és együttműködés",
    items: [
      {
        q: "Hogyan kezdjük?",
        a: "Egy bevezető konzultációval, ahol feltérképezzük, hol tartasz most, és mire van leginkább szükséged. Ebből készül egy terv, és ha mindketten úgy látjuk, hogy van értelme, indulunk.",
      },
      {
        q: "Nekem is dolgoznom kell rajta, vagy mindent ti csináltok?",
        a: "Az elején közösen dolgozunk, mert a te vállalkozásodat senki nem ismeri jobban nálad. Utána a napi működéshez minimális beavatkozás kell tőled — erre készítjük fel az egészet.",
      },
      {
        q: "Mennyibe kerül?",
        a: "A pontos árat a bevezető konzultáción beszéljük meg, mert függ attól, melyik területen kezdünk és milyen mélységben. A legtöbb projektünk 400 000 – 600 000 forint közötti tartományban van. Alapító ügyfeleknek kedvezményes feltételekkel dolgozunk.",
      },
      {
        q: "Van lehetőség részletfizetésre?",
        a: "Igen, természetesen! Tudom, hogy ez nagy befektetés lehet valaki számára, ezért biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen mindenki számára.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SzolgaltatasPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeFaqCat, setActiveFaqCat] = useState(0);

  const pillar = pillars[activeTab];

  const toggleFaq = (key: string) =>
    setOpenFaq((prev) => (prev === key ? null : key));

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4">Szolgáltatás</p>
            <h1 className="text-h1 text-text max-w-[720px]">
              Hiszünk abban, hogy a tudásod érték
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-body text-text-64 mt-6 max-w-[620px]">
              Szolgáltatásunk fő célja az egyéni vállalkozók támogatása egy
              hatékony és fenntartható üzleti rendszer felépítésében.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 overflow-hidden rounded-lg">
              <Image
                src="/images/service-image.webp"
                alt="Expert Flow szolgáltatás"
                width={940}
                height={480}
                className="image-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== KINEK SZÓL ===== */}
      <section className="section-padding-sm bg-stone">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-3">Célcsoport</p>
            <h2 className="text-h2 text-text">Kinek szól?</h2>
            <p className="text-body text-text-64 mt-4">Neked szól, ha:</p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-0">
            {targetAudience.map((text, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="service-item">
                  <div className="text-medium">{String(i + 1).padStart(2, "0")}</div>
                  <p className="text-body text-text">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THREE PILLARS — TABS ===== */}
      <section className="section-dark section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-light-48 mb-3">Rendszer</p>
            <h2 className="text-h2 text-light">Három pillér, egy rendszer</h2>
          </Reveal>

          {/* Tab navigation */}
          <Reveal delay={100}>
            <div className="mt-12 flex gap-0 border-b border-[#ffffff14]">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(i)}
                  className={`tab-item ${activeTab === i ? "active" : ""}`}
                >
                  {p.navLabel}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="mt-12 grid-2col items-start">
            {/* Left — Image */}
            <Reveal key={`img-${activeTab}`}>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={pillar.image}
                  alt={pillar.navLabel}
                  width={460}
                  height={320}
                  className="image-cover"
                />
              </div>
            </Reveal>

            {/* Right — Description + Results */}
            <div>
              <Reveal key={`desc-${activeTab}`}>
                <p className="text-body text-light-88">
                  {pillar.description}
                </p>
              </Reveal>

              <Reveal key={`results-${activeTab}`} delay={100}>
                <div className="mt-8">
                  <p className="label-small text-light-48 mb-4">Eredmények</p>
                  <div className="flex flex-col gap-3">
                    {pillar.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-light shrink-0" />
                        <span className="text-small text-light-88">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Solutions grid */}
          <Reveal key={`solutions-${activeTab}`} delay={200}>
            <div className="mt-16">
              <p className="label-small text-light-48 mb-8 text-center">Megoldások</p>
              <div className="grid-solutions">
                {pillar.solutions.map((s, i) => (
                  <div
                    key={i}
                    className="card-pricing"
                  >
                    <h4 className="text-small font-semibold text-light mb-2">
                      {s.title}
                    </h4>
                    <p className="text-small text-light-64 leading-body">
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
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-3">Folyamat</p>
            <h2 className="text-h2 text-text">Együttműködés folyamata</h2>
            <p className="text-body text-text-64 mt-3 max-w-[540px]">
              Hét lépésben a stratégiától az önálló működésig.
            </p>
          </Reveal>

          <div className="relative mt-16 flex flex-col gap-0 pl-14">
            {/* vertical line */}
            <div className="timeline-line" />

            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative pb-10">
                  {/* Number circle */}
                  <div className="timeline-circle">
                    <span className="label-small text-text">{step.num}</span>
                  </div>
                  <h3 className="text-h5 text-text font-medium">{step.title}</h3>
                  <p className="text-small text-text-64 mt-2 max-w-[540px] leading-body">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA WITH ATTILA ===== */}
      <section className="section-padding-md bg-stone">
        <div className="container-main">
          <Reveal>
            <div className="text-center max-w-[720px] mx-auto">
              <h2 className="text-h3 text-text leading-snug">
                Ha most azon gondolkodtál, hogy mindez jól hangzik, de nem
                tudod, a te helyzetedre is működhet-e, akkor pontosan erről
                érdemes beszélnünk.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-16 flex flex-col items-center gap-12 md:flex-row md:items-start">
              {/* Portrait */}
              <div className="shrink-0">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-[200px] h-[200px]"
                />
              </div>

              {/* Value propositions */}
              <div className="flex-1 flex flex-col gap-6">
                {ctaSteps.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-text shrink-0" />
                    <div>
                      <span className="text-small font-semibold text-text">
                        {item.title}
                      </span>
                      <span className="text-small text-text-64">
                        {" — "}
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark"
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
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-3">GYIK</p>
            <h2 className="text-h2 text-text">Gyakran ismételt kérdések</h2>
          </Reveal>

          {/* FAQ category tabs */}
          <Reveal delay={100}>
            <div className="mt-10 flex gap-0 border-b border-text-8">
              {faqCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveFaqCat(i);
                    setOpenFaq(null);
                  }}
                  className={`tab-item ${activeFaqCat === i ? "active" : ""}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-8">
            {faqCategories[activeFaqCat].items.map((item, i) => {
              const key = `${faqCategories[activeFaqCat].name}-${i}`;
              const isOpen = openFaq === key;

              return (
                <Reveal key={key} delay={i * 60}>
                  <div className="divider" />
                  <div className="py-5">
                    <button
                      onClick={() => toggleFaq(key)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-body font-medium text-text pr-4">
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 text-xl text-text-48 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`faq-answer ${isOpen ? "open" : ""}`}
                    >
                      <p className="text-small text-text-64 pt-4 leading-body">
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
    </>
  );
}
