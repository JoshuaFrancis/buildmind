"use client";

import { motion } from "framer-motion";

const EMAIL = "hello@automationstudio.co";
const MAILTO = `mailto:${EMAIL}?subject=I%20have%20a%20workflow%20I%20want%20automated`;

const plans = [
  {
    name: "Prototype",
    price: "Free",
    period: "",
    description: "Working demo using your real data. No commitment.",
    features: [
      "Functional prototype in one week",
      "Built around your actual workflow",
      "Uses your real data",
      "No payment required",
    ],
    cta: "Get Your Prototype",
    highlighted: false,
  },
  {
    name: "Ownership",
    price: "$600",
    period: "starting at",
    description: "Get the app code + deployment guide. It\u2019s yours forever.",
    features: [
      "Everything in Prototype",
      "Full source code ownership",
      "Deployment guide included",
      "7 days of support",
      "One round of revisions",
    ],
    cta: "Get Started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Managed",
    price: "$50",
    period: "/month",
    description: "We host, maintain, and update it for you.",
    features: [
      "Everything in Ownership",
      "We host and maintain the app",
      "Monthly updates & improvements",
      "Priority support",
      "Usage analytics dashboard",
    ],
    cta: "Get Started",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Start free. Only pay when you&apos;re convinced it works.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-white shadow-xl ring-2 ring-blue"
                  : "bg-white border border-border/60"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-4 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  {plan.period === "starting at" && (
                    <span className="text-sm text-muted">Starting at</span>
                  )}
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  {plan.period && plan.period !== "starting at" && (
                    <span className="text-sm text-muted">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={MAILTO}
                className={`mt-auto block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-blue text-white hover:bg-blue-light"
                    : "bg-card text-foreground hover:bg-card-hover"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
