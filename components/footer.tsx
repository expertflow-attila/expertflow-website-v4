import Link from "next/link";

const footerLinks = [
  { href: "/szolgaltatas", label: "Szolgáltatás" },
  { href: "/rolam", label: "Rólam" },
  { href: "/referenciak", label: "Referenciák" },
];

const CTA_URL = "https://cal.com/attila-nagy-8uefco/30min";

export default function Footer() {
  return (
    <footer
      className="w-full bg-white border-t border-[#e5e5e5]"
      style={{ fontFamily: "'Merriweather', serif" }}
    >
      {/* Main footer content */}
      <div className="mx-auto max-w-[1200px] px-6 py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="text-[18px] font-bold tracking-wide text-[#1a1a1a]"
            >
              Expert Flow
            </Link>
            <p className="mt-4 text-[13px] leading-[1.8] text-[#6b7280]">
              AI-alapú rendszert építünk egyéni vállalkozók köré, hogy a
              szakértelmükre fókuszálhassanak.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://youtube.com/@expertflow-attila"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-wide text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
              >
                YouTube
              </a>
              <a
                href="#"
                className="text-[12px] tracking-wide text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2 — Pages */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
              Oldalak
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
              Kapcsolat
            </h4>
            <p className="mt-5 text-[13px] leading-[1.8] text-[#6b7280]">
              30 perces ingyenes konzultáció, kötöttségek nélkül.
            </p>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[13px] font-semibold text-[#1a1a1a] hover:underline underline-offset-4 transition-all"
            >
              Foglalj időpontot&nbsp;&rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-[1200px] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-[#6b7280]">
            &copy; 2026 Built by Expert Flow
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-[12px] text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              Adatvédelem
            </Link>
            <span className="text-[12px] text-[#d1d5db]">|</span>
            <Link
              href="#"
              className="text-[12px] text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              ÁSZF
            </Link>
            <span className="text-[12px] text-[#d1d5db]">|</span>
            <Link
              href="#"
              className="text-[12px] text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
