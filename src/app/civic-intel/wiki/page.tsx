"use client";

import { useState, useMemo } from "react";
import {
  globalProtests,
  getDecades,
  getDecadeForDate,
  type GlobalProtest,
  type ProtestRegion,
  type ProtestCategory,
  type ProtestSignificance,
} from "@/data/global-protests";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Users,
  Skull,
  Trophy,
  Eye,
  X,
  BarChart3,
  LayoutList,
} from "lucide-react";
import Link from "next/link";

// ── SIGNIFICANCE / CATEGORY COLORS ──────────────────────────────────────────
const significanceStyles: Record<
  ProtestSignificance,
  { bg: string; text: string; border: string }
> = {
  landmark: {
    bg: "rgba(239,68,68,0.08)",
    text: "#ef4444",
    border: "rgba(239,68,68,0.25)",
  },
  major: {
    bg: "rgba(168,85,247,0.08)",
    text: "#a855f7",
    border: "rgba(168,85,247,0.25)",
  },
  notable: {
    bg: "rgba(34,197,94,0.08)",
    text: "#22c55e",
    border: "rgba(34,197,94,0.25)",
  },
  regional: {
    bg: "rgba(113,113,122,0.08)",
    text: "#71717a",
    border: "rgba(113,113,122,0.25)",
  },
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  "pro-democracy": { bg: "rgba(59,130,246,0.08)", text: "#3b82f6" },
  economic: { bg: "rgba(234,179,8,0.08)", text: "#eab308" },
  environmental: { bg: "rgba(16,185,129,0.08)", text: "#10b981" },
  social: { bg: "rgba(236,72,153,0.08)", text: "#ec4899" },
  "anti-corruption": { bg: "rgba(249,115,22,0.08)", text: "#f97316" },
  labor: { bg: "rgba(139,92,246,0.08)", text: "#8b5cf6" },
  "ethnic-rights": { bg: "rgba(20,184,166,0.08)", text: "#14b8a6" },
  "anti-war": { bg: "rgba(6,182,212,0.08)", text: "#06b6d4" },
  religious: { bg: "rgba(161,98,7,0.08)", text: "#a16207" },
};

const regionColors: Record<string, string> = {
  "South Asia": "#ef4444",
  "East Asia": "#3b82f6",
  "Southeast Asia": "#a855f7",
  "Middle East": "#eab308",
  Europe: "#22c55e",
  Americas: "#06b6d4",
  Africa: "#f97316",
};

// ── FILTER BAR ──────────────────────────────────────────────────────────────
function FilterBar({
  filterRegion,
  setFilterRegion,
  filterCategory,
  setFilterCategory,
  filterSignificance,
  setFilterSignificance,
  filterDecade,
  setFilterDecade,
  search,
  setSearch,
}: {
  filterRegion: string;
  setFilterRegion: (v: string) => void;
  filterCategory: string;
  setFilterCategory: (v: string) => void;
  filterSignificance: string;
  setFilterSignificance: (v: string) => void;
  filterDecade: string;
  setFilterDecade: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  const decades = getDecades();
  const regions: ProtestRegion[] = [
    "South Asia",
    "East Asia",
    "Southeast Asia",
    "Middle East",
    "Europe",
    "Americas",
    "Africa",
  ];
  const categories: ProtestCategory[] = [
    "pro-democracy",
    "economic",
    "environmental",
    "social",
    "anti-corruption",
    "labor",
    "ethnic-rights",
    "anti-war",
    "religious",
  ];
  const sigs: ProtestSignificance[] = ["landmark", "major", "notable", "regional"];

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search protests by name, country, demand..."
          className="w-full rounded border border-[var(--color-border)] bg-[var(--color-bg)] py-2 pl-9 pr-3 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter rows */}
      <div className="flex flex-wrap gap-2">
        <FilterSelect
          label="Region"
          value={filterRegion}
          onChange={setFilterRegion}
          options={[
            { value: "all", label: "All Regions" },
            ...regions.map((r) => ({ value: r, label: r })),
          ]}
        />
        <FilterSelect
          label="Category"
          value={filterCategory}
          onChange={setFilterCategory}
          options={[
            { value: "all", label: "All Categories" },
            ...categories.map((c) => ({
              value: c,
              label: c
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            })),
          ]}
        />
        <FilterSelect
          label="Significance"
          value={filterSignificance}
          onChange={setFilterSignificance}
          options={[
            { value: "all", label: "All Levels" },
            ...sigs.map((s) => ({
              value: s,
              label: s.charAt(0).toUpperCase() + s.slice(1),
            })),
          ]}
        />
        <FilterSelect
          label="Decade"
          value={filterDecade}
          onChange={setFilterDecade}
          options={[
            { value: "all", label: "All Decades" },
            ...decades.map((d) => ({ value: d, label: d })),
          ]}
        />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded border border-[var(--color-border)] bg-[var(--color-bg)] py-1.5 pl-2.5 pr-7 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--color-text-muted)]" />
    </div>
  );
}

