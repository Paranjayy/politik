"use client";

import { useState, useMemo } from "react";
import { issues } from "@/data/issues";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";
import { protests } from "@/data/protests";
import {
  Search,
  FileText,
  Globe,
  Building2,
  Megaphone,
  ArrowRight,
  MapPin,
  Hash,
} from "lucide-react";
import Link from "next/link";

type ResultType = "issues" | "countries" | "parties" | "protests";

interface SearchResult {
  type: ResultType;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

const typeConfig: Record<
  ResultType,
  { label: string; icon: React.ReactNode; color: string; bg: string; href: (id: string) => string }
> = {
  issues: {
    label: "Issues",
    icon: <FileText className="h-3.5 w-3.5" />,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    href: (id) => `/civic-ledger/debate/${id}`,
  },
  countries: {
    label: "Countries",
    icon: <Globe className="h-3.5 w-3.5" />,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    href: () => `/civic-intel`,
  },
  parties: {
    label: "Parties",
    icon: <Building2 className="h-3.5 w-3.5" />,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    href: () => `/civic-intel`,
  },
  protests: {
    label: "Protests",
    icon: <Megaphone className="h-3.5 w-3.5" />,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    href: () => `/civic-intel`,
  },
};

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search issues
  issues.forEach((i) => {
    const match =
      i.title.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.country.toLowerCase().includes(q) ||
      i.domain.toLowerCase().includes(q) ||
      i.id.toLowerCase().includes(q) ||
      i.problemType.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: "issues",
        id: i.id,
        title: i.title,
        subtitle: `${i.location} — ${i.domain} — ${i.severity}`,
        href: typeConfig.issues.href(i.id),
        icon: typeConfig.issues.icon,
      });
    }
  });

  // Search countries
  countries.forEach((c) => {
    const match =
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.governmentType.toLowerCase().includes(q) ||
      c.flag.includes(q);
    if (match) {
      results.push({
        type: "countries",
        id: c.id,
        title: `${c.flag} ${c.name}`,
        subtitle: `${c.capital} — ${c.population} — ${c.governmentType}`,
        href: typeConfig.countries.href(c.id),
        icon: typeConfig.countries.icon,
      });
    }
  });

  // Search parties
  parties.forEach((p) => {
    const match =
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.ideology.some((ide) => ide.toLowerCase().includes(q)) ||
      p.leadership.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: "parties",
        id: p.id,
        title: `${p.shortName} — ${p.name}`,
        subtitle: `${p.country} — ${p.ideology.join(", ")}`,
        href: typeConfig.parties.href(p.id),
        icon: typeConfig.parties.icon,
      });
    }
  });

  // Search protests
  protests.forEach((p) => {
    const match =
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.demands.some((d) => d.toLowerCase().includes(q)) ||
      p.outcome.toLowerCase().includes(q) ||
      p.organizers.some((o) => o.toLowerCase().includes(q));
    if (match) {
      results.push({
        type: "protests",
        id: p.id,
        title: p.name,
        subtitle: `${p.location} — ${p.startDate}${p.endDate ? ` to ${p.endDate}` : ""}`,
        href: typeConfig.protests.href(p.id),
        icon: typeConfig.protests.icon,
      });
    }
  });

  return results;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchAll(query), [query]);
  const grouped = useMemo(() => {
    const g: Record<ResultType, SearchResult[]> = {
      issues: [],
      countries: [],
      parties: [],
      protests: [],
    };
    results.forEach((r) => g[r.type].push(r));
    return g;
  }, [results]);

  const totalResults = results.length;
  const activeTypes = Object.entries(grouped)
    .filter(([, items]) => items.length > 0)
    .map(([type]) => type as ResultType);

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[900px] px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Search</h1>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Search across issues, countries, parties, and protests
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issues, countries, parties, protests..."
            className="w-full rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] py-3 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-border-strong)]"
            autoFocus
          />
          {query && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Results */}
        {!query ? (
          <div className="py-16 text-center">
            <Search className="mx-auto mb-4 h-8 w-8 text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Start typing to search across all data
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Delhi",
                "India",
                "BJP",
                "farmers",
                "Aadhaar",
                "air quality",
                "quota",
                "corruption",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded border border-[var(--color-border)] px-2 py-1 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No results found for &ldquo;{query}&rdquo;
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {activeTypes.map((type) => {
              const config = typeConfig[type];
              return (
                <div key={type}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded"
                        style={{ background: config.bg, color: config.color }}
                      >
                        {config.icon}
                      </div>
                      <span className="text-xs font-medium text-[var(--color-text)]">
                        {config.label}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                        {grouped[type].length}
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                    {grouped[type].map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        className="group flex items-center gap-3 bg-[var(--color-bg-raised)] px-4 py-3 transition-colors hover:bg-[var(--color-bg-surface)]"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                            {result.title}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
                            <span className="font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
                              {result.id}
                            </span>
                            <span className="hidden sm:inline">·</span>
                            <span className="hidden sm:inline truncate">
                              {result.subtitle}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer stats */}
        {query && (
          <div className="mt-8 border-t border-[var(--color-border)] pt-4">
            <div className="flex flex-wrap gap-4 font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
              <span>{issues.length} issues indexed</span>
              <span>{countries.length} countries indexed</span>
              <span>{parties.length} parties indexed</span>
              <span>{protests.length} protests indexed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
