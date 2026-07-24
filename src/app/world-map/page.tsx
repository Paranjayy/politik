"use client";

import { useMemo, useState } from "react";
import { issues } from "@/data/issues";
import { protests } from "@/data/protests";
import { countries } from "@/data/countries";
import { globalProtests } from "@/data/global-protests";
import Link from "next/link";

const countryCoords: Record<string, { x: number; y: number; region: string }> = {
  India: { x: 72, y: 38, region: "South Asia" },
  Bangladesh: { x: 76, y: 40, region: "South Asia" },
  "Sri Lanka": { x: 73, y: 48, region: "South Asia" },
  Nepal: { x: 72, y: 35, region: "South Asia" },
  Pakistan: { x: 68, y: 36, region: "South Asia" },
  China: { x: 78, y: 30, region: "East Asia" },
  Japan: { x: 87, y: 30, region: "East Asia" },
  "South Korea": { x: 84, y: 30, region: "East Asia" },
  Taiwan: { x: 84, y: 38, region: "East Asia" },
  Indonesia: { x: 80, y: 52, region: "Southeast Asia" },
  Philippines: { x: 83, y: 42, region: "Southeast Asia" },
  Thailand: { x: 77, y: 42, region: "Southeast Asia" },
  Vietnam: { x: 80, y: 40, region: "Southeast Asia" },
  Iran: { x: 62, y: 34, region: "Middle East" },
  Turkey: { x: 56, y: 30, region: "Middle East" },
  Palestine: { x: 57, y: 34, region: "Middle East" },
  "Saudi Arabia": { x: 60, y: 38, region: "Middle East" },
  Ukraine: { x: 52, y: 24, region: "Europe" },
  Germany: { x: 48, y: 22, region: "Europe" },
  Norway: { x: 47, y: 14, region: "Europe" },
  "United Kingdom": { x: 44, y: 20, region: "Europe" },
  France: { x: 45, y: 24, region: "Europe" },
  "United States": { x: 20, y: 28, region: "Americas" },
  Brazil: { x: 28, y: 54, region: "Americas" },
  Mexico: { x: 16, y: 36, region: "Americas" },
  Nigeria: { x: 46, y: 44, region: "Africa" },
  "South Africa": { x: 50, y: 62, region: "Africa" },
  Ethiopia: { x: 56, y: 42, region: "Africa" },
  Australia: { x: 86, y: 60, region: "Oceania" },
};

const regionColors: Record<string, string> = {
  "South Asia": "#ef4444",
  "East Asia": "#3b82f6",
  "Southeast Asia": "#a855f7",
  "Middle East": "#f59e0b",
  Europe: "#22c55e",
  Americas: "#06b6d4",
  Africa: "#f97316",
  Oceania: "#71717a",
};

