"use client";

/**
 * Footer with ghost wordmark (16vw Space Grotesk 700) bottom-aligned.
 */
export default function Footer() {
  return (
    <footer className="relative z-[5] overflow-hidden bg-[#06101C] pt-[clamp(70px,10vh,110px)]">
      <div className="px-[clamp(20px,5vw,72px)]">
        <div className="reveal mx-auto grid max-w-[1180px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span
                aria-hidden
                className="block h-[13px] w-[13px] rounded-full"
                style={{
                  background: "linear-gradient(135deg,#43C892,#D8B262)",
                  boxShadow: "0 0 12px rgba(67,200,146,0.7)",
                }}
              />
              <span
                className="text-[19px] font-semibold tracking-[-0.02em] text-[#F3F7FB]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                mena climate
              </span>
            </div>
            <p className="max-w-[40ch] text-[14.5px] leading-[1.6] text-[rgba(234,241,248,0.55)]">
              A four-part sustainability series for the Gulf. Ras Al Khaimah,
              2026. Co-presented by CEBC and Kai Kata.
            </p>
          </div>

          <FooterCol
            title="Series"
            items={[
              ["Forums", "#forums"],
              ["About", "#about"],
              ["Speakers", "#speakers"],
              ["Reserve a seat", "#register"],
            ]}
          />
          <FooterCol
            title="Contact"
            items={[
              ["hello@menaclimate.com", "mailto:hello@menaclimate.com"],
              ["CEBC", "https://cebc-mea.com"],
              ["Kai Kata", "https://kaikata.co"],
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              ["Privacy", "/privacy"],
              ["Editorial policy", "/editorial"],
              ["LinkedIn · CEBC", "https://www.linkedin.com/company/clean-energy-business-council"],
            ]}
          />
        </div>

        <div
          className="reveal mx-auto mt-14 flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t border-[rgba(234,241,248,0.08)] py-6 text-[12.5px] text-[rgba(234,241,248,0.45)]"
        >
          <span>© 2026 mena climate · CEBC × Kai Kata</span>
          <span>Ras Al Khaimah · United Arab Emirates</span>
        </div>
      </div>

      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="reveal pointer-events-none w-full overflow-hidden text-center"
      >
        <span
          className="block whitespace-nowrap bg-clip-text text-transparent"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "16.4vw",
            lineHeight: 0.78,
            letterSpacing: "-0.04em",
            backgroundImage:
              "linear-gradient(180deg,rgba(234,241,248,0.12),rgba(234,241,248,0.01))",
          }}
        >
          mena climate
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: [label: string, href: string][];
}) {
  return (
    <div>
      <div className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[rgba(234,241,248,0.55)]">
        {title}
      </div>
      <ul className="grid gap-2.5 text-[14px] text-[rgba(234,241,248,0.7)]">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="transition-colors hover:text-white"
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}