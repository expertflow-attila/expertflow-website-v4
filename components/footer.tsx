"use client";

import Link from "next/link";
// Icons are inline SVG in socialLinks
import SubscribeForm from "@/components/subscribe-form";

const footerLinks = {
  Szolgáltatás: [
    { name: "Ügyfélszerzés", href: "/szolgaltatas#ugyfelszerzes" },
    { name: "Kiszolgálás", href: "/szolgaltatas#kiszolgalas" },
    { name: "Háttérműködés", href: "/szolgaltatas#hattermukodes" },
  ],
  Információ: [
    { name: "Rólam", href: "/rolam" },
    { name: "Referenciák", href: "/referenciak" },
    { name: "Konzultáció", href: "/kapcsolat" },
    { name: "Agentic Start", href: "/agentic-start" },
  ],
  Jogi: [
    { name: "Adatvédelem", href: "/adatvedelmi" },
    { name: "ÁSZF", href: "/aszf" },
    { name: "Cookie", href: "/cookie" },
  ],
};

const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com/@expertflow-attila",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nagyattila-expertflow/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
      </svg>
    ),
  },
  {
    name: "Dirt & Clouds",
    href: "https://dirt-and-clouds.vercel.app",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Premium divider at top */}
      <div className="divider-fade" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Newsletter */}
        <div className="py-16 lg:py-20 border-b border-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Hírlevél
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-display tracking-tight mt-3">
                Heti gondolatok vállalkozóknak
              </h2>
            </div>
            <SubscribeForm
              funnel="welcome"
              heading=""
              description="Tippek, gondolatok és gyakorlati tanácsok — AI, rendszerek, működés. Nincs spam, bármikor leiratkozhatsz."
              buttonText="Feliratkozás"
            />
          </div>
        </div>

        {/* Main footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">Expert Flow</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
                AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak — ügyfélszerzésre, kiszolgálásra és háttérműködésre.
              </p>

              {/* Social */}
              <div className="flex gap-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-px flex items-center gap-2 group"
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-foreground/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Expert Flow. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Rendszerek működnek
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
