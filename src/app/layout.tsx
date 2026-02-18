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
  title: {
    default: "Studio Crobe — Where Art Meets Design",
    template: "%s | Studio Crobe",
  },
  description:
    "Studio Crobe is the parent of two creative divisions: Crumbling Studio (hand drawn animation & films) and Flip Beetle (branding, design & web development).",
  keywords: [
    "Studio Crobe",
    "Crumbling Studio",
    "Flip Beetle",
    "animation",
    "branding",
    "web design",
    "hand drawn animation",
    "creative studio",
    "design studio",
    "web development",
  ],
  authors: [{ name: "Studio Crobe" }],
  creator: "Studio Crobe",
  metadataBase: new URL("https://studiocrobe.com"),
  openGraph: {
    title: "Studio Crobe — Where Art Meets Design",
    description:
      "Two creative divisions. One studio. Crumbling Studio & Flip Beetle.",
    url: "https://studiocrobe.com",
    siteName: "Studio Crobe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Studio Crobe — Where Art Meets Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Crobe — Where Art Meets Design",
    description:
      "Two creative divisions. One studio. Crumbling Studio & Flip Beetle.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
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
