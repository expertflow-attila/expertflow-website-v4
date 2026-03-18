"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/szolgaltatas", label: "Szolgáltatás" },
  { href: "/araink", label: "Áraink" },
  { href: "/rolam", label: "Rólam" },
  { href: "/referenciak", label: "Referenciák" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="nav-header">
      <nav className="nav-wrap">
        {/* Background blur layer */}
        <div className="nav-bg" />

        {/* Logo */}
        <Link href="/" className="shrink-0 relative z-[1]">
          <Image
            src="/images/logo.svg"
            alt="Expert Flow"
            width={127}
            height={32}
            priority
            className="w-full max-w-[127px]"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0 relative z-[1]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta hidden lg:inline-flex relative z-[1]"
        >
          Konzultáció
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden relative z-[1] border border-[rgba(16,15,18,0.32)] rounded-full w-10 h-10 flex items-center justify-center"
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
        >
          {mobileOpen ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-bg rounded-b-2xl ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="nav-cta"
            >
              Konzultáció
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
