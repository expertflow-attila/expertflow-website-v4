"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Szolgáltatás: [
    { name: "Ügyfélszerzés", href: "/szolgaltatas#ugyfelszerzes" },
    { name: "Kiszolgálás", href: "/szolgaltatas#kiszolgalas" },
    { name: "Háttérműködés", href: "/szolgaltatas#hattermukodes" },
  ],
  Információ: [
    { name: "Áraink", href: "/araink" },
    { name: "Rólam", href: "/rolam" },
    { name: "Referenciák", href: "/referenciak" },
    { name: "Kapcsolat", href: "/kapcsolat" },
  ],
  Jogi: [
    { name: "Adatvédelem", href: "/adatvedelmi" },
    { name: "ÁSZF", href: "/aszf" },
    { name: "Cookie", href: "/cookie" },
  ],
};

const socialLinks = [
  { name: "YouTube", href: "https://youtube.com/@expertflow-attila" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nagyattila-expertflow/" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">Expert Flow</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak — ügyfélszerzésre, kiszolgálásra és háttérműködésre.
              </p>

              {/* Social */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Expert Flow. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Rendszerek működnek
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
