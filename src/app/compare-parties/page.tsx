"use client";

import { useState } from "react";
import { parties } from "@/data/parties";
import { ArrowRight, CheckCircle, XCircle, Minus } from "lucide-react";

const partyColors: Record<string, string> = {
  bjp: "#ff6b00",
  inc: "#00bfff",
  aap: "#0066ff",
  tmc: "#00aa55",
  left: "#dc143c",
  dmk: "#dc143c",
  rjd: "#228b22",
  shiv_sena: "#ff6600",
};

function getPartyColor(id: string): string {
  return partyColors[id] || "#71717a";
}

function SeatBar({ current, total, color }: { current: number; total: number; color: string }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-[family-name:var(--font-mono)] text-lg font-bold" style={{ color }}>{current}</span>
        <span className="text-[10px] text-[var(--color-text-muted)]">/ {total} seats</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-bg-surface)]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="mt-1 block text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{pct.toFixed(1)}%</span>
    </div>
  );
}

function TransparencyBadge({ level }: { level: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    high: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
    medium: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    low: { bg: "rgba(239,68,68,0.15)", text: "#ef4444" },
  };
  const c = colors[level] || colors.medium;
  return (
    <span className="inline-block rounded px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-medium capitalize"
      style={{ backgroundColor: c.bg, color: c.text }}>
      {level}
    </span>
  );
}

export default function ComparePartiesPage() {
  const [partyA, setPartyA] = useState(parties[0]?.id || "");
  const [partyB, setPartyB] = useState(parties[1]?.id || "");

  const a = parties.find((p) => p.id === partyA);
  const b = parties.find((p) => p.id === partyB);

  const allIdeologies = [...new Set([...(a?.ideology || []), ...(b?.ideology || [])])];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Party Comparison</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Side-by-side analysis of political party profiles, contradictions, and governance records
          </p>
        </div>

        {/* Party selectors */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Party A</label>
            <select value={partyA} onChange={(e) => setPartyA(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-border-strong)]">
              {parties.map((p) => (<option key={p.id} value={p.id}>{p.shortName} — {p.name}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Party B</label>
            <select value={partyB} onChange={(e) => setPartyB(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-border-strong)]">
              {parties.map((p) => (<option key={p.id} value={p.id}>{p.shortName} — {p.name}</option>))}
            </select>
          </div>
        </div>

        {a && b && (
          <div className="space-y-8">
            {/* Quick stats comparison */}
            <div className="grid gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {[a, b].map((party) => {
                const color = getPartyColor(party.id);
                return (
                  <div key={party.id} className="bg-[var(--color-bg-raised)] p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                      <div>
                        <h2 className="text-lg font-bold" style={{ color }}>{party.shortName}</h2>
                        <p className="text-xs text-[var(--color-text-muted)]">{party.name}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {party.currentSeats !== undefined && party.totalSeats && (
                        <SeatBar current={party.currentSeats} total={party.totalSeats} color={color} />
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Founded</span>
                          <p className="text-sm font-medium">{party.founded}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Vote share</span>
                          <p className="text-sm font-medium">{party.voteShare || "N/A"}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase text-[var(--color-text-muted)]">Leadership</span>
                          <p className="text-sm font-medium">{party.leadership}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ideology comparison */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Ideology</h3>
              <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <div className="grid grid-cols-[1fr_120px_1fr] gap-px bg-[var(--color-border)]">
                  <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]" style={{ color: getPartyColor(a.id) }}>{a.shortName}</div>
                  <div className="bg-[var(--color-bg-raised)] px-4 py-2 text-center font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">Dimension</div>
                  <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]" style={{ color: getPartyColor(b.id) }}>{b.shortName}</div>
                  {allIdeologies.map((ideology) => (
                    <div key={ideology} className="contents">
                      <div className="bg-[var(--color-bg)] px-4 py-2.5 text-xs">
                        {a.ideology.includes(ideology) ? <CheckCircle className="h-4 w-4" style={{ color: getPartyColor(a.id) }} /> : <Minus className="h-4 w-4 text-[var(--color-border-strong)]" />}
                      </div>
                      <div className="bg-[var(--color-bg)] px-4 py-2.5 text-center text-xs text-[var(--color-text-secondary)]">{ideology}</div>
                      <div className="bg-[var(--color-bg)] px-4 py-2.5 text-xs">
                        {b.ideology.includes(ideology) ? <CheckCircle className="h-4 w-4" style={{ color: getPartyColor(b.id) }} /> : <Minus className="h-4 w-4 text-[var(--color-border-strong)]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Transparency & Democracy */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Governance Quality</h3>
              <div className="grid gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
                {[a, b].map((party) => (
                  <div key={party.id} className="bg-[var(--color-bg-raised)] p-5">
                    <h4 className="mb-3 text-xs font-medium" style={{ color: getPartyColor(party.id) }}>{party.shortName}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--color-text-muted)]">Internal democracy</span>
                        <TransparencyBadge level={party.internalDemocracy} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--color-text-muted)]">Transparency</span>
                        <TransparencyBadge level={party.transparency} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key policies side by side */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Key Policies</h3>
              <div className="grid gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
                {[a, b].map((party) => (
                  <div key={party.id} className="bg-[var(--color-bg-raised)] p-5">
                    <h4 className="mb-3 text-xs font-medium" style={{ color: getPartyColor(party.id) }}>{party.shortName}</h4>
                    <div className="space-y-2">
                      {party.keyPolicies.map((policy, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: getPartyColor(party.id) }} />
                          <span className="text-xs text-[var(--color-text-secondary)]">{policy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contradictions */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Mapped Contradictions</h3>
              <div className="grid gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
                {[a, b].map((party) => (
                  <div key={party.id} className="bg-[var(--color-bg-raised)] p-5">
                    <h4 className="mb-3 text-xs font-medium" style={{ color: getPartyColor(party.id) }}>{party.shortName}</h4>
                    <div className="space-y-3">
                      {party.contradictions.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 rounded border border-[var(--color-border)] p-3">
                          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-severity-high)]" />
                          <span className="text-xs text-[var(--color-text-secondary)]">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Governance periods */}
            <section>
              <h3 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Governance Periods</h3>
              <div className="grid gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
                {[a, b].map((party) => (
                  <div key={party.id} className="bg-[var(--color-bg-raised)] p-5">
                    <h4 className="mb-3 text-xs font-medium" style={{ color: getPartyColor(party.id) }}>{party.shortName}</h4>
                    <div className="flex flex-wrap gap-2">
                      {party.governancePeriods.map((period, i) => (
                        <span key={i} className="rounded-md border border-[var(--color-border)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
