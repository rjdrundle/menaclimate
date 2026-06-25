"use client";

import { useState } from "react";
import { forums } from "@/data/site";

type FormState = {
  first: string;
  last: string;
  email: string;
  org: string;
  forum: string;
};

const initial: FormState = {
  first: "",
  last: "",
  email: "",
  org: "",
  forum: "All four forums",
};

/**
 * Registration form. Controlled fields, basic email validation, posted to
 * /api/register. Shows a "Thank you" state on success. Web Speech narration
 * button lives in the Hero — the form itself doesn't need a separate one.
 */
export default function Register() {
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "err">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const update =
    <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!data.first.trim() || !data.last.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Server responded ${res.status}`);
      }
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="register"
      className="relative z-[5] overflow-hidden px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vh,140px)]"
      style={{ background: "#06101C" }}
    >
      {/* radial green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          top: "-25%",
          left: "-15%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle,rgba(67,200,146,0.18),transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1180px]">
        <div className="reveal mb-14 grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="block h-px w-[26px] bg-[#43C892]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#43C892]">
                Reserve a seat
              </span>
            </div>
            <h2
              className="max-w-[14ch] text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.025em] text-[#F4F8FC]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Four evenings. One room. You in it.
            </h2>
          </div>
          <p className="max-w-[440px] text-[16px] leading-[1.6] text-[rgba(234,241,248,0.62)]">
            Capacity is intentionally small. Tell us a little about you and we&apos;ll
            send a calendar invite with venue details within two working days.
          </p>
        </div>

        {status === "ok" ? (
          <div
            className="reveal rounded-[22px] border border-[rgba(67,200,146,0.4)] p-[clamp(30px,4vw,48px)]"
            style={{
              background:
                "linear-gradient(180deg,rgba(67,200,146,0.08),rgba(6,16,28,0.6))",
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden
                className="block h-2 w-2 rounded-full bg-[#43C892]"
                style={{ boxShadow: "0 0 12px #43C892" }}
              />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#43C892]">
                Reserved
              </span>
            </div>
            <h3
              className="text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.02em] text-[#F4F8FC]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Thank you, {data.first.trim()}.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.55] text-[rgba(234,241,248,0.66)]">
              We&apos;ve received your interest for{" "}
              <strong className="text-[#F4F8FC]">{data.forum}</strong>. You&apos;ll
              get a calendar invite at <strong className="text-[#F4F8FC]">{data.email}</strong>{" "}
              within two working days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="reveal grid gap-5 lg:grid-cols-2"
            noValidate
          >
            <Field id="reg-first" label="First name" required>
              <input
                type="text"
                id="reg-first"
                name="first"
                required
                autoComplete="given-name"
                value={data.first}
                onChange={update("first")}
                className="form-input"
              />
            </Field>
            <Field id="reg-last" label="Last name" required>
              <input
                type="text"
                id="reg-last"
                name="last"
                required
                autoComplete="family-name"
                value={data.last}
                onChange={update("last")}
                className="form-input"
              />
            </Field>
            <Field id="reg-email" label="Email" required>
              <input
                type="email"
                id="reg-email"
                name="email"
                required
                autoComplete="email"
                value={data.email}
                onChange={update("email")}
                className="form-input"
              />
            </Field>
            <Field id="reg-org" label="Organisation">
              <input
                type="text"
                id="reg-org"
                name="org"
                autoComplete="organization"
                value={data.org}
                onChange={update("org")}
                className="form-input"
              />
            </Field>
            <div className="lg:col-span-2">
              <Field id="reg-forum" label="Which forum?">
                <select
                  id="reg-forum"
                  name="forum"
                  value={data.forum}
                  onChange={update("forum")}
                  className="form-input cursor-pointer"
                >
                  <option value="All four forums">All four forums</option>
                  {forums.map((f) => (
                    <option key={f.n} value={`${f.n} — ${f.title}`}>
                      {f.n} — {f.title}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-5 lg:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-4 text-[16px] font-bold text-[#06101C] shadow-[0_10px_34px_rgba(216,178,98,0.4)] transition-transform duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#E7C77E,#D8B262)" }}
              >
                {status === "submitting" ? "Sending…" : "Reserve my seat"}{" "}
                <span aria-hidden>→</span>
              </button>
              {error && (
                <span
                  role="alert"
                  className="text-[13px] text-[#E07C7C]"
                >
                  {error}
                </span>
              )}
              <span className="text-[12px] text-[rgba(234,241,248,0.45)]">
                We never share your details.
              </span>
            </div>
          </form>
        )}
      </div>

      {/* Form control styles — kept in the same file so the styles travel
          with the component, not in a global CSS sheet. */}
      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(10, 26, 44, 0.5);
          border: 1px solid rgba(234, 241, 248, 0.12);
          color: #f4f8fc;
          font-size: 15.5px;
          font-family: inherit;
          outline: none;
          transition:
            border-color 0.2s,
            background 0.2s;
          appearance: none;
        }
        .form-input::placeholder {
          color: rgba(234, 241, 248, 0.32);
        }
        .form-input:focus {
          border-color: rgba(67, 200, 146, 0.6);
          background: rgba(10, 26, 44, 0.7);
        }
      `}</style>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[rgba(234,241,248,0.55)]"
      >
        {label}
        {required && <span className="ml-1 text-[#43C892]">*</span>}
      </label>
      {children}
    </div>
  );
}