export default function WorldMapPage() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countryStats = useMemo(() => {
    const stats: Record<string, { issues: number; protests: number; region: string; flag?: string; trajectory?: string }> = {};

    issues.forEach((i) => {
      if (!stats[i.country]) stats[i.country] = { issues: 0, protests: 0, region: "Other" };
      stats[i.country].issues++;
    });

    protests.forEach((p) => {
      if (!stats[p.country]) stats[p.country] = { issues: 0, protests: 0, region: "Other" };
      stats[p.country].protests++;
    });

    globalProtests.forEach((p) => {
      if (!stats[p.country]) stats[p.country] = { issues: 0, protests: 0, region: "Other" };
      stats[p.country].protests++;
    });

    countries.forEach((c) => {
      if (stats[c.name]) {
        stats[c.name].flag = c.flag;
        stats[c.name].trajectory = c.historicalTrajectory;
        stats[c.name].region = Object.values(countryCoords).find((_, i) => Object.keys(countryCoords)[i] === c.name)?.region || "Other";
      }
    });

    return stats;
  }, []);

  const maxActivity = useMemo(() => {
    return Math.max(1, ...Object.values(countryStats).map((s) => s.issues + s.protests));
  }, [countryStats]);

  const allCountries = useMemo(() => Object.keys(countryCoords).sort(), []);

  const selected = selectedCountry ? countryStats[selectedCountry] : null;
  const selectedIssues = selectedCountry ? issues.filter((i) => i.country === selectedCountry) : [];
  const selectedProtests = [...protests.filter((p) => p.country === selectedCountry), ...globalProtests.filter((p) => p.country === selectedCountry)];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">World Map</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Geographic distribution of {issues.length} issues and {protests.length + globalProtests.length} protests across {allCountries.length} countries
          </p>
        </div>

        {/* Region legend */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(regionColors).map(([region, color]) => (
            <div key={region} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">{region}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Map */}
          <div className="relative rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 overflow-hidden">
            <svg viewBox="0 0 100 75" className="w-full h-auto">
              {/* Grid lines */}
              {[0, 15, 30, 45, 60, 75].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="var(--color-border)" strokeWidth="0.1" opacity="0.3" />
              ))}
              {[0, 20, 40, 60, 80, 100].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="75" stroke="var(--color-border)" strokeWidth="0.1" opacity="0.3" />
              ))}

              {/* Country dots */}
              {allCountries.map((country) => {
                const coords = countryCoords[country];
                const stats = countryStats[country];
                if (!coords || !stats) return null;

                const total = stats.issues + stats.protests;
                const size = Math.max(0.8, (total / maxActivity) * 3);
                const color = regionColors[coords.region] || "#71717a";
                const isHovered = hoveredCountry === country;
                const isSelected = selectedCountry === country;

                return (
                  <g key={country}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                    className="cursor-pointer">
                    {/* Glow */}
                    {(isHovered || isSelected) && (
                      <circle cx={coords.x} cy={coords.y} r={size + 1.5} fill={color} opacity="0.15" />
                    )}
                    {/* Dot */}
                    <circle cx={coords.x} cy={coords.y} r={size} fill={color} opacity={isHovered || isSelected ? 1 : 0.7} stroke={isSelected ? "#fff" : "none"} strokeWidth="0.3" />
                    {/* Label */}
                    {(isHovered || isSelected) && (
                      <text x={coords.x} y={coords.y - size - 1} textAnchor="middle" fill="var(--color-text)" fontSize="1.8" fontFamily="var(--font-mono)">
                        {stats.flag || ""} {country}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Country list */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Countries with activity
              </h3>
              <div className="space-y-1 max-h-[300px] overflow-y-auto">
                {allCountries.filter((c) => countryStats[c]).sort((a, b) => {
                  const aTotal = (countryStats[a]?.issues || 0) + (countryStats[a]?.protests || 0);
                  const bTotal = (countryStats[b]?.issues || 0) + (countryStats[b]?.protests || 0);
                  return bTotal - aTotal;
                }).map((country) => {
                  const stats = countryStats[country];
                  const total = stats.issues + stats.protests;
                  const coords = countryCoords[country];
                  return (
                    <button key={country}
                      onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors ${
                        selectedCountry === country
                          ? "bg-[var(--color-bg-surface)] text-[var(--color-text)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      }`}>
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: regionColors[coords?.region || "Other"] }} />
                      <span className="flex-1 truncate">{stats.flag} {country}</span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px]">{total}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
                <h3 className="mb-3 text-sm font-semibold text-[var(--color-text)]">
                  {selected.flag} {selectedCountry}
                </h3>
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded border border-[var(--color-border)] p-2">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Issues</span>
                    <p className="text-lg font-bold font-[family-name:var(--font-mono)] text-[var(--color-accent)]">{selected.issues}</p>
                  </div>
                  <div className="rounded border border-[var(--color-border)] p-2">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Protests</span>
                    <p className="text-lg font-bold font-[family-name:var(--font-mono)] text-[var(--color-severity-medium)]">{selectedProtests.length}</p>
                  </div>
                </div>

                {selectedIssues.length > 0 && (
                  <div className="mb-3">
                    <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Issues</h4>
                    <div className="space-y-1.5">
                      {selectedIssues.slice(0, 5).map((issue) => (
                        <Link key={issue.id} href={`/civic-ledger/debate/${issue.id}`}
                          className="block rounded border border-[var(--color-border)] p-2 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
                          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{issue.id}</span> {issue.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProtests.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Protests</h4>
                    <div className="space-y-1.5">
                      {selectedProtests.slice(0, 5).map((p) => (
                        <div key={p.id} className="rounded border border-[var(--color-border)] p-2 text-xs text-[var(--color-text-secondary)]">
                          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{p.startDate}</span> {p.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!selected && (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">Click a dot or country name to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
