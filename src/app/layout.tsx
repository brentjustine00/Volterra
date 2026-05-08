import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
});

export const metadata: Metadata = {
  title: "VOLTERRA X — Electric Power. Unleashed.",
  description: "A cinematic hypercar experience for VOLTERRA X.",
  keywords: "Volterra X, Hypercar, Electric Car, EV, Performance, Design",
  openGraph: {
    title: "VOLTERRA X — Electric Power. Unleashed.",
    description: "A cinematic hypercar experience for VOLTERRA X.",
    type: "website",
    siteName: "Volterra X"
  },
  twitter: {
    card: "summary_large_image",
    title: "VOLTERRA X",
    description: "Electric Power. Unleashed."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans [font-family:var(--font-inter),ui-sans-serif,system-ui]">
        {children}
      </body>
    </html>
  );
}

