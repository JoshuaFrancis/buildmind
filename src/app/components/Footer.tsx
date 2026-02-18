const EMAIL = "hello@automationstudio.co";
const MAILTO = `mailto:${EMAIL}`;

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="shrink-0">
                <rect width="28" height="28" rx="6" fill="#1d1d1f" />
                <path d="M8 14L12 10L16 14L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 18L12 14L16 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </svg>
              <span>Automation Studio</span>
            </a>
            <p className="mt-2 text-sm text-muted">Custom tools. Delivered fast.</p>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a>
            <a href="#examples" className="transition-colors hover:text-foreground">Examples</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href={MAILTO} className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Automation Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
