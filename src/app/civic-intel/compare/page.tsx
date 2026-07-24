"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import type { CountryReport, DimensionScore } from "@/lib/types";
import { ArrowLeft, ArrowRightLeft, TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import Link from "next/link";

const trendIcon = {
  improving: TrendingUp,
  stagnating: Minus,
  deteriorating: TrendingDown,
  volatile: ArrowRightLeft,
  recovering: TrendingUp,
};

const trendColor = {
  improving: "#22c55e",
  stagnating: "#71717a",
  deteriorating: "#ef4444",
  volatile: "#f59e0b",
  recovering: "#3b82f6",
};

const dimensionLabels: Record<string, string> = {
  humanOutcomes: "Human Outcomes",
  economicStructure: "Economic Structure",
  governmentCapacity: "Government Capacity",
  institutions: "Institutions",
  freedomParticipation: "Freedom & Participation",
  livedExperience: "Lived Experience",
  environment: "Environment",
};

type DimensionKey = keyof Pick<
  CountryReport,
  | "humanOutcomes"
  | "economicStructure"
  | "governmentCapacity"
  | "institutions"
  | "freedomParticipation"
  | "livedExperience"
  | "environment"
>;

const dimensionKeys: DimensionKey[] = [
  "humanOutcomes",
  "economicStructure",
  "governmentCapacity",
  "institutions",
  "freedomParticipation",
  "livedExperience",
  "environment",
];

function DimensionRow({ metric, score }: { metric: string; score: DimensionScore }) {
  const Icon = trendIcon[score.trend];
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] last:border-b-0">
      <span className="text-[11px] text-[var(--color-text-secondary)] flex-1 min-w-0 truncate">
        {metric}
      </span>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <span className="text-[11px] font-medium text-[var(--color-text)] text-right">
          {score.value}
        </span>
        <div className="flex items-center gap-1">
          <Icon className="h-3 w-3" style={{ color: trendColor[score.trend] }} />
          <span
            className="text-[9px] font-[family-name:var(--font-mono)] uppercase"
            style={{ color: trendColor[score.trend] }}
          >
            {score.trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function CountrySelector({
  selected,
  onSelect,
  exclude,
}: {
  selected: CountryReport | null;
  onSelect: (c: CountryReport) => void;
  exclude?: string;
}) {
  const [open, setOpen] = useState(false);
  const filtered = countries.filter((c) => c.id !== exclude);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-2.5 text-sm transition-colors hover:border-[var(--color-border-strong)]"
      >
        {selected ? (
          <>
            <span className="text-lg">{selected.flag}</span>
            <span className="font-medium">{selected.name}</span>
          </>
        ) : (
          <span className="text-[var(--color-text-muted)]">Select a country</span>
        )}
        <ChevronDown className={`h-3.5 w-3.5 text-[var(--color-text-muted)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] shadow-xl">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => { onSelect(c); setOpen(false); }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--color-bg-surface)]"
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CountryCompareColumn({ country }: { country: CountryReport }) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <div>
            <h2 className="text-lg font-bold">{country.name}</h2>
            <p className="text-[10px] text-[var(--color-text-muted)]">
              {country.population} · {country.governmentType}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="rounded bg-[var(--color-bg-surface)] px-2.5 py-1">
            <span className="text-[9px] text-[var(--color-text-muted)]">Capital</span>
            <span className="ml-1.5 text-[10px] font-medium">{country.capital}</span>
          </div>
          <div className="rounded bg-[var(--color-bg-surface)] px-2.5 py-1">
            <span className="text-[9px] text-[var(--color-text-muted)]">Trajectory</span>
            <span
              className="ml-1.5 text-[10px] font-medium"
              style={{ color: trendColor[country.historicalTrajectory] }}
            >
              {country.historicalTrajectory}
            </span>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="divide-y divide-[var(--color-border)]">
        {dimensionKeys.map((key) => {
          const scores = country[key] as DimensionScore[];
          return (
            <div key={key}>
              <div className="bg-[var(--color-bg-surface)] px-4 py-2">
                <h3 className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  {dimensionLabels[key]}
                </h3>
              </div>
              <div>
                {scores.map((s, i) => (
                  <DimensionRow key={i} metric={s.metric} score={s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [left, setLeft] = useState<CountryReport | null>(countries[0]);
  const [right, setRight] = useState<CountryReport | null>(countries[1]);

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Back link */}
        <Link
          href="/civic-intel"
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Intel
        </Link>

        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-[var(--color-severity-medium)]" />
          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
            Country Comparison
          </span>
        </div>
        <h1 className="mb-6 text-2xl font-bold tracking-tight">
          Compare Nations
        </h1>

        {/* Selectors */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <CountrySelector
              selected={left}
              onSelect={setLeft}
              exclude={right?.id}
            />
          </div>
          <ArrowRightLeft className="h-4 w-4 text-[var(--color-text-muted)]" />
          <div className="flex-1 max-w-xs">
            <CountrySelector
              selected={right}
              onSelect={setRight}
              exclude={left?.id}
            />
          </div>
        </div>

        {/* Comparison columns */}
        {left && right && (
          <div className="grid gap-6 lg:grid-cols-2">
            <CountryCompareColumn country={left} />
            <CountryCompareColumn country={right} />
          </div>
        )}

        {(!left || !right) && (
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-12 text-center">
            <ArrowRightLeft className="mx-auto mb-3 h-6 w-6 text-[var(--color-text-muted)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Select two countries above to compare their 7 wellbeing dimensions side by side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
