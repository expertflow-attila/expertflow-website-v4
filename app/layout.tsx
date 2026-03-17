import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Expert Flow — AI rendszerek szolgáltató vállalkozóknak",
    template: "%s | Expert Flow",
  },
  description:
    "AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak — ügyfélszerzésre, kiszolgálásra és háttérműködésre. Új eszközök, örök értékek.",
  metadataBase: new URL("https://expertflow-website-v4.vercel.app"),
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Expert Flow",
    title: "Expert Flow — AI rendszerek szolgáltató vállalkozóknak",
    description:
      "AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak — ügyfélszerzésre, kiszolgálásra és háttérműködésre.",
    images: [{ url: "/images/attila.jpg", width: 460, height: 600, alt: "Expert Flow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Flow — AI rendszerek szolgáltató vállalkozóknak",
    description:
      "AI-alapú rendszereket építünk szolgáltató egyéni vállalkozóknak.",
    images: ["/images/attila.jpg"],
  },
  robots: { index: true, follow: true },
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
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
