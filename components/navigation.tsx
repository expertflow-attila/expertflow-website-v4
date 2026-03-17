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
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        backgroundColor: "#f6f3f0bd",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <nav className="mx-auto max-w-[1200px] flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Expert Flow"
            width={160}
            height={40}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[14px] font-normal text-[#100f12] hover:opacity-70 transition-opacity"
              >
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
          className="hidden md:inline-block rounded-full bg-[#363637] px-6 py-2.5 text-[14px] font-normal text-[#f6f3f0] hover:opacity-90 transition-opacity"
        >
          Konzultáció
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden w-8 h-8 flex items-center justify-center"
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="#100f12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#100f12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#f6f3f0", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-normal text-[#100f12] hover:opacity-70 transition-opacity"
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
              className="inline-block rounded-full bg-[#363637] px-6 py-2.5 text-[14px] font-normal text-[#f6f3f0] hover:opacity-90 transition-opacity"
            >
              Konzultáció
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
