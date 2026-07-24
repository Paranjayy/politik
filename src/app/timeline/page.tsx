"use client";

import { useMemo, useState } from "react";
import { issues } from "@/data/issues";
import { protests } from "@/data/protests";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TimelineEntry {
  date: string;
  type: "issue" | "protest";
  title: string;
  detail: string;
  href: string;
  color: string;
  severity?: string;
}

const severityColor: Record<string, string> = {
  critical: "var(--color-severity-critical)",
  high: "var(--color-severity-high)",
  medium: "var(--color-severity-medium)",
  low: "var(--color-severity-low)",
};

function getMonthYear(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getYear(dateStr: string): string {
  return new Date(dateStr).getFullYear().toString();
}

export default function TimelinePage() {
  const [filter, setFilter] = useState<"all" | "issue" | "protest">("all");

  const entries = useMemo(() => {
    const all: TimelineEntry[] = [];

    issues.forEach((issue) => {
      issue.timeline.forEach((event) => {
        all.push({
          date: event.date,
          type: "issue",
          title: issue.title,
          detail: event.event,
          href: `/civic-ledger/debate/${issue.id}`,
          color: severityColor[issue.severity] || "#71717a",
          severity: issue.severity,
        });
      });
    });

    protests.forEach((protest) => {
      protest.timeline.forEach((event) => {
        all.push({
          date: event.date,
          type: "protest",
          title: protest.name,
          detail: event.event,
          href: `/civic-ledger`,
          color: "#22c55e",
        });
      });
    });

    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return all;
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((e) => e.type === filter);
  }, [entries, filter]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: { month: string; year: string; entries: TimelineEntry[] }[] = [];
    let currentMonth = "";

    filtered.forEach((entry) => {
      const monthKey = getMonthYear(entry.date);
      const yearKey = getYear(entry.date);
      if (monthKey !== currentMonth) {
        currentMonth = monthKey;
        groups.push({ month: monthKey, year: yearKey, entries: [] });
      }
      groups[groups.length - 1].entries.push(entry);
    });

    return groups;
  }, [filtered]);

  // Stats
  const totalEvents = filtered.length;
  const yearSet = new Set(filtered.map((e) => getYear(e.date)));
  const yearSpan = yearSet.size;
  const uniqueIssues = new Set(filtered.filter((e) => e.type === "issue").map((e) => e.title)).size;
  const uniqueProtests = new Set(filtered.filter((e) => e.type === "protest").map((e) => e.title)).size;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1000px] px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Global Timeline</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Chronological view of all tracked events across issues and protests
          </p>
        </div>

        {/* Stats strip */}
        <div className="mb-8 grid grid-cols-2 gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
          {[
            { label: "Total events", value: totalEvents },
            { label: "Year span", value: yearSpan },
            { label: "Issues", value: uniqueIssues },
            { label: "Protests", value: uniqueProtests },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4">
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">{stat.label}</span>
              <span className="text-xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2">
          {([["all", "All"], ["issue", "Issues"], ["protest", "Protests"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`rounded-md border px-4 py-1.5 text-xs transition-all ${
                filter === key
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[var(--color-border)]" />

          {grouped.map((group) => (
            <div key={group.month} className="mb-10">
              {/* Month header */}
              <div className="relative mb-4 flex items-center gap-3">
                <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                    {group.entries.length}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[var(--color-text)]">{group.month}</h2>
                </div>
              </div>

              {/* Events */}
              <div className="ml-[18px] space-y-2 border-l border-[var(--color-border)] pl-8">
                {group.entries.map((entry, i) => (
                  <Link key={i} href={entry.href}
                    className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{getDayLabel(entry.date)}</span>
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-medium capitalize"
                        style={{
                          backgroundColor: entry.type === "issue" ? `${entry.color}15` : "rgba(34,197,94,0.15)",
                          color: entry.type === "issue" ? entry.color : "#22c55e",
                        }}>
                        {entry.type}
                      </span>
                      {entry.severity && (
                        <span className="rounded px-1.5 py-0.5 text-[9px] font-medium capitalize"
                          style={{ backgroundColor: `${entry.color}15`, color: entry.color }}>
                          {entry.severity}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">{entry.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">{entry.detail}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {grouped.length === 0 && (
            <div className="rounded-lg border border-[var(--color-border)] p-12 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">No events to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
