import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelmi nyilatkozat",
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
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Jogi nyilatkozatok</span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] tracking-tight mb-4">
          Adatvédelmi nyilatkozat
        </h1>
        <p className="text-sm text-muted-foreground mb-16">
          Utolsó frissítés: 2026. március 1.
        </p>

        <div className="max-w-[720px]">
          {sections.map((s, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-xl font-display tracking-tight mb-4">{s.title}</h2>
              <p className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
