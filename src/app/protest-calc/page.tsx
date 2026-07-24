"use client";

import { useState, useMemo } from "react";
import { protests } from "@/data/protests";
import { globalProtests } from "@/data/global-protests";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Clock, Users, Target } from "lucide-react";

interface ProtestMetrics {
  duration: number;
  participants: number;
  demandsCount: number;
  stateResponseSeverity: number;
  outcomeScore: number;
  impactScore: number;
}

function calculateDuration(start: string, end?: string): number {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
}

function parseParticipants(est: string): number {
  const match = est.match(/(\d[\d,]*)/);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10);
  if (est.toLowerCase().includes("millions")) return 1000000;
  if (est.toLowerCase().includes("thousands")) return 10000;
  return 1000;
}

function getStateResponseSeverity(response: string): number {
  const lower = response.toLowerCase();
  if (lower.includes("lethal") || lower.includes("killed") || lower.includes("mass arrest") || lower.includes("military")) return 5;
  if (lower.includes("tear gas") || lower.includes("water cannon") || lower.includes("internet shutdown")) return 4;
  if (lower.includes("arrest") || lower.includes("cleared") || lower.includes("suppressed")) return 3;
  if (lower.includes("ignored") || lower.includes("dialogue") || lower.includes("talks")) return 2;
  return 1;
}

function getOutcomeScore(outcome: string): number {
  const lower = outcome.toLowerCase();
  if (lower.includes("repeal") || lower.includes("resigned") || lower.includes("reformed") || lower.includes("laws repealed")) return 5;
  if (lower.includes("partial") || lower.includes("not implemented") || lower.includes("unresolved") || lower.includes("continued")) return 3;
  if (lower.includes("suppressed") || lower.includes("failed") || lower.includes("no formal")) return 1;
  return 3;
}

function calculateImpact(metrics: ProtestMetrics): { score: number; label: string; color: string; breakdown: { factor: string; score: number; max: number; note: string }[] } {
  const durationScore = Math.min(5, Math.ceil(metrics.duration / 60));
  const participantScore = Math.min(5, Math.ceil(Math.log10(Math.max(1, metrics.participants)) - 3));
  const demandScore = Math.min(5, metrics.demandsCount);
  const responseScore = metrics.stateResponseSeverity;
  const outcomeScore = metrics.outcomeScore;

  const total = durationScore + participantScore + demandScore + responseScore + outcomeScore;
  const max = 25;
  const normalized = Math.round((total / max) * 100);

  let label = "Low Impact";
  let color = "var(--color-severity-low)";
  if (normalized >= 80) { label = "Landmark"; color = "var(--color-severity-critical)"; }
  else if (normalized >= 60) { label = "Major"; color = "var(--color-severity-high)"; }
  else if (normalized >= 40) { label = "Notable"; color = "var(--color-severity-medium)"; }

  return {
    score: normalized,
    label,
    color,
    breakdown: [
      { factor: "Duration", score: durationScore, max: 5, note: `${metrics.duration} days` },
      { factor: "Scale", score: participantScore, max: 5, note: `${metrics.participants.toLocaleString()} participants` },
      { factor: "Demands", score: demandScore, max: 5, note: `${metrics.demandsCount} demands` },
      { factor: "State response", score: responseScore, max: 5, note: `Severity ${responseScore}/5` },
      { factor: "Outcome", score: outcomeScore, max: 5, note: `Score ${outcomeScore}/5` },
    ],
  };
}

