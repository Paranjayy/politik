"use client";

import { countries } from "@/data/countries";
import { issues } from "@/data/issues";
import { protests } from "@/data/protests";
import { globalProtests } from "@/data/global-protests";

const trajectoryColor: Record<string, string> = {
  improving: "#22c55e",
  stagnating: "#71717a",
  deteriorating: "#ef4444",
  volatile: "#f59e0b",
  recovering: "#3b82f6",
};

type Region =
  | "South Asia"
  | "East Asia"
  | "Southeast Asia"
  | "Middle East"
  | "Europe"
  | "Africa"
  | "Americas"
  | "Oceania";

const REGIONS: Region[] = [
  "South Asia",
  "East Asia",
  "Southeast Asia",
  "Middle East",
  "Europe",
  "Africa",
  "Americas",
  "Oceania",
];

// Map countries to regions for full-report countries
const countryToRegion: Record<string, Region> = {
  India: "South Asia",
  Pakistan: "South Asia",
  Bangladesh: "South Asia",
  "Sri Lanka": "South Asia",
  Nepal: "South Asia",
  Japan: "East Asia",
  "South Korea": "East Asia",
  Taiwan: "East Asia",
  China: "East Asia",
  Indonesia: "Southeast Asia",
  Philippines: "Southeast Asia",
  Thailand: "Southeast Asia",
  Vietnam: "Southeast Asia",
  Turkey: "Middle East",
  Iran: "Middle East",
  Palestine: "Middle East",
  "Saudi Arabia": "Middle East",
  Ukraine: "Europe",
  Germany: "Europe",
  Norway: "Europe",
  "United Kingdom": "Europe",
  France: "Europe",
  "United States": "Americas",
  Brazil: "Americas",
  Mexico: "Americas",
  Nigeria: "Africa",
  "South Africa": "Africa",
  Ethiopia: "Africa",
  Australia: "Oceania",
  "New Zealand": "Oceania",
};

// Region-specific flag emojis for the header
const regionEmoji: Record<Region, string> = {
  "South Asia": "🌍",
  "East Asia": "🌏",
  "Southeast Asia": "🌏",
  "Middle East": "🌍",
  Europe: "🌍",
  Africa: "🌍",
  Americas: "🌎",
  Oceania: "🌏",
};

interface CountryEntry {
  id: string;
  name: string;
  flag?: string;
  population?: string;
  trajectory?: string;
  issues: number;
  protests: number;
  hasFullReport: boolean;
}

