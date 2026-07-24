"use client";

import { useState } from "react";
import { issues } from "@/data/issues";
import type { Issue } from "@/lib/types";
import {
  FileText,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const statusColors: Record<string, string> = {
  reported: "#71717a",
  triaged: "#f59e0b",
  "evidence-requested": "#f59e0b",
  verified: "#22c55e",
  deduplicated: "#06b6d4",
  classified: "#06b6d4",
  "jurisdiction-assigned": "#3b82f6",
  "response-requested": "#a855f7",
  "intervention-proposed": "#a855f7",
  funded: "#22c55e",
  "in-progress": "#3b82f6",
  "partially-resolved": "#22c55e",
  resolved: "#22c55e",
  audited: "#06b6d4",
  reopened: "#ef4444",
};

const severityWeight: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const severityColor: Record<string, string> = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#71717a",
};

function VoteBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-[10px] text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className="h-1 flex-1 overflow-hidden bg-[var(--color-border)]">
        <div
          className="h-full transition-all"
          style={{
            width: `${value}%`,
            background:
              value > 80
                ? "#ef4444"
                : value > 60
                  ? "#f59e0b"
                  : value > 40
                    ? "#3b82f6"
                    : "#71717a",
          }}
        />
      </div>
      <span className="w-6 text-right font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
        {value}
      </span>
    </div>
  );
}

