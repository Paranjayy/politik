"use client";

import { issues } from "@/data/issues";
import { protests } from "@/data/protests";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";

const severityWeight: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const severityColor: Record<string, string> = {
  critical: "var(--color-severity-critical)",
  high: "var(--color-severity-high)",
  medium: "var(--color-severity-medium)",
  low: "var(--color-severity-low)",
};

const trajectoryColor: Record<string, string> = {
  improving: "#22c55e",
  stagnating: "#71717a",
  deteriorating: "#ef4444",
  volatile: "#f59e0b",
  recovering: "#3b82f6",
};

function getOutcomeRating(outcome: string): "successful" | "partial" | "failed" {
  const lower = outcome.toLowerCase();
  if (
    lower.includes("repeal") ||
    lower.includes("resigned") ||
    lower.includes("fled") ||
    lower.includes("reformed") ||
    lower.includes("laws repealed")
  ) {
    return "successful";
  }
  if (
    lower.includes("partial") ||
    lower.includes("not implemented") ||
    lower.includes("unresolved") ||
    lower.includes("continued") ||
    lower.includes("delayed")
  ) {
    return "partial";
  }
  return "failed";
}

function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Same day";
  if (diffDays < 30) return `${diffDays} days`;
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;
  if (months < 12) return `${months}mo ${remainingDays}d`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years}y ${remainingMonths}mo`;
}

function BarChart({ data, maxVal }: { data: { label: string; count: number }[]; maxVal: number }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-4">
          <div className="w-32 text-right font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)] truncate">
            {item.label}
          </div>
          <div className="flex-1 h-7 rounded-md bg-[var(--color-bg-surface)] overflow-hidden">
            <div
              className="h-full rounded-md bg-[var(--color-accent)] transition-all duration-500"
              style={{ width: `${(item.count / maxVal) * 100}%` }}
            />
          </div>
          <div className="w-8 text-left font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-text-secondary)]">
            {item.count}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsPage() {
  // Section 1: Global Overview
  const totalIssues = issues.length;
  const totalAffected = issues.reduce((sum, i) => sum + i.affectedPopulation, 0);
  const totalProtests = protests.length;
  const countriesMapped = countries.length;
  const partiesProfiled = parties.length;
  const avgNeglect =
    issues.reduce((sum, i) => sum + i.votes.neglect, 0) / issues.length;

  // Section 2: Issues by Severity
  const severityCounts: Record<string, number> = {};
  issues.forEach((i) => {
    severityCounts[i.severity] = (severityCounts[i.severity] || 0) + 1;
  });
  const severityData = Object.entries(severityCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => severityWeight[b.label] - severityWeight[a.label]);
  const maxSeverity = Math.max(...severityData.map((d) => d.count));

  // Section 3: Issues by Domain
  const domainCounts: Record<string, number> = {};
  issues.forEach((i) => {
    domainCounts[i.domain] = (domainCounts[i.domain] || 0) + 1;
  });
  const domainData = Object.entries(domainCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
  const maxDomain = Math.max(...domainData.map((d) => d.count));

  // Section 4: Protest Impact Analysis
  const protestAnalysis = protests.map((p) => ({
    name: p.name,
    country: p.country,
    duration: calculateDuration(p.startDate, p.endDate),
    outcomeRating: getOutcomeRating(p.outcome),
  }));

  // Section 5: Country Comparison Matrix
  const dimensionNames = [
    "humanOutcomes",
    "economicStructure",
    "governmentCapacity",
    "institutions",
    "freedomParticipation",
    "livedExperience",
    "environment",
  ] as const;

  // Section 6: Most Pressing Issues
  const topIssues = [...issues]
    .sort((a, b) => {
      const scoreA = severityWeight[a.severity] * a.votes.neglect;
      const scoreB = severityWeight[b.severity] * b.votes.neglect;
      return scoreB - scoreA;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16 space-y-12">
        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] lg:text-4xl">
            Statistics Overview
          </h1>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
            Aggregated data across all tracked issues, protests, countries, and
            parties
          </p>
        </div>

        {/* Section 1: Global Overview */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Global Overview
          </h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Total Issues", value: totalIssues },
              { label: "Affected Population", value: totalAffected.toLocaleString() },
              { label: "Protests Documented", value: totalProtests },
              { label: "Countries Mapped", value: countriesMapped },
              { label: "Parties Profiled", value: partiesProfiled },
              { label: "Avg Neglect Score", value: avgNeglect.toFixed(1) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4"
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
                <div className="text-xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Issues by Severity */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Issues by Severity
          </h2>
          <div className="space-y-3">
            {severityData.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-20 text-right font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
                  {item.label}
                </div>
                <div className="flex-1 h-7 rounded-md bg-[var(--color-bg-surface)] overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${(item.count / maxSeverity) * 100}%`,
                      backgroundColor: severityColor[item.label] || "var(--color-accent)",
                    }}
                  />
                </div>
                <div className="w-8 text-left font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-text-secondary)]">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Issues by Domain */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Issues by Domain
          </h2>
          <BarChart data={domainData} maxVal={maxDomain} />
        </section>

        {/* Section 4: Protest Impact Analysis */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Protest Impact Analysis
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Name
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Country
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Duration
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody>
                {protestAnalysis.map((p) => (
                  <tr
                    key={p.name}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface)]"
                  >
                    <td className="px-4 py-2 text-sm text-[var(--color-text)]">
                      {p.name}
                    </td>
                    <td className="px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                      {p.country}
                    </td>
                    <td className="px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                      {p.duration}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="inline-block px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-medium"
                        style={{
                          backgroundColor:
                            p.outcomeRating === "successful"
                              ? "rgba(34, 197, 94, 0.15)"
                              : p.outcomeRating === "partial"
                              ? "rgba(245, 158, 11, 0.15)"
                              : "rgba(239, 68, 68, 0.15)",
                          color:
                            p.outcomeRating === "successful"
                              ? "#22c55e"
                              : p.outcomeRating === "partial"
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      >
                        {p.outcomeRating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Country Comparison Matrix */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Country Comparison Matrix
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Country
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Human Outcomes
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Economic
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Govt Capacity
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Institutions
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Freedom
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Lived Exp
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Environment
                  </th>
                  <th className="px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Trajectory
                  </th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface)]"
                  >
                    <td className="px-4 py-2 text-sm text-[var(--color-text)] whitespace-nowrap">
                      <span className="mr-1">{c.flag}</span>
                      {c.name}
                    </td>
                    {dimensionNames.map((dim) => {
                      const dimData = c[dim];
                      const trends = dimData.map((d) => d.trend);
                      const improving = trends.filter((t) => t === "improving").length;
                      const deteriorating = trends.filter((t) => t === "deteriorating").length;
                      let bgColor = "rgba(113, 113, 122, 0.1)";
                      let textColor = "#71717a";
                      if (improving > deteriorating) {
                        bgColor = "rgba(34, 197, 94, 0.1)";
                        textColor = "#22c55e";
                      } else if (deteriorating > improving) {
                        bgColor = "rgba(239, 68, 68, 0.1)";
                        textColor = "#ef4444";
                      }
                      return (
                        <td key={dim} className="px-4 py-2">
                          <span
                            className="inline-block px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px]"
                            style={{ backgroundColor: bgColor, color: textColor }}
                          >
                            {improving}/{deteriorating}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-4 py-2">
                      <span
                        className="inline-block px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-medium capitalize"
                        style={{
                          backgroundColor: `${trajectoryColor[c.historicalTrajectory]}15`,
                          color: trajectoryColor[c.historicalTrajectory],
                        }}
                      >
                        {c.historicalTrajectory}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Most Pressing Issues */}
        <section>
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Most Pressing Issues
          </h2>
          <div className="space-y-3">
            {topIssues.map((issue) => (
              <div
                key={issue.id}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--color-text)]">
                      {issue.title}
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {issue.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        Severity
                      </div>
                      <div
                        className="font-[family-name:var(--font-mono)] text-xs font-medium capitalize"
                        style={{ color: severityColor[issue.severity] }}
                      >
                        {issue.severity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        Neglect
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-text-secondary)]">
                        {issue.votes.neglect}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        Affected
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-text-secondary)]">
                        {issue.affectedPopulation.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        Score
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-accent)]">
                        {severityWeight[issue.severity] * issue.votes.neglect}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
