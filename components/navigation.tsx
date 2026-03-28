"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/szolgaltatas", label: "Szolgáltatás" },
  { href: "/araink", label: "Áraink" },
  { href: "/rolam", label: "Rólam" },
  { href: "/referenciak", label: "Referenciák" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || mobileOpen
            ? "bg-background/80 backdrop-blur-2xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent backdrop-blur-none max-w-[1400px]"
        } ${isScrolled ? "border-b border-foreground/[0.06]" : ""}`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-display tracking-tight transition-all duration-500 ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
            >
              Expert Flow
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-300 relative group ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-premium inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${
                isScrolled ? "px-4 h-8 text-xs" : "px-6 h-10 text-sm"
              }`}
            >
              Konzultáció
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-background z-40 transition-all duration-300 ease-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-5xl font-display transition-all duration-300 ease-out ${
                    isActive ? "text-foreground" : "text-foreground hover:text-muted-foreground"
                  } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-px w-16 bg-foreground mt-1" />
                  )}
                </Link>
              );
            })}
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-300 ease-out ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileOpen ? "300ms" : "0ms" }}
          >
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-premium flex-1 flex items-center justify-center gap-2 bg-foreground text-background rounded-full h-14 text-base"
            >
              Konzultáció
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
