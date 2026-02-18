"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What kind of tools do you build?",
    answer:
      "Small, private apps that automate one specific workflow for your business. Lead qualifiers, document generators, inbox assistants, review responders \u2014 if it follows a pattern of data in, result out, we can build it. These aren\u2019t generic SaaS tools. Each one is built around your exact process.",
  },
  {
    question: "How does the one-week turnaround work?",
    answer:
      "After a quick call where you walk us through your workflow, we start building immediately. Within one week, you get a working tool \u2014 not a mockup or wireframe. It uses your real data and you can test it right away.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "Zero. You describe the task that\u2019s eating your time, and we handle everything \u2014 design, development, deployment. The tools we build are simple enough that if you can use a spreadsheet, you can use what we deliver.",
  },
  {
    question: "What if I don\u2019t like the prototype?",
    answer:
      "Then you walk away. Seriously \u2014 the prototype costs you nothing. No invoice, no awkward follow-up, no commitment. We build it for free because we\u2019re confident it\u2019ll speak for itself. You only pay if you want to keep it.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Every tool we build is a private, isolated application \u2014 not a shared platform. Your data never touches another client\u2019s system. If you choose ownership, it runs entirely on your infrastructure. For managed plans, we use encrypted, isolated environments that only you can access.",
  },
  {
    question: "Can I request changes after delivery?",
    answer:
      "Yes. The Ownership plan includes one round of revisions and 7 days of support. The Managed plan includes ongoing updates and improvements as part of your monthly subscription.",
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
