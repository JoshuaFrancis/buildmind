"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const CALENDLY_URL = "https://calendly.com/tryautomation/call";

// ── Slug-Specific Copy ──
// Each slug targets a different ad audience. Same page, different gut punch.

type SlugContent = {
  headline: string;
  sub: string;
  problems: string[];
  roiLine: string;
  founderQuote: string;
};

const copy: Record<string, SlugContent> = {
  local: {
    headline: "Never miss another call.",
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
    headline: "You\u2019re too busy to answer. AI\u00a0isn\u2019t.",
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
    headline: "Your first hire should be\u00a0AI.",
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
    <div className="border-b border-border/60">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-medium">{faq.q}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-45" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
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
            <p className="pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
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
      <div className="rounded-2xl border border-border/60 bg-white p-6 text-center">
        <p className="text-sm text-muted">
          Audio demo unavailable. Book a call and we&apos;ll play it for you live.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-blue hover:underline"
        >
          Hear it on the call &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-white p-6">
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
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-colors hover:bg-blue-light"
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
          <div className="relative h-2 cursor-pointer rounded-full bg-card" onClick={handleSeek}>
            <div className="h-full rounded-full bg-blue transition-all" style={{ width: `${progress}%` }} />
          </div>
          {duration > 0 && (
            <div className="mt-1.5 flex justify-between text-xs text-muted">
              <span>{fmt((progress / 100) * duration)}</span>
              <span>{fmt(duration)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CTA({ className = "", size = "default" }: { className?: string; size?: "default" | "large" }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full bg-blue font-medium text-white transition-all hover:bg-blue-light ${
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
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-white/95 px-4 py-3 backdrop-blur-sm transition-transform md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-blue py-3.5 text-center text-sm font-semibold text-white"
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

      {/* ── Hero ── */}
      <section className="pt-20 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl"
          >
            {c.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl"
          >
            {c.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <CTA size="large" />
            <span className="text-sm text-muted">Free 15-min call. No commitment.</span>
          </motion.div>
        </div>
      </section>

      {/* ── Hear It ── */}
      {/* Audio FIRST, before the problem. Let them hear the product immediately. */}
      <section className="border-y border-border/60 bg-card py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue">
              Listen
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              This is what your customers hear when they call.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <AudioPlayer />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center text-sm text-muted"
          >
            Real demo. Not scripted. This is what callers actually experience.
          </motion.p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Every missed call is a lost&nbsp;job.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 space-y-4"
          >
            {c.problems.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50">
                  <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-base leading-relaxed md:text-lg">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-y border-border/60 bg-card py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Set it up in days, not&nbsp;months.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 grid gap-8 sm:grid-cols-3"
          >
            {[
              { step: "1", title: "Quick call", desc: "Tell us about your business, services, and how you want calls handled." },
              { step: "2", title: "We build it", desc: "We train the AI on your business and set it up on your phone number." },
              { step: "3", title: "Calls answered", desc: "AI picks up when you can\u2019t. You get a text summary of every call." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              $400/mo. One missed call costs&nbsp;more.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {c.roiLine}
            </p>

            {/* Comparison */}
            <div className="mx-auto mt-10 grid max-w-md gap-4 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Receptionist</p>
                <p className="mt-2 text-2xl font-semibold">$2,500+<span className="text-sm font-normal text-muted">/mo</span></p>
                <p className="mt-1 text-xs text-muted">9-5 only. Sick days. Turnover.</p>
              </div>
              <div className="rounded-xl border-2 border-blue bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-blue">AI Receptionist</p>
                <p className="mt-2 text-2xl font-semibold">$400<span className="text-sm font-normal text-muted">/mo</span></p>
                <p className="mt-1 text-xs text-muted">24/7. Never calls in sick. Never quits.</p>
              </div>
            </div>

            <div className="mt-10">
              <CTA />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="border-y border-border/60 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-card text-xl font-semibold">
              J
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted">
                &ldquo;{c.founderQuote}&rdquo;
              </p>
              <p className="mt-2 text-sm font-medium">
                Josh, Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Questions?
            </h2>
          </motion.div>

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

      {/* ── Final CTA ── */}
      <section className="bg-card py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Stop losing jobs to missed&nbsp;calls.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted">
              15-minute call. We\u2019ll show you exactly how it works for your business.
            </p>
            <div className="mt-8">
              <CTA size="large" />
            </div>
            <p className="mt-5 text-sm text-muted">
              $400/month. Cancel anytime. Live in 5\u20137 days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Automation Studio
          </p>
        </div>
      </footer>

      <div className="h-16 md:hidden" />
    </main>
  );
}
