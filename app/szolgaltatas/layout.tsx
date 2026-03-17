import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szolgáltatás",
  description: "Hiszünk abban, hogy a tudásod érték. Szolgáltatásalapú szakértőknek segítünk hatékony üzleti rendszert felépíteni.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
