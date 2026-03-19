"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { trackCTAClick, trackTabSwitch, trackFAQOpen } from "@/lib/analytics";

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

/* ── DATA ── */
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
      { title: "Weboldal és landoló oldal", desc: "Nem csak egy szép bemutatkozó felület, hanem olyan oldal, ami végigvezeti az érdeklődőt az első konzultációig." },
      { title: "Személyi asszisztens", desc: "Digitális alkalmazottad, aki ismeri a szolgáltatásaidat, válaszol a gyakori kérdésekre, és az érdeklődőket konzultációra tereli." },
      { title: "Közösségek és kampányok", desc: "Kampányidőszakban a digitális csapatod támogatja a kommunikációt, a követést és a kiértékelést." },
      { title: "Előszűrés és kvalifikáció", desc: "Asszisztens kiszűri, ki az, akinek tényleg segíteni tudsz, így konzultációra már felkészült, kvalifikált érdeklődők érkeznek." },
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
      { title: "Onboarding folyamat", desc: "Az új ügyfél az első pillanattól tudja, mi a következő lépés, hogyan fog kinézni a közös munka, és hol talál mindent." },
      { title: "Automatikus utánkövetés", desc: "Emlékeztetők, visszajelzés kérése és üzenetek a megfelelő pillanatban — anélkül, hogy neked kellene fejben tartanod." },
      { title: "AI támogatott ügyfélkezelés", desc: "A rutinkérdéseket a te hangodban kezeli, a komolyabb ügyeket pedig hozzád irányítja — így az ügyfél mindig gyors választ kap." },
      { title: "Visszajelzés kérő automatikák", desc: "Ügyfeled visszajelzést ad a szolgáltatásról, az élményről, az eredményekről. Nem neked kell kérned, és nem marad el soha." },
      { title: "Konzultáció előkészítés", desc: "A konzultáció előtt az ügyfél megkapja, amire szüksége van — kérdőív, felkészítő anyag, emlékeztető." },
      { title: "Konzultáció utánkövetés", desc: "Konzultáció utána automatikusan megy az összefoglaló, a következő lépések és a kapcsolódó anyagok." },
      { title: "Ügyfél tudásbázis", desc: "Minden ügyfél saját portálon fér hozzá videókhoz, dokumentumokhoz és felvételekhez, AI-alapú kereséssel." },
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
      { title: "Számlázás és pénzügyi követés", desc: "A számlák automatikusan kimennek, a befizetések követhetők, és hónap végén nem kell órákat töltened az összesítéssel." },
      { title: "Üzleti adatbázis", desc: "Egy központi hely, ahol a vállalkozásod adatai gyűlnek, és idővel egyre tisztábban látod, mi hozza az eredményt." },
      { title: "Adatvezérelt döntések", desc: "Vállalkozásod tudásbázisa mutatja, hol veszíted el az érdeklődőket, és mire van szüksége az ügyfeleidnek." },
      { title: "Szakmai események automatizálása", desc: "Automatizált regisztráció, emlékeztetők és visszanézhető felvételek — legyen szó élő vagy online eseményekről." },
      { title: "AI csapat", desc: "AI ügynököd koordinálja a vállalkozásod fő területeire fókuszáló csapattagokat, és kérésednek megfelelően irányítja őket." },
      { title: "Átlátható ügyfélkezelés", desc: "Ügyfélkezelő (CRM) rendszered tárolja az összes ügyféladatot és előzményt kereshetően." },
      { title: "Heti összesítők", desc: "AI asszisztensedtől hetente egyszer kapsz egy összesítőt, ami a legfontosabbakat mutatja — pénzügyek, ügyfelek, kampányok." },
    ],
  },
];

const processSteps = [
  { num: "01", title: "Stratégiai konzultáció", desc: "Vállalkozásod működésének feltérképezése, szűk keresztmetszetek azonosítása, prioritások meghatározása, fejlesztési terv készítése." },
  { num: "02", title: "Diagnosztika", desc: "Részletes audit: meglévő folyamatok dokumentálása, rendszerek felmérése, fejlesztési terv és ütemezés készítése." },
  { num: "03", title: "Háttérműködés", desc: "Háttérműködés rendezése: CRM beállítás, számlázás automatizálás, naptárkezelés, dokumentumkezelés, belső Agentic AI asszisztens alapok." },
  { num: "04", title: "Kiszolgálás", desc: "Ügyfélélmény rendszerezése: onboarding folyamat, konzultáció-támogatás, feedback rendszer, ügyfélportál felépítése." },
  { num: "05", title: "Ügyfélszerzés", desc: "Ügyfélszerzés automatizálása: landing oldal, email marketing, AI lead kvalifikáció, funnel felépítése, analitika beállítása." },
  { num: "06", title: "Optimalizálás és átadás", desc: "Rendszerek finomhangolása, dokumentáció, betanítás, önálló működés biztosítása." },
  { num: "07", title: "Utókövetés és támogatás", desc: "Egy hónapos támogatás: kérdések megválaszolása, elakadások feloldása, önálló működés elsajátítása." },
];

