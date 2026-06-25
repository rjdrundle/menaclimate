"use client";

import { speakers, partners } from "@/data/site";

/**
 * Voices — speakers + partners strip.
 *
 * Second of two sections in the lower dark band. Headline eyebrow is "Voices"
 * (green), headline body reads "Regulators, scientists & the firms scaling
 * the solutions", followed by 8 speaker cards, then a centered partner strip.
 *
 * Background `#06101C` (the design's true ink — slightly darker than the
 * partnership section's `#081A2C` so the two panels read as distinct).
 */
export default function Voices() {
  return (
    <section
      id="speakers"
      className="relative z-[5] bg-[#06101C] px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Eyebrow + headline */}
        <div className="reveal mb-[54px]">
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="block h-px w-[26px] bg-[#43C892]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#43C892]">
              Voices
            </span>
          </div>
          <h2
            className="max-w-[16ch] text-[clamp(30px,4.5vw,54px)] font-semibold leading-[1.03] tracking-[-0.025em] text-[#F4F8FC]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Regulators, scientists &amp; the firms scaling the solutions
          </h2>
        </div>

        {/* Speaker grid */}
        <ul
          className="reveal mb-16 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {speakers.map((s) => (
            <li
              key={s.name}
              className="rounded-2xl border border-[rgba(234,241,248,0.1)] p-6"
              style={{
                background:
                  "linear-gradient(180deg,rgba(13,26,46,0.7),rgba(6,16,28,0.4))",
              }}
            >
              <div className="mb-4 flex items-center gap-3.5">
                <span
                  aria-hidden
                  className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full text-[16px] font-semibold text-[#06101C]"
                  style={{ background: s.av }}
                >
                  {s.initials}
                </span>
                <span
                  aria-hidden
                  className="ml-auto block h-[7px] w-[7px] flex-shrink-0 rounded-full bg-[#43C892] opacity-50"
                />
              </div>
              <div
                className="mb-1.5 text-[17.5px] font-semibold text-[#F4F8FC]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {s.name}
              </div>
              <div className="text-[13.5px] leading-[1.45] text-[rgba(234,241,248,0.58)]">
                {s.role}
              </div>
            </li>
          ))}
        </ul>

        {/* Partners strip */}
        <div className="reveal border-t border-[rgba(234,241,248,0.12)] pt-[46px]">
          <div className="mb-[26px] text-center text-[12px] uppercase tracking-[0.16em] text-[rgba(234,241,248,0.45)]">
            Partners &amp; participating organisations
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-y-[18px] gap-x-[44px]">
            {partners.map((p) => (
              <li
                key={p}
                className="text-[clamp(16px,2vw,22px)] font-semibold tracking-[-0.01em] text-[rgba(234,241,248,0.5)]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
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