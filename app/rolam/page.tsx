import { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Rólam — Nagy Attila | Expert Flow",
  description:
    "Bizalom, jelenlét, felelősségvállalás. Vállalkozásépítés mint legerősebb eszköz a személyes fejlődéshez.",
};

const timeline = [
  {
    label: "Kezdetek",
    subtitle: "ahol minden elkezdődött",
    text: "Középiskolás tesitanárom első nap kihívott megnézni egy rúdugró edzést \u2013 azt mondta, \u2018lesznek a pályán jó csajok is\u2019. A csajokból nem lett semmi, de a rúdugrásba azonnal beleszerettem, és attól a naptól fogva 16 évig minden erről szólt.",
  },
  {
    label: "Újratervezés",
    subtitle: "a gyerekkortól indulva",
    text: "A legjobb akartam lenni benne, olimpiáról álmodtam, és mindent beleadtam, amíg egy sérv véget nem vetett ennek az időszaknak. Az élsport lezárult \u2013 egyik napról a másikra új irányt kellett keresnem.",
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
    text: "De bármerre is vitt az élet, végül mindig a vállalkozásépítésnél kötöttem ki \u2013 mert semmi más nem ad számomra ennyi kihívást és fejlődési lehetőséget egyszerre.",
    sub: "Ma már tudom, hogy ez az, amit igazán szeretek: értéket adni és támogatni mások fejlődését.",
  },
];

const qaItems = [
  {
    q: "Miért pont AI? Hogyan kerültél ebbe a világba?",
    a: "Úgy, ahogy a legtöbben \u2013 a ChatGPT-vel kezdtem, és azt hittem, mindent meg fog oldani. Ráfizettem. Aztán találkoztam Nick Saraev és Nate Herk munkásságával, akik teljesen más szemszöget adtak. Nem az AI-t tették piedesztálra, hanem azt mutatták meg, hogyan lehet felelősen, etikusan és értelmesen használni. Nekem ez rezonált, mert azt szeretném, hogy az AI egy élhetőbb, fenntarthatóbb világot szolgáljon \u2013 ne csak gyorsabbat.",
  },
  {
    q: "Mi volt a legnagyobb kudarc, amiből tanultál?",
    a: "Azt hittem, az AI-jal le tudom rövidíteni az utat. Mindent IS rábíztam, amiket nem szabadott volna. Részben kíváncsiságból, részben lustaságból. A legnagyobb tanulság az volt, hogy az AI felnagyítja azt, akik vagyunk. Ha nem dolgozol saját magadon, az eszköz sem fog megmenteni. Nem lehet megkerülni a személyes fejlődést \u2013 az AI nem helyettesíti, csak felerősíti.",
  },
  {
    q: "Mit csinálsz, amikor nem dolgozol?",
    a: "Szeretek erdőben sétálni, legtöbbször Hűvösvölgyben. Olvasok, sütök, főzök, és próbálok heti kétszer eljutni edzeni \u2013 nem mindig sikerül, de próbálom tartani. Rájöttem, hogy a legegyszerűbb dolgok a legjobbak.",
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
    <div className="bg-bg">
      {/* ── HERO ── */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-6">Rólam</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
              <div className="w-full shrink-0 md:w-[380px]">
                <Image
                  src="/images/attila.jpg"
                  alt="Nagy Attila"
                  width={380}
                  height={480}
                  className="image-cover w-full"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-h2 text-text">
                  Bizalom, jelenlét,
                  <br />
                  felelősségvállalás
                </h1>
                <p className="mt-6 text-h5 text-text-48">
                  Vállalkozásépítés mint legerősebb eszköz a személyes
                  fejlődéshez
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FILOZÓFIÁM ── */}
      <section className="section-padding-sm">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-10 text-center">
              Filozófiám
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto max-w-[720px] space-y-6 text-h6 text-text">
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
              <p className="text-h3 text-text" style={{ fontWeight: 400 }}>
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
          </Reveal>
        </div>
      </section>

      {/* ── TÖRTÉNETEM (Timeline) ── */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4">Az én történetem</p>
            <h2 className="text-h2 text-text mb-16">
              Vállalkozásépítés mint legerősebb eszköz
              <br className="hidden md:block" /> a személyes fejlődéshez
            </h2>
          </Reveal>

          <div className="flex flex-col gap-12 md:flex-row md:gap-20">
            {/* Sticky heading on desktop */}
            <div className="hidden shrink-0 md:block md:w-[200px]" />

            {/* Timeline */}
            <div className="relative flex-1 pl-8">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-0 w-px bg-text-16" />

              <div className="space-y-16">
                {timeline.map((item, i) => (
                  <Reveal key={item.label} delay={i * 120}>
                    <div className="relative">
                      {/* Dot */}
                      <div className="absolute -left-8 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-text-32 bg-bg" />

                      <p className="label-small text-text-48 mb-1">
                        {item.label}
                        <span className="normal-case tracking-normal font-normal">
                          {" "}
                          &mdash; {item.subtitle}
                        </span>
                      </p>
                      <p className="mt-3 text-body text-text leading-relaxed">
                        {item.text}
                      </p>
                      {item.sub && (
                        <p className="mt-3 text-body text-text-64 leading-relaxed">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AKIKET SZOLGÁLOK ── */}
      <section className="section-dark section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-light-48 mb-4">
              Akiket én szolgálok
            </p>
            <h2 className="text-h3 text-light mb-10">Egyéni vállalkozók</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto max-w-[720px] space-y-6 text-h6 text-light-88">
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
          </Reveal>
        </div>
      </section>

      {/* ── SIMON SINEK QUOTE ── */}
      <section className="section-padding-lg">
        <div className="container-main">
          <Reveal>
            <blockquote className="mx-auto max-w-[720px] text-center">
              <p className="label-small text-text-48 mb-8">Mások szolgálata</p>
              <p className="text-h4 text-text leading-snug">
                &ldquo;A vállalkozás nem arról szól, hogy mit csinálsz vagy mit
                adsz el. Arról szól, hogy miért csinálod. Azok, akik másokat
                szolgálnak &ndash; nem önmaguk gazdagítása végett, hanem mert
                őszintén hisznek abban, hogy jobbá tehetik mások életét &ndash;
                ők azok, akik valódi és tartós hatást érnek el. Az üzleti élet
                legnagyobb titka nem a stratégia. A bizalom.&rdquo;
              </p>
              <footer className="mt-8 text-small text-text-48">
                &mdash; Simon Sinek
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Q&A ── */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4 text-center">
              Néhány infó még rólam
            </p>
          </Reveal>

          <div className="mt-12 mx-auto grid max-w-[940px] gap-6 md:grid-cols-2">
            {qaItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <div className="rounded-xl border border-text-8 bg-bg-card p-8">
                  <h3 className="text-body font-semibold text-text">
                    {item.q}
                  </h3>
                  <p className="mt-4 text-small text-text-64 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding-lg">
        <div className="container-main">
          <Reveal>
            <div className="text-center">
              <h2 className="text-h2 text-text">
                Beszéljünk a vállalkozásodról
              </h2>
              <p className="mt-4 text-h5 text-text-48">
                30 perces konzultáció. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href="https://cal.com/attila-nagy-8uefco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark mt-10 inline-flex"
              >
                Konzultáció
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
