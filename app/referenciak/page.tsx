import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const references = [
  {
    image: "/images/ref-1.webp",
    name: "Gömbicz Kata",
    role: "Pszichológus",
    specialties: "Klinikai pszichológus · Autogén tréning · LMBTQ+ specializáció",
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
    <>
      {/* ========== HERO ========== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4">Referenciák</p>
            <h1 className="text-h1 text-text max-w-3xl">
              Akikkel eddig dolgoztam
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-body text-text-48 max-w-2xl">
              Minden projektben más a szakma, más a kihívás &mdash; de a
              megközelítés ugyanaz: először megértem, hogyan dolgozol és kinek
              segítesz, és csak utána építek.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== REFERENCE CARDS ========== */}
      <section className="pb-20 md:pb-32">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {references.map((ref, i) => (
              <Reveal key={ref.name} delay={i * 100}>
                <div className="group overflow-hidden rounded-xl border border-text-8 bg-bg-card transition-all duration-300 hover:border-text-16 hover:shadow-lg">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={ref.image}
                      alt={`${ref.name} – ${ref.role}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="label-small text-text-48 mb-1">
                      {ref.role}
                    </p>
                    <h3 className="text-h4 text-text mb-2">{ref.name}</h3>
                    <p className="text-small text-text-48 mb-5">
                      {ref.specialties}
                    </p>
                    <Link
                      href="#"
                      className="text-small font-medium text-text underline underline-offset-4 transition-colors hover:text-text-64"
                    >
                      További részletek &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== APPROACH / PROCESS ========== */}
      <section className="section-dark section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-light-48 mb-4">Megközelítés</p>
            <h2 className="text-h2 text-light mb-16">
              Hogyan dolgozom?
            </h2>
          </Reveal>

          <div className="relative pl-14">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-light-16" />

            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 120}>
                  <div className="relative">
                    {/* Number circle on the line */}
                    <div className="absolute -left-14 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-light-16 bg-bg-dark">
                      <span className="text-small font-semibold text-light">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-h4 text-light mb-2">{step.title}</h3>
                    <p className="text-body text-light-48 max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section-padding-lg">
        <div className="container-main">
          <Reveal>
            <div className="text-center">
              <h2 className="text-h2 text-text mb-4">
                A következő referencia a tiéd lehet
              </h2>
              <p className="text-body text-text-48 mb-10">
                30 perces konzultáció. Ingyenes. Értékesítés nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark"
              >
                Konzultáció foglalás
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
