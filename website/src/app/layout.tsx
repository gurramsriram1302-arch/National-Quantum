import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060c1b",
};

export const metadata: Metadata = {
  title: "National Symposium on Quantum Computing, Applications and Algorithms 2026",
  description:
    "Official website for the National Symposium on Quantum Computing, Applications and Algorithms (28–29 December 2026) organized by Vignan's Foundation for Science, Technology & Research.",
  keywords: [
    "Quantum Computing",
    "National Symposium",
    "Vignan's Foundation for Science, Technology & Research",
    "Quantum Algorithms",
    "Quantum Hardware",
    "QEC",
    "Quantum Machine Learning",
    "Quantum Cryptography",
    "December 2026"
  ],
  authors: [{ name: "Vignan's Foundation for Science, Technology & Research" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#060c1b] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
