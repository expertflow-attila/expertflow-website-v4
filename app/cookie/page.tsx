import { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Cookie szabályzat — Expert Flow",
  description: "Az Expert Flow cookie (süti) szabályzata.",
};

const sections = [
  {
    title: "1. Mik azok a cookie-k?",
    content:
      "A cookie-k (sütik) kis méretű szövegfájlok, amelyeket a weboldal az Ön böngészőjében tárol. Ezek segítenek a weboldal működésében, a felhasználói élmény javításában és az oldal használatának elemzésében.",
  },
  {
    title: "2. Milyen cookie-kat használunk?",
    content:
      "Szükséges cookie-k: A weboldal alapvető működéséhez elengedhetetlenek. Ezek nélkül a weboldal nem működne megfelelően.\n\nAnalitikai cookie-k: Az oldal használatának elemzéséhez használjuk (Google Analytics, PostHog). Ezek segítenek megérteni, hogyan használják a látogatók az oldalunkat.\n\nFunkcionális cookie-k: A felhasználói beállítások megjegyzéséhez használjuk (pl. nyelvi beállítás, korábbi interakciók).",
  },
  {
    title: "3. Harmadik fél cookie-k",
    content:
      "Weboldalunkon a következő harmadik felek helyezhetnek el cookie-kat:\n• Google Analytics — látogatottsági statisztikák\n• PostHog — felhasználói viselkedés elemzése\n• Cal.com — időpontfoglalási widget\n\nEzek a szolgáltatók saját adatvédelmi szabályzattal rendelkeznek.",
  },
  {
    title: "4. Cookie-k kezelése",
    content:
      "Ön bármikor módosíthatja cookie beállításait a böngészőjében. A legtöbb böngésző lehetővé teszi a cookie-k törlését, letiltását vagy csak bizonyos típusú cookie-k engedélyezését.\n\nKérjük vegye figyelembe, hogy a cookie-k letiltása befolyásolhatja a weboldal működését.",
  },
  {
    title: "5. Kapcsolat",
    content:
      "Cookie-kkal kapcsolatos kérdéseivel forduljon hozzánk:\nEmail: hello@expertflow.hu",
  },
];

export default function CookiePage() {
  return (
    <section className="section-padding-md">
      <div className="container-main">
        <Reveal>
          <p className="label-small text-text-48 mb-4">Jogi nyilatkozatok</p>
          <h1 className="text-h1 text-text mb-4">Cookie szabályzat</h1>
          <p className="text-small text-text-48 mb-16">
            Utolsó frissítés: 2026. március 1.
          </p>
        </Reveal>

        <div className="max-w-[720px]">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="mb-12">
                <h2 className="text-h4 text-text mb-4">{s.title}</h2>
                <p className="text-body text-text-64 whitespace-pre-line leading-legal">
                  {s.content}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
