"use client";

import { use } from "react";
import { debates } from "@/data/debates";
import { issues } from "@/data/issues";
import { ArrowLeft, ExternalLink, Scale, AlertTriangle, CheckCircle, Link2 } from "lucide-react";
import Link from "next/link";

function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const colors = {
    high: "bg-[#22c55e]/10 text-[#22c55e]",
    medium: "bg-[#f59e0b]/10 text-[#f59e0b]",
    low: "bg-[#71717a]/10 text-[#71717a]",
  };
  return (
    <span className={`rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)] uppercase ${colors[level]}`}>
      {level}
    </span>
  );
}

function SourceTypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    study: "📄",
    report: "📋",
    news: "📰",
    "court-order": "⚖️",
    government: "🏛️",
  };
  return <span>{icons[type] || "📎"}</span>;
}

export default function DebatePage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = use(params);
  const debate = debates[issueId];
  const issue = issues.find((i) => i.id === issueId);

  if (!debate) {
    return (
      <div className="min-h-screen border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          <Link
            href="/civic-ledger"
            className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to civic ledger
          </Link>
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-12 text-center">
            <AlertTriangle className="mx-auto mb-3 h-6 w-6 text-[var(--color-severity-high)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              No debate data available for <span className="font-[family-name:var(--font-mono)] text-[var(--color-text)]">{issueId}</span>
            </p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Steelman debates are being generated for all critical and high-severity issues.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Back link */}
        <Link
          href="/civic-ledger"
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to civic ledger
        </Link>

        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <Scale className="h-4 w-4 text-[var(--color-severity-medium)]" />
          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
            Steelman Debate
          </span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight lg:text-3xl">
          {debate.issueTitle}
        </h1>
        <div className="mb-8 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span>Issue {debate.issueId}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>Last updated {debate.lastUpdated}</span>
          {issue && (
            <>
              <span className="text-[var(--color-border)]">·</span>
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                issue.severity === "critical"
                  ? "bg-[var(--color-severity-critical)]/10 text-[var(--color-severity-critical)]"
                  : "bg-[var(--color-severity-high)]/10 text-[var(--color-severity-high)]"
              }`}>
                {issue.severity}
              </span>
            </>
          )}
        </div>

        {/* Steelman positions — side by side */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Supporting case */}
          <div className="rounded border border-[#22c55e]/20 bg-[var(--color-bg-raised)]">
            <div className="border-b border-[#22c55e]/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[#22c55e]" />
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#22c55e]">
                  Strongest Supporting Case
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-[var(--color-text)]">
                {debate.supporting.headline}
              </h3>
            </div>
            <div className="px-5 py-4">
              <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {debate.supporting.argument}
              </p>

              {/* Key evidence */}
              <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Key Evidence
              </h4>
              <div className="space-y-2 mb-4">
                {debate.supporting.strongestEvidence.map((e, i) => (
                  <div key={i} className="border-l-2 border-[#22c55e]/30 pl-3">
                    <div className="text-[11px] font-medium text-[var(--color-text)]">
                      {e.title}
                    </div>
                    <div className="text-[9px] text-[var(--color-text-muted)]">
                      {e.source}
                    </div>
                    <div className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      {e.summary}
                    </div>
                  </div>
                ))}
              </div>

              {/* Steelman summary */}
              <div className="rounded bg-[#22c55e]/5 p-3">
                <div className="mb-1 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#22c55e]">
                  Steelman Summary
                </div>
                <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                  {debate.supporting.steelmanSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Opposing case */}
          <div className="rounded border border-[var(--color-accent)]/20 bg-[var(--color-bg-raised)]">
            <div className="border-b border-[var(--color-accent)]/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                  Strongest Opposing Case
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-[var(--color-text)]">
                {debate.opposing.headline}
              </h3>
            </div>
            <div className="px-5 py-4">
              <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {debate.opposing.argument}
              </p>

              {/* Key evidence */}
              <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Key Evidence
              </h4>
              <div className="space-y-2 mb-4">
                {debate.opposing.strongestEvidence.map((e, i) => (
                  <div key={i} className="border-l-2 border-[var(--color-accent)]/30 pl-3">
                    <div className="text-[11px] font-medium text-[var(--color-text)]">
                      {e.title}
                    </div>
                    <div className="text-[9px] text-[var(--color-text-muted)]">
                      {e.source}
                    </div>
                    <div className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      {e.summary}
                    </div>
                  </div>
                ))}
              </div>

              {/* Steelman summary */}
              <div className="rounded bg-[var(--color-accent)]/5 p-3">
                <div className="mb-1 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                  Steelman Summary
                </div>
                <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                  {debate.opposing.steelmanSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {/* Shared facts */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                <CheckCircle className="h-3 w-3 text-[#22c55e]" />
                Shared Facts
              </h2>
              <p className="mb-3 text-[10px] text-[var(--color-text-muted)]">
                Both sides agree on these facts — the disagreement is over their interpretation.
              </p>
              <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {debate.sharedFacts.map((fact, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {fact.claim}
                      </p>
                      <ConfidenceBadge level={fact.confidence} />
                    </div>
                    <p className="mt-1 text-[9px] text-[var(--color-text-muted)]">
                      Source: {fact.source}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Actual disagreements */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                <Scale className="h-3 w-3 text-[var(--color-accent)]" />
                Actual Disagreement
              </h2>
              <p className="mb-3 text-[10px] text-[var(--color-text-muted)]">
                After removing facts both sides accept, these are the genuine points of contention.
              </p>
              <div className="space-y-4">
                {debate.actualDisagreements.map((d, i) => (
                  <div key={i} className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                    <div className="border-b border-[var(--color-border)] px-4 py-2">
                      <h3 className="text-xs font-semibold text-[var(--color-text)]">
                        {d.point}
                      </h3>
                    </div>
                    <div className="grid gap-px bg-[var(--color-border)] lg:grid-cols-2">
                      <div className="bg-[var(--color-bg-raised)] px-4 py-3">
                        <div className="mb-1 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#22c55e]">
                          Supporting
                        </div>
                        <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                          {d.forPosition}
                        </p>
                      </div>
                      <div className="bg-[var(--color-bg-raised)] px-4 py-3">
                        <div className="mb-1 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                          Opposing
                        </div>
                        <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                          {d.againstPosition}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar — Sources */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              <Link2 className="h-3 w-3" />
              Sources
            </h2>
            <div className="space-y-2">
              {debate.sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 transition-colors hover:border-[var(--color-border-strong)]"
                >
                  <SourceTypeIcon type={s.type} />
                  <div className="flex-1">
                    <div className="text-[11px] font-medium text-[var(--color-text)]">
                      {s.title}
                    </div>
                    <div className="mt-0.5 text-[9px] text-[var(--color-text-muted)]">
                      {s.type}
                    </div>
                  </div>
                  <ExternalLink className="mt-0.5 h-3 w-3 text-[var(--color-text-muted)]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
