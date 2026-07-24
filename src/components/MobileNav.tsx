"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/civic-ledger", label: "Issues" },
  { href: "/civic-intel", label: "Intel" },
  { href: "/compare-parties", label: "Parties" },
  { href: "/network", label: "Network" },
  { href: "/timeline", label: "Timeline" },
  { href: "/briefing", label: "Briefing" },
  { href: "/world", label: "World" },
  { href: "/stats", label: "Stats" },
  { href: "/country-dashboard", label: "Dashboard" },
  { href: "/severity-calc", label: "Calculator" },
  { href: "/protest-calc", label: "Protest Calc" },
  { href: "/search", label: "Search" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/export", label: "Export" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button — visible below lg breakpoint */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center h-8 w-8 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        aria-label="Open menu"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[var(--color-bg)]/95 backdrop-blur-xl flex flex-col transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--color-border)]">
          <a href="/" onClick={close} className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--color-accent)] text-[10px] font-bold text-white font-[family-name:var(--font-mono)]">
              P
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]">
              politik
            </span>
          </a>
          <button
            onClick={close}
            className="flex items-center justify-center h-8 w-8 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            aria-label="Close menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-lg font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
