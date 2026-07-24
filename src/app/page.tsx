import {
  FileText,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const stats = [
  { label: "Issues tracked", value: "6" },
  { label: "Countries mapped", value: "3" },
  { label: "Protests documented", value: "8" },
  { label: "Parties profiled", value: "5" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-verified)]" />
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              live data
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
            Public intelligence
            <br />
            <span className="text-[var(--color-accent)]">without the noise</span>
          </h1>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            Structured issue tracking, evidence-linked government reports,
            and protest monitoring. Issue-first, not personality-first.
          </p>

          <div className="flex items-center gap-4 mb-16">
            <a
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#dc2626]"
            >
              Explore issues
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/civic-intel"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
            >
              Country reports
            </a>
            <a
              href="/timeline"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
            >
              Global timeline
            </a>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4"
              >
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {s.label}
                </span>
                <span className="text-2xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two products */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-2">
            {/* Civic Ledger */}
            <a
              href="/civic-ledger"
              className="group relative border-b border-[var(--color-border)] p-8 transition-colors hover:bg-[var(--color-bg-raised)] lg:border-b-0 lg:border-r"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                  <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Civic Issue Ledger</h2>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Evidence-linked issue tracking
                  </p>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {[
                  "Structured issue lifecycle with 16 stages",
                  "8-signal vote system (not upvote/downvote)",
                  "Jurisdiction mapping to responsible bodies",
                  "Evidence chain with confidence levels",
                  "Timeline tracking with official responses",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-accent)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                <span>Explore issues</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>

            {/* Civic Intel */}
            <a
              href="/civic-intel"
              className="group relative p-8 transition-colors hover:bg-[var(--color-bg-raised)]"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-severity-medium)]/10">
                  <Globe className="h-5 w-5 text-[var(--color-severity-medium)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Civic Intel</h2>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Government observatory
                  </p>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {[
                  "7-dimension country reports with trend tracking",
                  "Party profiles with contradiction mapping",
                  "Protest lifecycle documentation",
                  "No single misleading score",
                  "Multi-perspective analysis modes",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-severity-medium)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-severity-medium)]">
                <span>View reports</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <h3 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Quick access
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/explore", label: "Issue Explorer", desc: "Filter & sort all issues", color: "var(--color-accent)" },
              { href: "/compare-parties", label: "Party Comparison", desc: "Side-by-side party analysis", color: "var(--color-severity-medium)" },
              { href: "/timeline", label: "Global Timeline", desc: "Chronological event view", color: "var(--color-status-verified)" },
              { href: "/civic-intel/wiki", label: "Protest Wiki", desc: "61 protests from 29 countries", color: "var(--color-severity-high)" },
            ].map((item) => (
              <a key={item.href} href={item.href}
                className="group rounded-lg border border-[var(--color-border)] p-5 transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-raised)]">
                <div className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: item.color }} />
                <h4 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">{item.label}</h4>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <h3 className="mb-8 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Design principles
          </h3>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Issue-first, not personality-first",
              "Evidence before virality",
              "Transparent edit history",
              "Separate fact, inference, opinion",
              "Protect vulnerable reporters",
              "No single popularity score",
              "Clear jurisdiction mapping",
              "Structured solution comparison",
              "Independent resolution verification",
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3"
              >
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10">
        <div className="mx-auto max-w-[1400px] text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
          politik v0.1 — computational public-interest intelligence
        </div>
      </footer>
    </div>
  );
}
