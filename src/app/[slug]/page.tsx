"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { FloatingPaths } from "@/components/ui/background-paths";

const CALENDLY_URL = "https://calendly.com/automationstudio/15min";

// ── Pixel helper ──
function trackEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", event, data);
  }
}

// ── Slug-Specific Copy ──

type SlugContent = {
  headline: string;
  sub: string;
  problems: string[];
  roiLine: string;
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
      "Most businesses miss 5\u201310 calls per month without knowing it. Even at $50 per customer, that\u2019s $250\u2013$500 in lost revenue. The AI pays for itself fast.",
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
      "You\u2019re already too busy to pick up every call. How many ring out per week? Even a few missed calls a month adds up to way more than $400.",
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
      "When you\u2019re just starting out, every single call matters. Missing even a few per month can mean the difference between growing and stalling.",
  },
};

const faqs = [
  {
    q: "How does it work?",
    a: "We set up an AI voice agent on your business phone number. When you can\u2019t answer, it picks up, sounds like a real receptionist, answers questions about your business, and books the job.",
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
];

// ── Industry Demo Data ──

const industries = [
  {
    id: "barbershop",
    label: "Barbershop",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
      </svg>
    ),
  },
  {
    id: "autoshop",
    label: "Auto Shop",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: "medspa",
    label: "Med Spa",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: "dental",
    label: "Dental Office",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    id: "other",
    label: "Other",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
];

// ── Sub-Components ──

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
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-blue"
      >
        <span className="pr-4 text-lg font-medium text-white">{faq.q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
            isOpen ? "rotate-45 bg-white text-dark border-white" : "border-white/20 text-white/50"
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
            <p className="pb-6 text-base leading-relaxed text-dark-muted max-w-xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DemoAudioPlayer({ industry, onFinished }: { industry: string; onFinished: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      trackEvent("demo_audio_played", { industry });
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

  const label = industries.find((i) => i.id === industry)?.label || "AI Receptionist";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-blue/15 px-3 py-1 text-xs font-semibold text-blue uppercase tracking-wider">
          {label} Demo
        </span>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
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
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
            trackEvent("demo_audio_completed", { industry });
            onFinished();
          }}
          preload="metadata"
        />
        <div className="flex items-center gap-5">
          <button
            onClick={togglePlay}
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white transition-all ${
              isPlaying
                ? "bg-white/20 ring-4 ring-white/10"
                : "bg-blue hover:scale-105 shadow-lg shadow-blue/30"
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
                  className="absolute top-1/2 h-3 w-3 rounded-full bg-white shadow-md"
                  style={{ left: `${progress}%`, transform: "translateX(-50%) translateY(-50%)" }}
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
      <p className="mt-3 text-sm text-dark-muted text-center">
        This is what your customers hear when they call and you can&apos;t pick up.
      </p>
    </div>
  );
}

// ── Industry Demo Widget (4 states) ──

type DemoState = "select" | "email" | "playing" | "upsell";

