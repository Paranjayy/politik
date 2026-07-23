"use client";

import { useState } from "react";
import { issues } from "@/data/issues";
import type { Issue } from "@/lib/types";
import {
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Filter,
  ChevronDown,
  Eye,
  Shield,
  FileText,
  Building2,
} from "lucide-react";

type Domain = string;

const domains = ["all", ...new Set(issues.map((i) => i.domain))];
const severities = ["all", "low", "medium", "high", "critical"] as const;
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

const statusColors: Record<string, string> = {
  reported: "#a1a1aa",
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

const severityIcons: Record<string, string> = {
  low: "●",
  medium: "●●",
  high: "●●●",
  critical: "●●●●",
};

function VoteBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-xs text-[#71717a]">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#27272a]">
        <div
          className="h-full rounded-full"
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
      <span className="w-8 text-right text-xs text-[#a1a1aa]">{value}</span>
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-sm text-[#71717a] transition-colors hover:text-white"
        >
          ← Back to issues
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{
                background: `${statusColors[issue.status]}15`,
                color: statusColors[issue.status],
              }}
            >
              {issue.status}
            </span>
            <span
              className="text-xs font-medium"
              style={{
                color:
                  issue.severity === "critical"
                    ? "#ef4444"
                    : issue.severity === "high"
                      ? "#f59e0b"
                      : issue.severity === "medium"
                        ? "#3b82f6"
                        : "#71717a",
              }}
            >
              {severityIcons[issue.severity]} {issue.severity}
            </span>
            <span className="text-xs text-[#71717a]">#{issue.id}</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            {issue.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#a1a1aa]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {issue.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {issue.affectedPopulation.toLocaleString()} affected
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Reported {issue.firstReported}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-[#d4d4d8]">
                {issue.description}
              </p>
            </section>

            {/* Evidence */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Evidence ({issue.evidence.length})
              </h2>
              <div className="space-y-4">
                {issue.evidence.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-lg border border-[#27272a] bg-[#0a0a0b] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#ef4444]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#ef4444]">
                          {e.type}
                        </span>
                        <span className="text-xs text-[#71717a]">{e.date}</span>
                      </div>
                      <span
                        className="text-[10px] font-medium"
                        style={{
                          color:
                            e.confidence === "verified-fact"
                              ? "#22c55e"
                              : e.confidence === "expert-assessment"
                                ? "#3b82f6"
                                : e.confidence === "statistical-estimate"
                                  ? "#a855f7"
                                  : e.confidence === "model-inference"
                                    ? "#f59e0b"
                                    : "#a1a1aa",
                        }}
                      >
                        {e.confidence}
                      </span>
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-white">
                      {e.title}
                    </h3>
                    <p className="mb-1 text-xs text-[#71717a]">{e.source}</p>
                    <p className="text-xs leading-relaxed text-[#a1a1aa]">
                      {e.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Timeline
              </h2>
              <div className="space-y-3">
                {issue.timeline.map((t, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="h-2 w-2 rounded-full"
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
                      {i < issue.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-[#27272a]" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-xs text-[#71717a]">{t.date}</div>
                      <div className="text-sm text-[#d4d4d8]">{t.event}</div>
                      <div className="text-xs text-[#71717a]">— {t.actor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vote signals */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Signal Assessment
              </h2>
              <div className="space-y-3">
                <VoteBar label="Confirmation" value={issue.votes.confirmation} />
                <VoteBar label="Impact" value={issue.votes.impact} />
                <VoteBar label="Severity" value={issue.votes.severity} />
                <VoteBar label="Urgency" value={issue.votes.urgency} />
                <VoteBar label="Confidence" value={issue.votes.confidence} />
                <VoteBar label="Neglect" value={issue.votes.neglect} />
                <VoteBar label="Tractability" value={issue.votes.tractability} />
                <VoteBar label="Support" value={issue.votes.support} />
              </div>
            </section>

            {/* Jurisdiction */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Jurisdiction
              </h2>
              <div className="space-y-3">
                {Object.entries(issue.jurisdiction).map(([key, val]) => (
                  <div key={key}>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                      {key}
                    </div>
                    <div className="text-xs text-[#d4d4d8]">{val}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Meta */}
            <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                Details
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Domain</span>
                  <span className="text-[#d4d4d8]">{issue.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Problem type</span>
                  <span className="text-[#d4d4d8]">{issue.problemType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Recurrences</span>
                  <span className="text-[#d4d4d8]">{issue.recurrenceCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Est. cost</span>
                  <span className="text-[#d4d4d8]">
                    {issue.estimatedCost || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Reporter identity</span>
                  <span className="text-[#d4d4d8]">
                    {issue.reporterIdentity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Last updated</span>
                  <span className="text-[#d4d4d8]">{issue.lastUpdated}</span>
                </div>
              </div>
            </section>

            {/* Official responses */}
            {issue.officialResponses.length > 0 && (
              <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
                  Official Responses
                </h2>
                <div className="space-y-2">
                  {issue.officialResponses.map((r, i) => (
                    <div
                      key={i}
                      className="rounded bg-[#0a0a0b] p-3 text-xs text-[#a1a1aa]"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CivicLedgerPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [domainFilter, setDomainFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

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
    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#ef4444]" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#ef4444]">
              Civic Issue Ledger
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Public Issue Tracker
          </h1>
          <p className="max-w-2xl text-sm text-[#a1a1aa]">
            Structured, evidence-linked records of real-world problems. Each
            issue tracks location, jurisdiction, evidence, and resolution — not
            just opinions.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Total Issues",
              value: issues.length.toString(),
              color: "#a1a1aa",
            },
            {
              label: "Critical",
              value: issues
                .filter((i) => i.severity === "critical")
                .length.toString(),
              color: "#ef4444",
            },
            {
              label: "Unresolved",
              value: issues
                .filter(
                  (i) =>
                    !["resolved", "audited"].includes(i.status),
                )
                .length.toString(),
              color: "#f59e0b",
            },
            {
              label: "Avg Neglect",
              value: `${Math.round(issues.reduce((a, b) => a + b.votes.neglect, 0) / issues.length)}`,
              color: "#a855f7",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[#27272a] bg-[#18181b] p-4"
            >
              <div className="text-xs text-[#71717a]">{s.label}</div>
              <div className="mt-1 text-2xl font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181b] px-4 py-2 text-sm text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:text-white"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown
              className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-3 rounded-xl border border-[#27272a] bg-[#18181b] p-4">
              <div>
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                  Domain
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {domains.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDomainFilter(d)}
                      className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                        domainFilter === d
                          ? "bg-[#ef4444] text-white"
                          : "bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                  Severity
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {severities.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                        severityFilter === s
                          ? "bg-[#ef4444] text-white"
                          : "bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                  Status
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                        statusFilter === s
                          ? "bg-[#ef4444] text-white"
                          : "bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Issue list */}
        <div className="space-y-3">
          {filtered.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="w-full rounded-xl border border-[#27272a] bg-[#18181b] p-5 text-left transition-all hover:border-[#3f3f46] hover:bg-[#1f1f23]"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    background: `${statusColors[issue.status]}15`,
                    color: statusColors[issue.status],
                  }}
                >
                  {issue.status}
                </span>
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color:
                      issue.severity === "critical"
                        ? "#ef4444"
                        : issue.severity === "high"
                          ? "#f59e0b"
                          : issue.severity === "medium"
                            ? "#3b82f6"
                            : "#71717a",
                  }}
                >
                  {severityIcons[issue.severity]} {issue.severity}
                </span>
                <span className="text-[10px] text-[#71717a]">
                  {issue.domain}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-white">
                {issue.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#71717a]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {issue.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {issue.affectedPopulation.toLocaleString()} affected
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {issue.evidence.length} evidence items
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {issue.lastUpdated}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