export default function WorldPage() {
  // Count issues and protests per country
  const issueCounts: Record<string, number> = {};
  issues.forEach((i) => {
    issueCounts[i.country] = (issueCounts[i.country] || 0) + 1;
  });

  const protestCounts: Record<string, number> = {};
  globalProtests.forEach((p) => {
    protestCounts[p.country] = (protestCounts[p.country] || 0) + 1;
  });

  // Build country entries from full-report countries
  const countryEntries: CountryEntry[] = countries.map((c) => ({
    id: c.id,
    name: c.name,
    flag: c.flag,
    population: c.population,
    trajectory: c.historicalTrajectory,
    issues: issueCounts[c.name] || 0,
    protests: protestCounts[c.name] || 0,
    hasFullReport: true,
  }));

  // Add countries from protest wiki that don't have full reports
  const fullReportCountries = new Set(countries.map((c) => c.name));
  const wikiOnlyCountries = new Set<string>();
  globalProtests.forEach((p) => {
    if (!fullReportCountries.has(p.country)) {
      wikiOnlyCountries.add(p.country);
    }
  });

  wikiOnlyCountries.forEach((name) => {
    countryEntries.push({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      issues: issueCounts[name] || 0,
      protests: protestCounts[name] || 0,
      hasFullReport: false,
    });
  });

  // Group by region
  const regionGroups: Record<Region, CountryEntry[]> = {} as Record<Region, CountryEntry[]>;
  REGIONS.forEach((r) => (regionGroups[r] = []));

  countryEntries.forEach((entry) => {
    const region = countryToRegion[entry.name] || "Other";
    if (regionGroups[region as Region]) {
      regionGroups[region as Region].push(entry);
    }
  });

  // Sort within each region by issues desc, then protests desc
  REGIONS.forEach((r) => {
    regionGroups[r].sort((a, b) => b.issues - a.issues || b.protests - a.protests);
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        {/* Header */}
        <div className="mb-10 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-[var(--color-severity-medium)]" />
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
              World View
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-2">
            Global Country Matrix
          </h1>
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
            {countryEntries.length} countries across {REGIONS.length} regions — {countries.length} full reports, {wikiOnlyCountries.size} wiki entries
          </div>
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-5">
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
            Trajectory:
          </span>
          {Object.entries(trajectoryColor).map(([key, color]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] capitalize">
                {key}
              </span>
            </div>
          ))}
          <div className="h-3 w-px bg-[var(--color-border)]" />
          <div className="flex items-center gap-1.5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
              ●
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
              = Full report
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
              ○
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
              = Wiki only
            </span>
          </div>
        </div>

        {/* Regions */}
        {REGIONS.map((region) => {
          const entries = regionGroups[region];
          if (entries.length === 0) return null;

          const totalIssues = entries.reduce((s, e) => s + e.issues, 0);
          const totalProtests = entries.reduce((s, e) => s + e.protests, 0);
          const countriesWithCriticalIssues = entries.filter(
            (e) => e.issues > 0
          ).length;

          return (
            <section key={region} className="mb-10">
              {/* Region header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">{regionEmoji[region]}</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
                    {region}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-text-secondary)] font-bold">{entries.length}</span> countries
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-accent)] font-bold">{totalIssues}</span> issues
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-severity-medium)] font-bold">{totalProtests}</span> protests
                  </div>
                </div>
              </div>

              {/* Country grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`border border-[var(--color-border)] p-4 transition-colors ${
                      entry.hasFullReport
                        ? "bg-[var(--color-bg-raised)] hover:border-[var(--color-border-strong)]"
                        : "bg-[var(--color-bg-raised)]/50 border-dashed opacity-70"
                    }`}
                  >
                    {/* Country name + flag */}
                    <div className="flex items-center gap-2 mb-2">
                      {entry.hasFullReport && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-secondary)] shrink-0" />
                      )}
                      {!entry.hasFullReport && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full border border-[var(--color-text-muted)] shrink-0" />
                      )}
                      {entry.flag && <span className="text-base">{entry.flag}</span>}
                      <span className="text-xs font-semibold text-[var(--color-text)] truncate">
                        {entry.name}
                      </span>
                      {entry.trajectory && (
                        <span
                          className="ml-auto h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: trajectoryColor[entry.trajectory] || "#71717a" }}
                          title={entry.trajectory}
                        />
                      )}
                    </div>

                    {/* Population + trajectory */}
                    {entry.hasFullReport && (
                      <div className="flex items-center gap-3 mb-2">
                        {entry.population && (
                          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                            {entry.population}
                          </span>
                        )}
                        {entry.trajectory && (
                          <span
                            className="font-[family-name:var(--font-mono)] text-[10px] capitalize"
                            style={{ color: trajectoryColor[entry.trajectory] || "#71717a" }}
                          >
                            {entry.trajectory}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                          Issues:
                        </span>
                        <span
                          className="font-[family-name:var(--font-mono)] text-[10px] font-bold"
                          style={{
                            color: entry.issues > 0 ? "var(--color-accent)" : "var(--color-text-muted)",
                          }}
                        >
                          {entry.issues}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                          Protests:
                        </span>
                        <span
                          className="font-[family-name:var(--font-mono)] text-[10px] font-bold"
                          style={{
                            color: entry.protests > 0 ? "var(--color-severity-medium)" : "var(--color-text-muted)",
                          }}
                        >
                          {entry.protests}
                        </span>
                      </div>
                      {!entry.hasFullReport && (
                        <span className="font-[family-name:var(--font-mono)] text-[8px] text-[var(--color-text-muted)] bg-[var(--color-bg-surface)] px-1.5 py-0.5 rounded ml-auto">
                          wiki only
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] pt-4 mt-8">
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
            Countries sorted by issue count within each region. Data is illustrative — verify independently.
          </div>
        </div>
      </div>
    </div>
  );
}