// ── EXPANDABLE ROW ──────────────────────────────────────────────────────────
function ProtestRow({
  protest,
  index,
}: {
  protest: GlobalProtest;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const sigStyle = significanceStyles[protest.significance];
  const catStyle =
    categoryStyles[protest.category] ||
    categoryStyles["pro-democracy"];

  return (
    <>
      <tr
        className={`cursor-pointer border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-raised)] ${
          expanded ? "bg-[var(--color-bg-raised)]" : ""
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-3 py-2.5 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
          {index}
        </td>
        <td className="px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text)] leading-tight">
              {protest.name}
            </span>
            {expanded ? (
              <ChevronUp className="h-3 w-3 shrink-0 text-[var(--color-text-muted)]" />
            ) : (
              <ChevronDown className="h-3 w-3 shrink-0 text-[var(--color-text-muted)]" />
            )}
          </div>
        </td>
        <td className="px-3 py-2.5">
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)]">
            {protest.country}
          </span>
        </td>
        <td className="px-3 py-2.5">
          <span
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)]"
            style={{
              background: (regionColors[protest.region] || "#71717a") + "14",
              color: regionColors[protest.region] || "#71717a",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: regionColors[protest.region] || "#71717a" }}
            />
            {protest.region}
          </span>
        </td>
        <td className="px-3 py-2.5">
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)]">
            {protest.startDate.slice(0, 4)}
          </span>
        </td>
        <td className="px-3 py-2.5 text-right">
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)]">
            {protest.participantEstimate.split(";")[0].split("–")[0].trim()}
          </span>
        </td>
        <td className="px-3 py-2.5 text-right">
          <span
            className={`text-[10px] font-[family-name:var(--font-mono)] ${
              (protest.deaths ?? 0) > 0 ? "text-red-500" : "text-[var(--color-text-muted)]"
            }`}
          >
            {protest.deaths != null ? protest.deaths.toLocaleString() : "—"}
          </span>
        </td>
        <td className="px-3 py-2.5">
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wide"
            style={{
              background: sigStyle.bg,
              color: sigStyle.text,
              border: `1px solid ${sigStyle.border}`,
            }}
          >
            {protest.significance}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td
            colSpan={8}
            className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)] px-6 py-5"
          >
            <ExpandedDetail protest={protest} />
          </td>
        </tr>
      )}
    </>
  );
}

function ExpandedDetail({ protest }: { protest: GlobalProtest }) {
  const sigStyle = significanceStyles[protest.significance];
  const catStyle =
    categoryStyles[protest.category] ||
    categoryStyles["pro-democracy"];

  return (
    <div className="space-y-5">
      {/* Top metadata row */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="rounded px-2 py-0.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider"
          style={{ background: catStyle.bg, color: catStyle.text }}
        >
          {protest.category.replace(/-/g, " ")}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
          <Calendar className="h-3 w-3" />
          {protest.startDate} — {protest.endDate || "Ongoing"}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
          <Globe className="h-3 w-3" />
          {protest.location}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
          <Users className="h-3 w-3" />
          {protest.participantEstimate}
        </span>
        {protest.deaths != null && (
          <span className="flex items-center gap-1 text-[10px] text-red-500">
            <Skull className="h-3 w-3" />
            {protest.deaths.toLocaleString()} deaths
          </span>
        )}
      </div>

      {/* Grid layout */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Demands */}
        <div className="lg:col-span-1">
          <h4 className="mb-2 flex items-center gap-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            <Eye className="h-3 w-3" />
            Demands
          </h4>
          <ul className="space-y-1">
            {protest.demands.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] leading-snug text-[var(--color-text-secondary)]"
              >
                <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* State Response */}
        <div className="lg:col-span-1">
          <h4 className="mb-2 flex items-center gap-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            <Skull className="h-3 w-3" />
            State Response
          </h4>
          <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
            {protest.stateResponse}
          </p>

          <h4 className="mb-2 mt-4 flex items-center gap-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            <Trophy className="h-3 w-3" />
            Outcome
          </h4>
          <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
            {protest.outcome}
          </p>
        </div>

        {/* Key Figures */}
        <div className="lg:col-span-1">
          <h4 className="mb-2 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Key Figures
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {protest.keyFigures.map((f, i) => (
              <span
                key={i}
                className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)]"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Significance badge */}
          <div className="mt-4">
            <h4 className="mb-2 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Significance
            </h4>
            <span
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider"
              style={{
                background: sigStyle.bg,
                color: sigStyle.text,
                border: `1px solid ${sigStyle.border}`,
              }}
            >
              <Trophy className="h-3 w-3" />
              {protest.significance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TIMELINE VIEW ───────────────────────────────────────────────────────────
function TimelineView({ protests }: { protests: GlobalProtest[] }) {
  const byDecade = useMemo(() => {
    const map = new Map<string, GlobalProtest[]>();
    protests.forEach((p) => {
      const decade = getDecadeForDate(p.startDate);
      if (!map.has(decade)) map.set(decade, []);
      map.get(decade)!.push(p);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [protests]);

  const totalWidth = byDecade.length;
  const barHeight = 24;

  return (
    <div className="space-y-6 overflow-x-auto">
      {byDecade.map(([decade, items]) => (
        <div key={decade}>
          <h4 className="mb-2 font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-text)]">
            {decade}
          </h4>
          <div className="flex flex-wrap gap-2">
            {items.map((p) => {
              const sigStyle = significanceStyles[p.significance];
              const catStyle = categoryStyles[p.category] || categoryStyles["pro-democracy"];
              const regionColor = regionColors[p.region] || "#71717a";

              return (
                <div
                  key={p.id}
                  className="group relative rounded border px-2.5 py-1.5 transition-colors hover:border-[var(--color-border-strong)]"
                  style={{
                    background: sigStyle.bg,
                    borderColor: sigStyle.border,
                    minWidth: 120,
                    maxWidth: 200,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: regionColor }}
                    />
                    <span className="truncate text-[10px] font-semibold text-[var(--color-text)]">
                      {p.name}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
                    <span>{p.country}</span>
                    <span>{p.startDate.slice(0, 4)}</span>
                    {p.deaths != null && p.deaths > 0 && (
                      <span className="text-red-500">
                        {p.deaths.toLocaleString()} dead
                      </span>
                    )}
                  </div>
                  {/* Hover tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-1 hidden w-64 rounded border border-[var(--color-border)] bg-[var(--color-bg)] p-3 shadow-lg group-hover:block">
                    <p className="text-[11px] font-semibold text-[var(--color-text)]">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                      {p.country} • {p.startDate} — {p.endDate || "Ongoing"}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      {p.demands[0]}
                    </p>
                    {p.deaths != null && p.deaths > 0 && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {p.deaths.toLocaleString()} deaths
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── STATS SIDEBAR ───────────────────────────────────────────────────────────
function StatsSidebar({ protests }: { protests: GlobalProtest[] }) {
  const byRegion = useMemo(() => {
    const map: Record<string, number> = {};
    protests.forEach((p) => {
      map[p.region] = (map[p.region] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [protests]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    protests.forEach((p) => {
      const label = p.category.replace(/-/g, " ");
      map[label] = (map[label] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [protests]);

  const totalDeaths = useMemo(
    () => protests.reduce((sum, p) => sum + (p.deaths ?? 0), 0),
    [protests]
  );

  const bySignificance = useMemo(() => {
    const map: Record<string, number> = {};
    protests.forEach((p) => {
      map[p.significance] = (map[p.significance] || 0) + 1;
    });
    return Object.entries(map).sort(
      (a, b) =>
        ["landmark", "major", "notable", "regional"].indexOf(a[0]) -
        ["landmark", "major", "notable", "regional"].indexOf(b[0])
    );
  }, [protests]);

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
        <h4 className="mb-3 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          Overview
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {protests.length}
            </div>
            <div className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
              Protests
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">
              {totalDeaths.toLocaleString()}
            </div>
            <div className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
              Total Deaths
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {new Set(protests.map((p) => p.country)).size}
            </div>
            <div className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
              Countries
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {new Set(protests.map((p) => p.region)).size}
            </div>
            <div className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
              Regions
            </div>
          </div>
        </div>
      </div>

      {/* By Region */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
        <h4 className="mb-3 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          By Region
        </h4>
        <div className="space-y-2">
          {byRegion.map(([region, count]) => (
            <div key={region} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ background: regionColors[region] || "#71717a" }}
              />
              <span className="flex-1 text-[10px] text-[var(--color-text-secondary)]">
                {region}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {count}
              </span>
              <div className="h-1.5 w-16 rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(count / protests.length) * 100}%`,
                    background: regionColors[region] || "#71717a",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* By Significance */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
        <h4 className="mb-3 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          By Significance
        </h4>
        <div className="space-y-2">
          {bySignificance.map(([level, count]) => (
            <div key={level} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{
                  background: significanceStyles[level as ProtestSignificance]
                    .text,
                }}
              />
              <span className="flex-1 text-[10px] capitalize text-[var(--color-text-secondary)]">
                {level}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {count}
              </span>
              <div className="h-1.5 w-16 rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(count / protests.length) * 100}%`,
                    background:
                      significanceStyles[level as ProtestSignificance].text,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* By Category */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
        <h4 className="mb-3 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          By Category
        </h4>
        <div className="space-y-2">
          {byCategory.map(([cat, count]) => {
            const style =
              categoryStyles[cat.replace(/\s/g, "-")] ||
              categoryStyles["pro-democracy"];
            return (
              <div key={cat} className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ background: style.text }}
                />
                <span className="flex-1 text-[10px] capitalize text-[var(--color-text-secondary)]">
                  {cat}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  {count}
                </span>
                <div className="h-1.5 w-16 rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(count / protests.length) * 100}%`,
                      background: style.text,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deadliest */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
        <h4 className="mb-3 flex items-center gap-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
          <Skull className="h-3 w-3 text-red-500" />
          Deadliest
        </h4>
        <div className="space-y-2">
          {[...protests]
            .filter((p) => p.deaths != null && p.deaths > 0)
            .sort((a, b) => (b.deaths ?? 0) - (a.deaths ?? 0))
            .slice(0, 5)
            .map((p) => (
              <div key={p.id} className="flex items-start gap-2">
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] font-bold text-red-500">
                  {(p.deaths ?? 0).toLocaleString()}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[10px] font-semibold text-[var(--color-text)]">
                    {p.name}
                  </div>
                  <div className="text-[9px] text-[var(--color-text-muted)]">
                    {p.country}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
type SortField =
  | "date"
  | "country"
  | "region"
  | "participants"
  | "deaths"
  | "significance";

export default function GlobalProtestWikiPage() {
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSignificance, setFilterSignificance] = useState("all");
  const [filterDecade, setFilterDecade] = useState("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [view, setView] = useState<"table" | "timeline">("table");

  const filtered = useMemo(() => {
    let result = [...globalProtests];

    if (filterRegion !== "all")
      result = result.filter((p) => p.region === filterRegion);
    if (filterCategory !== "all")
      result = result.filter((p) => p.category === filterCategory);
    if (filterSignificance !== "all")
      result = result.filter((p) => p.significance === filterSignificance);
    if (filterDecade !== "all")
      result = result.filter(
        (p) => getDecadeForDate(p.startDate) === filterDecade
      );
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.demands.some((d) => d.toLowerCase().includes(q)) ||
          p.keyFigures.some((f) => f.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp =
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case "country":
          cmp = a.country.localeCompare(b.country);
          break;
        case "region":
          cmp = a.region.localeCompare(b.region);
          break;
        case "participants":
          cmp =
            parseInt(a.participantEstimate.replace(/[^0-9]/g, "")) -
            parseInt(b.participantEstimate.replace(/[^0-9]/g, ""));
          break;
        case "deaths":
          cmp = (a.deaths ?? 0) - (b.deaths ?? 0);
          break;
        case "significance": {
          const order = { landmark: 0, major: 1, notable: 2, regional: 3 };
          cmp =
            (order[a.significance] ?? 4) - (order[b.significance] ?? 4);
          break;
        }
      }
      return sortAsc ? cmp : -cmp;
    });

    return result;
  }, [
    filterRegion,
    filterCategory,
    filterSignificance,
    filterDecade,
    search,
    sortField,
    sortAsc,
  ]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  }

  function SortHeader({
    field,
    children,
    align = "left",
  }: {
    field: SortField;
    children: React.ReactNode;
    align?: "left" | "right";
  }) {
    const active = sortField === field;
    return (
      <th
        className={`px-3 py-2.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)] cursor-pointer select-none transition-colors hover:text-[var(--color-text)] ${
          active ? "text-[var(--color-text)]" : ""
        } ${align === "right" ? "text-right" : ""}`}
        onClick={() => toggleSort(field)}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {active && (
            <span className="text-[var(--color-accent)]">
              {sortAsc ? "↑" : "↓"}
            </span>
          )}
        </span>
      </th>
    );
  }

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/civic-intel"
                className="flex items-center gap-1.5 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowLeft className="h-3 w-3" />
                Civic Intel
              </Link>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Global Protest Wiki
            </h1>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {globalProtests.length} protests across{" "}
              {new Set(globalProtests.map((p) => p.country)).size} countries and{" "}
              {new Set(globalProtests.map((p) => p.region)).size} regions
            </p>
          </div>
          <div className="flex gap-1 rounded border border-[var(--color-border)]">
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-[10px] font-[family-name:var(--font-mono)] transition-colors ${
                view === "table"
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <LayoutList className="h-3 w-3" />
              Table
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-[10px] font-[family-name:var(--font-mono)] transition-colors ${
                view === "timeline"
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <BarChart3 className="h-3 w-3" />
              Timeline
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <FilterBar
            filterRegion={filterRegion}
            setFilterRegion={setFilterRegion}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterSignificance={filterSignificance}
            setFilterSignificance={setFilterSignificance}
            filterDecade={filterDecade}
            setFilterDecade={setFilterDecade}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {view === "table" ? (
              <>
                {/* Results count */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
                    {filtered.length} protest{filtered.length !== 1 ? "s" : ""}{" "}
                    {filtered.length !== globalProtests.length
                      ? `of ${globalProtests.length}`
                      : ""}
                  </span>
                  {(filterRegion !== "all" ||
                    filterCategory !== "all" ||
                    filterSignificance !== "all" ||
                    filterDecade !== "all" ||
                    search) && (
                    <button
                      onClick={() => {
                        setFilterRegion("all");
                        setFilterCategory("all");
                        setFilterSignificance("all");
                        setFilterDecade("all");
                        setSearch("");
                      }}
                      className="flex items-center gap-1 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <X className="h-3 w-3" />
                      Clear filters
                    </button>
                  )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded border border-[var(--color-border)]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                        <th className="px-3 py-2.5 text-left text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                          #
                        </th>
                        <th
                          className="px-3 py-2.5 text-left text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)] cursor-pointer select-none hover:text-[var(--color-text)]"
                          onClick={() => toggleSort("date")}
                        >
                          <span className="inline-flex items-center gap-1">
                            Name / Date
                            {sortField === "date" && (
                              <span className="text-[var(--color-accent)]">
                                {sortAsc ? "↑" : "↓"}
                              </span>
                            )}
                          </span>
                        </th>
                        <SortHeader field="country">Country</SortHeader>
                        <SortHeader field="region">Region</SortHeader>
                        <SortHeader field="date">Year</SortHeader>
                        <SortHeader field="participants" align="right">
                          Participants
                        </SortHeader>
                        <SortHeader field="deaths" align="right">
                          Deaths
                        </SortHeader>
                        <SortHeader field="significance">
                          Significance
                        </SortHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p, i) => (
                        <ProtestRow key={p.id} protest={p} index={i + 1} />
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className="px-6 py-12 text-center text-xs text-[var(--color-text-muted)]"
                          >
                            No protests match the current filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <TimelineView protests={filtered} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <StatsSidebar protests={filtered} />
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-4">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
            Data compiled from historical records, academic sources, and verified
            reporting. Participant estimates and death tolls are approximate.
          </span>
        </div>
      </div>
    </div>
  );
}
