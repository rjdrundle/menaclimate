import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How mena climate handles the personal information collected through the Climate Frontiers registration form and site analytics.",
  alternates: {
    canonical: "/privacy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
          Privacy
        </span>
      </div>
      <h1
        className="mb-10 text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.025em]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Privacy notice
      </h1>

      <div className="grid gap-8 text-[16px] leading-[1.65] text-[rgba(234,241,248,0.78)]">
        <p>
          This notice explains what mena climate (the Clean Energy Business
          Council × Kai Kata) collects when you use menaclimate.com, why, and
          how long we keep it. It was last updated on 25 June 2026.
        </p>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            1. What we collect
          </h2>
          <p>
            When you reserve a seat through the registration form, we receive
            your first name, last name, email address, organisation, and the
            forum(s) you selected. We do not collect payment information on this
            site — the forums are reserved-seat, not ticketed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            2. Why we collect it
          </h2>
          <p>
            We use this information to confirm your reservation, send a
            calendar invite with venue details, and follow up about the
            programme. If you have opted in (separately) to updates from CEBC
            or Kai Kata, we may also send you occasional editorial
            newsletters.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            3. How long we keep it
          </h2>
          <p>
            Reservation records are retained for the duration of the 2026
            programme plus 24 months for event reporting, after which they are
            deleted or fully anonymised. Newsletter subscribers can unsubscribe
            at any time using the link in any email.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            4. Cookies &amp; analytics
          </h2>
          <p>
            menaclimate.com does not currently use analytics cookies or
            third-party trackers. Server logs (Vercel) retain request
            metadata (IP, user-agent, URL) for 30 days for security and
            capacity planning; these logs are not joined to the registration
            database.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            5. AI search &amp; crawlers
          </h2>
          <p>
            Public pages (homepage, this notice, editorial policy) are
            allowed for all crawlers, including GPTBot, ClaudeBot,
            PerplexityBot, and similar. We do not currently block any AI
            crawler; if you operate one, please respect our robots.txt.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            6. Your rights
          </h2>
          <p>
            You can request a copy of, correction of, or deletion of the
            personal information we hold about you at any time by emailing
            hello@menaclimate.com. We respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-[#F4F8FC]">
            7. Contact
          </h2>
          <p>
            For any privacy question:{" "}
            <a
              href="mailto:hello@menaclimate.com"
              className="text-[#43C892] underline underline-offset-4 hover:text-white"
            >
              hello@menaclimate.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