const ctaSteps = [
  { title: "Konzultáció", desc: "Átbeszéljük a helyzetedet, a céljaidat és a kihívásaidat, hogy valóban megértsem, hol tartasz most." },
  { title: "Őszinte vélemény", desc: "Őszinte véleményt mondok arról, hogy a te élethelyzetedben merre érdemes elindulnod." },
  { title: "Iránymutatás", desc: "Ha most nem a szolgáltatásom a számodra legjobb megoldás, azt is megmondom és a megfelelő szakemberrel összekapcsollak." },
  { title: "Egyéni árajánlat", desc: "Ha viszont mindketten úgy érezzük, hogy érdemes lenne együtt dolgozni, küldök egy személyre szóló árajánlatot." },
];

const faqCategories = [
  {
    name: "Folyamat",
    items: [
      { q: "Mennyi idő alatt látok eredményt?", a: "Az első érzékelhető változások már 4-6 héten belül megjelennek — főleg a háttérműködés rendezése után, ahol sok vállalkozó hetente 5-10 órát nyer vissza. A teljes rendszer 4-6 hónap alatt áll össze, de nem kell megvárni a végét: minden lépés önmagában is értéket teremt." },
      { q: "Nekem kell érteni az AI-hoz, hogy működjön?", a: "Nem. Az én feladatom, hogy a rendszerek úgy működjenek, hogy te csak használod őket — nem karbantartod. A betanítás és az önálló működés biztosítása az együttműködés része." },
      { q: "Mi történik, ha már van vállalkozásom és ügyfeleim?", a: "Nem építünk le semmit, ami már működik. A diagnosztika fázisban felmérjük, mi van már a helyén, és csak azt fejlesztjük tovább, ami valóban szűk keresztmetszet. A változtatások fokozatosan, a napi munkád mellé kerülnek be." },
      { q: "Mennyi időt kell nekem beletenni ebbe?", a: "Hetente 2-4 óra aktív együttműködést igényel a folyamat — főleg az elején, amikor a rendszereket a te vállalkozásodhoz szabjuk. A cél az, hogy ez az idő folyamatosan csökkenjen, ahogy a rendszerek átvesznek feladatokat." },
    ],
  },
  {
    name: "Garancia",
    items: [
      { q: "Garantált az eredmény?", a: "Amit garantálok: strukturált folyamatot, átlátható rendszereket és egy működő alapot, amelyen tovább tudsz építeni. Az eredmény nagyrészt azon múlik, hogy mennyire következetesen alkalmazzuk együtt a felépített rendszereket." },
      { q: "Vállalsz garanciát?", a: "Igen, természetesen 100% garanciát vállalok a munkámra. Ha az első hónap után úgy érzed, hogy nem térül meg számodra a befektetés, és nem látod a vállalkozásod fejlődését, nem kell fizetned. Minden addig elért eredmény, amit közösen hoztunk létre, tied marad, díjtalanul. A célom, hogy a létező legjobb minőségű szolgáltatást nyújtsam a piacon, és tudom, hogy ez a legfontosabb a növekedésem szempontjából." },
    ],
  },
  {
    name: "Árazás és együttműködés",
    items: [
      { q: "Hogyan kezdjük?", a: "Egy bevezető konzultációval, ahol feltérképezzük, hol tartasz most, és mire van leginkább szükséged. Ebből készül egy terv, és ha mindketten úgy látjuk, hogy van értelme, indulunk." },
      { q: "Nekem is dolgoznom kell rajta, vagy mindent ti csináltok?", a: "Az elején közösen dolgozunk, mert a te vállalkozásodat senki nem ismeri jobban nálad. Utána a napi működéshez minimális beavatkozás kell tőled — erre készítjük fel az egészet." },
      { q: "Mennyibe kerül?", a: "A pontos árat a bevezető konzultáción beszéljük meg, mert függ attól, melyik területen kezdünk és milyen mélységben. A legtöbb projektünk 400 000 – 600 000 forint közötti tartományban van. Alapító ügyfeleknek kedvezményes feltételekkel dolgozunk." },
      { q: "Van lehetőség részletfizetésre?", a: "Igen, természetesen! Tudom, hogy ez nagy befektetés lehet valaki számára, ezért biztosítunk részletfizetési lehetőséget, hogy könnyebben elérhető legyen mindenki számára." },
    ],
  },
];

