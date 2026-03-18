"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

/* ── DATA ── */
const timeline = [
  {
    label: "Kezdetek",
    subtitle: "ahol minden elkezdődött",
    text: "Középiskolás tesitanárom első nap kihívott megnézni egy rúdugró edzést – azt mondta, 'lesznek a pályán jó csajok is'. A csajokból nem lett semmi, de a rúdugrásba azonnal beleszerettem, és attól a naptól fogva 16 évig minden erről szólt.",
  },
  {
    label: "Újratervezés",
    subtitle: "a gyerekkortól indulva",
    text: "A legjobb akartam lenni benne, olimpiáról álmodtam, és mindent beleadtam, amíg egy sérv véget nem vetett ennek az időszaknak. Az élsport lezárult – egyik napról a másikra új irányt kellett keresnem.",
    sub: "Ehhez visszamentem a gyerekkoromhoz: mi az, amit igazán szerettem csinálni, ami mindig is érdekelt, és amit életem végéig szívesen csinálnék.",
  },
  {
    label: "Útkeresés",
    subtitle: "zero waste & a filmipar",
    text: "Sokáig kerestem azt az egy dolgot, amit egész életemben teljes erőbedobással tudnék csinálni úgy, mint régen a rúdugrást.",
    sub: "Kipróbáltam sok mindent: zero waste webshopot, textil körforgásos modellt, még a filmiparba is belekóstoltam.",
  },
  {
    label: "Jelen",
    subtitle: "ami ma mozgat",
    text: "De bármerre is vitt az élet, végül mindig a vállalkozásépítésnél kötöttem ki – mert semmi más nem ad számomra ennyi kihívást és fejlődési lehetőséget egyszerre.",
    sub: "Ma már tudom, hogy ez az, amit igazán szeretek: értéket adni és támogatni mások fejlődését.",
  },
];

const qaItems = [
  {
    q: "Miért pont AI? Hogyan kerültél ebbe a világba?",
    a: "Úgy, ahogy a legtöbben – a ChatGPT-vel kezdtem, és azt hittem, mindent meg fog oldani. Ráfizettem. Aztán találkoztam Nick Saraev és Nate Herk munkásságával, akik teljesen más szemszöget adtak. Nem az AI-t tették piedesztálra, hanem azt mutatták meg, hogyan lehet felelősen, etikusan és értelmesen használni. Nekem ez rezonált, mert azt szeretném, hogy az AI egy élhetőbb, fenntarthatóbb világot szolgáljon – ne csak gyorsabbat.",
  },
  {
    q: "Mi volt a legnagyobb kudarc, amiből tanultál?",
    a: "Azt hittem, az AI-jal le tudom rövidíteni az utat. Mindent IS rábíztam, amiket nem szabadott volna. Részben kíváncsiságból, részben lustaságból. A legnagyobb tanulság az volt, hogy az AI felnagyítja azt, akik vagyunk. Ha nem dolgozol saját magadon, az eszköz sem fog megmenteni. Nem lehet megkerülni a személyes fejlődést – az AI nem helyettesíti, csak felerősíti.",
  },
  {
    q: "Mit csinálsz, amikor nem dolgozol?",
    a: "Szeretek erdőben sétálni, legtöbbször Hűvösvölgyben. Olvasok, sütök, főzök, és próbálok heti kétszer eljutni edzeni – nem mindig sikerül, de próbálom tartani. Rájöttem, hogy a legegyszerűbb dolgok a legjobbak.",
  },
  {
    q: "Mit tanított neked a 16 év versenysport?",
    a: "A rúdugrás volt az, amit mindennél jobban szerettem. Szerelem volt, 16 évig. Aztán egyik napról a másikra abba kellett hagynom. Évekbe telt, míg feldolgoztam. De megtanított arra, hogy egy nagy szerelem után jöhet a másik. Ahhoz viszont meg kell állni, le kell csendesedni, és időt kell adni magadnak. Visszamenni a gyökereinkhez, megtalálni, mi az, ami boldoggá tesz. Nálam évek kellettek hozzá. De megtaláltam.",
  },
  {
    q: "Milyen szokásaid és furcsaságaid vannak?",
    a: "Képtelen vagyok megenni a velőt. :) Viszont a rántott hús sült krumplival és uborkasalátával szerintem az emberiség egyik legnagyobb találmánya. Banános tiramisut csinálok, amiről szerényen állítom, hogy nagyon jó. A kedvenc édességem a habos mákos, amit senki nem tud úgy elkészíteni, mint anyum. Végül pedig, 2026-ban járunk, és én még nem ültem repülőn.",
  },
];

