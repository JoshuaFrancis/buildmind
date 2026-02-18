"use client";

import { motion } from "framer-motion";

const EMAIL = "hello@automationstudio.co";
const MAILTO = `mailto:${EMAIL}?subject=I%20have%20a%20workflow%20I%20want%20automated`;

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
            Get a free working prototype in one week. No commitment, no
            contracts. Just results.
          </p>
          <div className="mt-10">
            <a
              href={MAILTO}
              className="group inline-flex items-center gap-2 rounded-full bg-blue px-10 py-4 text-base font-semibold text-white transition-all hover:bg-blue-light"
            >
              Get Your Free Prototype
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Just describe the task &middot; We&apos;ll take it from there
          </p>
        </motion.div>
      </div>
    </section>
  );
}
