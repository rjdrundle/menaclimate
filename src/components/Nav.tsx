"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Fixed top nav. Transparent over the hero; once scrolled past 60px,
 * gains a frosted dark background + 1px bottom border.
 *
 * Brand dot uses a 13px circle with a 135° green→gold gradient +
 * a subtle green glow. Wordmark is "mena climate" in Space Grotesk 600.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-between",
        "px-[clamp(20px,5vw,72px)] py-[18px]",
        "transition-[background,backdrop-filter,border-color,padding] duration-400",
        scrolled
          ? "bg-[rgba(6,16,28,0.72)] backdrop-blur-[16px] border-b border-[rgba(234,241,248,0.1)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
      aria-label="Primary"
    >
      <Link
        href="#top"
        className="flex items-center gap-2.5"
        aria-label="mena climate — home"
      >
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
      </Link>

      <div className="flex items-center gap-[34px]">
        <Link
          href="#forums"
          className="hidden text-[14.5px] font-medium text-[rgba(234,241,248,0.72)] hover:text-white sm:block"
        >
          Forums
        </Link>
        <Link
          href="#about"
          className="hidden text-[14.5px] font-medium text-[rgba(234,241,248,0.72)] hover:text-white sm:block"
        >
          About
        </Link>
        <Link
          href="#speakers"
          className="hidden text-[14.5px] font-medium text-[rgba(234,241,248,0.72)] hover:text-white sm:block"
        >
          Speakers
        </Link>
        <Link
          href="#register"
          className={[
            "inline-flex items-center gap-2 rounded-full",
            "px-5 py-[11px]",
            "text-[14px] font-semibold text-[#06101C]",
            "shadow-[0_6px_22px_rgba(216,178,98,0.4)]",
            "transition-transform duration-200 hover:-translate-y-px",
          ].join(" ")}
          style={{ background: "linear-gradient(135deg,#E7C77E,#D8B262)" }}
        >
          Reserve a seat <span aria-hidden>→</span>
        </Link>
      </div>
    </nav>
  );
}
