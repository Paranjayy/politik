"use client";

import { useMemo } from "react";
import { issues } from "@/data/issues";
import { ArrowLeft, BarChart3, AlertTriangle, AlertCircle, Info, Flame } from "lucide-react";
import Link from "next/link";

const severityConfig = {
  critical: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Critical", weight: 4 },
  high: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "High", weight: 3 },
  medium: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "Medium", weight: 2 },
  low: { color: "#71717a", bg: "rgba(113,113,122,0.12)", label: "Low", weight: 1 },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  reported: { color: "#71717a", label: "Reported" },
  triaged: { color: "#71717a", label: "Triaged" },
  "evidence-requested": { color: "#3b82f6", label: "Evidence Requested" },
  verified: { color: "#22c55e", label: "Verified" },
  deduplicated: { color: "#71717a", label: "Deduplicated" },
  classified: { color: "#3b82f6", label: "Classified" },
  "jurisdiction-assigned": { color: "#f59e0b", label: "Jurisdiction Assigned" },
  "response-requested": { color: "#f59e0b", label: "Response Requested" },
  "intervention-proposed": { color: "#3b82f6", label: "Intervention Proposed" },
  funded: { color: "#22c55e", label: "Funded" },
  "in-progress": { color: "#3b82f6", label: "In Progress" },
  "partially-resolved": { color: "#22c55e", label: "Partially Resolved" },
  resolved: { color: "#22c55e", label: "Resolved" },
  audited: { color: "#22c55e", label: "Audited" },
  reopened: { color: "#ef4444", label: "Reopened" },
};

const domainColors: Record<string, string> = {
  sanitation: "#f59e0b",
  water: "#3b82f6",
  transportation: "#a855f7",
  education: "#22c55e",
  "digital-infrastructure": "#06b6d4",
  environment: "#ef4444",
};

