import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/szolgaltatas", label: "Szolgáltatás" },
  { href: "/araink", label: "Áraink" },
  { href: "/rolam", label: "Rólam" },
  { href: "/referenciak", label: "Referenciák" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

const legalLinks = [
  { href: "/adatvedelmi", label: "Adatvédelem" },
  { href: "/aszf", label: "ÁSZF" },
  { href: "/cookie", label: "Cookie" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg">
      <div className="container-main pt-12 pb-8">
        {/* Top section: logo + links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — Logo + social */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Expert Flow"
                width={127}
                height={32}
                className="w-auto max-w-[127px]"
              />
            </Link>
            <div className="flex items-center gap-4">
              {/* YouTube */}
              <a
                href="https://youtube.com/@expertflow-attila"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path d="M17.73 8.87a1.4 1.4 0 0 0-.99-.99C15.68 7.5 12 7.5 12 7.5s-3.68 0-4.74.38a1.4 1.4 0 0 0-.99.99C6 9.93 6 12 6 12s0 2.07.27 3.13c.15.56.59 1 1 1.14C8.32 16.5 12 16.5 12 16.5s3.68 0 4.74-.38c.4-.15.84-.58.99-1 .27-1.05.27-3.12.27-3.12s0-2.07-.27-3.13Z" fill="#f6f3f0" />
                  <path d="M10.5 14.25 14.25 12 10.5 9.75v4.5Z" fill="#f6f3f0" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nagyattila-expertflow/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path d="M8.75 10.5v5.25M8.75 8.25v.01M11.25 15.75v-3a1.5 1.5 0 1 1 3 0v3M11.25 12v-1.5M14.25 15.75v-3" stroke="#f6f3f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Navigation links */}
          <nav className="flex flex-wrap items-start gap-6 md:gap-8 md:justify-end">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Legal bar */}
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[rgba(26,26,23,0.16)] py-6">
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-legal">
                {link.label}
              </Link>
            ))}
          </div>
          <span className="text-body-3 text-text-64">
            &copy; 2026 Expert Flow. Minden jog fenntartva.
          </span>
        </div>
      </div>
    </footer>
  );
}
