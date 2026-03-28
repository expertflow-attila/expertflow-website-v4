import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konzultációs kérdőív",
  description: "Töltsd ki a kérdőívet és foglalj egy ingyenes 30 perces konzultációt.",
};

export default function KerdoivLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#0a0a0a",
        color: "#d4d4d4",
      }}
    >
      {children}
    </div>
  );
}
