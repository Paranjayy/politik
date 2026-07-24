"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { issues } from "@/data/issues";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";

const endpoints = [
  {
    method: "GET",
    path: "/api/issues",
    description: "List all tracked civic issues",
    params: [
      { name: "severity", type: "string", desc: "Filter by severity: critical, high, medium, low" },
      { name: "domain", type: "string", desc: "Filter by domain: sanitation, water, education, etc." },
      { name: "country", type: "string", desc: "Filter by country name" },
      { name: "status", type: "string", desc: "Filter by issue status" },
      { name: "sort", type: "string", desc: "Sort by: severity, neglect, affected, date" },
    ],
    response: `{
  "data": [...],
  "total": ${issues.length},
  "filters": { "severity": null, "domain": null }
}`,
  },
  {
    method: "GET",
    path: "/api/issues/:id",
    description: "Get a single issue by ID with full evidence chain and timeline",
    params: [
      { name: "id", type: "string", desc: "Issue ID (e.g., ISS-001)", required: true },
    ],
    response: `{
  "id": "ISS-001",
  "title": "...",
  "severity": "high",
  "evidence": [...],
  "timeline": [...],
  "jurisdiction": {...}
}`,
  },
  {
    method: "GET",
    path: "/api/countries",
    description: "List all country reports with 7-dimension data",
    params: [
      { name: "trajectory", type: "string", desc: "Filter by trajectory: improving, stagnating, deteriorating" },
    ],
    response: `{
  "data": [...],
  "total": ${countries.length}
}`,
  },
  {
    method: "GET",
    path: "/api/parties",
    description: "List all political party profiles",
    params: [
      { name: "country", type: "string", desc: "Filter by country" },
    ],
    response: `{
  "data": [...],
  "total": ${parties.length}
}`,
  },
  {
    method: "GET",
    path: "/api/stats",
    description: "Get aggregated statistics across all data",
    params: [],
    response: `{
  "totalIssues": ${issues.length},
  "totalCountries": ${countries.length},
  "totalParties": ${parties.length},
  "severityBreakdown": {...},
  "domainBreakdown": {...}
}`,
  },
  {
    method: "GET",
    path: "/api/export",
    description: "Export all data in JSON format",
    params: [
      { name: "format", type: "string", desc: "Export format: json (default)" },
    ],
    response: `{
  "issues": [...],
  "countries": [...],
  "parties": [...],
  "protests": [...],
  "crossReferences": [...]
}`,
  },
];

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
  POST: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6" },
  PUT: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
  DELETE: { bg: "rgba(239,68,68,0.15)", text: "#ef4444" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 rounded border border-[var(--color-border)] px-2 py-1 text-[9px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
      {copied ? <Check className="h-2.5 w-2.5 text-[var(--color-status-verified)]" /> : <Copy className="h-2.5 w-2.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ApiDocsPage() {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">API Documentation</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Programmatic access to Politik data. All data is open and freely redistributable under CC BY 4.0.
          </p>
        </div>

        {/* Base URL */}
        <div className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
          <h3 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Base URL</h3>
          <div className="flex items-center gap-3">
            <code className="flex-1 rounded bg-[var(--color-bg)] px-3 py-2 font-[family-name:var(--font-mono)] text-sm text-[var(--color-accent)]">
              https://politik-iota.vercel.app
            </code>
            <CopyButton text="https://politik-iota.vercel.app" />
          </div>
        </div>

        {/* Quick start */}
        <div className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
          <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Quick Start</h3>
          <div className="space-y-3">
            <div>
              <span className="mb-1 block text-[10px] text-[var(--color-text-muted)]">Fetch all issues</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-[var(--color-bg)] px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                  curl https://politik-iota.vercel.app/api/issues
                </code>
                <CopyButton text="curl https://politik-iota.vercel.app/api/issues" />
              </div>
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-[var(--color-text-muted)]">JavaScript / Node.js</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-[var(--color-bg)] px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                  const res = await fetch(&apos;/api/issues?severity=critical&apos;); const data = await res.json();
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-4">
          {endpoints.map((ep) => {
            const mc = methodColors[ep.method] || methodColors.GET;
            const isExpanded = expandedEndpoint === ep.path;
            return (
              <div key={ep.path} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <button onClick={() => setExpandedEndpoint(isExpanded ? null : ep.path)}
                  className="flex w-full items-center gap-3 bg-[var(--color-bg-raised)] p-4 text-left transition-colors hover:bg-[var(--color-bg-surface)]">
                  <span className="rounded px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-bold" style={{ backgroundColor: mc.bg, color: mc.text }}>
                    {ep.method}
                  </span>
                  <code className="flex-1 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text)]">{ep.path}</code>
                  <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">{ep.description}</span>
                </button>
                {isExpanded && (
                  <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] p-5">
                    <p className="mb-4 text-xs text-[var(--color-text-secondary)]">{ep.description}</p>
                    {ep.params.length > 0 && (
                      <div className="mb-4">
                        <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Parameters</h4>
                        <div className="divide-y divide-[var(--color-border)] rounded border border-[var(--color-border)]">
                          {ep.params.map((p) => (
                            <div key={p.name} className="flex items-center gap-3 px-3 py-2">
                              <code className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-accent)]">{p.name}</code>
                              <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{p.type}</span>
                              <span className="flex-1 text-xs text-[var(--color-text-secondary)]">{p.desc}</span>
                              {p.required && <span className="text-[9px] text-[var(--color-accent)]">required</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="mb-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Response</h4>
                      <pre className="overflow-x-auto rounded bg-[var(--color-bg-raised)] p-3 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                        {ep.response}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rate limits note */}
        <div className="mt-10 rounded-lg border border-[var(--color-border)] p-5">
          <h3 className="mb-2 text-xs font-medium text-[var(--color-text)]">Rate Limits & Usage</h3>
          <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
            This is a static data platform — all responses are pre-rendered. There are no rate limits. Use the data however you want under CC BY 4.0. If you build something cool with it, a link back to Politik would be appreciated.
          </p>
        </div>
      </div>
    </div>
  );
}
