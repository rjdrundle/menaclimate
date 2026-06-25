import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Clickjacking + MIME-sniffing (P0 from SEO audit; cheap, no downside).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // HSTS — incl. subdomains + preload-ready; 1 year is the minimum for
  // submission to the Chrome preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },

  // Permissions policy: lock down features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=(self)",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "microphone=(self)",
      "payment=()",
      "usb=()",
    ].join(", "),
  },

  // Content-Security-Policy. The site ships only its own assets + Google
  // Fonts (next/font self-hosts, so fonts.gstatic.com is for the Google
  // Font CDN's preconnect fallback only). Inline styles are required by
  // Next's hydration layer + the `<style jsx>` blocks in components.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Security headers — applied to every response on Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;