import { Scale, Database, Shield, Eye, GitBranch, AlertTriangle, Users, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Database,
    title: "Data Collection",
    content: `Politik collects structured data from multiple source types: citizen reports, institutional records, journalistic investigations, and academic research. Every piece of evidence is classified into one of six evidence classes (direct, testimonial, institutional, journalistic, academic, inference) and assigned a confidence level from verified-fact to opinion.`,
    details: [
      "Citizen submissions undergo identity verification (public-verified, pseudonym, anonymous, institutional)",
      "Institutional records are sourced from government databases, court filings, and RTI responses",
      "Journalistic evidence requires field verification or multi-source corroboration",
      "Academic evidence must come from peer-reviewed or expert sources",
    ],
  },
  {
    icon: Scale,
    title: "Severity Classification",
    content: `Issues are classified using a 4-level severity system (critical, high, medium, low) based on actual human impact rather than viral potential. The classification considers affected population size, urgency, reversibility of harm, and the sensitivity of nearby institutions (schools, hospitals, markets).`,
    details: [
      "Critical: Immediate threat to life, health, or fundamental rights",
      "High: Significant harm affecting large populations or sensitive institutions",
      "Medium: Moderate harm with limited but real impact",
      "Low: Minor issues that should be tracked but don't require urgent intervention",
    ],
  },
  {
    icon: BarChart3,
    title: "8-Signal Vote System",
    content: `Instead of simple upvote/downvote, Politik uses 8 distinct signals that capture different dimensions of civic importance. Each signal is weighted by its relevance to actual civic impact: severity (1.5x), urgency (1.3x), impact (1.2x), confirmation (1.0x), confidence (1.0x), neglect (0.8x), tractability (0.7x), and support (0.5x).`,
    details: [
      "Confirmation: Have you personally observed this issue?",
      "Impact: How many people are affected?",
      "Severity: How harmful is the issue?",
      "Urgency: How quickly must action occur?",
      "Confidence: How strong is the evidence?",
      "Neglect: How long has it been unresolved?",
      "Tractability: Can realistic intervention address it?",
      "Support: Do people endorse the proposed solution?",
    ],
  },
  {
    icon: GitBranch,
    title: "Issue Lifecycle",
    content: `Every issue progresses through a structured lifecycle of 16 stages, from initial report to resolution audit. This ensures no issue is forgotten and creates accountability at each stage. The lifecycle is: reported → triaged → evidence-requested → verified → deduplicated → classified → jurisdiction-assigned → response-requested → intervention-proposed → funded → in-progress → partially-resolved → resolved → audited → reopened (if recurring).`,
    details: [
      "Each stage transition is logged with timestamp and actor",
      "Stages can be skipped for urgent issues requiring immediate action",
      "Reopened issues create a new lifecycle while preserving history",
      "Audit stage ensures resolution claims are verified independently",
    ],
  },
  {
    icon: Shield,
    title: "Jurisdiction Mapping",
    content: `Every issue maps to specific responsible institutions across six jurisdiction types: statutory (who has legal authority), funding (who pays), implementation (who does the work), regulatory (who oversees compliance), maintenance (who maintains the fix), and oversight (who holds everyone accountable).`,
    details: [
      "Statutory jurisdiction identifies the legally responsible body",
      "Funding jurisdiction identifies the budget holder",
      "Implementation jurisdiction identifies the executing agency",
      "Regulatory jurisdiction identifies the compliance overseer",
      "Maintenance jurisdiction identifies the long-term caretaker",
      "Oversight jurisdiction identifies the accountability mechanism",
    ],
  },
  {
    icon: Users,
    title: "Cross-Reference System",
    content: `Issues don't exist in isolation. Politik's cross-reference system identifies connections between issues, political parties, and governance records. Each connection is classified as direct (causal link), indirect (correlated), or tangential (parallel) to reveal systemic patterns invisible to single-issue analysis.`,
    details: [
      "Direct connections indicate clear causal relationships",
      "Indirect connections show correlated patterns across issues",
      "Tangential connections identify parallel governance failures",
      "Connections are sourced and evidence-backed, not inferred",
    ],
  },
  {
    icon: Eye,
    title: "Transparency Standards",
    content: `All methodology, classification schemas, severity weights, and aggregation methods are documented and open. Anyone can audit how conclusions are reached. This is the difference between a platform that tells you what to think and one that shows you how it thinks.`,
    details: [
      "Severity weights are published and adjustable",
      "Vote signal weights are documented with rationale",
      "Classification criteria are explicit and testable",
      "All data is exportable in JSON and CSV formats",
    ],
  },
  {
    icon: Clock,
    title: "Temporal Tracking",
    content: `Every issue has a timeline. We track when problems were reported, when responses occurred, and whether conditions improved or deteriorated. Time reveals truth — a promise of action means nothing without follow-through. The timeline creates accountability by making the passage of time visible.`,
    details: [
      "Timelines include all actors: citizens, institutions, moderators",
      "Event types are classified: report, response, action, verification, status-change",
      "Recurring issues show multiple lifecycle cycles",
      "Duration metrics calculate time-to-resolution for accountability",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Limitations",
    content: `Politik is not a substitute for direct civic engagement. The data is illustrative and sourced from public records, academic research, and verified reporting. Always verify independently. The platform captures structured information about civic issues but cannot replace the judgment of affected communities, domain experts, or democratic institutions.`,
    details: [
      "Data may be incomplete or outdated",
      "Severity classifications reflect aggregated community judgment, not objective truth",
      "Cross-references identify patterns, not causation",
      "The platform is a tool for civic intelligence, not civic authority",
    ],
  },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Methodology</h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
            Politik is a computational public-interest intelligence platform. This page explains how we collect, classify, and present civic data.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <section key={i} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                    <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">{section.title}</h2>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{section.content}</p>
                <div className="space-y-2">
                  {section.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span className="text-xs text-[var(--color-text-muted)]">{detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Related links */}
        <div className="mt-12 rounded-lg border border-[var(--color-border)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-text)]">Related pages</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn" className="flex items-center gap-2 rounded border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
              Learn — Political concepts and civic education
            </Link>
            <Link href="/severity-calc" className="flex items-center gap-2 rounded border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
              Severity Calculator — Try the 8-signal system
            </Link>
            <Link href="/export" className="flex items-center gap-2 rounded border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
              Data Export — Download raw data
            </Link>
            <Link href="/about" className="flex items-center gap-2 rounded border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
              About — Platform principles and roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
