import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Politik — Civic Intelligence Platform",
  description: "Structured public issue tracking and government observatory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#27272a] bg-[#0a0a0b]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ef4444] text-sm font-bold text-white">
                P
              </div>
              <span className="text-lg font-semibold tracking-tight">
                politik
              </span>
            </a>
            <div className="flex items-center gap-8">
              <a
                href="/civic-ledger"
                className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
              >
                Civic Ledger
              </a>
              <a
                href="/civic-intel"
                className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
              >
                Civic Intel
              </a>
              <div className="h-4 w-px bg-[#27272a]" />
              <span className="text-xs text-[#71717a]">
                v0.1 — open civic infrastructure
              </span>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
