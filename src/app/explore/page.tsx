"use client";

import { useState, useMemo } from "react";
import { issues } from "@/data/issues";
import { ArrowRight, Filter, ArrowUpDown, MapPin, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

const severityColor: Record<string, string> = {
  critical: "var(--color-severity-critical)",
  high: "var(--color-severity-high)",
  medium: "var(--color-severity-medium)",
  low: "var(--color-severity-low)",
};

const statusColor: Record<string, string> = {
  reported: "#71717a",
  triaged: "#3b82f6",
  "evidence-requested": "#f59e0b",
  verified: "#22c55e",
  deduplicated: "#71717a",
  classified: "#3b82f6",
  "jurisdiction-assigned": "#3b82f6",
  "response-requested": "#f59e0b",
  "intervention-proposed": "#a855f7",
  funded: "#22c55e",
  "in-progress": "#3b82f6",
  "partially-resolved": "#22c55e",
  resolved: "#22c55e",
  audited: "#71717a",
  reopened: "#ef4444",
};

const allDomains = [...new Set(issues.map((i) => i.domain))].sort();
const allSeverities = ["critical", "high", "medium", "low"];
const allStatuses = [...new Set(issues.map((i) => i.status))].sort();
const allCountries = [...new Set(issues.map((i) => i.country))].sort();

type SortKey = "severity" | "neglect" | "affected" | "date" | "evidence";
const severityOrder: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

export default function ExplorePage() {
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("severity");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    let result = [...issues];
    if (domainFilter !== "all") result = result.filter((i) => i.domain === domainFilter);
    if (severityFilter !== "all") result = result.filter((i) => i.severity === severityFilter);
    if (statusFilter !== "all") result = result.filter((i) => i.status === statusFilter);
    if (countryFilter !== "all") result = result.filter((i) => i.country === countryFilter);

    result.sort((a, b) => {
      switch (sortBy) {
        case "severity": return severityOrder[b.severity] - severityOrder[a.severity];
        case "neglect": return b.votes.neglect - a.votes.neglect;
        case "affected": return b.affectedPopulation - a.affectedPopulation;
        case "date": return new Date(a.firstReported).getTime() - new Date(b.firstReported).getTime();
        case "evidence": return b.evidence.length - a.evidence.length;
        default: return 0;
      }
    });
    return result;
  }, [domainFilter, severityFilter, statusFilter, countryFilter, sortBy]);

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    issues.forEach((i) => { counts[i.domain] = (counts[i.domain] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Issue Explorer</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Filter, sort, and analyze {issues.length} tracked issues across {allCountries.length} countries
          </p>
        </div>

        {/* Domain strip */}
        <div className="mb-8 flex flex-wrap gap-2">
          {domainCounts.map(([domain, count]) => (
            <button
              key={domain}
              onClick={() => setDomainFilter(domainFilter === domain ? "all" : domain)}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-all ${
                domainFilter === domain
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              }`}
            >
              <span className="capitalize">{domain}</span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <div className={`space-y-6 ${showFilters ? "" : "hidden lg:block"}`}>
            <div>
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Sort by</h3>
              <div className="space-y-1">
                {([["severity", "Severity"], ["neglect", "Neglect score"], ["affected", "Affected population"], ["date", "Date reported"], ["evidence", "Evidence count"]] as [SortKey, string][]).map(([key, label]) => (
                  <button key={key} onClick={() => setSortBy(key)}
                    className={`flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors ${sortBy === key ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                    <ArrowUpDown className="h-3 w-3" />{label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Severity</h3>
              <div className="space-y-1">
                <button onClick={() => setSeverityFilter("all")}
                  className={`flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors ${severityFilter === "all" ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                  All severities
                </button>
                {allSeverities.map((s) => {
                  const count = issues.filter((i) => i.severity === s).length;
                  return (
                    <button key={s} onClick={() => setSeverityFilter(severityFilter === s ? "all" : s)}
                      className={`flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors ${severityFilter === s ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: severityColor[s] }} />
                      <span className="capitalize">{s}</span>
                      <span className="ml-auto font-[family-name:var(--font-mono)] text-[10px] opacity-50">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Status</h3>
              <div className="space-y-1">
                <button onClick={() => setStatusFilter("all")}
                  className={`flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors ${statusFilter === "all" ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                  All statuses
                </button>
                {allStatuses.map((s) => {
                  const count = issues.filter((i) => i.status === s).length;
                  if (count === 0) return null;
                  return (
                    <button key={s} onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
                      className={`flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors ${statusFilter === s ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor[s] || "#71717a" }} />
                      <span className="capitalize">{s.replace(/-/g, " ")}</span>
                      <span className="ml-auto font-[family-name:var(--font-mono)] text-[10px] opacity-50">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Country</h3>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-1.5 text-xs text-[var(--color-text)] outline-none">
                <option value="all">All countries</option>
                {allCountries.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>

            {(domainFilter !== "all" || severityFilter !== "all" || statusFilter !== "all" || countryFilter !== "all") && (
              <button onClick={() => { setDomainFilter("all"); setSeverityFilter("all"); setStatusFilter("all"); setCountryFilter("all"); }}
                className="w-full rounded border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                Clear all filters
              </button>
            )}
          </div>

          {/* Issue list */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {filtered.length} issue{filtered.length !== 1 ? "s" : ""}
              </span>
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 rounded border border-[var(--color-border)] px-3 py-1.5 text-[10px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] lg:hidden">
                <Filter className="h-3 w-3" />{showFilters ? "Hide" : "Show"} filters
              </button>
            </div>

            <div className="space-y-3">
              {filtered.map((issue) => (
                <Link key={issue.id} href={`/civic-ledger/debate/${issue.id}`}
                  className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5 transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{issue.id}</span>
                        <span className="rounded px-1.5 py-0.5 text-[9px] font-medium capitalize"
                          style={{ backgroundColor: `${severityColor[issue.severity]}15`, color: severityColor[issue.severity] }}>{issue.severity}</span>
                        <span className="rounded px-1.5 py-0.5 text-[9px] font-medium capitalize"
                          style={{ backgroundColor: `${statusColor[issue.status] || "#71717a"}15`, color: statusColor[issue.status] || "#71717a" }}>{issue.status.replace(/-/g, " ")}</span>
                      </div>
                      <h3 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">{issue.title}</h3>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{issue.country}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{daysSince(issue.firstReported)}d ago</span>
                    <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{issue.affectedPopulation.toLocaleString()} affected</span>
                    <span className="font-[family-name:var(--font-mono)]">{issue.evidence.length} evidence · {issue.votes.neglect} neglect</span>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="rounded-lg border border-[var(--color-border)] p-12 text-center">
                  <p className="text-sm text-[var(--color-text-muted)]">No issues match your filters</p>
                  <button onClick={() => { setDomainFilter("all"); setSeverityFilter("all"); setStatusFilter("all"); setCountryFilter("all"); }}
                    className="mt-3 text-xs text-[var(--color-accent)] hover:underline">Reset filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
