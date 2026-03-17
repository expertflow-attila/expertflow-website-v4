import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Beszéljünk a vállalkozásodról. 30 perces ingyenes konzultáció, kötöttségek nélkül.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
