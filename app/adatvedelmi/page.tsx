import { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Adatvédelmi nyilatkozat — Expert Flow",
  description: "Az Expert Flow adatvédelmi nyilatkozata.",
};

const sections = [
  {
    title: "1. Bevezetés",
    content:
      "Az Expert Flow (a továbbiakban: Szolgáltató) elkötelezett az Ön személyes adatainak védelme iránt. Jelen adatvédelmi nyilatkozat tájékoztatást nyújt arról, hogy milyen személyes adatokat gyűjtünk, hogyan használjuk fel azokat, és milyen jogok illetik meg Önt az adataival kapcsolatban.",
  },
  {
    title: "2. Adatkezelő",
    content:
      "Adatkezelő neve: Nagy Attila egyéni vállalkozó\nElérhetőség: hello@expertflow.hu\nSzékhely: Magyarország",
  },
  {
    title: "3. Gyűjtött adatok",
    content:
      "Kapcsolatfelvételi űrlap: név, email cím, üzenet tartalma.\nKonzultáció foglalás: név, email cím, időpont választás.\nWeboldal látogatás: IP cím, böngésző típusa, meglátogatott oldalak, látogatás időpontja (analitika céljából).\nHírlevél feliratkozás: email cím.",
  },
  {
    title: "4. Adatkezelés célja",
    content:
      "Az Ön által megadott személyes adatokat kizárólag a következő célokra használjuk:\n• Kapcsolatfelvételi kérések megválaszolása\n• Konzultáció időpont egyeztetése\n• Szolgáltatás nyújtása és ügyfélkapcsolat kezelése\n• Weboldal működésének javítása és analitika\n• Hírlevél küldése (kizárólag feliratkozás esetén)",
  },
  {
    title: "5. Adatmegőrzés",
    content:
      "Személyes adatait csak addig őrizzük meg, ameddig az adatkezelés céljának eléréséhez szükséges, vagy ameddig jogszabály előírja. Kapcsolatfelvételi adatokat legfeljebb 2 évig, ügyfél adatokat a jogviszony megszűnésétől számított 5 évig tároljuk.",
  },
  {
    title: "6. Adatbiztonság",
    content:
      "Az Ön személyes adatainak védelme érdekében megfelelő technikai és szervezési intézkedéseket alkalmazunk, beleértve a titkosított adatátvitelt (SSL), a biztonságos tárhelyet és a hozzáférés-kezelést.",
  },
  {
    title: "7. Az Ön jogai",
    content:
      "Az érintetteknek joguk van:\n• Hozzáférési jog: tájékoztatást kérni a kezelt adataikról\n• Helyesbítési jog: pontatlan adatok javítását kérni\n• Törlési jog: adataik törlését kérni\n• Tiltakozási jog: az adatkezelés ellen tiltakozni\n• Adathordozhatóság joga: adataik géppel olvasható formátumban történő kiadását kérni\n\nJogai gyakorlásához írjon a hello@expertflow.hu email címre.",
  },
  {
    title: "8. Kapcsolat",
    content:
      "Adatvédelemmel kapcsolatos kérdéseivel forduljon hozzánk:\nEmail: hello@expertflow.hu",
  },
];

export default function AdatvedelmiPage() {
  return (
    <section className="section-padding-md">
      <div className="container-main">
        <Reveal>
          <p className="label-small text-text-48 mb-4">Jogi nyilatkozatok</p>
          <h1 className="text-h1 text-text mb-4">Adatvédelmi nyilatkozat</h1>
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
