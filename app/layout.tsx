import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Expert Flow",
  description: "AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak — ügyfélszerzésre, kiszolgálásra és háttérműködésre. Új eszközök, örök értékek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
