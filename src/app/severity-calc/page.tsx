"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Calculator, Info } from "lucide-react";

const severityWeights = {
  confirmation: { label: "Confirmation", desc: "Have you personally observed this?", weight: 1.0 },
  impact: { label: "Impact", desc: "How many people are affected?", weight: 1.2 },
  severity: { label: "Severity", desc: "How harmful is the issue?", weight: 1.5 },
  urgency: { label: "Urgency", desc: "How quickly must action occur?", weight: 1.3 },
  confidence: { label: "Confidence", desc: "How strong is the evidence?", weight: 1.0 },
  neglect: { label: "Neglect", desc: "How long has it been unresolved?", weight: 0.8 },
  tractability: { label: "Tractability", desc: "Can intervention address it?", weight: 0.7 },
  support: { label: "Support", desc: "Do people endorse the solution?", weight: 0.5 },
};

function getSeverityLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Critical", color: "var(--color-severity-critical)" };
  if (score >= 60) return { label: "High", color: "var(--color-severity-high)" };
  if (score >= 40) return { label: "Medium", color: "var(--color-severity-medium)" };
  return { label: "Low", color: "var(--color-severity-low)" };
}

function getScoreInterpretation(score: number): string {
  if (score >= 80) return "This issue scores as critical priority. It requires immediate attention from responsible institutions and sustained community pressure.";
  if (score >= 60) return "This issue scores as high priority. It should be escalated to jurisdictional authorities with documented evidence.";
  if (score >= 40) return "This issue scores as medium priority. Continue monitoring and gather additional evidence to strengthen the case.";
  return "This issue scores as low priority. Document for reference but focus resources on higher-impact issues.";
}

export default function SeverityCalcPage() {
  const [signals, setSignals] = useState({
    confirmation: 50,
    impact: 50,
    severity: 50,
    urgency: 50,
    confidence: 50,
    neglect: 50,
    tractability: 50,
    support: 50,
  });

  const weightedScore = useMemo(() => {
    let totalWeight = 0;
    let totalScore = 0;
    Object.entries(signals).forEach(([key, value]) => {
      const config = severityWeights[key as keyof typeof severityWeights];
      totalWeight += config.weight;
      totalScore += value * config.weight;
    });
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }, [signals]);

  const severity = getSeverityLevel(weightedScore);

  const updateSignal = (key: string, value: number) => {
    setSignals((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSignals({
      confirmation: 50,
      impact: 50,
      severity: 50,
      urgency: 50,
      confidence: 50,
      neglect: 50,
      tractability: 50,
      support: 50,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Severity Calculator</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Calculate composite severity scores using Politik&apos;s 8-signal vote system
          </p>
        </div>

        {/* How it works */}
        <div className="mb-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-severity-medium)]" />
            <div>
              <h3 className="text-xs font-medium text-[var(--color-text)]">How it works</h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                Each signal is scored 0-100 and weighted by its relevance to civic impact. The composite score determines severity classification: Critical (80+), High (60-79), Medium (40-59), Low (0-39).
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Sliders */}
          <div className="space-y-6">
            {Object.entries(severityWeights).map(([key, config]) => (
              <div key={key}>
                <div className="mb-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-medium text-[var(--color-text)]">{config.label}</span>
                    <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">×{config.weight}</span>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">
                    {signals[key as keyof typeof signals]}
                  </span>
                </div>
                <p className="mb-2 text-[10px] text-[var(--color-text-muted)]">{config.desc}</p>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={signals[key as keyof typeof signals]}
                    onChange={(e) => updateSignal(key, Number(e.target.value))}
                    className="w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-surface)]"
                    style={{
                      height: "6px",
                      background: `linear-gradient(to right, ${severity.color} ${signals[key as keyof typeof signals]}%, var(--color-bg-surface) ${signals[key as keyof typeof signals]}%)`,
                    }}
                  />
                  <div className="mt-1 flex justify-between font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Score panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
              <div className="mb-4 text-center">
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Composite Score
                </span>
                <div className="mt-2 text-5xl font-bold font-[family-name:var(--font-mono)]" style={{ color: severity.color }}>
                  {weightedScore}
                </div>
                <div className="mt-1 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${severity.color}15`, color: severity.color }}>
                  {severity.label}
                </div>
              </div>

              <div className="mb-4 h-px bg-[var(--color-border)]" />

              <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {getScoreInterpretation(weightedScore)}
              </p>

              {/* Weight breakdown */}
              <div className="space-y-1.5">
                {Object.entries(signals).map(([key, value]) => {
                  const config = severityWeights[key as keyof typeof severityWeights];
                  const contribution = Math.round((value * config.weight) / Object.values(signals).reduce((sum, v, i) => {
                    const w = Object.values(severityWeights)[i].weight;
                    return sum + v * w;
                  }, 0) * 100);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className="w-20 text-[9px] text-[var(--color-text-muted)] truncate">{config.label}</span>
                      <div className="flex-1 h-1 rounded bg-[var(--color-bg-surface)] overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${contribution}%`, backgroundColor: severity.color }} />
                      </div>
                      <span className="w-8 text-right font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{contribution}%</span>
                    </div>
                  );
                })}
              </div>

              <button onClick={resetAll}
                className="mt-4 w-full rounded border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
                Reset to defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
