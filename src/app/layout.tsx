import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SOKEM_CONFIG } from "@/config/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SOKEM_CONFIG.name} — Fine Dining & Cocktails`,
    template: `%s | ${SOKEM_CONFIG.name}`,
  },
  description: SOKEM_CONFIG.description,
  keywords: [
    "Sokem Bar",
    "Sokem Restaurant",
    "Addis Ababa Dining",
    "Cocktail Lounge Addis Ababa",
    "Steakhouse",
    "Reservations",
  ],
  authors: [{ name: SOKEM_CONFIG.name }],
  metadataBase: new URL("https://sokem-restaurant.com"),
  openGraph: {
    title: SOKEM_CONFIG.name,
    description: SOKEM_CONFIG.description,
    siteName: SOKEM_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="flex flex-col min-h-screen bg-canvas text-gray-100 font-sans antialiased selection:bg-gold selection:text-slate-950 overflow-x-hidden relative">
        {/* Soft Warm Lighting Orbs */}
        <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="fixed top-1/2 -right-40 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="fixed -bottom-40 -left-40 w-[600px] h-[500px] bg-gold/10 blur-[150px] pointer-events-none rounded-full" />

        <Header />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
