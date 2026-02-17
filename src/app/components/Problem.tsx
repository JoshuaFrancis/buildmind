"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
      </svg>
    ),
    title: "Copy-pasting between spreadsheets",
    description: "Moving data manually between tools, reformatting it every time, praying nothing gets lost.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Replying to the same emails over and over",
    description: "Writing near-identical responses to every inquiry, client request, or support message.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Formatting reports by hand",
    description: "Taking raw data and spending hours turning it into something presentable for clients or management.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue">
            The problem
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Your team is wasting hours on tasks a tool could handle.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Every business has that one workflow everyone hates. The tedious,
            repetitive task that eats up hours every week.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-white p-8"
            >
              <div className="mb-5 inline-flex rounded-xl bg-card p-3 text-foreground">
                {point.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-16 grid max-w-3xl gap-0 overflow-hidden rounded-2xl border border-border/60 md:grid-cols-2"
        >
          <div className="border-b border-border/60 bg-white p-8 md:border-r md:border-b-0">
            <div className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">Before</div>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3"><span className="mt-0.5 text-red-400">&#10005;</span>5+ hours/week on manual tasks</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-red-400">&#10005;</span>Human errors in data entry</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-red-400">&#10005;</span>Slow response times to clients</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-red-400">&#10005;</span>Scaling means hiring more people</li>
            </ul>
          </div>
          <div className="bg-card p-8">
            <div className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">After</div>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-3"><span className="mt-0.5 text-green-500">&#10003;</span>Task completed in seconds</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-green-500">&#10003;</span>Consistent, error-free output</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-green-500">&#10003;</span>Instant responses, 24/7</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-green-500">&#10003;</span>Scale without extra headcount</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
