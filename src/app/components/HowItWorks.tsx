"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Tell us what task you hate",
    description:
      "Book a quick call or send us a message. Describe the workflow that drains your time. We\u2019ll figure out if it can be automated.",
  },
  {
    number: "2",
    title: "We build a working prototype",
    description:
      "Within 48 hours, you get a functional tool built around your exact workflow. Using your real data. Ready to test.",
  },
  {
    number: "3",
    title: "You keep it or we host it",
    description:
      "Love it? Take ownership of the code or let us host and maintain it for you. Either way, the task is gone forever.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Three steps. That&apos;s it.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground text-sm font-semibold text-foreground">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
