import type { Metadata } from "next";
import "./globals.css";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

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
            <div className="flex items-center gap-6">
              <a href="/civic-ledger" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Issues
              </a>
              <a href="/civic-intel" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Intel
              </a>
              <div className="h-3 w-px bg-[var(--color-border)]" />
              <a href="/search" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Search
              </a>
              <div className="h-3 w-px bg-[var(--color-border)]" />
              <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
                open civic infra
              </span>
            </div>
          </div>
        </nav>
        <KeyboardShortcuts />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
