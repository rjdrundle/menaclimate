"use client";

import Link from "next/link";
import { forums } from "@/data/site";
import { useEffect, useRef } from "react";

/**
 * "The Series / Forums" section.
 *
 * Parallax background: hero-desert.mp4, speed 0.28.
 * On scroll (rAF-throttled), translate the video layer based on its parent
 * section's vertical progress through the viewport.
 */
export default function Forums() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    // Mark the layer for the parallax script (a sibling script watches
    // [data-parallax] but the inline effect here keeps things local).
    layer.dataset.parallax = "0.28";

    if (reduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      const prog =
        (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      layer.style.transform = `translate3d(0, ${-prog * 0.28 * 100}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      id="forums"
      className="relative z-[5] overflow-hidden bg-ink px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
    >
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 z-0"
        style={{
          top: "-22%",
          height: "144%",
          willChange: "transform",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          {/* TODO: replace with licensed footage before launch. */}
          <source src="/assets/hero-desert.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,16,28,0.9) 0%,rgba(6,16,28,0.74) 38%,rgba(6,16,28,0.8) 72%,#06101C 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1180px]">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="block h-px w-[26px] bg-[#43C892]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#43C892]">
                The series
              </span>
            </div>
            <h2
              className="max-w-[14ch] text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.025em] text-[#F4F8FC]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              From regulation to implementation
            </h2>
          </div>
          <p className="max-w-[380px] text-[16px] leading-[1.6] text-[rgba(234,241,248,0.62)]">
            Each forum grounds policy in science, then applies both to the
            region&apos;s highest-impact sectors — construction and industrial
            decarbonisation.
          </p>
        </div>

        <div className="grid gap-[18px]">
          {forums.map((f) => (
            <Link
              key={f.n}
              href="#register"
              className="reveal block rounded-[22px] border border-[rgba(234,241,248,0.1)] p-[clamp(26px,3.4vw,42px)] transition-[border-color,transform,background] duration-300 hover:-translate-y-0.5 hover:border-[rgba(234,241,248,0.18)]"
              style={{
                background:
                  "linear-gradient(180deg,rgba(13,26,46,0.55),rgba(6,16,28,0.3))",
              }}
            >
              <div className="flex flex-wrap items-start gap-x-[clamp(20px,4vw,56px)] gap-y-5">
                <div
                  className="min-w-[1.6em] text-[clamp(40px,6vw,76px)] font-bold leading-[0.9]"
                  style={{ color: f.accent, fontFamily: "var(--font-space-grotesk)" }}
                >
                  {f.n}
                </div>
                <div className="min-w-[240px] flex-1">
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                    style={{ borderColor: "rgba(234,241,248,0.16)" }}
                  >
                    <span
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ background: f.accent }}
                    />
                    <span
                      className="text-[11.5px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: f.accent }}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <h3
                    className="mb-2.5 text-[clamp(24px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-[#F4F8FC]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="max-w-[54ch] text-[16px] leading-[1.55] text-[rgba(234,241,248,0.62)]">
                    {f.sub}
                  </p>
                </div>
                <div className="flex min-w-[170px] flex-col items-end gap-[18px] text-right">
                  <div>
                    <div className="mb-1 text-[11.5px] uppercase tracking-[0.14em] text-[rgba(234,241,248,0.42)]">
                      Venue
                    </div>
                    <div className="text-[15px] font-medium text-[#EAF1F8]">
                      {f.venue}
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 text-[14.5px] font-semibold"
                    style={{ color: f.accent }}
                  >
                    Reserve seat <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
