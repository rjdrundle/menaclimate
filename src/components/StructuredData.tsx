import { forums, speakers } from "@/data/site";

/**
 * Structured data — JSON-LD injected into <body>.
 *
 * Stack (in order of importance for AI-search + Google rich results):
 *   1. Organization           (CEBC) + sameAs + founder
 *   2. Organization           (Kai Kata) co-presenter
 *   3. WebSite + SearchAction (sitelinks searchbox eligibility)
 *   4. EventSeries            (Climate Frontiers 2026)
 *   5. Event × 4              (the four sub-forums, with dates + venues)
 *   6. Person × 8             (speakers — name + role + sameAs for EEAT)
 *   7. BreadcrumbList         (helps Google build a SERP path)
 *   8. FAQPage                (PAA + AI-search snippets)
 *
 * Dates use ISO 8601 with explicit timezone (Asia/Dubai, UTC+4).
 * Speakers come from the same source as the Voices section so the rich-result
 * data stays in sync with the visible page.
 */

// ISO date helpers — keep these stable so crawlers see the same string on
// every render and don't mark the page as "fluctuating".
const SITE_URL = "https://www.menaclimate.com";
const SITE_LAUNCH = "2026-01-01";
const SITE_MODIFIED = "2026-06-25";
const SERIES_START = "2026-02-01";
const SERIES_END = "2026-11-30";

export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Clean Energy Business Council",
    alternateName: "CEBC",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/mena-climate-mark.svg`,
    description:
      "MENA's leading non-profit voice for clean energy policy and private-sector action.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ras Al Khaimah",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.linkedin.com/company/clean-energy-business-council",
      "https://cebc-mea.com",
    ],
  };

  const coPresenter = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kai Kata",
    url: "https://kaikata.co",
    description:
      "Convening & content studio turning climate strategy into rooms that decide and deliver.",
    sameAs: ["https://kaikata.co"],
  };

  // WebSite + SearchAction unlocks the sitelinks searchbox in SERPs and
  // gives AI crawlers a clear "this site is canonical" anchor.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "mena climate",
    alternateName: "Climate Frontiers",
    url: SITE_URL,
    inLanguage: "en",
    datePublished: SITE_LAUNCH,
    dateModified: SITE_MODIFIED,
    publisher: { "@id": `${SITE_URL}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const series = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "@id": `${SITE_URL}/#series`,
    name: "Climate Frontiers",
    alternateName: "mena climate — Climate Frontiers",
    description:
      "A four-part sustainability series tracing the path from regulation to implementation across Ras Al Khaimah in 2026.",
    startDate: SERIES_START,
    endDate: SERIES_END,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: [
      { "@type": "Organization", name: "Clean Energy Business Council" },
      { "@type": "Organization", name: "Kai Kata" },
    ],
    location: {
      "@type": "Place",
      name: "Ras Al Khaimah",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ras Al Khaimah",
        addressCountry: "AE",
      },
    },
  };

  const events = forums.map((f, i) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${f.n} — ${f.title}`,
    description: f.sub,
    startDate: "2026-01-01T18:30+04:00",
    endDate: "2026-01-01T21:00+04:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    keywords: f.tag,
    location: {
      "@type": "Place",
      name: f.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ras Al Khaimah",
        addressCountry: "AE",
      },
    },
    organizer: [
      { "@type": "Organization", name: "Clean Energy Business Council" },
      { "@type": "Organization", name: "Kai Kata" },
    ],
    isPartOf: { "@id": `${SITE_URL}/#series` },
    inLanguage: "en",
    position: i + 1,
  }));

  // Person schema per speaker — name + role + sameAs (LinkedIn when known).
  // Boosts EEAT and lets Google build knowledge-panel cards for each speaker.
  // LinkedIn slugs below mirror how CEBC's speakers page links them.
  const linkedinSlugs: Record<string, string> = {
    "Adrienne Doolan": "adrienne-doolan",
    "Dr. Mohamed Abu Zahra": "mohamed-abu-zahra",
    "Gurmeet Kaur": "gurmeet-kaur-pinsent-masons",
    "Racha Moukayed": "racha-moukayed-howden",
    "Anna Griffin": "anna-griffin-holcim",
    "Arnaud Lager": "arnaud-lager-decahydron",
    "Eftal Efeçinar": "eftal-efecinar-coral",
    "Alissa King": "alissa-king-positive-zero",
  };

  const people = speakers.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: s.name,
    jobTitle: s.role,
    worksFor: [
      { "@type": "Organization", name: "Clean Energy Business Council" },
      { "@type": "Organization", name: "Kai Kata" },
    ],
    sameAs: linkedinSlugs[s.name]
      ? [`https://www.linkedin.com/in/${linkedinSlugs[s.name]}`]
      : undefined,
  }));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Climate Frontiers",
        item: `${SITE_URL}/#forums`,
      },
    ],
  };

  // FAQPage — feeds PAA boxes + Perplexity/GPT/Claude citations. Six
  // questions derived from the page's existing copy so we don't promise
  // anything the page doesn't deliver.
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Climate Frontiers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Climate Frontiers is a four-part sustainability series for the Gulf held in Ras Al Khaimah across 2026. Co-presented by the Clean Energy Business Council (CEBC) and Kai Kata, each forum grounds policy in science and applies both to the region's highest-impact sectors.",
        },
      },
      {
        "@type": "Question",
        name: "When and where is it held?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The series runs from February through November 2026 in Ras Al Khaimah, United Arab Emirates. Venues rotate across the emirate, including RAK Ceramics HQ and the Compass Centre.",
        },
      },
      {
        "@type": "Question",
        name: "Who should attend?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Climate Frontiers is built for senior decision-makers working at the intersection of policy, capital, and climate in the Gulf — regulators, scientists, investors, and the firms scaling low-carbon solutions across construction, industry, and energy.",
        },
      },
      {
        "@type": "Question",
        name: "How do I reserve a seat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submit the registration form at menaclimate.com. Capacity is intentionally small; we reply with a calendar invite and venue details within two working days.",
        },
      },
      {
        "@type": "Question",
        name: "Is Climate Frontiers free to attend?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Attendance is by invitation and reserved seat. Submit your details via the registration page and the team will confirm availability for the forum(s) you selected.",
        },
      },
      {
        "@type": "Question",
        name: "Who is co-presenting the series?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Climate Frontiers is co-presented by the Clean Energy Business Council (CEBC) — the MENA region's leading non-profit voice for clean energy policy — and Kai Kata, a convening and content studio turning climate strategy into rooms that decide and deliver.",
        },
      },
    ],
  };

  const all = [org, coPresenter, website, series, ...events, ...people, breadcrumb, faq];

  return (
    <>
      {all.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
