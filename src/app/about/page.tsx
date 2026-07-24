import {
  Shield,
  Eye,
  FileText,
  Scale,
  Users,
  Globe,
  Zap,
  Lock,
  GitBranch,
  Target,
} from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Observation Before Judgment",
    description:
      "Every issue begins with careful, documented observation. We record what is happening before deciding what should happen. Evidence precedes opinion.",
  },
  {
    icon: FileText,
    title: "Structured Disclosure",
    description:
      "Vague claims are noise. Every issue must include location, scope, severity, affected population, and supporting evidence. Structure enables action.",
  },
  {
    icon: Scale,
    title: "Proportional Severity",
    description:
      "Not all problems are equal. We classify severity based on actual human impact — lives affected, urgency, and reversibility — not viral potential.",
  },
  {
    icon: Shield,
    title: "Jurisdictional Clarity",
    description:
      "Every issue maps to the specific institution responsible. Knowing who must act is prerequisite to holding them accountable. Ambiguity shields power.",
  },
  {
    icon: Users,
    title: "Community Verification",
    description:
      "Claims are verified through multi-source corroboration — not by popularity. Independent observers, institutional records, and domain experts all contribute.",
  },
  {
    icon: Globe,
    title: "Cross-System Analysis",
    description:
      "Issues don't exist in isolation. Our cross-reference system identifies correlations between problems, revealing systemic patterns invisible to single-issue analysis.",
  },
  {
    icon: Zap,
    title: "Temporal Tracking",
    description:
      "Every issue has a timeline. We track when problems were reported, when responses occurred, and whether conditions improved or deteriorated. Time reveals truth.",
  },
  {
    icon: Lock,
    title: "Identity Integrity",
    description:
      "Reports carry verifiable identity levels — from public-verified to anonymous — while protecting whistleblowers. Trust requires knowing who is speaking.",
  },
  {
    icon: GitBranch,
    title: "Open Methodology",
    description:
      "Our classification schemas, severity weights, and aggregation methods are documented and open. Anyone can audit how conclusions are reached.",
  },
  {
    icon: Target,
    title: "Outcome Orientation",
    description:
      "The goal is not information for its own sake. Every tracked issue points toward a measurable improvement in human welfare. We measure progress, not activity.",
  },
];

const lifecycleSteps = [
  { label: "REPORTED", description: "Initial issue submitted with structured metadata" },
  { label: "TRIAGED", description: "Domain and severity assessed by review process" },
  { label: "EVIDENCE-REQUESTED", description: "Additional corroboration sought from community" },
  { label: "VERIFIED", description: "Multi-source confirmation achieved" },
  { label: "DEDUPLICATED", description: "Cross-referenced against existing issues" },
  { label: "CLASSIFIED", description: "Domain, severity, and jurisdiction assigned" },
  { label: "JURISDICTION-ASSIGNED", description: "Responsible institution identified" },
  { label: "RESPONSE-REQUESTED", description: "Formal accountability signal to jurisdiction" },
  { label: "INTERVENTION-PROPOSED", description: "Specific remediation pathway documented" },
  { label: "IN-PROGRESS", description: "Active response underway" },
  { label: "PARTIALLY-RESOLVED", description: "Measurable improvement documented" },
  { label: "RESOLVED", description: "Issue confirmed addressed through evidence" },
  { label: "AUDITED", description: "Resolution independently verified" },
  { label: "REOPENED", description: "If conditions recur, issue reactivates with full history" },
];

