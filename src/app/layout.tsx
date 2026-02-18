import type { Metadata } from "next";
import { Syne, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

/* ── Display font: bold, architectural, high-impact ── */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── Body font: clean, readable, slightly quirky ── */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* ── Accent font: hand-drawn, natural handwriting ── */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Crobe — Where Art Meets Design",
  description:
    "Studio Crobe is the parent of two creative divisions: Crumbling Studio (hand-drawn animation & films) and Flip Beetle (branding, design & web development).",
  keywords: [
    "Studio Crobe",
    "Crumbling Studio",
    "Flip Beetle",
    "animation",
    "branding",
    "web design",
  ],
  openGraph: {
    title: "Studio Crobe — Where Art Meets Design",
    description:
      "Two creative divisions. One studio. Crumbling Studio & Flip Beetle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
