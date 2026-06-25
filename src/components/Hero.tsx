"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroClips } from "@/data/site";

/**
 * Hero: full-viewport crossfading video montage + headline + CTAs + ghost wordmark.
 *
 * - Five clips stack absolutely. The first is opacity:1, others 0.
 * - A requestAnimationFrame tick checks currentTime >= duration − 1.3 and
 *   crossfades to the next clip (1.4s opacity transition).
 * - Honors prefers-reduced-motion: pauses autoplay and skips the parallax meshes.
 * - Bottom ghost wordmark uses Space Grotesk 700 at ~16.4vw, white-space:nowrap,
 *   and a vertical text gradient clipped to the letters — must sit inside the hero.
 */
export default function Hero() {
  const vidsRef = useRef<(HTMLVideoElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voicePlaying, setVoicePlaying] = useState(false);

  // Hero montage (only on first client mount; autoplay requires muted anyway).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vids = vidsRef.current.filter(Boolean) as HTMLVideoElement[];
    if (vids.length === 0) return;

    if (reduced) {
      // Just show clip 0; don't cycle, don't auto-play others.
      vids.forEach((v, i) => {
        v.muted = true;
        v.style.transition = "opacity 1.4s ease";
        v.style.opacity = i === 0 ? "1" : "0";
      });
      vids[0].play().catch(() => {});
      return;
    }

    vids.forEach((v, i) => {
      v.muted = true;
      v.playsInline = true;
      v.style.transition = "opacity 1.4s ease";
      v.style.opacity = i === 0 ? "1" : "0";
    });
    vids[0].play().catch(() => {});

    let cur = 0;
    let scheduled = false;
    let raf = 0;

    const advance = () => {
      const nx = (cur + 1) % vids.length;
      try {
        vids[nx].currentTime = 0;
        void vids[nx].play();
      } catch {
        /* noop */
      }
      vids[nx].style.opacity = "1";
      vids[cur].style.opacity = "0";
      const prev = cur;
      cur = nx;
      window.setTimeout(() => {
        try {
          vids[prev].pause();
          vids[prev].currentTime = 0;
        } catch {
          /* noop */
        }
      }, 1500);
    };

    const tick = () => {
      const v = vids[cur];
      if (
        v &&
        v.duration &&
        v.currentTime >= v.duration - 1.3 &&
        !scheduled
      ) {
        scheduled = true;
        advance();
        window.setTimeout(() => {
          scheduled = false;
        }, 1700);
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, []);

  // "Hear our vision" narration. Uses Web Speech API; falls back silently if unavailable.
  // TODO: replace with pre-rendered /assets/hero-voiceover.mp3 for production —
  //       voice quality depends on the user's OS/browser voices and is not consistent.
  const toggleVoice = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (voicePlaying) {
      synth.cancel();
      setVoicePlaying(false);
      return;
    }

    const text =
      "Across the Gulf, a quiet transformation is underway. From the deserts to the coral reefs, from the turbines on the coastline to the laws being written today — four forums will trace the path from regulation to implementation. This is Climate Frontiers. Come, and help shape the region's net-zero future.";

    const u = new SpeechSynthesisUtterance(text);
    const vs = synth.getVoices();
    const gb = vs.filter(
      (v) => /en[-_]GB/i.test(v.lang) || /british|UK/i.test(v.name),
    );
    const male =
      gb.find((v) =>
        /(daniel|arthur|george|oliver|male|man|brian|james|ryan)/i.test(v.name),
      ) ??
      vs.find((v) =>
        /(daniel|arthur|george|oliver|brian|james)/i.test(v.name),
      );
    const voice = male ?? gb[0] ?? vs.find((v) => /^en/i.test(v.lang)) ?? vs[0];
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = "en-GB";
    }
    u.rate = 0.92; // slower, measured
    u.pitch = 0.82; // lower, warmer, older
    u.onend = () => setVoicePlaying(false);
    u.onerror = () => setVoicePlaying(false);
    synth.cancel();
    synth.speak(u);
    setVoicePlaying(true);
  };

  return (
    <header
      id="top"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-[130px] px-[clamp(20px,5vw,72px)] pb-0"
    >
      {/* Video montage */}
      <div className="absolute inset-0 z-0">
        {heroClips.map((c, i) => (
          <video
            key={c.src}
            ref={(el) => {
              vidsRef.current[i] = el;
            }}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-0"
          >
            <source src={c.src} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Overlay gradients for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,16,28,0.5) 0%,rgba(6,16,28,0.18) 32%,rgba(6,16,28,0.45) 68%,#06101C 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg,rgba(6,16,28,0.82) 0%,rgba(6,16,28,0.5) 36%,rgba(6,16,28,0.05) 70%)",
        }}
      />

      {/* Atmospheric drifting blobs */}
      <Blob top="-22%" left="-8%" size="62vw" color="rgba(46,107,176,0.95)" anim="meshB 19s" />
      <Blob top="-10%" right="-6%" size="50vw" color="rgba(67,200,146,0.78)" anim="meshA 23s" />
      <Blob bottom="-26%" left="14%" size="56vw" color="rgba(216,178,98,0.62)" anim="meshC 27s" />
      <Blob bottom="-20%" right="6%" size="44vw" color="rgba(28,110,82,0.85)" anim="meshD 21s" />

      {/* Bottom gradient to soften the transition into the next section */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,16,28,0.35) 0%,rgba(6,16,28,0) 22%,rgba(6,16,28,0.25) 64%,#06101C 100%)",
        }}
      />

      {/* Optional pre-rendered voiceover (currently not wired — see toggleVoice). */}
      <audio ref={audioRef} preload="auto">
        <source src="/assets/hero-voiceover.mp3" type="audio/mpeg" />
      </audio>

      {/* Narration button */}
      <button
        type="button"
        onClick={toggleVoice}
        aria-label={voicePlaying ? "Pause narration" : "Hear our vision"}
        className="absolute right-[clamp(20px,5vw,72px)] bottom-[clamp(26px,5.5vh,54px)] z-[6] inline-flex items-center gap-3 rounded-full border border-[rgba(234,241,248,0.22)] bg-[rgba(8,18,32,0.42)] backdrop-blur-md px-[18px] py-[10px] text-[14px] font-semibold text-[#EAF1F8] cursor-pointer transition-[border-color,background] duration-300 hover:bg-[rgba(8,18,32,0.62)] hover:border-[rgba(234,241,248,0.4)]"
      >
        <span
          className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full text-[12px] text-[#06101C]"
          style={{ background: "linear-gradient(135deg,#E7C77E,#D8B262)" }}
        >
          {voicePlaying ? "❚❚" : "▶"}
        </span>
        {voicePlaying ? "Pause narration" : "Hear our vision"}
      </button>

      {/* Hero copy */}
      <div className="relative z-[5] mx-auto w-full max-w-[1180px] pb-[clamp(120px,18vh,220px)]">
        {/* Eyebrow pill */}
        <div
          className="reveal mb-[30px] inline-flex items-center gap-3 rounded-full border border-[rgba(234,241,248,0.18)] bg-[rgba(10,26,44,0.35)] px-[15px] py-[7px] backdrop-blur-md"
        >
          <span
            aria-hidden
            className="block h-[7px] w-[7px] rounded-full bg-[#43C892]"
            style={{
              animation: "pulseDot 2.4s ease-in-out infinite",
              boxShadow: "0 0 10px #43C892",
            }}
          />
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[rgba(234,241,248,0.82)]">
            A four-part sustainability series · Ras Al Khaimah
          </span>
        </div>

        {/* Headline */}
        <h1
          className="reveal mb-[26px] text-[clamp(54px,10vw,148px)] font-semibold leading-[0.92] tracking-[-0.03em] text-[#F4F8FC]"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            textWrap: "balance",
          }}
        >
          Climate{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              fontWeight: 400,
              backgroundImage:
                "linear-gradient(100deg,#E7C77E,#D8B262 25%,#43C892 50%,#D8B262 75%,#E7C77E)",
              backgroundSize: "220% auto",
              animation: "shimmer 7s linear infinite",
            }}
          >
            Frontiers
          </span>
        </h1>

        {/* Sub copy */}
        <p
          className="reveal mb-[38px] max-w-[600px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[rgba(234,241,248,0.74)]"
          style={{ textWrap: "pretty" }}
        >
          Four forums tracing the path from regulation to implementation — from
          what UAE law requires, to the science, to the sectors that will
          decide the Gulf&apos;s net-zero future.
        </p>

        {/* CTAs */}
        <div className="reveal mb-[46px] flex flex-wrap items-center gap-4">
          <Link
            href="#register"
            className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-4 text-[16px] font-bold text-[#06101C] shadow-[0_10px_34px_rgba(216,178,98,0.4)] transition-transform duration-200 hover:-translate-y-px"
            style={{ background: "linear-gradient(135deg,#E7C77E,#D8B262)" }}
          >
            Reserve a seat <span aria-hidden>→</span>
          </Link>
          <Link
            href="#forums"
            className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(234,241,248,0.22)] bg-white/[0.03] px-[26px] py-4 text-[16px] font-semibold text-[#EAF1F8] hover:bg-white/[0.06]"
          >
            View the programme
          </Link>
        </div>

        {/* Meta row */}
        <div className="reveal flex flex-wrap items-center gap-x-10 gap-y-7 border-t border-[rgba(234,241,248,0.12)] pt-[30px]">
          <div className="flex items-center gap-3.5">
            <span className="text-[12px] uppercase tracking-[0.14em] text-[rgba(234,241,248,0.5)]">
              Co-presented by
            </span>
            <span
              className="text-[15px] font-semibold text-[#EAF1F8]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              CEBC
            </span>
            <span className="text-[rgba(234,241,248,0.35)]">×</span>
            <span
              className="text-[15px] font-semibold text-[#EAF1F8]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Kai Kata
            </span>
          </div>
          <div className="flex items-center gap-[26px]">
            <Stat n="04" label="Forums" />
            <Stat n="30+" label="Speakers" />
            <Stat n="2026" label="Season" />
          </div>
        </div>
      </div>

      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="reveal pointer-events-none absolute bottom-[1.2vh] left-0 right-0 z-[3] w-full text-center"
      >
        <span
          className="whitespace-nowrap bg-clip-text text-transparent"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "16.4vw",
            lineHeight: 0.74,
            letterSpacing: "-0.04em",
            backgroundImage:
              "linear-gradient(180deg,rgba(234,241,248,0.18),rgba(234,241,248,0.02))",
          }}
        >
          mena climate
        </span>
      </div>
    </header>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div
        className="text-[21px] font-semibold text-[#F4F8FC]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {n}
      </div>
      <div className="text-[12px] text-[rgba(234,241,248,0.5)]">{label}</div>
    </div>
  );
}

function Blob({
  top,
  left,
  right,
  bottom,
  size,
  color,
  anim,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  color: string;
  anim: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute rounded-full mix-blend-screen opacity-60"
        style={{
          top,
          left,
          right,
          bottom,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 62%)`,
          filter: "blur(36px)",
          animation: `${anim} ease-in-out infinite`,
        }}
      />
    </div>
  );
}