const roadmap = [
  {
    level: "01",
    title: "Foundation",
    status: "current",
    items: [
      "Core issue tracking with structured metadata",
      "Civic ledger with 15-step lifecycle",
      "Country-level government observatory",
      "Cross-reference engine",
    ],
  },
  {
    level: "02",
    title: "Community",
    status: "next",
    items: [
      "Verified reporter profiles",
      "Community evidence corroboration",
      "Domain expert verification badges",
      "Public comment and discussion threads",
    ],
  },
  {
    level: "03",
    title: "Intelligence",
    status: "planned",
    items: [
      "Automated cross-system correlation detection",
      "Trend analysis across time periods",
      "Comparative jurisdiction benchmarking",
      "Predictive severity modeling",
    ],
  },
  {
    level: "04",
    title: "Accountability",
    status: "planned",
    items: [
      "Automated jurisdiction notification",
      "Response time tracking and public dashboards",
      "Official response ingestion and classification",
      "Election-cycle impact reporting",
    ],
  },
  {
    level: "05",
    title: "Scale",
    status: "planned",
    items: [
      "Multi-language support and regional editions",
      "API for third-party integrations",
      "Municipal and state-level granular tracking",
      "Federated data sharing with allied platforms",
    ],
  },
  {
    level: "06",
    title: "Infrastructure",
    status: "planned",
    items: [
      "Open dataset exports for researchers",
      "Legislative impact measurement framework",
      "Real-time protest and event tracking integration",
      "Decentralized archival and redundancy",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
              About
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Civic Intelligence Platform
          </h1>
        </div>

        {/* Mission Statement */}
        <section className="mb-10 border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
              Mission
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Politik replaces opinion-driven discourse with structured civic intelligence. We believe that
            if public problems are documented with the same rigor applied to scientific research — structured
            evidence, verified sources, temporal tracking, and jurisdictional clarity — citizens can hold
            institutions accountable through facts rather than rhetoric.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Every issue in Politik follows a defined lifecycle from report to audit. Every claim carries
            a confidence level. Every jurisdiction is mapped. The goal is not to tell you what to think,
            but to give you the structured information to think clearly.
          </p>
        </section>

        {/* Core Principles */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              10 Core Principles
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                    <p.icon className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text)]">
                      {p.title}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Issue Lifecycle */}
        <section className="mb-10 border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Issue Lifecycle
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
            {lifecycleSteps.map((step, i) => (
              <div key={step.label} className="flex">
                <div className="mr-3 flex flex-col items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      i === 0
                        ? "bg-[var(--color-severity-high)]"
                        : i === lifecycleSteps.length - 1
                          ? "bg-[var(--color-status-verified)]"
                          : "bg-[var(--color-border-strong)]"
                    }`}
                  />
                  {i < lifecycleSteps.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--color-border)]" />
                  )}
                </div>
                <div className="pb-4">
                  <span
                    className={`font-semibold ${
                      i === 0
                        ? "text-[var(--color-severity-high)]"
                        : i === lifecycleSteps.length - 1
                          ? "text-[var(--color-status-verified)]"
                          : "text-[var(--color-text)]"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="ml-2 text-[var(--color-text-muted)]">
                    {step.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How Politik Differs from Social Media */}
        <section className="mb-10 border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              How It Differs
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="pb-3 pr-6 text-left font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    Dimension
                  </th>
                  <th className="pb-3 pr-6 text-left font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                    Politik
                  </th>
                  <th className="pb-3 text-left font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    Social Media
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Structure</td>
                  <td className="py-3 pr-6">Typed fields, schemas, lifecycle states</td>
                  <td className="py-3">Free text, threads, no structure</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Evidence</td>
                  <td className="py-3 pr-6">Source, confidence level, class, verification</td>
                  <td className="py-3">Links, screenshots, no verification</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Incentive</td>
                  <td className="py-3 pr-6">Accuracy, resolution, accountability</td>
                  <td className="py-3">Engagement, virality, outrage</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Accountability</td>
                  <td className="py-3 pr-6">Jurisdiction mapping, response tracking</td>
                  <td className="py-3">None — complaint goes into void</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Timeline</td>
                  <td className="py-3 pr-6">Full lifecycle from report to audit</td>
                  <td className="py-3">Chronological feed, no status tracking</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Duplicate Handling</td>
                  <td className="py-3 pr-6">Deduplication with cross-references</td>
                  <td className="py-3">Same issue posted 1000 times</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-[var(--color-text)]">Resolution</td>
                  <td className="py-3 pr-6">Measurable outcome tracking</td>
                  <td className="py-3">Forget and move on</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              Roadmap — 6 Levels
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((level) => (
              <div
                key={level.level}
                className={`border bg-[var(--color-bg-raised)] p-5 ${
                  level.status === "current"
                    ? "border-[var(--color-accent)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-lg font-bold text-[var(--color-text)]">
                      {level.level}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text)]">
                      {level.title}
                    </span>
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[8px] font-[family-name:var(--font-mono)] uppercase ${
                      level.status === "current"
                        ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        : level.status === "next"
                          ? "bg-[var(--color-severity-medium)]/10 text-[var(--color-severity-medium)]"
                          : "bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {level.status}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {level.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-border-strong)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] pt-6">
          <div className="flex items-center gap-4 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
            <span>politik v0.1</span>
            <div className="h-3 w-px bg-[var(--color-border)]" />
            <span>open civic infra</span>
            <div className="h-3 w-px bg-[var(--color-border)]" />
            <span>built for accountability</span>
          </div>
        </div>
      </div>
    </div>
  );
}
