import { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "ÁSZF — Expert Flow",
  description: "Az Expert Flow Általános Szerződési Feltételei.",
};

const sections = [
  {
    title: "1. Általános rendelkezések",
    content:
      "Jelen Általános Szerződési Feltételek (ÁSZF) a Nagy Attila egyéni vállalkozó (a továbbiakban: Szolgáltató) által nyújtott szolgáltatásokra vonatkoznak. A szolgáltatás igénybevételével a Megrendelő elfogadja jelen ÁSZF rendelkezéseit.",
  },
  {
    title: "2. Szolgáltató adatai",
    content:
      "Név: Nagy Attila egyéni vállalkozó\nSzékhely: Magyarország\nElérhetőség: hello@expertflow.hu\nWeboldal: expertflow.hu",
  },
  {
    title: "3. Szolgáltatás leírása",
    content:
      "A Szolgáltató egyéni vállalkozók számára nyújt AI-alapú üzleti rendszerek tervezését, fejlesztését és integrálását, beleértve:\n• Ügyfélszerzési rendszerek felépítése\n• Ügyfélkezelési folyamatok automatizálása\n• Háttérműködés optimalizálása AI eszközökkel\n• Stratégiai tanácsadás és konzultáció",
  },
  {
    title: "4. Megrendelés és szerződéskötés",
    content:
      "A szerződés a bevezető konzultáció után, írásos árajánlat elfogadásával jön létre. Az árajánlat elfogadásának módja: email visszaigazolás vagy az előleg befizetése.",
  },
  {
    title: "5. Árazás és fizetési feltételek",
    content:
      "Az árak a konzultáció során kerülnek meghatározásra, az egyéni igények alapján. A fizetés átutalással vagy online fizetéssel történik. Részletfizetési lehetőség elérhető, az egyéni megállapodás szerint.",
  },
  {
    title: "6. Garancia",
    content:
      "A Szolgáltató 100% elégedettségi garanciát vállal. Ha az első hónap után a Megrendelő úgy ítéli meg, hogy a szolgáltatás nem nyújtja a várt értéket, a díjat nem kell megfizetni. Minden addig elkészült anyag és rendszer a Megrendelő tulajdonában marad.",
  },
  {
    title: "7. Szellemi tulajdon",
    content:
      "A szolgáltatás keretében létrehozott egyedi anyagok, rendszerek és tartalmak a Megrendelő tulajdonát képezik az átadást követően. A Szolgáltató által használt sablon- és keretrendszerek a Szolgáltató szellemi tulajdonát képezik.",
  },
  {
    title: "8. Felmondás",
    content:
      "Mindkét fél jogosult a szerződést 30 napos felmondási idővel, írásban felmondani. A felmondás esetén a már elvégzett munkáért járó díj fizetendő.",
  },
  {
    title: "9. Jogviták",
    content:
      "A felek esetleges jogvitáikat elsődlegesen egyeztetés útján rendezik. Ennek sikertelensége esetén a magyar jog az irányadó, és a felek alávetik magukat a Szolgáltató székhelye szerinti bíróság kizárólagos illetékességének.",
  },
  {
    title: "10. Záró rendelkezések",
    content:
      "Jelen ÁSZF határozatlan időre szól, és a Szolgáltató jogosult egyoldalúan módosítani. A módosításokról a Megrendelőt email útján tájékoztatja.",
  },
];

export default function AszfPage() {
  return (
    <section className="section-padding-md">
      <div className="container-main">
        <Reveal>
          <p className="label-small text-text-48 mb-4">Jogi nyilatkozatok</p>
          <h1 className="text-h1 text-text mb-4">
            Általános Szerződési Feltételek
          </h1>
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
