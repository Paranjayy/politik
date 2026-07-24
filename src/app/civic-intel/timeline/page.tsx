"use client";

import { useState } from "react";
import { protests } from "@/data/protests";
import type { ProtestEvent } from "@/lib/types";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const countryColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  India: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", text: "#ef4444", dot: "#ef4444" },
  Iran: { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)", text: "#a855f7", dot: "#a855f7" },
  "Sri Lanka": { bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.2)", text: "#eab308", dot: "#eab308" },
  Bangladesh: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", text: "#22c55e", dot: "#22c55e" },
  Nepal: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#06b6d4", dot: "#06b6d4" },
  "United States": { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", text: "#3b82f6", dot: "#3b82f6" },
};

function getColor(country: string) {
  return countryColors[country] || { bg: "rgba(113,113,122,0.08)", border: "rgba(113,113,122,0.2)", text: "#71717a", dot: "#71717a" };
}

interface TimelineEntry {
  year: number;
  protest: ProtestEvent;
}

function groupByYear(items: ProtestEvent[]): TimelineEntry[] {
  return items
    .map((p) => ({
      year: new Date(p.startDate).getFullYear(),
      protest: p,
    }))
    .sort((a, b) => a.year - b.year);
}

function ProtestCard({ entry }: { entry: TimelineEntry }) {
  const [expanded, setExpanded] = useState(false);
  const color = getColor(entry.protest.country);

  return (
    <div className="flex gap-6">
      {/* Year marker */}
      <div className="flex w-16 shrink-0 flex-col items-center pt-1">
        <span
          className="font-[family-name:var(--font-mono)] text-sm font-bold"
          style={{ color: color.text }}
        >
          {entry.year}
        </span>
      </div>

      {/* Dot */}
      <div className="flex shrink-0 flex-col items-center pt-2">
        <div
          className="h-3 w-3 rounded-full border-2"
          style={{ borderColor: color.dot, background: expanded ? color.dot : "transparent" }}
        />
        <div className="w-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Card */}
      <div className="mb-6 flex-1 pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded border text-left transition-all hover:border-[var(--color-border-strong)]"
          style={{
            background: expanded ? color.bg : "var(--color-bg-raised)",
            borderColor: expanded ? color.border : "var(--color-border)",
          }}
        >
          <div className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider"
                  style={{ background: color.bg, color: color.text }}
                >
                  {entry.protest.country}
                </span>
                <span className="flex items-center gap-1 text-[9px] text-[var(--color-text-muted)]">
                  <Calendar className="h-2.5 w-2.5" />
                  {entry.protest.startDate} — {entry.protest.endDate || "ongoing"}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug">
                {entry.protest.name}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[9px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {entry.protest.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" />
                  {entry.protest.participantEstimate.split(";")[0].trim()}
                </span>
              </div>
            </div>
            <div className="shrink-0 mt-1">
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-[var(--color-text-muted)]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)]" />
              )}
            </div>
          </div>

          {expanded && (
            <div className="border-t px-4 py-4" style={{ borderColor: color.border }}>
              {/* Demands */}
              <div className="mb-4">
                <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                  Demands
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {entry.protest.demands.map((d, i) => (
                    <span
                      key={i}
                      className="rounded px-1.5 py-0.5 text-[9px]"
                      style={{ background: color.bg, color: color.text }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* State response */}
              <div className="mb-4">
                <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                  State Response
                </span>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                  {entry.protest.stateResponse}
                </p>
              </div>

              {/* Outcome + Impact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Outcome
                  </span>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                    {entry.protest.outcome}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Long-term Impact
                  </span>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                    {entry.protest.longTermImpact}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              {entry.protest.timeline.length > 0 && (
                <div className="mt-4">
                  <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Key Events
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {entry.protest.timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                          {t.date}
                        </span>
                        <span className="text-[10px] leading-snug text-[var(--color-text-secondary)]">
                          {t.event}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProtestTimelinePage() {
  const timeline = groupByYear(protests);
  const [filterCountry, setFilterCountry] = useState("all");

  const countries = [...new Set(protests.map((p) => p.country))].sort();
  const filtered = filterCountry === "all" ? timeline : timeline.filter((e) => e.protest.country === filterCountry);

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1000px] px-6 py-8">
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
              Protest Timeline
            </h1>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {protests.length} protests across {countries.length} countries, sorted chronologically
            </p>
          </div>
        </div>

        {/* Country filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCountry("all")}
            className={`rounded px-3 py-1.5 text-[10px] font-[family-name:var(--font-mono)] transition-colors ${
              filterCountry === "all"
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
            }`}
          >
            All ({protests.length})
          </button>
          {countries.map((c) => {
            const color = getColor(c);
            const count = protests.filter((p) => p.country === c).length;
            return (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className="rounded px-3 py-1.5 text-[10px] font-[family-name:var(--font-mono)] transition-colors"
                style={{
                  background: filterCountry === c ? color.bg : "transparent",
                  border: `1px solid ${filterCountry === c ? color.border : "var(--color-border)"}`,
                  color: filterCountry === c ? color.text : "var(--color-text-muted)",
                }}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-xs text-[var(--color-text-muted)]">
              No protests match the selected filter.
            </p>
          ) : (
            <div className="space-y-0">
              {filtered.map((entry) => (
                <ProtestCard key={entry.protest.id} entry={entry} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-4">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
            All dates approximate. Participant estimates are reported figures and may vary.
          </span>
        </div>
      </div>
    </div>
  );
}
