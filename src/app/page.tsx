import {
  FileText,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const stats = [
  { label: "Issues tracked", value: "6", delta: null },
  { label: "Countries mapped", value: "3", delta: null },
  { label: "Protests documented", value: "8", delta: null },
  { label: "Parties profiled", value: "5", delta: null },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] items-start">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-verified)]" />
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  live data
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight lg:text-5xl xl:text-6xl">
                Public intelligence
                <br />
                <span className="text-[var(--color-accent)]">without the noise</span>
              </h1>
              <p className="mb-8 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Structured issue tracking, evidence-linked government reports,
                and protest monitoring. Issue-first, not personality-first.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="/civic-ledger"
                  className="group inline-flex items-center gap-2 rounded bg-[var(--color-accent)] px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#dc2626]"
                >
                  Browse issues
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/civic-intel"
                  className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] px-5 py-2.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                >
                  Country reports
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div className="flex flex-col gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)] lg:mt-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between bg-[var(--color-bg-raised)] px-5 py-4"
                >
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {s.label}
                  </span>
                  <span className="text-lg font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
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
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--color-accent)]/10">
                  <FileText className="h-4 w-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Civic Issue Ledger</h2>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Evidence-linked issue tracking
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {[
                  "Structured issue lifecycle with 16 stages",
                  "8-signal vote system (not upvote/downvote)",
                  "Jurisdiction mapping to responsible bodies",
                  "Evidence chain with confidence levels",
                  "Timeline tracking with official responses",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-accent)]" />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[var(--color-accent)]">
                <span>Explore issues</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>

            {/* Civic Intel */}
            <a
              href="/civic-intel"
              className="group relative p-8 transition-colors hover:bg-[var(--color-bg-raised)]"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--color-severity-medium)]/10">
                  <Globe className="h-4 w-4 text-[var(--color-severity-medium)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Civic Intel</h2>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Government observatory
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {[
                  "7-dimension country reports with trend tracking",
                  "Party profiles with contradiction mapping",
                  "Protest lifecycle documentation",
                  "No single misleading score",
                  "Multi-perspective analysis modes",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-severity-medium)]" />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[var(--color-severity-medium)]">
                <span>View reports</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <h3 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Design principles
          </h3>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
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
                className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2"
              >
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="mx-auto max-w-[1400px] text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
          politik v0.1 - computational public-interest intelligence
        </div>
      </footer>
    </div>
  );
}
