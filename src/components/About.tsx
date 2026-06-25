"use client";

/**
 * About — The partnership.
 *
 * First of two sections in the lower dark band. Eyebrow "The partnership"
 * (gold), two-column layout on desktop: left = partnership copy about CEBC
 * + Kai Kata, right = two convener cards.
 *
 * Background `#081A2C` (one notch lighter than `#06101C`) so this section
 * reads as its own panel against the Voices section below it.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative z-[5] bg-[#081A2C] px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-x-[clamp(40px,6vw,90px)] gap-y-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        {/* Left: partnership copy */}
        <div className="reveal">
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="block h-px w-[26px] bg-[#D8B262]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D8B262]">
              The partnership
            </span>
          </div>
          <h2
            className="mb-6 text-[clamp(30px,4.2vw,50px)] font-semibold leading-[1.06] tracking-[-0.025em] text-[#F4F8FC]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Convened by the people building the transition
          </h2>
          <p className="mb-5 text-[17px] leading-[1.62] text-[rgba(234,241,248,0.68)]">
            The{" "}
            <strong className="font-semibold text-[#EAF1F8]">
              Clean Energy Business Council
            </strong>{" "}
            is the MENA region&apos;s leading non-profit voice for clean energy
            policy and private-sector action.
          </p>
          <p className="text-[17px] leading-[1.62] text-[rgba(234,241,248,0.68)]">
            <strong className="font-semibold text-[#EAF1F8]">Kai Kata</strong>{" "}
            partners with institutions to turn climate ambition into convenings
            that move decision-makers from intention to implementation.
          </p>
        </div>

        {/* Right: two convener cards */}
        <div className="reveal grid gap-[18px]">
          <ConvenerCard
            name="CEBC"
            blurb="Clean Energy Business Council · MENA — policy, advocacy & private-sector convening since 2010."
            bgGradient="linear-gradient(135deg,rgba(46,107,176,0.16),rgba(6,16,28,0.2))"
          />
          <ConvenerCard
            name="Kai Kata"
            blurb="Convening & content studio turning climate strategy into rooms that decide and deliver."
            bgGradient="linear-gradient(135deg,rgba(67,200,146,0.14),rgba(6,16,28,0.2))"
          />
        </div>
      </div>
    </section>
  );
}

function ConvenerCard({
  name,
  blurb,
  bgGradient,
}: {
  name: string;
  blurb: string;
  bgGradient: string;
}) {
  return (
    <div
      className="rounded-[20px] border border-[rgba(234,241,248,0.12)] p-[34px]"
      style={{ background: bgGradient }}
    >
      <div
        className="mb-2.5 text-[26px] font-bold leading-none tracking-[-0.02em] text-[#F4F8FC]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {name}
      </div>
      <div className="text-[14px] leading-[1.5] text-[rgba(234,241,248,0.6)]">
        {blurb}
      </div>
    </div>
  );
}