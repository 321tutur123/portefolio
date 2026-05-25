import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur Delacour — Ingénieur Créatif",
  description:
    "Portfolio d'Arthur Delacour — Projets Ingénierie, Hardware, PCB, Fabrication Numérique & Développement Logiciel.",
  keywords: ["PCB", "RP2040", "Next.js", "Impression 3D", "CNC", "Ingénieur"],
  authors: [{ name: "Arthur Delacour" }],
  openGraph: {
    title: "Arthur Delacour — Ingénieur Créatif",
    description:
      "Portfolio d'Arthur Delacour — Hardware, Fabrication Numérique, Software",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} lenis`}>
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