export default function RolamPage() {
  return (
    <div className="bg-background">
      {/* ── HERO ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Rólam</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
          </Section>
          <Section delay={100}>
            <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
              <div className="w-full shrink-0 md:w-[380px]">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={380}
                  height={480}
                  className="w-full object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight">
                  Bizalom, jelenlét,
                  <br />
                  felelősségvállalás
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Vállalkozásépítés mint legerősebb eszköz a személyes fejlődéshez
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── FILOZÓFIÁM ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-8 justify-center max-w-[720px] mx-auto">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Filozófiám</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
          </Section>
          <Section delay={100}>
            <div className="mx-auto max-w-[720px] space-y-6 text-lg leading-relaxed">
              <p>
                Sokáig azt hittem én is, hogy az AI majd mindent megold.
                Gyorsabban ír, okosabban elemez, hatékonyabban szervez &ndash;
                és ez mind igaz.
              </p>
              <p>
                De az ügyfeled nem azért választ téged, mert gyors vagy. Hanem
                mert megbízik benned. Mert ott vagy, amikor kell. Mert te
                vállalod a felelősséget azért, amit mondasz és teszel.
              </p>
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-display tracking-tight leading-[1.2]">
                Ezt az AI nem tudja.
              </p>
              <p>
                Nem tud bizalmat építeni szemkontaktussal. Nem tud megnyugtatni
                egy aggódó ügyfelet a telefonban. Nem tud kiállni egy döntés
                mellett, amikor nehéz.
              </p>
              <p>
                Az Expert Flow-t azért hoztam létre, mert hiszek abban, hogy a
                te munkád értékesebb, mint valaha &ndash; ha lekerül róla az,
                ami elvonja a figyelmedet attól, amiben igazán jó vagy.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* ── TÖRTÉNETEM (Timeline) ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Az én történetem</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-16">
              Vállalkozásépítés mint legerősebb eszköz
              <br className="hidden md:block" /> a személyes fejlődéshez
            </h2>
          </Section>

          <div className="flex flex-col gap-12 md:flex-row md:gap-20">
            <div className="hidden shrink-0 md:block md:w-[200px]" />

            <div className="relative flex-1 pl-8">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-foreground/10" />

              <div className="space-y-16">
                {timeline.map((item, i) => (
                  <Section key={item.label} delay={i * 120}>
                    <div className="relative">
                      <div className="absolute -left-8 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-foreground/20 bg-background" />

                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        {item.label}
                        <span className="normal-case tracking-normal font-sans">
                          {" "}&mdash; {item.subtitle}
                        </span>
                      </p>
                      <p className="mt-3 text-base leading-relaxed">
                        {item.text}
                      </p>
                      {item.sub && (
                        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </Section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AKIKET SZOLGÁLOK ── */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest opacity-50">Akiket én szolgálok</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-10">
              Egyéni vállalkozók
            </h2>
          </Section>
          <Section delay={100}>
            <div className="mx-auto max-w-[720px] space-y-6 text-lg opacity-90 leading-relaxed">
              <p>
                Egyéni vállalkozóknak segítek, mert magam is az vagyok &ndash;
                ugyanazokkal a kérdésekkel, ugyanazokkal a nehézségekkel küzdök,
                mint ők. Az elmúlt évek során rengeteg hibát követtem el és
                rossz döntéseket hoztam, és ezekből tanultam a legtöbbet.
              </p>
              <p>
                Úgy gondolom, csak abban lehetek hiteles, amin magam is
                átmegyek. Én a saját utamat kínálom fel &ndash; azt a tudást és
                azokat a tapasztalatokat, amelyeket a hibáimból szűrtem le. Nem
                elvont elméletet, hanem azt, ami valóban működött, és azt is,
                ami nem.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SIMON SINEK QUOTE ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <blockquote className="mx-auto max-w-[720px] text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">Mások szolgálata</p>
              <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-display leading-snug tracking-tight">
                &ldquo;A vállalkozás nem arról szól, hogy mit csinálsz vagy mit
                adsz el. Arról szól, hogy miért csinálod. Azok, akik másokat
                szolgálnak &ndash; nem önmaguk gazdagítása végett, hanem mert
                őszintén hisznek abban, hogy jobbá tehetik mások életét &ndash;
                ők azok, akik valódi és tartós hatást érnek el. Az üzleti élet
                legnagyobb titka nem a stratégia. A bizalom.&rdquo;
              </p>
              <footer className="mt-8 text-sm text-muted-foreground">
                &mdash; Simon Sinek
              </footer>
            </blockquote>
          </Section>
        </div>
      </section>

      {/* ── Q&A ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4 justify-center max-w-[940px] mx-auto">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Néhány infó még rólam</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
          </Section>

          <div className="mt-12 mx-auto grid max-w-[940px] gap-6 md:grid-cols-2">
            {qaItems.map((item, i) => (
              <Section key={item.q} delay={i * 80}>
                <div className="rounded-lg border border-foreground/10 bg-card p-8 hover-lift">
                  <h3 className="text-base font-semibold">
                    {item.q}
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="text-center">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight">
                Beszéljünk a vállalkozásodról
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                30 perces konzultáció. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href="https://cal.com/attila-nagy-8uefco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-foreground text-background px-8 h-12 rounded-full text-sm hover:bg-foreground/90 transition-colors"
              >
                Konzultáció
              </a>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}
