"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/szolgaltatas", label: "Szolgáltatás" },
  { href: "/rolam", label: "Rólam" },
  { href: "/referenciak", label: "Referenciák" },
];

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white border-b border-[#e5e5e5] z-50"
      style={{ fontFamily: "'Merriweather', serif" }}
    >
      <nav className="mx-auto max-w-[1200px] flex items-center justify-between px-6 py-5">
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
                className="text-[14px] font-normal tracking-wide text-[#1a1a1a] hover:underline underline-offset-4 transition-all"
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
          className="hidden md:inline-block rounded-lg bg-[#1a1a1a] px-6 py-3 text-[14px] font-normal tracking-wide text-white hover:opacity-90 transition-opacity"
        >
          Konzultáció
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label="Menü megnyitása"
        >
          <span
            className={`block h-[2px] w-5 bg-[#1a1a1a] transition-transform duration-300 ${
              mobileOpen ? "translate-y-[5.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-[#1a1a1a] transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-[#1a1a1a] transition-transform duration-300 ${
              mobileOpen ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-[#e5e5e5] ${
          mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-normal tracking-wide text-[#1a1a1a] hover:underline underline-offset-4"
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
              className="inline-block rounded-lg bg-[#1a1a1a] px-6 py-3 text-[14px] font-normal tracking-wide text-white hover:opacity-90 transition-opacity"
            >
              Konzultáció
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
