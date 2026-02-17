"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What kind of tools do you build?",
    answer:
      "We build small, private internal tools that automate one specific workflow. Think lead qualifiers, document generators, inbox assistants, review responders \u2014 anything that follows a pattern of input \u2192 processing \u2192 output. If you\u2019re doing a repetitive task manually, we can probably automate it.",
  },
  {
    question: "How does the 48-hour turnaround work?",
    answer:
      "After our initial call, we get to work immediately. Within 48 hours, you\u2019ll receive a working prototype built around your actual workflow and data. This isn\u2019t a mockup \u2014 it\u2019s a functional tool you can test right away.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "Not at all. You just need to describe the task you want automated. We handle everything \u2014 design, development, deployment. The tools we build are designed to be as simple as possible to use.",
  },
  {
    question: "What if I don\u2019t like the prototype?",
    answer:
      "The prototype is completely free with no commitment. If it doesn\u2019t solve your problem, you walk away with zero cost. We only charge when you\u2019re ready to own or have us manage the tool.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Each tool is a private application \u2014 your data is never shared with other clients. If you choose ownership, the entire codebase is yours, running on your own infrastructure. For managed plans, we use encrypted, isolated environments.",
  },
  {
    question: "Can I request changes after delivery?",
    answer:
      "Yes. The Ownership plan includes one round of revisions and 30 days of support. The Managed plan includes ongoing updates and improvements as part of your monthly subscription.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/60">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-5 text-left">
        <span className="pr-4 font-medium">{faq.question}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-45" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
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
            <p className="pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Frequently asked questions.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
