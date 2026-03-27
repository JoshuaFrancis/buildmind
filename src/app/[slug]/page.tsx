"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const CALENDLY_URL = "https://calendly.com/tryautomation/call";

// ── Slug-Specific Copy ──

type SlugContent = {
  headline: string;
  sub: string;
  problems: string[];
  roiLine: string;
  founderQuote: string;
};

const copy: Record<string, SlugContent> = {
  local: {
    headline: "Never miss\nanother call.",
    sub: "AI answers your business phone 24/7. Sounds human. Books jobs. You sleep.",
    problems: [
      "A customer calls at 7pm. You\u2019re at dinner. They hang up and call your competitor.",
      "You\u2019re on a job. Phone rings. By the time you call back, they\u2019ve already booked someone else.",
      "Every missed call is $200\u2013$500 walking out the door. It adds up fast.",
    ],
    roiLine:
      "The average service call is worth $200\u2013$500. Miss one per month and this has already paid for itself. Most of our clients miss 5\u201310.",
    founderQuote:
      "I watched a plumber lose $3,000 in one week from missed after-hours calls. That\u2019s why I built this.",
  },
  grow: {
    headline: "You\u2019re too busy\nto answer. AI isn\u2019t.",
    sub: "Your business is growing but your phone can\u2019t keep up. AI handles the overflow so no lead falls through.",
    problems: [
      "You\u2019re on a job site. Phone rings. You can\u2019t answer. That\u2019s a new customer gone.",
      "You finally call back 3 hours later. They already booked someone who picked up.",
      "You\u2019re turning away work without even knowing it. Every ring you miss is revenue lost.",
    ],
    roiLine:
      "At $300\u2013$600 per job, missing just two calls a month costs you $600\u2013$1,200. The AI costs less than one missed job.",
    founderQuote:
      "Every busy contractor I talked to said the same thing: \u2018I know I\u2019m missing calls, I just can\u2019t get to them.\u2019 Now you don\u2019t have to.",
  },
  start: {
    headline: "Your first hire\nshould be AI.",
    sub: "You\u2019re building a business solo. AI answers your phone so you never miss your first customers.",
    problems: [
      "You\u2019re doing the work yourself. When you\u2019re busy, the phone goes to voicemail. Nobody leaves one.",
      "New customers Google you, call once, and move on if you don\u2019t pick up. You never know they called.",
      "A receptionist costs $2,500/month. You can\u2019t afford that. But you can\u2019t afford to miss calls either.",
    ],
    roiLine:
      "Your first customers are the hardest to get. A single missed call could be a $500 job, more than the monthly cost. Don\u2019t let it ring out.",
    founderQuote:
      "I built this for people who are great at their trade but can\u2019t be on the phone and on the job at the same time.",
  },
};

const faqs = [
  {
    q: "How does it work?",
    a: "We set up an AI voice agent on your business phone number. When you can\u2019t answer, it picks up, sounds like a real receptionist, answers questions about your business, and books the job. You get a text with every call summary.",
  },
  {
    q: "Does it actually sound human?",
    a: "Yes. Press play above and hear it for yourself. Callers don\u2019t know it\u2019s AI.",
  },
  {
    q: "What do I need to get started?",
    a: "Just your business phone number and some basic info about your services, hours, and pricing. Setup takes 5\u20137 days. We handle everything.",
  },
  {
    q: "What happens if I cancel?",
    a: "Cancel anytime. No contracts, no cancellation fees. We stop the service at the end of your billing cycle.",
  },
  {
    q: "What if the AI can\u2019t handle a call?",
    a: "It transfers to you or takes a detailed message with the caller\u2019s info. You never lose the lead.",
  },
  {
    q: "How much does a receptionist cost?",
    a: "A full-time receptionist runs $2,500\u2013$3,500/month. An answering service is $200\u2013$500/month but sounds generic. This is $400/month, available 24/7, and trained on your specific business.",
  },
];

