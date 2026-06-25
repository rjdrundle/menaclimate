import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial policy",
  description:
    "How mena climate curates speakers, partners, and content for the Climate Frontiers series.",
  alternates: {
    canonical: "/editorial",
  },
  robots: { index: true, follow: true },
};

export default function EditorialPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="bg-ink text-mist mx-auto max-w-[760px] px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
    >
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-[14px] font-medium text-[rgba(234,241,248,0.72)] hover:text-white"
      >
        <span aria-hidden>←</span> Back to mena climate
      </Link>

      <div className="mb-[18px] flex items-center gap-2.5">
        <span className="block h-px w-[26px] bg-[#43C892]" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#43C892]">
          Editorial
        </span>
      </div>
      <h1
        className="mb-10 text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.025em]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Editorial policy
      </h1>

      <div className="grid gap-8 text-[16px] leading-[1.65] text-[rgba(234,241,248,0.78)]">
        <p>
          Climate Frontiers is a curatorial project, not a marketing campaign.
          This page explains how we choose what gets onto the page.
        </p>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            Speaker selection
          </h2>
          <p>
            Speakers are invited by the programme committee (CEBC MENA
            leadership + Kai Kata convening team). Selection criteria: (1)
            demonstrable subject-matter expertise in the forum topic, (2)
            representation across regulator, science, capital, and operator
            perspectives, and (3) willingness to engage in discussion rather
            than deliver a monologue. No speaker pays to appear, and no speaker
            is paid an honorarium to appear.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            Partner selection
          </h2>
          <p>
            Partners are organisations whose work intersects materially with a
            forum's theme. Each partner contributes to either the content
            (framing a sub-topic, contributing a speaker) or the convening
            (venue, audience). Partner logos appear on the Voices section of
            the homepage and on relevant forum copy. Partners do not influence
            the editorial line.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            Sourcing &amp; claims
          </h2>
          <p>
            Statistics cited on this site (e.g. "1,000 VC investors surveyed
            on CCS") reference a specific source — when used in forum
            materials, the source is named in the speaker brief. Where a
            figure is illustrative rather than empirical, the page says so
            explicitly. We do not publish un-sourced claims about emissions,
            capacity, or technology readiness.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            Corrections &amp; updates
          </h2>
          <p>
            Material errors are corrected with a dated note at the bottom of
            the relevant page. We do not silently rewrite history. Editorial
            decisions about the 2026 programme are documented in our
            programme notes, available on request.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            Independence
          </h2>
          <p>
            Climate Frontiers is co-presented by the Clean Energy Business
            Council and Kai Kata. Both organisations operate independently on
            their non-Forum activities; the Forum's editorial line is set by
            the joint programme committee and does not represent the position
            of either organisation's broader membership.
          </p>
        </section>

        <p className="text-[14px] text-[rgba(234,241,248,0.55)]">
          Last updated: 25 June 2026.
        </p>
      </div>
    </main>
  );
}
