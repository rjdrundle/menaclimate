import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Hanken_Grotesk, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://menaclimate.com"),
  title: {
    default: "mena climate — Climate Frontiers",
    template: "%s · mena climate",
  },
  description:
    "A four-part sustainability series for the Gulf, co-presented by CEBC and Kai Kata. From regulation to implementation, across Ras Al Khaimah in 2026.",
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
  ],
  authors: [{ name: "CEBC × Kai Kata" }],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://menaclimate.com",
    siteName: "mena climate",
    title: "mena climate — Climate Frontiers",
    description:
      "A four-part sustainability series for the Gulf. Ras Al Khaimah, 2026.",
    images: [
      {
        url: "/assets/brand-hero.png",
        width: 1200,
        height: 630,
        alt: "mena climate — Climate Frontiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mena climate — Climate Frontiers",
    description:
      "A four-part sustainability series for the Gulf. Ras Al Khaimah, 2026.",
    images: ["/assets/brand-hero.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06101C",
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
        {children}
      </body>
    </html>
  );
}
