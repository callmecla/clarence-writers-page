import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "small hours — a writer's collection",
  description: "Novels, poems, diary entries, and photographs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="day" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