// ── Components ──

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-blue"
      >
        <span className="pr-4 text-lg font-medium">{faq.q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted transition-all ${
            isOpen ? "rotate-45 bg-foreground text-white border-foreground" : ""
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-muted max-w-xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const timer = setTimeout(() => {
      if (audio.error) setHasError(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setHasError(true));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  if (hasError) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-dark p-8 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue/10 to-transparent" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <svg className="h-7 w-7 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-medium text-white">Hear the AI in action on your call</p>
            <p className="mt-1 text-sm text-dark-muted">We&apos;ll play a live demo so you can hear exactly how it sounds</p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-dark transition-opacity hover:opacity-90"
          >
            Book a Free Call
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-dark p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue/8 to-transparent" />
      <audio
        ref={audioRef}
        src="/demo-call.mp3"
        onTimeUpdate={() => {
          const a = audioRef.current;
          if (a?.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        onError={() => setHasError(true)}
        preload="metadata"
      />
      <div className="relative flex items-center gap-5">
        <button
          onClick={togglePlay}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white transition-all ${
            isPlaying
              ? "bg-white/20 ring-4 ring-white/10"
              : "bg-blue hover:scale-105 hover:shadow-lg hover:shadow-blue/25"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div className="relative h-1.5 cursor-pointer rounded-full bg-white/15" onClick={handleSeek}>
            <div className="h-full rounded-full bg-blue transition-all" style={{ width: `${progress}%` }} />
            {progress > 0 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md"
                style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
              />
            )}
          </div>
          {duration > 0 && (
            <div className="mt-2 flex justify-between text-xs text-dark-muted font-mono">
              <span>{fmt((progress / 100) * duration)}</span>
              <span>{fmt(duration)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CTA({ className = "", size = "default", variant = "primary" }: { className?: string; size?: "default" | "large"; variant?: "primary" | "dark" }) {
  const base = variant === "dark"
    ? "bg-white text-dark hover:bg-white/90"
    : "bg-blue text-white hover:bg-blue-light shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/30 hover:-translate-y-0.5";

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full font-semibold transition-all ${base} ${
        size === "large" ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"
      } ${className}`}
    >
      Book a Free Call
      <svg
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  );
}

function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 px-4 py-3 backdrop-blur-md transition-transform md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
    >
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-blue py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue/25"
      >
        Book a Free Call
      </a>
    </div>
  );
}

// ── Page ──

export default function LandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!["local", "grow", "start"].includes(slug)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Page not found.</p>
      </div>
    );
  }

  const c = copy[slug];

  return (
    <main className="min-h-screen bg-background">
      <StickyMobileCTA />

      {/* ── Hero ── Dark, full-bleed, composition-first */}
      <section className="relative overflow-hidden bg-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,113,227,0.15),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-muted px-4 py-1.5 text-xs font-semibold tracking-wide text-green uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              Now accepting clients
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl whitespace-pre-line"
            >
              {c.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-dark-muted md:text-xl"
            >
              {c.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <CTA size="large" variant="dark" />
              <span className="text-sm text-dark-muted">Free 15-min call. No commitment.</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Hear It ── Dark section, audio is the centerpiece */}
      <section className="bg-dark py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                Listen
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Hear what your customers hear.
              </h2>
            </div>
            <p className="text-sm text-dark-muted">
              Real demo, not scripted.
            </p>
          </div>

          <div className="mt-8">
            <AudioPlayer />
          </div>
        </div>
      </section>

      {/* ── The Problem ── Left-aligned, no center text-align */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            The problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Every missed call is a lost&nbsp;job.
          </h2>

          <div className="mt-10 space-y-3">
            {c.problems.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-card p-5 md:p-6"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500 text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed md:text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── Horizontal timeline, not 3-column grid */}
      <section className="border-y border-border/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Live in days, not&nbsp;months.
          </h2>

          <div className="mt-12 space-y-0">
            {[
              { step: "01", title: "Quick call", desc: "Tell us about your business, services, and how you want calls handled.", time: "15 min" },
              { step: "02", title: "We build it", desc: "We train the AI on your business and connect it to your phone number.", time: "5\u20137 days" },
              { step: "03", title: "Calls answered", desc: "AI picks up when you can\u2019t. You get a text summary of every call.", time: "24/7" },
            ].map((s, i) => (
              <div key={s.step} className="group relative flex gap-6 pb-10 last:pb-0">
                {/* Vertical line */}
                {i < 2 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border/60" />
                )}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-white tabular-nums">
                  {s.step}
                </div>
                <div className="pt-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <span className="text-xs font-medium text-blue">{s.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted max-w-md">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ── Big comparison cards, left-aligned header */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            The math
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            $400/mo. One missed call costs&nbsp;more.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            {c.roiLine}
          </p>

          {/* Comparison cards, bigger and more dramatic */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Human Receptionist</p>
              <p className="mt-4 text-4xl font-bold tabular-nums">$2,500+<span className="text-base font-normal text-muted">/mo</span></p>
              <div className="mt-6 space-y-2.5">
                {["9-5 only, closed weekends", "Sick days and vacation", "Training and turnover costs"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-xl bg-foreground p-6 text-white md:p-8">
              <div className="absolute -top-3 right-6 rounded-full bg-green px-3 py-1 text-xs font-bold text-dark">
                Save 84%
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-muted">AI Receptionist</p>
              <p className="mt-4 text-4xl font-bold tabular-nums">$400<span className="text-base font-normal text-dark-muted">/mo</span></p>
              <div className="mt-6 space-y-2.5">
                {["24/7, every day of the year", "Never calls in sick or quits", "Trained on your specific business"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-dark-muted">
                    <svg className="h-4 w-4 shrink-0 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CTA />
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="border-y border-border/40 py-14 md:py-18">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-lg font-bold text-white">
              J
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted italic">
                &ldquo;{c.founderQuote}&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold">
                Josh <span className="font-normal text-muted">, Founder</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Questions?
          </h2>

          <div className="mt-10">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── Dark, full-bleed */}
      <section className="relative overflow-hidden bg-dark py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(0,113,227,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Stop losing jobs<br />to missed&nbsp;calls.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-dark-muted">
            15-minute call. We&apos;ll show you exactly how it works for your business.
          </p>
          <div className="mt-10">
            <CTA size="large" variant="dark" />
          </div>
          <p className="mt-6 text-sm text-dark-muted">
            $400/month. Cancel anytime. Live in 5&ndash;7 days.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-dark py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-dark-muted">
            &copy; {new Date().getFullYear()} Automation Studio
          </p>
        </div>
      </footer>

      <div className="h-16 md:hidden" />
    </main>
  );
}
