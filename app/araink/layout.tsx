import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Áraink",
  description: "Válaszd ki a hozzád illő csomagot — Blueprint, Framework vagy Blueprint Pro. 100% garancia, részletfizetés.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
