"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "7 days", label: "Prototype Delivery" },
  { value: "$0", label: "Upfront Cost" },
  { value: "100%", label: "Private & Secure" },
  { value: "Yours", label: "Full Code Ownership" },
];

export default function SocialProof() {
  return (
    <section className="border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-semibold text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