export default function SzolgaltatasPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeFaqCat, setActiveFaqCat] = useState(0);

  const pillar = pillars[activeTab];

  const toggleFaq = (key: string, question?: string) => {
    setOpenFaq((prev) => (prev === key ? null : key));
    if (openFaq !== key && question) trackFAQOpen(question, "szolgaltatas");
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Szolgáltatás</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight max-w-[720px]">
              Hiszünk abban, hogy a tudásod érték
            </h1>
          </Section>
          <Section delay={150}>
            <p className="text-lg text-muted-foreground mt-6 max-w-[620px] leading-relaxed">
              Szolgáltatásunk fő célja az egyéni vállalkozók támogatása egy
              hatékony és fenntartható üzleti rendszer felépítésében.
            </p>
          </Section>
          <Section delay={300}>
            <div className="mt-12 overflow-hidden rounded-lg">
              <Image
                src="/images/service-image.webp"
                alt="Expert Flow szolgáltatás"
                width={940}
                height={480}
                className="w-full object-cover"
                priority
              />
            </div>
          </Section>
        </div>
      </section>

      {/* ===== KINEK SZÓL ===== */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Célcsoport</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight">Kinek szól?</h2>
            <p className="text-lg text-muted-foreground mt-4">Neked szól, ha:</p>
          </Section>

          <div className="mt-12 flex flex-col gap-0">
            {targetAudience.map((text, i) => (
              <Section key={i} delay={i * 120}>
                <div className="flex items-start gap-6 py-6 border-b border-foreground/10">
                  <span className="font-mono text-sm text-muted-foreground shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-base">{text}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THREE PILLARS — TABS ===== */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest opacity-50">Rendszer</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight">
              Három pillér, egy rendszer
            </h2>
          </Section>

          {/* Tab navigation */}
          <Section delay={100}>
            <div className="mt-12 flex gap-0 border-b border-white/10">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => { setActiveTab(i); trackTabSwitch(p.id, "szolgaltatas_pillerek"); }}
                  className={`px-6 py-4 text-sm transition-all border-b-2 ${
                    activeTab === i
                      ? "border-white text-white"
                      : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  {p.navLabel}
                </button>
              ))}
            </div>
          </Section>

          {/* Tab content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Section key={`img-${activeTab}`}>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={pillar.image}
                  alt={pillar.navLabel}
                  width={460}
                  height={320}
                  className="w-full object-cover"
                />
              </div>
            </Section>

            <div>
              <Section key={`desc-${activeTab}`}>
                <p className="text-base opacity-90 leading-relaxed">
                  {pillar.description}
                </p>
              </Section>

              <Section key={`results-${activeTab}`} delay={100}>
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Eredmények</p>
                  <div className="flex flex-col gap-3">
                    {pillar.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 opacity-60" />
                        <span className="text-sm opacity-90">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            </div>
          </div>

          {/* Solutions grid */}
          <Section key={`solutions-${activeTab}`} delay={200}>
            <div className="mt-16">
              <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-8 text-center">Megoldások</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden">
                {pillar.solutions.map((s, i) => (
                  <div key={i} className="bg-foreground p-6">
                    <h4 className="text-sm font-semibold mb-2">{s.title}</h4>
                    <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Folyamat</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight">
              Együttműködés folyamata
            </h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-[540px]">
              Hét lépésben a stratégiától az önálló működésig.
            </p>
          </Section>

          <div className="relative mt-16 flex flex-col gap-0 pl-14">
            <div className="absolute top-0 bottom-0 left-[19px] w-px bg-foreground/10" />

            {processSteps.map((step, i) => (
              <Section key={step.num} delay={i * 80}>
                <div className="relative pb-10">
                  <div className="absolute -left-14 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background">
                    <span className="font-mono text-xs font-semibold">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-display tracking-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-[540px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA WITH ATTILA ===== */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="text-center max-w-[720px] mx-auto">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-display leading-snug tracking-tight">
                Ha most azon gondolkodtál, hogy mindez jól hangzik, de nem
                tudod, a te helyzetedre is működhet-e, akkor pontosan erről
                érdemes beszélnünk.
              </h2>
            </div>
          </Section>

          <Section delay={150}>
            <div className="mt-16 flex flex-col items-center gap-12 md:flex-row md:items-start">
              <div className="shrink-0">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-[200px] h-[200px]"
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                {ctaSteps.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-muted-foreground" />
                    <div>
                      <span className="text-sm font-semibold">{item.title}</span>
                      <span className="text-sm text-muted-foreground">{" — "}{item.desc}</span>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("szolgaltatas_cta")}
                    className="inline-flex items-center gap-2 bg-foreground text-background px-8 h-12 rounded-full text-sm hover:bg-foreground/90 transition-colors"
                  >
                    Jelentkezek konzultációra
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Section>
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
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight">
              Gyakran ismételt kérdések
            </h2>
          </Section>

          {/* FAQ category tabs */}
          <Section delay={100}>
            <div className="mt-10 flex gap-0 border-b border-foreground/10">
              {faqCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => { setActiveFaqCat(i); setOpenFaq(null); }}
                  className={`px-6 py-4 text-sm transition-all border-b-2 ${
                    activeFaqCat === i
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Section>

          <div className="mt-8">
            {faqCategories[activeFaqCat].items.map((item, i) => {
              const key = `${faqCategories[activeFaqCat].name}-${i}`;
              const isOpen = openFaq === key;

              return (
                <Section key={key} delay={i * 60}>
                  <div className="border-b border-foreground/10">
                    <div className="py-5">
                      <button
                        onClick={() => toggleFaq(key, item.q)}
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
    </>
  );
}
