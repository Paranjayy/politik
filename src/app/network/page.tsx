"use client";

import { useMemo, useState } from "react";
import { issues } from "@/data/issues";
import { parties } from "@/data/parties";
import { crossReferences } from "@/data/cross-references";
import { ArrowRight, Link2, Building2, FileText } from "lucide-react";
import Link from "next/link";

const partyColors: Record<string, string> = {
  bjp: "#ff6b00",
  inc: "#00bfff",
  aap: "#0066ff",
  tmc: "#00aa55",
  left: "#dc143c",
};

const relevanceColors: Record<string, string> = {
  direct: "#ef4444",
  indirect: "#f59e0b",
  tangential: "#71717a",
};

type ViewMode = "graph" | "list";

export default function NetworkPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const nodes = useMemo(() => {
    const partyNodes = parties.map((p) => ({
      id: p.id,
      type: "party" as const,
      label: p.shortName,
      fullLabel: p.name,
      color: partyColors[p.id] || "#71717a",
      connections: crossReferences.filter((cr) => cr.partyId === p.id).length,
    }));

    const issueNodes = issues.map((i) => ({
      id: i.id,
      type: "issue" as const,
      label: i.id,
      fullLabel: i.title,
      color: "var(--color-accent)",
      connections: crossReferences.filter((cr) => cr.issueId === i.id).length,
    }));

    return [...partyNodes, ...issueNodes];
  }, []);

  const edges = useMemo(() => {
    return crossReferences.map((cr) => ({
      from: cr.partyId,
      to: cr.issueId,
      relevance: cr.relevance,
      connection: cr.connection,
    }));
  }, []);

  const filteredEdges = useMemo(() => {
    let result = edges;
    if (selectedParty) result = result.filter((e) => e.from === selectedParty);
    if (selectedIssue) result = result.filter((e) => e.to === selectedIssue);
    return result;
  }, [edges, selectedParty, selectedIssue]);

  const filteredNodes = useMemo(() => {
    const connectedIds = new Set(filteredEdges.flatMap((e) => [e.from, e.to]));
    if (filteredEdges.length === 0) return nodes;
    return nodes.filter((n) => connectedIds.has(n.id));
  }, [nodes, filteredEdges]);

  const partyNodes = filteredNodes.filter((n) => n.type === "party");
  const issueNodes = filteredNodes.filter((n) => n.type === "issue");

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Network Explorer</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Visualize connections between {parties.length} parties and {issues.length} issues through {crossReferences.length} cross-references
          </p>
        </div>

        {/* View mode + filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 rounded-md border border-[var(--color-border)] p-0.5">
            <button onClick={() => setViewMode("graph")}
              className={`rounded px-3 py-1 text-xs transition-colors ${viewMode === "graph" ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
              Graph
            </button>
            <button onClick={() => setViewMode("list")}
              className={`rounded px-3 py-1 text-xs transition-colors ${viewMode === "list" ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
              List
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--color-border)]" />

          {/* Party filters */}
          <div className="flex flex-wrap gap-1.5">
            {parties.map((p) => (
              <button key={p.id} onClick={() => setSelectedParty(selectedParty === p.id ? null : p.id)}
                className={`rounded-full border px-3 py-1 text-[10px] font-medium transition-all ${
                  selectedParty === p.id
                    ? "border-transparent text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                }`}
                style={selectedParty === p.id ? { backgroundColor: partyColors[p.id] } : {}}>
                {p.shortName}
              </button>
            ))}
          </div>

          {(selectedParty || selectedIssue) && (
            <button onClick={() => { setSelectedParty(null); setSelectedIssue(null); }}
              className="text-[10px] text-[var(--color-accent)] hover:underline">Clear filters</button>
          )}
        </div>

        {viewMode === "graph" ? (
          /* Graph view */
          <div className="grid gap-8 lg:grid-cols-[200px_1fr_200px]">
            {/* Party nodes */}
            <div className="space-y-2">
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Parties</h3>
              {partyNodes.map((node) => (
                <button key={node.id} onClick={() => setSelectedParty(selectedParty === node.id ? null : node.id)}
                  className={`flex w-full items-center gap-2 rounded-lg border p-3 text-left transition-all ${
                    selectedParty === node.id
                      ? "border-current bg-current/5"
                      : "border-[var(--color-border)] bg-[var(--color-bg-raised)] hover:border-[var(--color-border-strong)]"
                  }`}
                  style={{ borderColor: selectedParty === node.id ? node.color : undefined }}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: node.color }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-[var(--color-text)]">{node.label}</span>
                    <span className="ml-1.5 font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{node.connections}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Center - connections visualization */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Connections ({filteredEdges.length})
                </span>
              </div>

              {/* Connection cards */}
              <div className="space-y-3">
                {filteredEdges.map((edge, i) => {
                  const party = parties.find((p) => p.id === edge.from);
                  const issue = issues.find((iss) => iss.id === edge.to);
                  if (!party || !issue) return null;

                  return (
                    <div key={i} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded px-1.5 py-0.5 text-[9px] font-medium text-white" style={{ backgroundColor: partyColors[edge.from] || "#71717a" }}>
                          {party.shortName}
                        </span>
                        <Link2 className="h-3 w-3" style={{ color: relevanceColors[edge.relevance] }} />
                        <Link href={`/civic-ledger/debate/${edge.to}`}
                          className="rounded px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-accent)] hover:underline">
                          {edge.to}
                        </Link>
                        <span className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-medium capitalize"
                          style={{ backgroundColor: `${relevanceColors[edge.relevance]}15`, color: relevanceColors[edge.relevance] }}>
                          {edge.relevance}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">{edge.connection}</p>
                    </div>
                  );
                })}

                {filteredEdges.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-sm text-[var(--color-text-muted)]">Select a party or issue to view connections</p>
                  </div>
                )}
              </div>
            </div>

            {/* Issue nodes */}
            <div className="space-y-2">
              <h3 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">Issues</h3>
              {issueNodes.map((node) => (
                <Link key={node.id} href={`/civic-ledger/debate/${node.id}`}
                  className={`flex w-full items-center gap-2 rounded-lg border p-3 transition-all ${
                    selectedIssue === node.id
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-bg-raised)] hover:border-[var(--color-border-strong)]"
                  }`}>
                  <FileText className="h-3 w-3 text-[var(--color-accent)]" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">{node.label}</span>
                    <span className="ml-1.5 font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">{node.connections}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* List view */
          <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
            <div className="grid grid-cols-[140px_80px_1fr_80px] gap-px bg-[var(--color-border)]">
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">Party</div>
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">Issue</div>
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">Connection</div>
              <div className="bg-[var(--color-bg-raised)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">Relevance</div>
              {filteredEdges.map((edge, i) => {
                const party = parties.find((p) => p.id === edge.from);
                return (
                  <div key={i} className="contents">
                    <div className="bg-[var(--color-bg)] px-4 py-3">
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: partyColors[edge.from] || "#71717a" }}>
                        {party?.shortName}
                      </span>
                    </div>
                    <div className="bg-[var(--color-bg)] px-4 py-3">
                      <Link href={`/civic-ledger/debate/${edge.to}`} className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)] hover:underline">{edge.to}</Link>
                    </div>
                    <div className="bg-[var(--color-bg)] px-4 py-3 text-xs text-[var(--color-text-secondary)] line-clamp-2">{edge.connection}</div>
                    <div className="bg-[var(--color-bg)] px-4 py-3">
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-medium capitalize" style={{ backgroundColor: `${relevanceColors[edge.relevance]}15`, color: relevanceColors[edge.relevance] }}>{edge.relevance}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
