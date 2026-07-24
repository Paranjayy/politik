"use client";

import { useState } from "react";
import { issues } from "@/data/issues";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";
import { protests } from "@/data/protests";
import { debates } from "@/data/debates";
import { globalProtests } from "@/data/global-protests";
import { crossReferences } from "@/data/cross-references";
import { Download, FileJson, FileText, Check } from "lucide-react";

type DataType = "issues" | "countries" | "parties" | "protests" | "debates" | "global-protests" | "cross-references" | "all";

const datasets: { key: DataType; label: string; description: string; count: number; color: string }[] = [
  { key: "issues", label: "Issues", description: "All tracked civic issues with evidence, votes, timelines", count: issues.length, color: "var(--color-accent)" },
  { key: "countries", label: "Country Reports", description: "7-dimension country analysis reports", count: countries.length, color: "var(--color-severity-medium)" },
  { key: "parties", label: "Party Profiles", description: "Political party profiles with contradictions", count: parties.length, color: "#a855f7" },
  { key: "protests", label: "Protests", description: "Detailed protest event timelines", count: protests.length, color: "var(--color-status-verified)" },
  { key: "debates", label: "Steelman Debates", description: "Structured debate positions with evidence", count: Object.keys(debates).length, color: "var(--color-severity-high)" },
  { key: "global-protests", label: "Global Protest Wiki", description: "61 protests from 29 countries", count: globalProtests.length, color: "#06b6d4" },
  { key: "cross-references", label: "Cross-References", description: "Party-issue connections and governance links", count: crossReferences.length, color: "#f59e0b" },
];

function getDataForType(type: DataType) {
  switch (type) {
    case "issues": return issues;
    case "countries": return countries;
    case "parties": return parties;
    case "protests": return protests;
    case "debates": return debates;
    case "global-protests": return globalProtests;
    case "cross-references": return crossReferences;
    case "all": return { issues, countries, parties, protests, debates, globalProtests, crossReferences };
    default: return [];
  }
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
        return `"${str.replace(/"/g, '""')}"`;
      }).join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportPage() {
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleExport = (type: DataType, format: "json" | "csv") => {
    const data = getDataForType(type);
    const filename = `politik-${type}-${new Date().toISOString().split("T")[0]}`;

    if (format === "json") {
      downloadJSON(data, `${filename}.json`);
    } else {
      const flat = Array.isArray(data) ? data : [data];
      downloadCSV(flat as Record<string, unknown>[], `${filename}.csv`);
    }

    setDownloaded((prev) => new Set([...prev, `${type}-${format}`]));
    setTimeout(() => {
      setDownloaded((prev) => {
        const next = new Set(prev);
        next.delete(`${type}-${format}`);
        return next;
      });
    }, 2000);
  };

  const totalRecords = datasets.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Data Export</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Download structured data in JSON or CSV format. All data is open and freely redistributable.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-px rounded-lg border border-[var(--color-border)] bg-[var(--color-border)]">
          <div className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">Datasets</span>
            <span className="text-xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">{datasets.length}</span>
          </div>
          <div className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">Total records</span>
            <span className="text-xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">{totalRecords}</span>
          </div>
          <div className="flex flex-col gap-1 bg-[var(--color-bg-raised)] px-5 py-4">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">Formats</span>
            <span className="text-xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-text)]">JSON, CSV</span>
          </div>
        </div>

        {/* Export all */}
        <div className="mb-8 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Export all data</h3>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">Download everything in a single JSON file ({totalRecords} records)</p>
            </div>
            <button onClick={() => handleExport("all", "json")}
              className="flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#dc2626]">
              <Download className="h-3.5 w-3.5" />
              Download JSON
            </button>
          </div>
        </div>

        {/* Individual datasets */}
        <div className="space-y-4">
          {datasets.map((ds) => (
            <div key={ds.key} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 rounded-full" style={{ backgroundColor: ds.color }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[var(--color-text)]">{ds.label}</h3>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{ds.count} records</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{ds.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleExport(ds.key, "json")}
                    className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-[10px] font-medium transition-all ${
                      downloaded.has(`${ds.key}-json`)
                        ? "border-[var(--color-status-verified)] bg-[var(--color-status-verified)]/10 text-[var(--color-status-verified)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                    }`}>
                    {downloaded.has(`${ds.key}-json`) ? <Check className="h-3 w-3" /> : <FileJson className="h-3 w-3" />}
                    JSON
                  </button>
                  <button onClick={() => handleExport(ds.key, "csv")}
                    className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-[10px] font-medium transition-all ${
                      downloaded.has(`${ds.key}-csv`)
                        ? "border-[var(--color-status-verified)] bg-[var(--color-status-verified)]/10 text-[var(--color-status-verified)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                    }`}>
                    {downloaded.has(`${ds.key}-csv`) ? <Check className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                    CSV
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* License note */}
        <div className="mt-10 rounded-lg border border-[var(--color-border)] p-5">
          <h3 className="mb-2 text-xs font-medium text-[var(--color-text)]">Open data license</h3>
          <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
            All data exported from Politik is provided under CC BY 4.0. You are free to share and adapt this material for any purpose, provided you give appropriate credit. Data is illustrative and sourced from public records, academic research, and verified reporting. Always verify independently.
          </p>
        </div>
      </div>
    </div>
  );
}
