"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { trackCTAClick, trackContactForm, identifyUser } from "@/lib/analytics";

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

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ease-out ${visible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

const contactInfo = [
  { label: "Email", value: "hello@expertflow.hu", href: "mailto:hello@expertflow.hu" },
  { label: "Konzultáció", value: "30 perces ingyenes beszélgetés", href: CTA_URL },
];

const timeline = [
  { num: "01", title: "Konzultáció", desc: "Átbeszéljük a helyzetedet, a céljaidat és a kihívásaidat." },
  { num: "02", title: "Őszinte vélemény", desc: "Őszinte véleményt mondok arról, hogy a te élethelyzetedben merre érdemes elindulnod." },
  { num: "03", title: "Iránymutatás", desc: "Ha most nem a szolgáltatásom a számodra legjobb megoldás, azt is megmondom." },
  { num: "04", title: "Árajánlat", desc: "Ha mindketten úgy érezzük, hogy érdemes együtt dolgozni, küldök egy személyre szóló árajánlatot." },
];

export default function KapcsolatPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    identifyUser(formState.email, formState.name);
    trackContactForm("mailto");
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
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Kapcsolat</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight max-w-[720px]">
              Beszéljünk a vállalkozásodról
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-[620px] leading-relaxed">
              Ha érdekel a szolgáltatásom, vagy egyszerűen csak kérdésed van,
              keress bátran. A konzultáció ingyenes és kötelezettségmentes.
            </p>
          </Section>
        </div>
      </section>

      {/* ===== CONTACT TILES ===== */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((item, i) => (
              <Section key={i}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block p-8 rounded-lg border border-foreground/10 bg-card transition-all duration-200 ease-out hover:border-foreground/20 hover:shadow-lg group"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">{item.label}</p>
                  <p className="text-xl font-display tracking-tight flex items-center gap-2">
                    {item.value}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </p>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-fade max-w-[1400px] mx-auto" />

      {/* ===== FORM + ATTILA ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left — Form */}
            <Section>
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-display tracking-tight mb-8">Írj nekem</h2>

                {submitted ? (
                  <div className="p-8 rounded-lg border border-foreground/10 bg-card">
                    <h3 className="text-xl font-display tracking-tight mb-2">Köszönöm!</h3>
                    <p className="text-base text-muted-foreground">
                      Az email kliens megnyílt az üzeneteddel. Ha mégsem nyílt meg,
                      küldj emailt közvetlenül a hello@expertflow.hu címre.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                      <label htmlFor="contact-name" className="form-label">Név</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        className="form-input rounded-lg transition-all duration-200 ease-out focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.12_0.01_60/0.06)]"
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
                        className="form-input rounded-lg transition-all duration-200 ease-out focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.12_0.01_60/0.06)]"
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
                        className="form-textarea rounded-lg transition-all duration-200 ease-out focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.12_0.01_60/0.06)]"
                        placeholder="Miben segíthetek?"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-premium mt-2 inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 h-12 rounded-full text-sm"
                    >
                      Üzenet küldése
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </Section>

            {/* Right — Portrait + info */}
            <Section>
              <div>
                <div className="img-zoom rounded-lg mb-6">
                  <Image
                    src="/images/attila.jpg"
                    alt="Nagy Attila"
                    width={460}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display tracking-tight mb-2">Nagy Attila</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Egyéni vállalkozóknak segítek AI-alapú rendszereket
                  felépíteni, amelyek a háttérből támogatják a működést.
                </p>
              </div>
            </Section>
          </div>
        </div>
      </section>

      <div className="divider-fade max-w-[1400px] mx-auto" />

      {/* ===== TIMELINE ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Hogyan kezdjünk?</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display leading-[1.1] tracking-tight mb-16">
              Mire számíthatsz a konzultáción
            </h2>
          </Section>

          <div className="relative pl-14">
            <div className="absolute top-0 bottom-0 left-[19px] w-px bg-foreground/10" />

            {timeline.map((step) => (
              <Section key={step.num}>
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

      {/* ===== CTA ===== */}
      <section className="section-dark py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Section>
            <div className="text-center">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight">
                Foglalj egy ingyenes konzultációt
              </h2>
              <p className="mt-4 text-lg opacity-50">
                30 perc. Ingyenes. Kötöttségek nélkül.
              </p>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("kapcsolat_cta")}
                className="btn-premium mt-10 inline-flex items-center gap-2 border border-white/20 text-white px-8 h-12 rounded-full text-sm"
              >
                Konzultáció foglalás
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>
    </>
  );
}
