"use client";

import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { issues } from "@/data/issues";
import Link from "next/link";

const trendColor: Record<string, string> = {
  improving: "#22c55e",
  stagnating: "#71717a",
  deteriorating: "#ef4444",
  volatile: "#f59e0b",
  recovering: "#06b6d4",
};

const trajectoryEmoji: Record<string, string> = {
  improving: "↑",
  stagnating: "→",
  deteriorating: "↓",
  volatile: "↕",
  recovering: "↗",
};

const dimensions = [
  "humanOutcomes",
  "economicStructure",
  "governmentCapacity",
  "institutions",
  "freedomParticipation",
  "livedExperience",
  "environment",
] as const;

const dimensionLabels: Record<string, string> = {
  humanOutcomes: "Human Outcomes",
  economicStructure: "Economic",
  governmentCapacity: "Govt Capacity",
  institutions: "Institutions",
  freedomParticipation: "Freedom",
  livedExperience: "Lived Exp",
  environment: "Environment",
};

function DimensionScore({ dim, data }: { dim: string; data: { metric: string; value: string; trend: string; confidence: string }[] }) {
  const improving = data.filter((d) => d.trend === "improving").length;
  const deteriorating = data.filter((d) => d.trend === "deteriorating").length;
  const stagnating = data.filter((d) => d.trend === "stagnating").length;
  const total = data.length;
  const score = total > 0 ? Math.round(((improving * 2 + stagnating) / (total * 2)) * 100) : 50;

  let barColor = "#71717a";
  if (score >= 70) barColor = "#22c55e";
  else if (score >= 50) barColor = "#f59e0b";
  else barColor = "#ef4444";

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">{dimensionLabels[dim]}</span>
      <div className="flex-1 h-5 rounded bg-[var(--color-bg-surface)] overflow-hidden">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${score}%`, backgroundColor: barColor }} />
      </div>
      <span className="w-8 text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]">{score}</span>
      <div className="flex gap-1">
        <span className="text-[9px]" style={{ color: trendColor.improving }}>{improving}↑</span>
        <span className="text-[9px]" style={{ color: trendColor.deteriorating }}>{deteriorating}↓</span>
      </div>
    </div>
  );
}

export default function CountryDashboardPage() {
  const [sortBy, setSortBy] = useState<"trajectory" | "issues" | "name">("trajectory");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countryData = useMemo(() => {
    const issueCounts: Record<string, number> = {};
    issues.forEach((i) => { issueCounts[i.country] = (issueCounts[i.country] || 0) + 1; });

    return countries.map((c) => {
      const allDimensions = dimensions.map((dim) => c[dim]);
      const allTrends = allDimensions.flat();
      const improving = allTrends.filter((d) => d.trend === "improving").length;
      const deteriorating = allTrends.filter((d) => d.trend === "deteriorating").length;
      const stagnating = allTrends.filter((d) => d.trend === "stagnating").length;
      const total = allTrends.length;
      const healthScore = total > 0 ? Math.round(((improving * 2 + stagnating) / (total * 2)) * 100) : 50;

      return {
        ...c,
        issueCount: issueCounts[c.name] || 0,
        healthScore,
        improving,
        deteriorating,
        stagnating,
      };
    }).sort((a, b) => {
      if (sortBy === "issues") return b.issueCount - a.issueCount;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      const trajOrder: Record<string, number> = { improving: 0, recovering: 1, stagnating: 2, volatile: 3, deteriorating: 4 };
      return (trajOrder[a.historicalTrajectory] || 5) - (trajOrder[b.historicalTrajectory] || 5);
    });
  }, [sortBy]);

  const selected = selectedCountry ? countryData.find((c) => c.id === selectedCountry) : null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Country Health Dashboard</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Visual health indicators across {countries.length} countries and {dimensions.length} dimensions
          </p>
        </div>

        {/* Sort controls */}
        <div className="mb-8 flex gap-2">
          {([["trajectory", "By trajectory"], ["issues", "By issues"], ["name", "Alphabetical"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)}
              className={`rounded-md border px-4 py-1.5 text-xs transition-all ${
                sortBy === key
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Country grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {countryData.map((c) => (
              <button key={c.id} onClick={() => setSelectedCountry(selectedCountry === c.id ? null : c.id)}
                className={`rounded-lg border p-5 text-left transition-all ${
                  selectedCountry === c.id
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                    : "border-[var(--color-border)] bg-[var(--color-bg-raised)] hover:border-[var(--color-border-strong)]"
                }`}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-text)]">{c.name}</h3>
                      <span className="text-[10px] text-[var(--color-text-muted)]">{c.population}</span>
                    </div>
                  </div>
                  <span className="text-lg" style={{ color: trendColor[c.historicalTrajectory] }}>
                    {trajectoryEmoji[c.historicalTrajectory]}
                  </span>
                </div>

                {/* Mini health bars */}
                <div className="space-y-1.5">
                  {dimensions.map((dim) => {
                    const data = c[dim];
                    const imp = data.filter((d) => d.trend === "improving").length;
                    const det = data.filter((d) => d.trend === "deteriorating").length;
                    const total = data.length;
                    const score = total > 0 ? Math.round(((imp * 2 + (total - imp - det)) / (total * 2)) * 100) : 50;
                    let color = "#71717a";
                    if (score >= 70) color = "#22c55e";
                    else if (score >= 50) color = "#f59e0b";
                    else color = "#ef4444";
                    return (
                      <div key={dim} className="flex items-center gap-2">
                        <span className="w-16 text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] truncate">{dimensionLabels[dim]}</span>
                        <div className="flex-1 h-1.5 rounded bg-[var(--color-bg-surface)] overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${score}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    {c.issueCount} issues
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium capitalize"
                    style={{ color: trendColor[c.historicalTrajectory] }}>
                    {c.historicalTrajectory}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {selected ? (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{selected.flag}</span>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{selected.name}</h2>
                    <span className="text-xs text-[var(--color-text-muted)]">{selected.governmentType}</span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded border border-[var(--color-border)] p-3">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Health Score</span>
                    <p className="mt-1 text-2xl font-bold font-[family-name:var(--font-mono)]" style={{ color: trendColor[selected.historicalTrajectory] }}>
                      {selected.healthScore}
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border)] p-3">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Issues</span>
                    <p className="mt-1 text-2xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-accent)]">{selected.issueCount}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {dimensions.map((dim) => (
                    <DimensionScore key={dim} dim={dim} data={selected[dim]} />
                  ))}
                </div>

                <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                  <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Last election</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">{selected.lastElection}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-8 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">Select a country to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
