"use client";

import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/your-link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Accepting new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Stop doing
          <br />
          repetitive work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Get a private AI-powered tool built for your business in{" "}
          <span className="font-medium text-foreground">48 hours</span>.
          No subscriptions. No bloated software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-blue px-8 py-4 text-base font-medium text-white transition-all hover:bg-blue-light"
          >
            Show Me What You Can Build
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-base font-medium text-blue transition-colors hover:text-blue-light"
          >
            See How It Works
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-sm text-muted"
        >
          Free prototype &middot; No commitment &middot; 48-hour delivery
        </motion.p>
      </div>
    </section>
  );
}
