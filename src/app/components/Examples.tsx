"use client";

import { motion } from "framer-motion";

const examples = [
  {
    title: "Lead Qualifier Dashboard",
    description: "Turns messy inquiries into organized, scored leads. Upload raw form submissions and get prioritized prospects instantly.",
    category: "Sales",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    mockUI: (
      <div className="mt-5 space-y-2 rounded-xl border border-border/60 bg-white p-3">
        <div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
          <span className="text-muted">John D. &mdash; Real Estate</span>
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-600 font-medium">Hot</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
          <span className="text-muted">Sarah M. &mdash; E-commerce</span>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-600 font-medium">Warm</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
          <span className="text-muted">Mike R. &mdash; Consulting</span>
          <span className="rounded-full bg-blue/10 px-2 py-0.5 text-blue font-medium">New</span>
        </div>
      </div>
    ),
  },
  {
    title: "Document Generator",
    description: "Creates formatted documents from raw data instantly. Paste in your notes and get a polished PDF or report.",
    category: "Operations",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    mockUI: (
      <div className="mt-5 rounded-xl border border-border/60 bg-white p-3">
        <div className="mb-2 h-2 w-3/4 rounded bg-border/80" />
        <div className="mb-2 h-2 w-full rounded bg-border/80" />
        <div className="mb-2 h-2 w-5/6 rounded bg-border/80" />
        <div className="mb-3 h-2 w-2/3 rounded bg-border/80" />
        <div className="flex gap-2">
          <div className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-medium text-red-500">PDF</div>
          <div className="rounded-md bg-blue/10 px-2 py-1 text-[10px] font-medium text-blue">DOCX</div>
        </div>
      </div>
    ),
  },
  {
    title: "Inbox Assistant",
    description: "Drafts replies to repetitive emails automatically. Review, tweak, and send in seconds instead of minutes.",
    category: "Communication",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    mockUI: (
      <div className="mt-5 space-y-2 rounded-xl border border-border/60 bg-white p-3">
        <div className="rounded-lg bg-card p-2.5 text-[11px]">
          <span className="font-medium text-foreground">Re: Project update</span>
          <p className="mt-1 text-muted">Thanks for reaching out! I&apos;ve reviewed the details and...</p>
        </div>
        <div className="flex gap-2">
          <div className="rounded-md bg-green-50 px-2.5 py-1 text-[10px] font-medium text-green-600">Send</div>
          <div className="rounded-md bg-card px-2.5 py-1 text-[10px] font-medium text-muted">Edit</div>
        </div>
      </div>
    ),
  },
  {
    title: "Review Responder",
    description: "Writes personalized customer responses in seconds. Handles positive and negative reviews with the right tone.",
    category: "Customer Success",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    mockUI: (
      <div className="mt-5 space-y-2 rounded-xl border border-border/60 bg-white p-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="rounded-lg bg-card p-2.5 text-[11px] text-muted">
          <p>&quot;Thank you so much for your wonderful feedback! We&apos;re thrilled...&quot;</p>
        </div>
      </div>
    ),
  },
];

export default function Examples() {
  return (
    <section id="examples" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue">
            What we build
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            What your tool could look like.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Every tool follows the same pattern: you feed in your data, it gets
            processed, and you get a clean output — ready to use.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {examples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex rounded-xl bg-white p-3 text-foreground shadow-sm">
                  {example.icon}
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted shadow-sm">
                  {example.category}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{example.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{example.description}</p>
              {example.mockUI}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
