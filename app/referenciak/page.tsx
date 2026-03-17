import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

const references = [
  {
    image: "/images/ref-1.webp",
    name: "Gömbicz Kata",
    role: "Klinikai pszichológus",
    specialties: "Autogén tréning / LMBTQ+ specializáció",
  },
  {
    image: "/images/ref-2.webp",
    name: "Vitányi Dávid",
    role: "Hangstúdió",
    specialties: "Felvétel, keverés, mastering, filmes hangmunka",
  },
  {
    image: "/images/ref-3.webp",
    name: "Dr. Nagyfejő Éva",
    role: "Tanácsadó",
    specialties: "Kiberbiztonsági irányítás és digitális ellenállóképesség",
  },
  {
    image: "/images/ref-4.webp",
    name: "Gyömbér Viktória",
    role: "Sportedző",
    specialties: "Személyi edzés, spinning, futás, úszás",
  },
];

const steps = [
  {
    number: "01",
    title: "Megértés",
    description:
      "Megértem a szakmádat, a célközönségedet és a kihívásaidat.",
  },
  {
    number: "02",
    title: "Tervezés",
    description: "Személyre szabott stratégia és rendszer.",
  },
  {
    number: "03",
    title: "Megvalósítás",
    description: "Lépésről lépésre építjük, tesztelve.",
  },
  {
    number: "04",
    title: "Átadás",
    description: "Megtanítalak használni és garantálom a támogatást.",
  },
];

export default function ReferenciakPage() {
  return (
    <main className="min-h-screen bg-white font-light text-[#1a1a1a]">
      {/* HERO */}
      <section className="mx-auto max-w-[1200px] px-6 pt-32 pb-20">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
            Referenciák
          </p>
          <h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Akikkel eddig dolgoztam
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[#6b7280]">
            Minden projektben más a szakma, más a kihívás &mdash; de a
            megközelítés ugyanaz: először megértem, hogyan dolgozol és kinek
            segítesz, és csak utána építek.
          </p>
        </Reveal>
      </section>

      {/* REFERENCE CARDS */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {references.map((ref, i) => (
            <Reveal key={ref.name} delay={i * 100}>
              <div className="group overflow-hidden rounded-xl border border-[#e5e5e5] bg-white p-6 transition-all duration-300 hover:border-[#c5c5c5] hover:shadow-lg">
                <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={ref.image}
                    alt={`${ref.name} – ${ref.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold">{ref.name}</h3>
                <p className="mb-2 text-sm font-medium text-[#6b7280]">
                  {ref.role}
                </p>
                <p className="mb-4 text-base text-[#6b7280]">
                  {ref.specialties}
                </p>
                <Link
                  href="#"
                  className="inline-block text-sm font-medium text-[#1a1a1a] underline underline-offset-4 transition-colors hover:text-[#6b7280]"
                >
                  További részletek &rarr;
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <Reveal>
          <h2
            className="mb-12 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Hogyan dolgozom?
          </h2>
        </Reveal>
        <div className="relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-[#e5e5e5]" />
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="relative">
                  {/* Dot on the line */}
                  <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-white" />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7280]">
                    {step.number}
                  </p>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-base text-[#6b7280]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pb-32">
        <Reveal>
          <div className="text-center">
            <h2
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              A következő referencia a tiéd lehet
            </h2>
            <p className="mb-8 text-lg text-[#6b7280]">
              30 perces konzultáció. Ingyenes. Értékesítés nélkül.
            </p>
            <a
              href="https://cal.com/attila-nagy-8uefco/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#1a1a1a] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#333]"
            >
              Konzultáció foglalás
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
