import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Rólam — Nagy Attila | Expert Flow",
  description:
    "Bizalom, jelenlét, felelősségvállalás. Vállalkozásépítés mint legerősebb eszköz a személyes fejlődéshez.",
};

const timeline = [
  {
    label: "Kezdetek",
    text: "Középiskolás tesitanárom első nap kihívott megnézni egy rúdugró edzést — azt mondta, 'lesznek a pályán jó csajok is'. A csajokból nem lett semmi, de a rúdugrásba azonnal beleszerettem, és 16 évig minden erről szólt.",
  },
  {
    label: "Újratervezés",
    text: "A legjobb akartam lenni benne, olimpiáról álmodtam, amíg egy sérv véget nem vetett ennek.",
    sub: "Visszamentem a gyerekkoromhoz: mi az, amit igazán szerettem csinálni?",
  },
  {
    label: "Útkeresés",
    text: "Sokáig kerestem azt az egy dolgot, amit teljes erőbedobással tudnék csinálni.",
    sub: "Zero waste webshop, textil körforgás, filmipar — sok minden volt.",
  },
  {
    label: "Jelen",
    text: "Végül mindig a vállalkozásépítésnél kötöttem ki — semmi más nem ad ennyi kihívást és fejlődést.",
    sub: "Ma már tudom: értéket adni és támogatni mások fejlődését.",
  },
];

const qaItems = [
  {
    q: "Hogyan kezdted az AI-t?",
    a: "ChatGPT-vel, azt hittem mindent megold. Ráfizettem. Megtanultam felelősen használni.",
  },
  {
    q: "Legnagyobb kudarc?",
    a: "Mindent rábíztam az AI-ra. Az AI felnagyítja, akik vagyunk. Ha nem dolgozol magadon, az eszköz sem ment meg.",
  },
  {
    q: "Szabadidő?",
    a: "Erdőben sétálok Hűvösvölgyben. Olvasok, sütök, főzök, heti 2x edzek.",
  },
  {
    q: "Versenysport?",
    a: "Rúdugrás, 16 évig. Szerelem volt. Megtanított, hogy egy nagy szerelem után jöhet a másik.",
  },
  {
    q: "Érdekesség?",
    a: "Nem tudom megenni a velőt. A rántott hús sült krumplival az emberiség egyik legnagyobb találmánya. 2026, és még nem ültem repülőn.",
  },
];

export default function RolamPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-merriweather)]">
      {/* ── HERO / PHILOSOPHY ── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-32 pb-20 md:px-12">
        <Reveal>
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            <div className="w-full shrink-0 md:w-[380px]">
              <Image
                src="/images/attila.jpg"
                alt="Nagy Attila"
                width={380}
                height={480}
                className="w-full rounded-2xl object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold leading-tight text-[#1a1a1a] md:text-4xl lg:text-5xl">
                Bizalom, jelenlét,
                <br />
                felelősségvállalás
              </h1>
              <p className="mt-6 text-lg font-light text-[#6b7280] md:text-xl">
                Vállalkozásépítés mint legerősebb eszköz a személyes fejlődéshez
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FILOZÓFIÁM ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
        <Reveal>
          <div className="mx-auto max-w-[780px] space-y-8 text-[18px] font-light leading-relaxed text-[#1a1a1a] md:text-[20px]">
            <p>
              Sokáig azt hittem, az AI mindent megold. Gyorsabban ír, okosabban
              elemez — és ez igaz.
            </p>
            <p>
              De az ügyfeled nem azért választ, mert gyors vagy. Hanem mert
              megbízik benned. Mert ott vagy. Mert felelősséget vállalsz.
            </p>
            <p className="text-2xl font-bold md:text-3xl">
              Ezt az AI nem tudja.
            </p>
            <p>
              Nem tud bizalmat építeni szemkontaktussal. Nem tud megnyugtatni a
              telefonban. Nem tud kiállni egy döntés mellett, amikor nehéz.
            </p>
            <p>
              Az Expert Flow-t azért hoztam létre, mert a munkád értékesebb,
              mint valaha — ha lekerül róla az, ami elvonja a figyelmed.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── TÖRTÉNETEM (Timeline) ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:gap-20">
          {/* Sticky heading */}
          <div className="shrink-0 md:w-[280px]">
            <Reveal>
              <h2 className="text-2xl font-bold text-[#1a1a1a] md:sticky md:top-32 md:text-3xl">
                Az út idáig
              </h2>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="relative flex-1 pl-8">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-[#e5e5e5]" />

            <div className="space-y-14">
              {timeline.map((item, i) => (
                <Reveal key={item.label} delay={i * 100}>
                  <div className="relative">
                    {/* Dot */}
                    <div className="absolute -left-8 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#e5e5e5] bg-white" />

                    <h3 className="text-lg font-bold text-[#1a1a1a]">
                      {item.label}
                    </h3>
                    <p className="mt-2 font-light leading-relaxed text-[#1a1a1a]">
                      {item.text}
                    </p>
                    {item.sub && (
                      <p className="mt-2 text-sm italic text-[#6b7280]">
                        {item.sub}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AKIKET SZOLGÁLOK ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
        <Reveal>
          <div className="mx-auto max-w-[780px] space-y-8 text-[18px] font-light leading-relaxed text-[#1a1a1a] md:text-[20px]">
            <p>
              Egyéni vállalkozóknak segítek, mert magam is az vagyok —
              ugyanazokkal a nehézségekkel küzdök.
            </p>
            <p>
              Csak abban lehetek hiteles, amin magam is átmegyek. A saját utamat
              kínálom — a hibáimból szűrt tapasztalatokat.
            </p>
            <p>Nem elvont elmélet, hanem ami működött, és ami nem.</p>
          </div>
        </Reveal>
      </section>

      {/* ── QUOTE ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-12">
        <Reveal>
          <blockquote className="mx-auto max-w-[780px] text-center">
            <p className="text-2xl font-light italic leading-relaxed text-[#1a1a1a] md:text-3xl">
              &ldquo;A vállalkozás nem arról szól, mit csinálsz. Arról szól,
              miért csinálod.&rdquo;
            </p>
            <footer className="mt-6 text-base text-[#6b7280]">
              — Simon Sinek
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* ── Q&A ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
        <Reveal>
          <h2 className="mb-12 text-center text-2xl font-bold text-[#1a1a1a] md:text-3xl">
            Kérdezz — válaszolok
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-2">
          {qaItems.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <div className="rounded-xl border border-[#e5e5e5] p-6">
                <h3 className="text-base font-bold text-[#1a1a1a]">
                  {item.q}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#6b7280]">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-12">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl">
              Beszéljünk a vállalkozásodról
            </h2>
            <p className="mt-4 text-lg font-light text-[#6b7280]">
              30 perces konzultáció. Ingyenes. Kötöttségek nélkül.
            </p>
            <Link
              href="https://cal.com/expertflow/konzultacio"
              className="mt-8 inline-block rounded-full bg-[#1a1a1a] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#333]"
            >
              Konzultáció
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
