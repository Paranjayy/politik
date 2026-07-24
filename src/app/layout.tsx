import type { Metadata } from "next";
import "./globals.css";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Politik - Civic Intelligence Platform",
  description: "Structured public issue tracking and government observatory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 h-14">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--color-accent)] text-[10px] font-bold text-white font-[family-name:var(--font-mono)]">
                P
              </div>
              <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]">
                politik
              </span>
              <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] ml-1">
                v0.1
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-6">
              <a href="/civic-ledger" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Issues
              </a>
              <a href="/civic-intel" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Intel
              </a>
              <a href="/briefing" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Briefing
              </a>
              <a href="/world" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                World
              </a>
              <a href="/stats" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Stats
              </a>
              <div className="h-3 w-px bg-[var(--color-border)]" />
              <a href="/search" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Search
              </a>
              <a href="/about" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                About
              </a>
              <a href="/learn" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Learn
              </a>
            </div>
            <MobileNav />
          </div>
        </nav>
        <KeyboardShortcuts />
        <main className="pt-14 min-h-[calc(100vh-3.5rem)]">{children}</main>
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/90">
          <div className="mx-auto max-w-[1400px] px-6 py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                politik v0.1 — open civic infrastructure
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/civic-ledger" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Issues</a>
                <a href="/civic-intel" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Intel</a>
                <a href="/briefing" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Briefing</a>
                <a href="/world" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">World</a>
                <a href="/stats" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Stats</a>
                <a href="/search" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Search</a>
                <a href="/about" className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">About</a>
              </div>
            </div>
            <div className="mt-4 font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]/60">
              Data is illustrative. Verify independently.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
