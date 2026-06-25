import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Hanken_Grotesk, Newsreader } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

// Load all three typefaces via next/font so there's no FOUT.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  display: "swap",
});

// Single source of truth for the canonical host. Every absolute URL in
// metadata, sitemap, robots, and structured data flows from this string.
const SITE_URL = "https://menaclimate.com";

// Meta description — 120 chars / ~880px so the full message fits SERP and
// AI-search snippets without truncation. Lead with the differentiator
// (Climate Frontiers), name the region (Ras Al Khaimah, Gulf), then CTA hook.
const DESCRIPTION =
  "Climate Frontiers — a four-part climate series, Ras Al Khaimah 2026. CEBC × Kai Kata. Reserve your seat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Climate Frontiers — mena climate",
    template: "%s · mena climate",
  },
  description: DESCRIPTION,
  applicationName: "mena climate",
  keywords: [
    "Climate Frontiers",
    "MENA climate",
    "CEBC",
    "Kai Kata",
    "Ras Al Khaimah",
    "UAE",
    "sustainability",
    "decarbonisation",
    "clean energy",
    "net zero Gulf",
  ],
  authors: [{ name: "CEBC × Kai Kata" }],
  creator: "Clean Energy Business Council",
  publisher: "CEBC × Kai Kata",
  category: "Sustainability",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "mena climate — AI-search index" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "mena climate",
    title: "Climate Frontiers — mena climate",
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/brand-hero.png",
        width: 1200,
        height: 630,
        alt: "mena climate — Climate Frontiers, Ras Al Khaimah 2026",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Climate Frontiers — mena climate",
    description: DESCRIPTION,
    images: ["/assets/brand-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#06101C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${newsreader.variable}`}
    >
      <body className="min-h-screen bg-ink text-mist antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}