function IndustryDemo() {
  const [state, setState] = useState<DemoState>("select");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showUpsell, setShowUpsell] = useState(false);

  const handleSelectIndustry = (id: string) => {
    setSelectedIndustry(id);
    trackEvent("demo_industry_selected", { industry: id });
    if (id === "other") {
      setState("email");
    } else {
      setState("email");
    }
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }
    setEmailError("");
    trackEvent("demo_email_submitted", {
      industry: selectedIndustry,
      email,
      ...(customIndustry ? { custom_industry: customIndustry } : {}),
    });
    setState("playing");
  };

  const selectedLabel = industries.find((i) => i.id === selectedIndustry)?.label;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {/* STATE 1: SELECT INDUSTRY */}
          {state === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                  Listen
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                  Hear what it sounds like for your business
                </h2>
                <p className="mt-2 text-sm text-dark-muted">
                  Pick your industry. We&apos;ll play a real demo call.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleSelectIndustry(ind.id)}
                    className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-blue/50 hover:bg-blue/10 active:scale-95"
                  >
                    <div className="text-dark-muted group-hover:text-blue transition-colors">
                      {ind.icon}
                    </div>
                    <span className="text-sm font-medium text-white">{ind.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATE 2: ENTER EMAIL */}
          {state === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-8">
                <button
                  onClick={() => setState("select")}
                  className="mb-4 text-xs text-dark-muted hover:text-white transition-colors"
                >
                  &larr; Back
                </button>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                  {selectedLabel || "Other"}
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Drop your email to hear the demo
                </h2>
                <p className="mt-2 text-sm text-dark-muted">
                  No spam. Just a demo call for your industry.
                </p>
              </div>

              <form onSubmit={handleSubmitEmail} className="mx-auto max-w-sm space-y-3">
                {selectedIndustry === "other" && (
                  <input
                    type="text"
                    placeholder="What type of business do you run?"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-dark-muted focus:border-blue/50 focus:outline-none focus:ring-1 focus:ring-blue/50"
                  />
                )}
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-dark-muted focus:border-blue/50 focus:outline-none focus:ring-1 focus:ring-blue/50"
                  required
                />
                {emailError && (
                  <p className="text-xs text-red-400">{emailError}</p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-light shadow-lg shadow-blue/25"
                >
                  Play My Demo
                </button>
              </form>
            </motion.div>
          )}

          {/* STATE 3: PLAYING + STATE 4: UPSELL */}
          {state === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <DemoAudioPlayer
                industry={selectedIndustry}
                onFinished={() => setShowUpsell(true)}
              />

              {/* Upsell always visible below player */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 rounded-xl border border-blue/20 bg-blue/5 p-6 text-center"
              >
                <h3 className="text-lg font-bold text-white">
                  Want to hear this with your business name, your services, your hours?
                </h3>
                <p className="mt-2 text-sm text-dark-muted">
                  We&apos;ll build you a custom demo for free. 15-minute call.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("demo_cta_clicked", { industry: selectedIndustry })}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-light shadow-lg shadow-blue/25 hover:-translate-y-0.5"
                >
                  Book Your Free Demo Call
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
      className={`group inline-flex items-center gap-2 rounded-full bg-blue font-semibold text-white transition-all hover:bg-blue-light shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/30 hover:-translate-y-0.5 ${
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
      className={`fixed bottom-0 left-0 right-0 z-50 bg-dark/95 px-4 py-3 backdrop-blur-md transition-transform md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.3)" }}
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
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <p className="text-dark-muted">Page not found.</p>
      </div>
    );
  }

  const c = copy[slug];

  return (
    <main className="min-h-screen bg-dark text-white">
      <StickyMobileCTA />

      {/* ── Hero ── */}
      <section className="relative flex items-center overflow-hidden pt-24 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,113,227,0.18),transparent)]" />
        <div className="absolute inset-0 text-white/[0.07]">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-green uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            April intake: accepting 5 businesses
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-8xl whitespace-pre-line"
          >
            {c.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-dark-muted md:text-xl"
          >
            {c.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <CTA size="large" />
            <span className="text-sm text-dark-muted">Free 15-min call. No commitment.</span>
          </motion.div>
        </div>
      </section>

      {/* ── Industry Demo ── */}
      <section className="relative border-t border-white/10 py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-surface to-dark" />
        <div className="relative mx-auto max-w-3xl px-6">
          <IndustryDemo />
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-dark to-dark" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
            The problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Every missed call is a lost&nbsp;job.
          </h2>

          <div className="mt-12 space-y-4 text-left">
            {c.problems.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-400 text-xs font-bold tabular-nums">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-dark-muted md:text-lg">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-surface to-dark" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Live in days, not&nbsp;months.
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: "Quick call", desc: "Tell us about your business and how you want calls handled.", time: "15 min" },
              { step: "02", title: "We build it", desc: "We train the AI on your business and connect it to your number.", time: "5\u20137 days" },
              { step: "03", title: "Calls answered", desc: "AI picks up when you can\u2019t. Books jobs, answers questions, takes messages.", time: "24/7" },
            ].map((s) => (
              <div key={s.step} className="group rounded-xl border border-white/8 bg-white/[0.03] p-6 text-left transition-colors hover:bg-white/[0.06] hover:border-white/15">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-dark-muted tabular-nums">{s.step}</span>
                  <span className="rounded-full bg-blue/15 px-2.5 py-0.5 text-[10px] font-bold text-blue uppercase tracking-wider">{s.time}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark-surface" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            The math
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Missed calls add up.<br className="hidden sm:block" /> $400/mo stops the&nbsp;bleeding.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-dark-muted">
            {c.roiLine}
          </p>

          {/* Comparison */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-6 text-left md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Without coverage</p>
              <p className="mt-4 text-2xl font-bold text-red-400">Calls go unanswered</p>
              <div className="mt-6 space-y-3">
                {["After-hours calls go to voicemail", "Missed calls while you\u2019re on the job", "Customers hang up and call your competitor", "No idea how many calls you\u2019re missing"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-dark-muted">
                    <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-xl border-2 border-blue/50 bg-blue/10 p-6 text-left md:p-8 shadow-lg shadow-blue/10">
              <div className="absolute -top-3 left-6 rounded-full bg-blue/20 border border-blue/40 px-3 py-1 text-xs font-bold text-blue">
                Launch partner pricing
              </div>
              <div className="absolute -top-3 right-6 rounded-full bg-green px-3 py-1 text-xs font-bold text-dark">
                $400/mo
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue mt-2">With AI backup</p>
              <p className="mt-4 text-2xl font-bold text-green">Every call answered</p>
              <div className="mt-6 space-y-3">
                {["Covers after-hours, weekends, holidays", "Picks up when you\u2019re busy on a job", "Takes messages and books appointments", "Answers customer questions about your business"].map((item) => (
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

          <div className="mt-12">
            <CTA size="large" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-dark to-dark" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Questions?
          </h2>

          <div className="mt-10 text-left">
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
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(0,113,227,0.15),transparent)]" />
        <div className="absolute inset-0 text-white/[0.04]">
          <FloatingPaths position={1} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Stop losing jobs<br />to missed&nbsp;calls.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-dark-muted">
            We&apos;re taking on 5 Toronto businesses this month as launch partners. We&apos;ll waive the setup fee and include the first week free so we can build case studies. Once we&apos;ve got our 5, pricing goes up.
          </p>
          <div className="mt-10">
            <CTA size="large" />
          </div>
          <p className="mt-6 text-sm text-dark-muted">
            <span className="line-through text-dark-muted/60">$500 setup</span>{" "}
            Free for launch partners. $400/month after trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8">
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