function BarChart({
  data,
  maxValue,
}: {
  data: { label: string; value: number; color: string; sublabel?: string }[];
  maxValue: number;
}) {
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-32 flex-shrink-0 text-right">
            <span className="text-[10px] text-[var(--color-text-muted)]">{d.label}</span>
            {d.sublabel && (
              <span className="block text-[9px] text-[var(--color-text-muted)]">{d.sublabel}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="relative h-5 rounded bg-[var(--color-bg)]">
              <div
                className="absolute inset-y-0 left-0 rounded transition-all duration-500"
                style={{
                  width: `${maxValue > 0 ? (d.value / maxValue) * 100 : 0}%`,
                  backgroundColor: d.color,
                  opacity: 0.7,
                }}
              />
              <span className="absolute inset-y-0 flex items-center pl-2 text-[10px] font-medium font-[family-name:var(--font-mono)] text-[var(--color-text)]">
                {d.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold font-[family-name:var(--font-mono)]" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = useMemo(() => {
    // By severity
    const bySeverity = ["critical", "high", "medium", "low"].map((s) => ({
      label: severityConfig[s as keyof typeof severityConfig].label,
      value: issues.filter((i) => i.severity === s).length,
      color: severityConfig[s as keyof typeof severityConfig].color,
    }));
    const maxSeverity = Math.max(...bySeverity.map((d) => d.value), 1);

    // By domain
    const domainCounts = new Map<string, number>();
    issues.forEach((i) => {
      domainCounts.set(i.domain, (domainCounts.get(i.domain) || 0) + 1);
    });
    const byDomain = Array.from(domainCounts.entries())
      .map(([domain, count]) => ({
        label: domain,
        value: count,
        color: domainColors[domain] || "#71717a",
      }))
      .sort((a, b) => b.value - a.value);
    const maxDomain = Math.max(...byDomain.map((d) => d.value), 1);

    // By status
    const statusCounts = new Map<string, number>();
    issues.forEach((i) => {
      statusCounts.set(i.status, (statusCounts.get(i.status) || 0) + 1);
    });
    const byStatus = Array.from(statusCounts.entries())
      .map(([status, count]) => ({
        label: statusConfig[status]?.label || status,
        value: count,
        color: statusConfig[status]?.color || "#71717a",
        sublabel: status,
      }))
      .sort((a, b) => b.value - a.value);
    const maxStatus = Math.max(...byStatus.map((d) => d.value), 1);

    // Average neglect by domain
    const domainNeglect = new Map<string, { total: number; count: number }>();
    issues.forEach((i) => {
      const existing = domainNeglect.get(i.domain) || { total: 0, count: 0 };
      existing.total += i.votes.neglect;
      existing.count += 1;
      domainNeglect.set(i.domain, existing);
    });
    const neglectByDomain = Array.from(domainNeglect.entries())
      .map(([domain, { total, count }]) => ({
        label: domain,
        value: Math.round((total / count) * 10) / 10,
        color: domainColors[domain] || "#71717a",
      }))
      .sort((a, b) => b.value - a.value);
    const maxNeglect = Math.max(...neglectByDomain.map((d) => d.value), 1);

    // Most neglected issues
    const mostNeglected = [...issues]
      .sort((a, b) => b.votes.neglect - a.votes.neglect)
      .slice(0, 5);

    return {
      bySeverity,
      maxSeverity,
      byDomain,
      maxDomain,
      byStatus,
      maxStatus,
      neglectByDomain,
      maxNeglect,
      mostNeglected,
      totalIssues: issues.length,
      criticalCount: issues.filter((i) => i.severity === "critical").length,
      highCount: issues.filter((i) => i.severity === "high").length,
      totalAffected: issues.reduce((s, i) => s + i.affectedPopulation, 0),
    };
  }, []);

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
          <BarChart3 className="h-4 w-4 text-[var(--color-severity-medium)]" />
          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
            Issue Severity Dashboard
          </span>
        </div>
        <h1 className="mb-8 text-2xl font-bold tracking-tight">
          Issue Overview
        </h1>

        {/* Summary stats */}
        <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Issues" value={stats.totalIssues} color="var(--color-text)" icon={BarChart3} />
          <StatCard label="Critical" value={stats.criticalCount} color="#ef4444" icon={Flame} />
          <StatCard label="High Severity" value={stats.highCount} color="#f59e0b" icon={AlertTriangle} />
          <StatCard
            label="Total Affected"
            value={stats.totalAffected >= 1_000_000
              ? `${(stats.totalAffected / 1_000_000).toFixed(1)}M`
              : stats.totalAffected >= 1_000
                ? `${(stats.totalAffected / 1_000).toFixed(0)}K`
                : stats.totalAffected}
            color="var(--color-severity-medium)"
            icon={AlertCircle}
          />
        </div>

        {/* Charts grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* By severity */}
          <section className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
            <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Issues by Severity
            </h2>
            <BarChart data={stats.bySeverity} maxValue={stats.maxSeverity} />
          </section>

          {/* By domain */}
          <section className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
            <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Issues by Domain
            </h2>
            <BarChart data={stats.byDomain} maxValue={stats.maxDomain} />
          </section>

          {/* By status */}
          <section className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
            <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Issues by Status
            </h2>
            <BarChart data={stats.byStatus} maxValue={stats.maxStatus} />
          </section>

          {/* Neglect by domain */}
          <section className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
            <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Avg Neglect Score by Domain
            </h2>
            <BarChart data={stats.neglectByDomain} maxValue={stats.maxNeglect} />
          </section>
        </div>

        {/* Most neglected issues */}
        <section className="mt-8 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
            <Flame className="h-3 w-3 text-[var(--color-accent)]" />
            Most Neglected Issues
          </h2>
          <div className="divide-y divide-[var(--color-border)]">
            {stats.mostNeglected.map((issue, i) => (
              <div key={issue.id} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[var(--color-bg)]">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[var(--color-bg)] font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-text)] truncate">
                      {issue.title}
                    </span>
                    <span
                      className="flex-shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium"
                      style={{
                        backgroundColor: severityConfig[issue.severity].bg,
                        color: severityConfig[issue.severity].color,
                      }}
                    >
                      {issue.severity}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[9px] text-[var(--color-text-muted)]">
                    <span>{issue.location}</span>
                    <span className="text-[var(--color-border)]">·</span>
                    <span>{issue.domain}</span>
                    <span className="text-[var(--color-border)]">·</span>
                    <span>Affected: {issue.affectedPopulation.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-bold font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                    {issue.votes.neglect}
                  </div>
                  <div className="text-[9px] text-[var(--color-text-muted)]">neglect</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
