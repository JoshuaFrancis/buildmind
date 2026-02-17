"use client";

import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/your-link";

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            If a task takes you 5+ hours/week,
            <br className="hidden md:block" />
            {" "}we can eliminate it.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
            Get a free working prototype in 48 hours. No commitment, no
            contracts. Just results.
          </p>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-blue px-10 py-4 text-base font-semibold text-white transition-all hover:bg-blue-light"
            >
              Get Your Free Prototype
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Takes 2 minutes &middot; No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
