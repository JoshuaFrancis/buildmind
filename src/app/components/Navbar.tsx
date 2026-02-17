"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/your-link";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Examples", href: "#examples" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
            <rect width="28" height="28" rx="6" fill="#1d1d1f" />
            <path d="M8 14L12 10L16 14L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 18L12 14L16 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
          <span>BuildMind</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-light">
            Book a Call
          </a>
        </div>

        <button className="flex flex-col gap-1.5 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border/60 bg-white md:hidden">
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-muted transition-colors hover:text-foreground" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="mt-2 rounded-full bg-blue px-5 py-3 text-center text-sm font-medium text-white">
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