function IssueDetail({
  issue,
  onBack,
}: {
  issue: Issue;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          All issues
        </button>

        {/* Header - asymmetric layout */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="rounded px-2 py-0.5 text-[10px] font-medium font-[family-name:var(--font-mono)]"
                style={{
                  background: `${statusColors[issue.status]}15`,
                  color: statusColors[issue.status],
                }}
              >
                {issue.status}
              </span>
              <span
                className={`text-[10px] font-medium font-[family-name:var(--font-mono)] ${issue.severity === "critical" ? "severity-critical" : ""}`}
                style={{ color: severityColor[issue.severity] }}
              >
                {issue.severity.toUpperCase()}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {issue.id}
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
              {issue.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {issue.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {issue.affectedPopulation.toLocaleString()} affected
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {issue.firstReported}
              </span>
            </div>
          </div>

          {/* Right sidebar - quick stats */}
          <div className="flex flex-col gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
            {[
              { label: "Domain", value: issue.domain },
              { label: "Severity", value: issue.severity },
              { label: "Urgency", value: issue.urgency },
              { label: "Recurrences", value: `${issue.recurrenceCount}x` },
              { label: "Evidence", value: `${issue.evidence.length} items` },
              { label: "Est. cost", value: issue.estimatedCost || "Unknown" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between bg-[var(--color-bg-raised)] px-4 py-3"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {s.label}
                </span>
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Description */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {issue.description}
              </p>
            </section>

            {/* Evidence chain */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Evidence chain ({issue.evidence.length})
              </h2>
              <div className="space-y-3">
                {issue.evidence.map((e) => (
                  <div
                    key={e.id}
                    className="border-l-2 border-[var(--color-border)] pl-4 transition-colors hover:border-[var(--color-accent)]"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                        {e.date}
                      </span>
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] font-medium font-[family-name:var(--font-mono)]"
                        style={{
                          background:
                            e.confidence === "verified-fact"
                              ? "#22c55e15"
                              : e.confidence === "expert-assessment"
                                ? "#3b82f615"
                                : e.confidence === "statistical-estimate"
                                  ? "#a855f715"
                                  : "#71717a15",
                          color:
                            e.confidence === "verified-fact"
                              ? "#22c55e"
                              : e.confidence === "expert-assessment"
                                ? "#3b82f6"
                                : e.confidence === "statistical-estimate"
                                  ? "#a855f7"
                                  : "#71717a",
                        }}
                      >
                        {e.confidence}
                      </span>
                      <span className="rounded bg-[var(--color-border)] px-1.5 py-0.5 text-[9px] text-[var(--color-text-muted)]">
                        {e.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--color-text)]">
                      {e.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                      {e.source}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {e.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Timeline
              </h2>
              <div className="relative ml-2 border-l border-[var(--color-border)]">
                {issue.timeline.map((t, i) => (
                  <div key={i} className="relative mb-4 pl-6">
                    <div
                      className="absolute left-0 top-1 h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full"
                      style={{
                        background:
                          t.type === "report"
                            ? "#a1a1aa"
                            : t.type === "response"
                              ? "#a855f7"
                              : t.type === "action"
                                ? "#3b82f6"
                                : t.type === "verification"
                                  ? "#22c55e"
                                  : "#f59e0b",
                      }}
                    />
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {t.date}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {t.event}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      {t.actor}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Vote signals */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Signal assessment
              </h2>
              <div className="space-y-2.5">
                <VoteBar label="Confirm" value={issue.votes.confirmation} />
                <VoteBar label="Impact" value={issue.votes.impact} />
                <VoteBar label="Severity" value={issue.votes.severity} />
                <VoteBar label="Urgency" value={issue.votes.urgency} />
                <VoteBar label="Evidence" value={issue.votes.confidence} />
                <VoteBar label="Neglect" value={issue.votes.neglect} />
                <VoteBar label="Fixable" value={issue.votes.tractability} />
                <VoteBar label="Support" value={issue.votes.support} />
              </div>
            </section>

            {/* Jurisdiction */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Jurisdiction
              </h2>
              <div className="space-y-3">
                {Object.entries(issue.jurisdiction).map(([key, val]) => (
                  <div key={key}>
                    <div className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {key}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Official responses */}
            {issue.officialResponses.length > 0 && (
              <section>
                <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Official responses
                </h2>
                <div className="space-y-2">
                  {issue.officialResponses.map((r, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-[var(--color-severity-medium)] pl-3 text-xs text-[var(--color-text-secondary)]"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reporter info */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Reporter
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      issue.reporterIdentity === "public-verified"
                        ? "#22c55e"
                        : issue.reporterIdentity === "verified-pseudonym"
                          ? "#f59e0b"
                          : issue.reporterIdentity === "anonymous"
                            ? "#ef4444"
                            : "#3b82f6",
                  }}
                />
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {issue.reporterIdentity}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const domains = ["all", ...new Set(issues.map((i) => i.domain))];
const severities = ["all", "critical", "high", "medium", "low"] as const;
const statuses = [
  "all",
  "reported",
  "triaged",
  "verified",
  "jurisdiction-assigned",
  "response-requested",
  "in-progress",
  "resolved",
  "reopened",
] as const;

export default function CivicLedgerPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [domainFilter, setDomainFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  if (selectedIssue) {
    return (
      <IssueDetail
        issue={selectedIssue}
        onBack={() => setSelectedIssue(null)}
      />
    );
  }

  const filtered = issues.filter((i) => {
    if (domainFilter !== "all" && i.domain !== domainFilter) return false;
    if (severityFilter !== "all" && i.severity !== severityFilter) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (
      search &&
      !i.title.toLowerCase().includes(search.toLowerCase()) &&
      !i.location.toLowerCase().includes(search.toLowerCase()) &&
      !i.id.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                Civic Issue Ledger
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Public Issue Tracker
            </h1>
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
            {filtered.length} of {issues.length} issues
          </div>
        </div>

        {/* Search + Filters row */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] py-2 pl-9 pr-4 text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-strong)] focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
          >
            <Filter className="h-3 w-3" />
            Filter
            <ChevronDown
              className={`h-2.5 w-2.5 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-6 flex flex-wrap gap-4 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
            <div>
              <div className="mb-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                Domain
              </div>
              <div className="flex flex-wrap gap-1">
                {domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomainFilter(d)}
                    className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                      domainFilter === d
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-strong)]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                Severity
              </div>
              <div className="flex flex-wrap gap-1">
                {severities.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverityFilter(s)}
                    className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                      severityFilter === s
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-strong)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                Status
              </div>
              <div className="flex flex-wrap gap-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                      statusFilter === s
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-strong)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Issue list - NO cards, data-dense rows */}
        <div className="divide-y divide-[var(--color-border)]">
          {filtered.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="group flex w-full items-start gap-4 py-4 text-left transition-colors hover:bg-[var(--color-bg-raised)] -mx-4 px-4"
            >
              {/* Severity indicator bar */}
              <div className="mt-1 flex w-1 shrink-0 items-center justify-center">
                <div
                  className={`h-8 w-0.5 ${issue.severity === "critical" ? "severity-critical" : ""}`}
                  style={{ background: severityColor[issue.severity] }}
                />
              </div>

              {/* Main content */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-medium font-[family-name:var(--font-mono)]"
                    style={{
                      background: `${statusColors[issue.status]}15`,
                      color: statusColors[issue.status],
                    }}
                  >
                    {issue.status}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                    {issue.domain}
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                  {issue.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {issue.district}, {issue.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-2.5 w-2.5" />
                    {issue.affectedPopulation.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    {issue.evidence.length} evidence
                  </span>
                  <span>{issue.recurrenceCount}x recurring</span>
                </div>
              </div>

              {/* Right side - quick metrics */}
              <div className="hidden shrink-0 items-center gap-4 sm:flex">
                {/* Neglect indicator */}
                <div className="text-right">
                  <div className="text-[9px] text-[var(--color-text-muted)]">
                    Neglect
                  </div>
                  <div
                    className="font-[family-name:var(--font-mono)] text-sm font-bold"
                    style={{
                      color:
                        issue.votes.neglect > 80
                          ? "#ef4444"
                          : issue.votes.neglect > 60
                            ? "#f59e0b"
                            : "#71717a",
                    }}
                  >
                    {issue.votes.neglect}
                  </div>
                </div>

                {/* Severity dots */}
                <div className="text-right">
                  <div className="text-[9px] text-[var(--color-text-muted)]">
                    Severity
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((dot) => (
                      <div
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            dot <= severityWeight[issue.severity]
                              ? severityColor[issue.severity]
                              : "#27272a",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
            No issues match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
