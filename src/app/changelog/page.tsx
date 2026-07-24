import { Tag, CheckCircle, Plus, Wrench, BookOpen } from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "fix" | "improvement" | "docs";
  changes: string[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "0.6.0",
    date: "2026-07-25",
    type: "feature",
    changes: [
      "Added World Map page — interactive SVG map with country activity visualization",
      "Added Network Explorer — visual party-issue connection graph with filters",
      "Added Protest Impact Calculator — analyze protest outcomes with 5-factor scoring",
      "Added Methodology page — 9 sections explaining data collection and classification",
      "Added Glossary — 26 terms with definitions and related page links",
      "Added API Documentation — developer-facing endpoint reference with examples",
      "Added Changelog — this page",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-07-25",
    type: "feature",
    changes: [
      "Added Issue Explorer — interactive filtering by domain, severity, status, country with 5 sort modes",
      "Added Party Comparison — side-by-side party analysis with ideology matrix, seat bars, contradictions",
      "Added Global Timeline — chronological view of all events across issues and protests",
      "Added Data Export — download all 7 datasets as JSON or CSV with one-click export",
      "Added Country Health Dashboard — visual health indicators with 7-dimension mini bar charts",
      "Added Severity Calculator — interactive 8-signal vote system calculator with weighted scoring",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-07-25",
    type: "improvement",
    changes: [
      "Fixed CSS reset breaking all Tailwind spacing utilities",
      "Redesigned homepage with proper hero, stats strip, product cards, and quick-access grid",
      "Redesigned Stats page with rounded bars and consistent section headers",
      "Enhanced keyboard shortcuts with g+e (Explorer), g+p (Parties), g+t (Timeline), g+s (Stats)",
      "Updated navigation with all new pages on desktop and mobile",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-07-24",
    type: "feature",
    changes: [
      "Added mobile navigation with hamburger menu and full-screen overlay",
      "Added keyboard shortcuts system (? for help, / for search, g+key navigation)",
      "Added World page with regional activity breakdown",
      "Added Briefing page with issue and protest summary",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-07-24",
    type: "feature",
    changes: [
      "Added Civic Intel — 7-dimension country reports with trend tracking",
      "Added Party Profiles with contradiction mapping and governance records",
      "Added Steelman Debates with structured argument positions",
      "Added Cross-Reference system linking parties to issues",
      "Added Country Comparison Matrix",
      "Added Global Protest Wiki — 61 protests from 29 countries",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-07-24",
    type: "feature",
    changes: [
      "Initial launch of Politik civic intelligence platform",
      "Civic Issue Ledger with 16-stage lifecycle tracking",
      "8-signal vote system (not upvote/downvote)",
      "Evidence chain with confidence levels and source classification",
      "Jurisdiction mapping across 6 responsibility types",
      "Statistics Overview page with severity and domain analysis",
    ],
  },
];

const typeConfig: Record<string, { icon: typeof Plus; color: string; label: string }> = {
  feature: { icon: Plus, color: "var(--color-status-verified)", label: "Feature" },
  fix: { icon: Wrench, color: "var(--color-severity-high)", label: "Fix" },
  improvement: { icon: Tag, color: "var(--color-severity-medium)", label: "Improvement" },
  docs: { icon: BookOpen, color: "var(--color-text-muted)", label: "Docs" },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Changelog</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Version history and feature updates for Politik
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[14px] top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-8">
            {changelog.map((entry) => {
              const config = typeConfig[entry.type];
              const Icon = config.icon;
              return (
                <div key={entry.version} className="relative pl-10">
                  {/* Dot */}
                  <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]">
                    <Icon className="h-3 w-3" style={{ color: config.color }} />
                  </div>

                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">v{entry.version}</span>
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
                        {config.label}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">{entry.date}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-muted)]" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
