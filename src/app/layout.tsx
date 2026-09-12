import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SOKEM_CONFIG } from "@/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1015" },
  ],
};

const playfair = localFont({
  src: [
    {
      path: "../../public/fonts/PlayfairDisplay-Regular.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlayfairDisplay-Italic.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = localFont({
  src: [
    {
      path: "../../public/fonts/PlusJakartaSans-Regular.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlusJakartaSans-Italic.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
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
  icons: {
    icon: [
      { url: "/images/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/icon-192.png",
  },
};

import { LanguageProvider } from "@/components/ui/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('sokem-theme');
                  var root = document.documentElement;
                  if (savedTheme === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  } else {
                    root.classList.remove('light');
                    root.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-canvas text-slate-900 dark:text-gray-100 font-sans antialiased selection:bg-gold selection:text-slate-950 overflow-x-hidden relative transition-colors duration-300 w-full max-w-[100vw]">
        <LanguageProvider>
          {/* Ambient Lighting Orbs - strictly clipped to prevent horizontal overflow on mobile */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/15 dark:bg-gold/15 blur-[140px] rounded-full opacity-40 dark:opacity-100" />
            <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/10 blur-[150px] rounded-full opacity-30 dark:opacity-100" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[500px] bg-gold/10 dark:bg-gold/10 blur-[150px] rounded-full opacity-30 dark:opacity-100" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full">
            <Header />
            <main className="flex-grow w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
