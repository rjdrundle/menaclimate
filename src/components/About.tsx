"use client";

import { speakers, partners } from "@/data/site";

/**
 * About / Conveners + Speakers section.
 *
 * Dark panel between the parallax sections. Two-column on desktop:
 * left = conveners/why-this, right = speaker avatars (8).
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative z-[5] overflow-hidden px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
      style={{ background: "#06101C" }}
    >
      {/* subtle top divider */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(234,241,248,0.12),transparent)",
        }}
      />

      <div className="mx-auto max-w-[1180px]">
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="block h-px w-[26px] bg-[#E7C77E]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#E7C77E]">
                Conveners
              </span>
            </div>
            <h2
              className="max-w-[18ch] text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.025em] text-[#F4F8FC]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Built by people who work in the room
            </h2>
          </div>
          <p className="max-w-[440px] text-[16px] leading-[1.6] text-[rgba(234,241,248,0.62)]">
            CEBC and Kai Kata are co-presenting a series that brings the
            region&apos;s operators, regulators and capital into one room — for
            four focused evenings, in one city.
          </p>
        </div>

        <div className="grid items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: two large cards (CEBC + Kai Kata) */}
          <div className="grid gap-[18px]">
            <PartnerCard
              name="CEBC"
              blurb="The Circular Economy & Built Environment Council — a cross-sectoral platform for the people who build, operate and regulate the Gulf's built environment."
              c="#43C892"
            />
            <PartnerCard
              name="Kai Kata"
              blurb="A research and convening studio working on climate, energy and the political economy of the Gulf. Local presence, regional lens."
              c="#D8B262"
            />
          </div>

          {/* Right: speakers grid */}
          <div id="speakers" className="reveal">
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="block h-px w-[26px] bg-[#5AA9E6]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5AA9E6]">
                Speakers
              </span>
            </div>
            <h3
              className="mb-7 text-[clamp(22px,2.8vw,30px)] font-semibold tracking-[-0.02em] text-[#F4F8FC]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              The first wave
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {speakers.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(234,241,248,0.1)] bg-[rgba(10,26,44,0.4)] p-3"
                >
                  <span
                    aria-hidden
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-[#06101C]"
                    style={{ background: s.av }}
                  >
                    {s.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-[#F4F8FC]">
                      {s.name}
                    </span>
                    <span className="block truncate text-[12px] text-[rgba(234,241,248,0.55)]">
                      {s.role}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner strip */}
        <div className="reveal mt-[clamp(70px,10vh,120px)]">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="block h-px w-[26px] bg-[rgba(234,241,248,0.4)]" />
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[rgba(234,241,248,0.55)]">
              With support from
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[rgba(234,241,248,0.62)]">
            {partners.map((p) => (
              <li
                key={p}
                className="border-l border-[rgba(234,241,248,0.18)] pl-3"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  name,
  blurb,
  c,
}: {
  name: string;
  blurb: string;
  c: string;
}) {
  return (
    <div
      className="reveal rounded-[22px] border border-[rgba(234,241,248,0.1)] p-[clamp(26px,3.4vw,38px)]"
      style={{
        background:
          "linear-gradient(180deg,rgba(13,26,46,0.5),rgba(6,16,28,0.25))",
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className="block h-[10px] w-[10px] rounded-full"
          style={{
            background: c,
            boxShadow: `0 0 12px ${c}`,
          }}
        />
        <span
          className="text-[15px] font-semibold text-[#F4F8FC]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {name}
        </span>
      </div>
      <p className="text-[15.5px] leading-[1.55] text-[rgba(234,241,248,0.66)]">
        {blurb}
      </p>
    </div>
  );
}