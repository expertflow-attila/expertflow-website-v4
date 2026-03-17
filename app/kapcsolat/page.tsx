"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const contactInfo = [
  {
    label: "Email",
    value: "hello@expertflow.hu",
    href: "mailto:hello@expertflow.hu",
  },
  {
    label: "Konzultáció",
    value: "30 perces ingyenes beszélgetés",
    href: CTA_URL,
  },
];

const timeline = [
  {
    num: "01",
    title: "Konzultáció",
    desc: "Átbeszéljük a helyzetedet, a céljaidat és a kihívásaidat.",
  },
  {
    num: "02",
    title: "Őszinte vélemény",
    desc: "Őszinte véleményt mondok arról, hogy a te élethelyzetedben merre érdemes elindulnod.",
  },
  {
    num: "03",
    title: "Iránymutatás",
    desc: "Ha most nem a szolgáltatásom a számodra legjobb megoldás, azt is megmondom.",
  },
  {
    num: "04",
    title: "Árajánlat",
    desc: "Ha mindketten úgy érezzük, hogy érdemes együtt dolgozni, küldök egy személyre szóló árajánlatot.",
  },
];

export default function KapcsolatPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:hello@expertflow.hu?subject=${encodeURIComponent(
      `Kapcsolatfelvétel: ${formState.name}`
    )}&body=${encodeURIComponent(
      `Név: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-4">Kapcsolat</p>
            <h1 className="text-h1 text-text max-w-[720px]">
              Beszéljünk a vállalkozásodról
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-body text-text-64 mt-6 max-w-[620px]">
              Ha érdekel a szolgáltatásom, vagy egyszerűen csak kérdésed van,
              keress bátran. A konzultáció ingyenes és kötelezettségmentes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT TILES ===== */}
      <section className="pb-20">
        <div className="container-main">
          <div className="grid-2col">
            {contactInfo.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card-pricing block transition-all duration-300 hover:border-text-32 hover:shadow-lg"
                >
                  <p className="label-small text-text-48 mb-3">{item.label}</p>
                  <p className="text-h4 text-text">{item.value}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM + ATTILA ===== */}
      <section className="section-padding-md" style={{ backgroundColor: "var(--color-bg-stone)" }}>
        <div className="container-main">
          <div className="grid-2col items-start">
            {/* Left — Form */}
            <Reveal>
              <div>
                <h2 className="text-h3 text-text mb-8">Írj nekem</h2>

                {submitted ? (
                  <div className="card-pricing">
                    <h3 className="text-h4 text-text mb-2">Köszönöm!</h3>
                    <p className="text-body text-text-64">
                      Az email kliens megnyílt az üzeneteddel. Ha mégsem nyílt meg,
                      küldj emailt közvetlenül a hello@expertflow.hu címre.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="contact-name" className="form-label">Név</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        className="form-input"
                        placeholder="Teljes neved"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        className="form-input"
                        placeholder="email@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="form-label">Üzenet</label>
                      <textarea
                        id="contact-message"
                        required
                        className="form-textarea"
                        placeholder="Miben segíthetek?"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn-dark mt-2">
                      Üzenet küldése
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Right — Portrait + info */}
            <Reveal delay={200}>
              <div>
                <div className="overflow-hidden rounded-lg mb-6">
                  <Image
                    src="/images/attila.jpg"
                    alt="Nagy Attila"
                    width={460}
                    height={400}
                    className="image-cover"
                  />
                </div>
                <h3 className="text-h4 text-text mb-2">Nagy Attila</h3>
                <p className="text-small text-text-64" style={{ lineHeight: 1.6 }}>
                  Egyéni vállalkozóknak segítek AI-alapú rendszereket
                  felépíteni, amelyek a háttérből támogatják a működést.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="section-padding-md">
        <div className="container-main">
          <Reveal>
            <p className="label-small text-text-48 mb-3">Hogyan kezdjünk?</p>
            <h2 className="text-h2 text-text mb-16">
              Mire számíthatsz a konzultáción
            </h2>
          </Reveal>

          <div className="relative pl-14">
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: 19, backgroundColor: "var(--color-text-8)" }}
            />

            {timeline.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative pb-10">
                  <div
                    className="absolute flex items-center justify-center rounded-full border"
                    style={{
                      left: -56,
                      top: 0,
                      width: 40,
                      height: 40,
                      borderColor: "var(--color-text-16)",
                      backgroundColor: "var(--color-bg)",
                    }}
                  >
                    <span className="label-small text-text">{step.num}</span>
                  </div>
                  <h3 className="text-h5 text-text font-medium">{step.title}</h3>
                  <p className="text-small text-text-64 mt-2 max-w-[540px]" style={{ lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-dark section-padding-lg">
        <div className="container-main">
          <Reveal>
            <div className="text-center">
              <h2 className="text-h2 text-light">
                Foglalj egy ingyenes konzultációt
              </h2>
              <p className="mt-4 text-h5 text-light-48">
                30 perc. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light mt-10 inline-flex"
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
