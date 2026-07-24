"use client";

import { issues } from "@/data/issues";
import { globalProtests } from "@/data/global-protests";

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

function daysSince(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function daysActive(start: string, end?: string): number {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  return Math.max(1, Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Get the most recent timeline event for an issue
function lastTimelineEvent(issue: typeof issues[0]): { date: string; event: string; type: string } | null {
  if (!issue.timeline || issue.timeline.length === 0) return null;
  const sorted = [...issue.timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted[0];
}

const countryRegionMap: Record<string, string> = {
  India: "South Asia",
  Bangladesh: "South Asia",
  "Sri Lanka": "South Asia",
  Nepal: "South Asia",
  Pakistan: "South Asia",
  China: "East Asia",
  Japan: "East Asia",
  "South Korea": "East Asia",
  Taiwan: "East Asia",
  Indonesia: "Southeast Asia",
  Philippines: "Southeast Asia",
  Thailand: "Southeast Asia",
  Vietnam: "Southeast Asia",
  Iran: "Middle East",
  Turkey: "Middle East",
  Palestine: "Middle East",
  "Saudi Arabia": "Middle East",
  Ukraine: "Europe",
  Germany: "Europe",
  Norway: "Europe",
  "United Kingdom": "Europe",
  "United States": "Americas",
  Brazil: "Americas",
  Mexico: "Americas",
  Nigeria: "Africa",
  "South Africa": "Africa",
  Ethiopia: "Africa",
  Australia: "Oceania",
};

const regionHeatColor: Record<string, string> = {
  "South Asia": "#ef4444",
  "Middle East": "#ef4444",
  Europe: "#f59e0b",
  Americas: "#3b82f6",
  Africa: "#f59e0b",
  "East Asia": "#71717a",
  "Southeast Asia": "#71717a",
  Oceania: "#71717a",
};

export default function BriefingPage() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Section 1: Critical Issues (sorted by neglect score descending)
  const criticalIssues = issues
    .filter((i) => i.severity === "critical")
    .sort((a, b) => b.votes.neglect - a.votes.neglect);

  // Section 2: Active Protests (ongoing = endDate is null or in the future)
  const activeProtests = globalProtests.filter((p) => {
    if (!p.endDate) return true;
    return new Date(p.endDate) >= today;
  });

  // Section 3: Recent Updates (sorted by lastUpdated desc)
  const recentUpdates = [...issues]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 8);

  // Section 4: Global Snapshot
  const severityCounts: Record<string, number> = {};
  issues.forEach((i) => {
    severityCounts[i.severity] = (severityCounts[i.severity] || 0) + 1;
  });

  const countryCounts: Record<string, number> = {};
  issues.forEach((i) => {
    countryCounts[i.country] = (countryCounts[i.country] || 0) + 1;
  });
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1]);

  const domainCounts: Record<string, number> = {};
  issues.forEach((i) => {
    domainCounts[i.domain] = (domainCounts[i.domain] || 0) + 1;
  });
  const topDomains = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1]);

  // Regional heat: count critical issues per region
  const regionCritical: Record<string, number> = {};
  issues
    .filter((i) => i.severity === "critical")
    .forEach((i) => {
      const region = countryRegionMap[i.country] || "Other";
      regionCritical[region] = (regionCritical[region] || 0) + 1;
    });

  const totalSeverity = Object.values(severityCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        {/* Header */}
        <div className="mb-10 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-[var(--color-severity-critical)] animate-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
              Daily Briefing
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-2">
            Intelligence Summary
          </h1>
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
            {dateStr} — Generated from {issues.length} tracked issues across {topCountries.length} countries
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="mb-10 flex flex-wrap gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
          {[
            { label: "Critical", value: severityCounts["critical"] || 0, color: severityColor.critical },
            { label: "High", value: severityCounts["high"] || 0, color: severityColor.high },
            { label: "Medium", value: severityCounts["medium"] || 0, color: severityColor.medium },
            { label: "Low", value: severityCounts["low"] || 0, color: severityColor.low },
            { label: "Active Protests", value: activeProtests.length, color: "var(--color-accent)" },
            { label: "Total Affected", value: issues.reduce((s, i) => s + i.affectedPopulation, 0).toLocaleString(), color: "var(--color-text-secondary)" },
          ].map((s) => (
            <div key={s.label} className="flex-1 min-w-[120px] bg-[var(--color-bg-raised)] px-4 py-3">
              <div className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                {s.label}
              </div>
              <div className="text-lg font-bold font-[family-name:var(--font-mono)]" style={{ color: s.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Critical Issues */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5 border-b border-[var(--color-border)] pb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-critical)] severity-critical" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Critical Issues
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-severity-critical)] ml-1">
              {criticalIssues.length} active
            </span>
          </div>
          <div className="space-y-3">
            {criticalIssues.map((issue) => {
              const lastEvent = lastTimelineEvent(issue);
              return (
                <a
                  key={issue.id}
                  href={`/civic-ledger/${issue.id}`}
                  className="group block border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5 transition-colors hover:border-[var(--color-severity-critical)]/40 hover:bg-[var(--color-bg-surface)]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-severity-critical)] bg-[var(--color-severity-critical)]/10 px-2 py-0.5 rounded">
                          {issue.id}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                          {issue.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-severity-critical)] transition-colors">
                        {issue.title}
                      </h3>
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        {issue.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 lg:gap-6 shrink-0">
                      <div className="text-center min-w-[60px]">
                        <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)] mb-0.5">
                          Population
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-text-secondary)]">
                          {issue.affectedPopulation >= 1000000
                            ? `${(issue.affectedPopulation / 1000000).toFixed(1)}M`
                            : issue.affectedPopulation >= 1000
                            ? `${(issue.affectedPopulation / 1000).toFixed(0)}K`
                            : issue.affectedPopulation}
                        </div>
                      </div>
                      <div className="text-center min-w-[60px]">
                        <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)] mb-0.5">
                          Neglect
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-severity-critical)]">
                          {issue.votes.neglect}
                        </div>
                      </div>
                      <div className="text-center min-w-[60px]">
                        <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)] mb-0.5">
                          Days Open
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-text-secondary)]">
                          {daysSince(issue.firstReported)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {lastEvent && (
                    <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                        Latest:
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]">
                        {lastEvent.event}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)] ml-auto">
                        {formatDate(lastEvent.date)}
                      </span>
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </section>

        {/* Section 2: Active Protests */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5 border-b border-[var(--color-border)] pb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Active Protests
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)] ml-1">
              {activeProtests.length} ongoing
            </span>
          </div>
          {activeProtests.length === 0 ? (
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-8 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
                No currently active protests tracked
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeProtests.map((protest) => {
                const days = daysActive(protest.startDate, protest.endDate || undefined);
                return (
                  <div
                    key={protest.id}
                    className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded">
                        {protest.region}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        {protest.significance}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-[var(--color-text)] mb-1 leading-snug">
                      {protest.name}
                    </h3>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] mb-3">
                      {protest.location}
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                          Days active
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text-secondary)]">
                          {days}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                          Participants
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)] truncate">
                          {protest.participantEstimate}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: Recent Updates */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5 border-b border-[var(--color-border)] pb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-medium)]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Recent Updates
            </h2>
          </div>
          <div className="border border-[var(--color-border)]">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-px bg-[var(--color-border)]">
              {/* Header */}
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Issue
              </div>
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Latest Event
              </div>
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Updated
              </div>
              {/* Rows */}
              {recentUpdates.map((issue) => {
                const lastEvent = lastTimelineEvent(issue);
                return (
                  <a
                    key={`${issue.id}-${issue.lastUpdated}`}
                    href={`/civic-ledger/${issue.id}`}
                    className="group bg-[var(--color-bg)] px-4 py-3 border-t border-[var(--color-border)] first:border-t-0"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: severityColor[issue.severity] }}
                      />
                      <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors truncate">
                        {issue.title}
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)] mt-0.5 ml-3.5">
                      {issue.country}
                    </div>
                  </a>
                );
              })}
              {recentUpdates.map((issue) => {
                const lastEvent = lastTimelineEvent(issue);
                return (
                  <div
                    key={`${issue.id}-event`}
                    className="bg-[var(--color-bg)] px-4 py-3 border-t border-[var(--color-border)] first:border-t-0 flex items-center"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)] line-clamp-2">
                      {lastEvent?.event || "—"}
                    </span>
                  </div>
                );
              })}
              {recentUpdates.map((issue) => (
                <div
                  key={`${issue.id}-date`}
                  className="bg-[var(--color-bg)] px-4 py-3 border-t border-[var(--color-border)] first:border-t-0 flex items-center"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatDate(issue.lastUpdated)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Global Snapshot */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5 border-b border-[var(--color-border)] pb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-high)]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Global Snapshot
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Severity stacked bar */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                Issues by Severity
              </div>
              <div className="flex h-8 w-full overflow-hidden rounded-sm mb-4">
                {(["critical", "high", "medium", "low"] as const).map((sev) => {
                  const count = severityCounts[sev] || 0;
                  const pct = totalSeverity > 0 ? (count / totalSeverity) * 100 : 0;
                  return (
                    <div
                      key={sev}
                      className="h-full transition-all duration-500 relative group"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: severityColor[sev],
                      }}
                    >
                      {pct > 8 && (
                        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-mono)] text-[10px] font-bold text-white">
                          {count}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                {(["critical", "high", "medium", "low"] as const).map((sev) => (
                  <div key={sev} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: severityColor[sev] }} />
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] capitalize">
                      {sev} ({severityCounts[sev] || 0})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional heat */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                Regional Critical Issue Heat
              </div>
              <div className="space-y-2">
                {Object.entries(regionCritical)
                  .sort((a, b) => b[1] - a[1])
                  .map(([region, count]) => {
                    const maxHeat = Math.max(...Object.values(regionCritical));
                    const intensity = maxHeat > 0 ? count / maxHeat : 0;
                    const baseColor = regionHeatColor[region] || "#71717a";
                    return (
                      <div key={region} className="flex items-center gap-3">
                        <div className="w-28 text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] truncate">
                          {region}
                        </div>
                        <div className="flex-1 h-5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] overflow-hidden">
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${intensity * 100}%`,
                              backgroundColor: baseColor,
                              opacity: 0.3 + intensity * 0.7,
                            }}
                          />
                        </div>
                        <div className="w-6 text-left font-[family-name:var(--font-mono)] text-[10px] font-bold" style={{ color: baseColor }}>
                          {count}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Top countries */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                Countries with Most Issues
              </div>
              <div className="space-y-2">
                {topCountries.map(([country, count]) => {
                  const maxCount = topCountries[0][1];
                  return (
                    <div key={country} className="flex items-center gap-3">
                      <div className="w-28 text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] truncate">
                        {country}
                      </div>
                      <div className="flex-1 h-5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-accent)] transition-all duration-500"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        />
                      </div>
                      <div className="w-6 text-left font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top domains */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                Issues by Domain
              </div>
              <div className="space-y-2">
                {topDomains.map(([domain, count]) => {
                  const maxCount = topDomains[0][1];
                  return (
                    <div key={domain} className="flex items-center gap-3">
                      <div className="w-28 text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] truncate capitalize">
                        {domain.replace(/-/g, " ")}
                      </div>
                      <div className="flex-1 h-5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-severity-medium)] transition-all duration-500"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        />
                      </div>
                      <div className="w-6 text-left font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] pt-4">
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
            Briefing auto-generated from tracked data. Data is illustrative — verify independently.
          </div>
        </div>
      </div>
    </div>
  );
}
