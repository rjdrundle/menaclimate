"use client";

import { stats } from "@/data/site";
import { useEffect, useRef } from "react";

/**
 * "Why Attend" + count-up stat tiles.
 *
 * Parallax bg: hero-coast.mp4 at speed 0.34.
 * Count-up: animate from 0 to data-count value on first intersection
 * (threshold .4), preserving any prefix/suffix, cubic ease-out, ~1200ms.
 */
export default function WhyAttend() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    if (!reduced) {
      let raf = 0;
      const update = () => {
        raf = 0;
        const vh = window.innerHeight;
        const r = wrap.getBoundingClientRect();
        const prog =
          (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        layer.style.transform = `translate3d(0, ${-prog * 0.34 * 100}px, 0)`;
      };
      const onScroll = () => {
        if (!raf) raf = window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      // Cleanup
      const cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        if (raf) window.cancelAnimationFrame(raf);
      };
      // Count-up
      const counters = wrap.querySelectorAll<HTMLElement>("[data-count]");
      const animate = (el: HTMLElement) => {
        const raw = el.getAttribute("data-count") ?? "";
        const numMatch = raw.replace(/[^0-9.]/g, "");
        const num = parseFloat(numMatch);
        if (!num) return;
        const suffix = raw.replace(/[0-9.,]/g, "");
        const prefix = (raw.match(/^[^0-9]*/) ?? [""])[0].replace(
          /[0-9.,]/g,
          "",
        );
        const dur = 1200;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const e = 1 - Math.pow(1 - p, 3); // cubic ease-out
          const v = Math.round(num * e);
          el.textContent = prefix + v.toLocaleString() + suffix;
          if (p < 1) window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target as HTMLElement);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((c) => io.observe(c));

      return cleanup;
    } else {
      // Reduced motion: skip parallax + count-up (leave the initial display values).
      const counters = wrap.querySelectorAll<HTMLElement>("[data-count]");
      counters.forEach((c) => {
        const initial = c.getAttribute("data-initial");
        if (initial) c.textContent = initial;
      });
    }
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative z-[5] overflow-hidden px-[clamp(20px,5vw,72px)] py-[clamp(70px,10vh,120px)]"
      style={{
        background: "linear-gradient(180deg,#06101C,#081A2C)",
      }}
    >
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 z-0"
        style={{
          top: "-26%",
          height: "152%",
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
          <source src="/assets/hero-coast.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg,#06101C 0%,rgba(8,26,44,0.82) 30%,rgba(8,26,44,0.86) 70%,#081A2C 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-[2]"
        style={{
          top: "-30%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle,rgba(67,200,146,0.16),transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-[3] mx-auto max-w-[1180px]">
        <div className="reveal mb-16 text-center">
          <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D8B262]">
            Why attend
          </div>
          <h2
            className="mx-auto max-w-[18ch] text-[clamp(30px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F4F8FC]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The room where the Gulf&apos;s net-zero roadmap gets written
          </h2>
        </div>

        <div
          className="grid gap-px overflow-hidden rounded-[18px] border border-[rgba(234,241,248,0.1)]"
          style={{
            background: "rgba(234,241,248,0.1)",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="reveal px-7 py-9 text-center"
              style={{ background: "#081A2C" }}
            >
              <div
                data-count={s.value}
                data-initial={s.display}
                className="bg-clip-text text-transparent text-[clamp(40px,5vw,62px)] font-bold leading-none tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  backgroundImage: `linear-gradient(120deg,#F4F8FC,${s.accent})`,
                }}
              >
                {s.display}
              </div>
              <div className="mt-3 text-[14.5px] text-[rgba(234,241,248,0.62)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
