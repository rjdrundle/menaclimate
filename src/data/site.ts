// Single source of truth for the page content.
// Values come from design_handoff/Climate Frontiers Landing.dc.html renderVals().

export type Forum = {
  n: string;
  tag: string;
  title: string;
  sub: string;
  venue: string;
  accent: string;
};

export const forums: Forum[] = [
  {
    n: "01",
    tag: "Law & Science",
    title: "The compliance imperative",
    sub: "Decarbonisation obligations under UAE Federal Law No. 11 — what the law requires, how penalty tiers apply, and aligning targets with national NDCs.",
    venue: "Ras Al Khaimah",
    accent: "#43C892",
  },
  {
    n: "02",
    tag: "Law & Science",
    title: "State of the climate",
    sub: "Where global and regional emissions stand today — the remaining carbon budget and what it means for Gulf economies specifically.",
    venue: "Ras Al Khaimah",
    accent: "#E7C77E",
  },
  {
    n: "03",
    tag: "Built Environment",
    title: "Building circular",
    sub: "Materials and models for a growing Ras Al Khaimah — circularity set directly against the emirate's active development pipeline.",
    venue: "RAK Ceramics HQ",
    accent: "#5AA9E6",
  },
  {
    n: "04",
    tag: "Industrial Decarbonisation",
    title: "Capturing carbon",
    sub: "Scaling CCS for the Gulf — technical and commercial pathways, the regional project pipeline, and financing the transition.",
    venue: "Compass Centre",
    accent: "#43C892",
  },
];

export type Stat = {
  value: string;     // numeric portion for count-up; e.g. "30+", "1000"
  display: string;   // initial display before count-up
  label: string;
  accent: string;
};

export const stats: Stat[] = [
  { value: "04",    display: "04",    label: "Forums across the season",      accent: "#43C892" },
  { value: "30+",   display: "30+",   label: "Speakers & panellists",         accent: "#D8B262" },
  { value: "1000",  display: "1,000", label: "VC investors surveyed on CCS",  accent: "#5AA9E6" },
  { value: "04",    display: "04",    label: "Venues across Ras Al Khaimah",  accent: "#43C892" },
];

export type Speaker = {
  name: string;
  role: string;
  initials: string;
  av: string;
};

const speakerInitials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const speakerList: { name: string; role: string; c: string }[] = [
  { name: "Adrienne Doolan",      role: "Managing Director, CEBC MENA",               c: "#43C892" },
  { name: "Dr. Mohamed Abu Zahra",role: "Founder & Head of MEA, Global CCS Institute", c: "#D8B262" },
  { name: "Gurmeet Kaur",         role: "Partner, Pinsent Masons · CEBC Board",       c: "#5AA9E6" },
  { name: "Racha Moukayed",       role: "Managing Director, Howden Broking",          c: "#43C892" },
  { name: "Anna Griffin",         role: "Sustainability & Advocacy Director, Holcim UAE", c: "#D8B262" },
  { name: "Arnaud Lager",         role: "Chief Executive Officer, Decahydron",        c: "#5AA9E6" },
  { name: "Eftal Efeçinar",       role: "Head of Partnerships, Coral",                c: "#43C892" },
  { name: "Alissa King",          role: "General Counsel & Board Member, Positive Zero", c: "#D8B262" },
];

export const speakers: Speaker[] = speakerList.map((s) => ({
  name: s.name,
  role: s.role,
  initials: speakerInitials(s.name),
  av: `linear-gradient(135deg, ${s.c}, rgba(255,255,255,0.5))`,
}));

export const partners = [
  "CEBC",
  "Kai Kata",
  "RAK Ceramics",
  "Holcim",
  "Global CCS Institute",
  "Pinsent Masons",
  "Positive Zero",
  "Howden",
];

// Hero montage clips, in play order.
export const heroClips = [
  { src: "/assets/hero-climate.mp4" },
  { src: "/assets/hero-ocean.mp4" },
  { src: "/assets/hero-desert.mp4" },
  { src: "/assets/hero-reef.mp4" },
  { src: "/assets/hero-coast.mp4" },
];
