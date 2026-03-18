import type { Metadata } from "next";
import { DM_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

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
    <html lang="hu" className={`${dmSans.variable} ${merriweather.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
