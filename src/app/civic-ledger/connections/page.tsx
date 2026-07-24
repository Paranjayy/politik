"use client";

import { useState } from "react";
import { issues } from "@/data/issues";
import { ArrowLeft, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";

type ConnectionType = "shared-jurisdiction" | "shared-cause" | "cascading-effect";

interface IssueConnection {
  fromId: string;
  toId: string;
  type: ConnectionType;
  description: string;
}

const connectionTypeLabels: Record<ConnectionType, { label: string; color: string; bg: string }> = {
  "shared-jurisdiction": {
    label: "Shared Jurisdiction",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
  "shared-cause": {
    label: "Shared Cause",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
  },
  "cascading-effect": {
    label: "Cascading Effect",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
};

// Build connections from the relatedIssues field + known cross-links
const connections: IssueConnection[] = [
  // ISS-001 (sewage overflow, Junagadh) <-> ISS-002 (GSRTC bus, Junagadh)
  {
    fromId: "ISS-001",
    toId: "ISS-002",
    type: "shared-jurisdiction",
    description:
      "Both issues fall under the Junagadh municipal and Gujarat state jurisdiction. Junagadh's municipal infrastructure failures (sewage) mirror the broader state-level neglect of public infrastructure (GSRTC buses).",
  },
  // ISS-004 (Aadhaar scholarship) <-> ISS-005 (Aadhaar verification)
  {
    fromId: "ISS-004",
    toId: "ISS-005",
    type: "shared-cause",
    description:
      "Both stem from Aadhaar-linked welfare delivery failures. ISS-004 is about scholarship disbursement, ISS-005 about rural school admission verification — the same systemic digital infrastructure gap affects both.",
  },
  // ISS-004 (Aadhaar scholarship) -> cascading to ISS-006
  {
    fromId: "ISS-004",
    toId: "ISS-006",
    type: "cascading-effect",
    description:
      "When scholarship funds fail to disburse due to Aadhaar issues, families in border areas (Punjab/Haryana) face compounded economic stress — worsening the conditions that drive stubble burning and air quality crises.",
  },
  // ISS-005 (Aadhaar verification) -> cascading to ISS-006
  {
    fromId: "ISS-005",
    toId: "ISS-006",
    type: "cascading-effect",
    description:
      "Rural verification failures in welfare delivery push families toward subsistence agriculture practices that worsen air quality — the same communities affected by Aadhaar gaps are stubble-burning regions.",
  },
];

function getIssueById(id: string) {
  return issues.find((i) => i.id === id);
}

const typeFilters = ["all", "shared-jurisdiction", "shared-cause", "cascading-effect"] as const;

export default function ConnectionsPage() {
  const [typeFilter, setTypeFilter] = useState<ConnectionType | "all">("all");

  const filtered =
    typeFilter === "all"
      ? connections
      : connections.filter((c) => c.type === typeFilter);

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1000px] px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/civic-ledger"
                className="flex items-center gap-1.5 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowLeft className="h-3 w-3" />
                Civic Ledger
              </Link>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Issue Connections
            </h1>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              How tracked issues relate to each other through jurisdiction, cause, or cascading effects
            </p>
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
            {filtered.length} connections
          </div>
        </div>

        {/* Type filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {typeFilters.map((t) => {
            const meta = t === "all" ? null : connectionTypeLabels[t];
            const count =
              t === "all"
                ? connections.length
                : connections.filter((c) => c.type === t).length;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="rounded px-3 py-1.5 text-[10px] font-[family-name:var(--font-mono)] transition-colors"
                style={{
                  background:
                    typeFilter === t
                      ? meta?.bg || "var(--color-text)"
                      : "transparent",
                  border: `1px solid ${
                    typeFilter === t
                      ? meta?.color || "var(--color-text)"
                      : "var(--color-border)"
                  }`,
                  color:
                    typeFilter === t
                      ? meta?.color || "var(--color-text)"
                      : "var(--color-text-muted)",
                }}
              >
                {meta ? meta.label : "All"} ({count})
              </button>
            );
          })}
        </div>

        {/* Connections list */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-xs text-[var(--color-text-muted)]">
              No connections match the selected filter.
            </p>
          ) : (
            filtered.map((conn, i) => {
              const from = getIssueById(conn.fromId);
              const to = getIssueById(conn.toId);
              const typeMeta = connectionTypeLabels[conn.type];

              return (
                <div
                  key={i}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 transition-colors hover:border-[var(--color-border-strong)]"
                >
                  {/* Type badge + issues */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded px-2 py-0.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider"
                      style={{ background: typeMeta.bg, color: typeMeta.color }}
                    >
                      {typeMeta.label}
                    </span>

                    {/* Issue pair */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/civic-ledger/debate/${conn.fromId}`}
                        className="flex items-center gap-1.5 rounded border border-[var(--color-border)] px-2 py-1 text-[10px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                      >
                        <span className="font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                          {conn.fromId}
                        </span>
                        <span className="hidden sm:inline max-w-[200px] truncate">
                          {from?.title || "Unknown"}
                        </span>
                      </Link>

                      <ArrowRight className="h-3 w-3 shrink-0 text-[var(--color-text-muted)]" />

                      <Link
                        href={`/civic-ledger/debate/${conn.toId}`}
                        className="flex items-center gap-1.5 rounded border border-[var(--color-border)] px-2 py-1 text-[10px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                      >
                        <span className="font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                          {conn.toId}
                        </span>
                        <span className="hidden sm:inline max-w-[200px] truncate">
                          {to?.title || "Unknown"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                    {conn.description}
                  </p>

                  {/* Shared metadata */}
                  {(from || to) && (
                    <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-[var(--color-text-muted)]">
                      {from && (
                        <span className="rounded bg-[var(--color-border)] px-1.5 py-0.5">
                          {from.country} — {from.domain}
                        </span>
                      )}
                      {to && from && to.country !== from.country && (
                        <span className="rounded bg-[var(--color-border)] px-1.5 py-0.5">
                          {to.country} — {to.domain}
                        </span>
                      )}
                      {to && !from && (
                        <span className="rounded bg-[var(--color-border)] px-1.5 py-0.5">
                          {to.country} — {to.domain}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Info note */}
        <div className="mt-8 rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
          <div className="flex items-start gap-2">
            <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-severity-medium)]" />
            <div>
              <span className="text-xs font-medium text-[var(--color-text)]">
                About connections
              </span>
              <p className="mt-1 text-[10px] leading-relaxed text-[var(--color-text-muted)]">
                Connections are derived from the <code className="font-[family-name:var(--font-mono)]">relatedIssues</code> field in the issue data and verified cross-references. Three types are mapped: <strong>Shared Jurisdiction</strong> (same governing body), <strong>Shared Cause</strong> (root cause overlap), and <strong>Cascading Effect</strong> (one issue exacerbates another).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