export default function ProtestCalcPage() {
  const [selectedProtest, setSelectedProtest] = useState<string | null>(null);
  const [customValues, setCustomValues] = useState({
    duration: 30,
    participants: 10000,
    demandsCount: 3,
    stateResponseSeverity: 3,
    outcomeScore: 3,
  });

  const allProtests = useMemo(() => {
    return [...protests.map((p) => ({
      id: p.id,
      name: p.name,
      country: p.country,
      startDate: p.startDate,
      endDate: p.endDate,
      source: "detailed" as const,
    })), ...globalProtests.map((p) => ({
      id: p.id,
      name: p.name,
      country: p.country,
      startDate: p.startDate,
      endDate: p.endDate,
      source: "global" as const,
    }))];
  }, []);

  const selected = allProtests.find((p) => p.id === selectedProtest);

  const metrics = useMemo((): ProtestMetrics => {
    if (selected) {
      const detailed = protests.find((p) => p.id === selected.id);
      const global = globalProtests.find((p) => p.id === selected.id);

      return {
        duration: calculateDuration(selected.startDate, selected.endDate),
        participants: detailed ? parseParticipants(detailed.participantEstimate) : 10000,
        demandsCount: detailed ? detailed.demands.length : (global ? global.demands.length : 3),
        stateResponseSeverity: detailed ? getStateResponseSeverity(detailed.stateResponse) : 3,
        outcomeScore: detailed ? getOutcomeScore(detailed.outcome) : 3,
        impactScore: 0,
      };
    }
    return {
      duration: customValues.duration,
      participants: customValues.participants,
      demandsCount: customValues.demandsCount,
      stateResponseSeverity: customValues.stateResponseSeverity,
      outcomeScore: customValues.outcomeScore,
      impactScore: 0,
    };
  }, [selected, customValues]);

  const impact = useMemo(() => calculateImpact(metrics), [metrics]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1000px] px-6 pt-20 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Protest Impact Calculator</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Analyze protest impact using duration, scale, demands, state response, and outcome metrics
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Input section */}
          <div className="space-y-8">
            {/* Protest selector */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Select a protest or use custom values
              </h3>
              <div className="max-h-[200px] space-y-1 overflow-y-auto rounded-lg border border-[var(--color-border)] p-2">
                {allProtests.map((p) => (
                  <button key={p.id} onClick={() => setSelectedProtest(selectedProtest === p.id ? null : p.id)}
                    className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs transition-colors ${
                      selectedProtest === p.id
                        ? "bg-[var(--color-bg-surface)] text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}>
                    <span className="flex-1 truncate">{p.name}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[9px]">{p.country}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Custom inputs */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                {selected ? `Analyzing: ${selected.name}` : "Custom values"}
              </h3>
              <div className="space-y-5">
                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <label className="text-xs text-[var(--color-text-secondary)]">Duration (days)</label>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{metrics.duration}</span>
                  </div>
                  <input type="range" min="1" max="365" value={metrics.duration} disabled={!!selected}
                    onChange={(e) => setCustomValues((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)] disabled:opacity-50"
                    style={{ height: "6px", background: `linear-gradient(to right, var(--color-accent) ${(metrics.duration / 365) * 100}%, var(--color-bg-surface) ${(metrics.duration / 365) * 100}%)` }} />
                </div>

                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <label className="text-xs text-[var(--color-text-secondary)]">Participants</label>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{metrics.participants.toLocaleString()}</span>
                  </div>
                  <input type="range" min="100" max="5000000" step="100" value={metrics.participants} disabled={!!selected}
                    onChange={(e) => setCustomValues((prev) => ({ ...prev, participants: Number(e.target.value) }))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)] disabled:opacity-50"
                    style={{ height: "6px", background: `linear-gradient(to right, var(--color-severity-medium) ${(metrics.participants / 5000000) * 100}%, var(--color-bg-surface) ${(metrics.participants / 5000000) * 100}%)` }} />
                </div>

                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <label className="text-xs text-[var(--color-text-secondary)]">Demands count</label>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{metrics.demandsCount}</span>
                  </div>
                  <input type="range" min="1" max="10" value={metrics.demandsCount} disabled={!!selected}
                    onChange={(e) => setCustomValues((prev) => ({ ...prev, demandsCount: Number(e.target.value) }))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)] disabled:opacity-50"
                    style={{ height: "6px", background: `linear-gradient(to right, var(--color-severity-high) ${(metrics.demandsCount / 10) * 100}%, var(--color-bg-surface) ${(metrics.demandsCount / 10) * 100}%)` }} />
                </div>

                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <label className="text-xs text-[var(--color-text-secondary)]">State response severity</label>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{metrics.stateResponseSeverity}/5</span>
                  </div>
                  <input type="range" min="1" max="5" value={metrics.stateResponseSeverity} disabled={!!selected}
                    onChange={(e) => setCustomValues((prev) => ({ ...prev, stateResponseSeverity: Number(e.target.value) }))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)] disabled:opacity-50"
                    style={{ height: "6px", background: `linear-gradient(to right, var(--color-severity-critical) ${(metrics.stateResponseSeverity / 5) * 100}%, var(--color-bg-surface) ${(metrics.stateResponseSeverity / 5) * 100}%)` }} />
                </div>

                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <label className="text-xs text-[var(--color-text-secondary)]">Outcome score</label>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{metrics.outcomeScore}/5</span>
                  </div>
                  <input type="range" min="1" max="5" value={metrics.outcomeScore} disabled={!!selected}
                    onChange={(e) => setCustomValues((prev) => ({ ...prev, outcomeScore: Number(e.target.value) }))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)] disabled:opacity-50"
                    style={{ height: "6px", background: `linear-gradient(to right, var(--color-status-verified) ${(metrics.outcomeScore / 5) * 100}%, var(--color-bg-surface) ${(metrics.outcomeScore / 5) * 100}%)` }} />
                </div>
              </div>
            </section>
          </div>

          {/* Results panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
              <div className="mb-4 text-center">
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Impact Score
                </span>
                <div className="mt-2 text-5xl font-bold font-[family-name:var(--font-mono)]" style={{ color: impact.color }}>
                  {impact.score}
                </div>
                <div className="mt-1 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${impact.color}15`, color: impact.color }}>
                  {impact.label}
                </div>
              </div>

              <div className="mb-4 h-px bg-[var(--color-border)]" />

              {/* Breakdown */}
              <div className="space-y-3">
                {impact.breakdown.map((item) => (
                  <div key={item.factor}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-xs text-[var(--color-text-secondary)]">{item.factor}</span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{item.score}/{item.max}</span>
                    </div>
                    <div className="h-2 rounded bg-[var(--color-bg-surface)] overflow-hidden">
                      <div className="h-full rounded transition-all duration-500" style={{ width: `${(item.score / item.max) * 100}%`, backgroundColor: impact.color }} />
                    </div>
                    <span className="mt-0.5 block text-[9px] text-[var(--color-text-muted)]">{item.note}</span>
                  </div>
                ))}
              </div>

              {/* Key metrics */}
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border border-[var(--color-border)] p-2 text-center">
                    <Clock className="mx-auto mb-1 h-3 w-3 text-[var(--color-text-muted)]" />
                    <span className="block text-sm font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">{metrics.duration}d</span>
                    <span className="text-[9px] text-[var(--color-text-muted)]">Duration</span>
                  </div>
                  <div className="rounded border border-[var(--color-border)] p-2 text-center">
                    <Users className="mx-auto mb-1 h-3 w-3 text-[var(--color-text-muted)]" />
                    <span className="block text-sm font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">{(metrics.participants / 1000).toFixed(0)}k</span>
                    <span className="text-[9px] text-[var(--color-text-muted)]">Participants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
