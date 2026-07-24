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
              <a href="/explore" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Explore
              </a>
              <a href="/civic-ledger" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Issues
              </a>
              <a href="/civic-intel" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Intel
              </a>
              <a href="/compare-parties" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Parties
              </a>
              <a href="/network" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Network
              </a>
              <a href="/timeline" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Timeline
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
              <a href="/country-dashboard" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Dashboard
              </a>
              <a href="/severity-calc" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Calculator
              </a>
              <a href="/protest-calc" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Protest Calc
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
              <a href="/methodology" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Method
              </a>
              <a href="/glossary" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Glossary
              </a>
              <div className="h-3 w-px bg-[var(--color-border)]" />
              <a href="/export" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Export
              </a>
              <div className="h-3 w-px bg-[var(--color-border)]" />
              <a href="/api-docs" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                API
              </a>
              <a href="/changelog" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Changelog
              </a>
            </div>
            <MobileNav />
          </div>
        </nav>
        <KeyboardShortcuts />
        <main className="pt-14 min-h-[calc(100vh-3.5rem)]">{children}</main>
      </body>
    </html>
  );
}
