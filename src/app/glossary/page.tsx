import { BookOpen } from "lucide-react";
import Link from "next/link";

const glossary = [
  {
    term: "8-Signal Vote System",
    definition: "Politik's scoring mechanism that uses 8 distinct signals (confirmation, impact, severity, urgency, confidence, neglect, tractability, support) instead of simple upvote/downvote. Each signal is weighted by its relevance to civic impact.",
    related: "/severity-calc",
  },
  {
    term: "Affected Population",
    definition: "The estimated number of people directly impacted by an issue. Used in severity calculations to determine the scale of harm.",
    related: "/explore",
  },
  {
    term: "Audit",
    definition: "The final stage in an issue's lifecycle where resolution claims are independently verified. An issue is not truly resolved until it passes audit.",
    related: "/methodology",
  },
  {
    term: "Cascading Effect",
    definition: "A connection type where one issue's conditions worsen or contribute to another issue. For example, scholarship funding failures can compound economic stress that drives environmental degradation.",
    related: "/network",
  },
  {
    term: "Civic Intelligence",
    definition: "Structured, evidence-linked information about civic issues designed to enable informed action. Distinguishes from news (event-driven) and activism (advocacy-driven) by prioritizing structure and evidence.",
    related: "/about",
  },
  {
    term: "Composite Score",
    definition: "The weighted average of all 8 vote signals, normalized to 0-100. Used to classify issues into severity tiers.",
    related: "/severity-calc",
  },
  {
    term: "Confidence Level",
    definition: "A classification of evidence reliability: verified-fact (highest), reported-claim, disputed-claim, expert-assessment, statistical-estimate, model-inference, opinion (lowest).",
    related: "/methodology",
  },
  {
    term: "Cross-Reference",
    definition: "A documented connection between a political party and a civic issue, classified as direct (causal), indirect (correlated), or tangential (parallel).",
    related: "/network",
  },
  {
    term: "Dimension Score",
    definition: "A metric within one of 7 country dimensions (human outcomes, economic structure, government capacity, institutions, freedom & participation, lived experience, environment). Each dimension contains multiple metrics with trend and confidence data.",
    related: "/country-dashboard",
  },
  {
    term: "Domain",
    definition: "The civic category an issue belongs to: sanitation, water, transportation, education, digital infrastructure, environment, healthcare, agriculture, infrastructure, disaster, energy, or conflict.",
    related: "/explore",
  },
  {
    term: "Evidence Chain",
    definition: "The sequence of evidence items supporting an issue, each classified by type (direct, testimonial, institutional, journalistic, academic, inference) and confidence level.",
    related: "/methodology",
  },
  {
    term: "Government Capacity",
    definition: "A government's ability to formulate and implement policies effectively, measured across administrative capability, fiscal capacity, political will, technical expertise, and institutional memory.",
    related: "/country-dashboard",
  },
  {
    term: "Historical Trajectory",
    definition: "A country's overall direction across all 7 dimensions: improving, stagnating, deteriorating, volatile, or recovering.",
    related: "/country-dashboard",
  },
  {
    term: "Identity Level",
    definition: "The verification status of a reporter: public-verified (real name), verified-pseudonym (verified but anonymous), anonymous (unverified), institutional (organization).",
    related: "/methodology",
  },
  {
    term: "Impact Score",
    definition: "A composite metric for protest impact calculated from duration, participant scale, demand count, state response severity, and outcome achievement.",
    related: "/protest-calc",
  },
  {
    term: "Issue Lifecycle",
    definition: "The 16-stage progression of an issue from initial report through resolution and audit: reported → triaged → evidence-requested → verified → deduplicated → classified → jurisdiction-assigned → response-requested → intervention-proposed → funded → in-progress → partially-resolved → resolved → audited → reopened.",
    related: "/methodology",
  },
  {
    term: "Jurisdiction Mapping",
    definition: "The assignment of responsibility across 6 types: statutory (legal authority), funding (budget holder), implementation (executing agency), regulatory (compliance overseer), maintenance (long-term caretaker), oversight (accountability mechanism).",
    related: "/civic-ledger",
  },
  {
    term: "Neglect Score",
    definition: "A vote signal measuring how long an issue has been unresolved without institutional response. Higher neglect indicates greater institutional failure to address known problems.",
    related: "/severity-calc",
  },
  {
    term: "Polity",
    definition: "Any organized political community — a city, state, nation, or entity with a governing structure. Politik tracks issues across polities of different scales.",
    related: "/learn",
  },
  {
    term: "Protest Lifecycle",
    definition: "The typical progression of a protest movement: spark event → mobilization → escalation → negotiation → institutionalization or decline.",
    related: "/protest-calc",
  },
  {
    term: "Severity Weight",
    definition: "The multiplier applied to each vote signal based on its relevance to civic impact: severity (1.5x), urgency (1.3x), impact (1.2x), confirmation (1.0x), confidence (1.0x), neglect (0.8x), tractability (0.7x), support (0.5x).",
    related: "/severity-calc",
  },
  {
    term: "Shared Cause",
    definition: "A connection type where two issues stem from the same root cause. For example, Aadhaar-linked welfare failures affecting both scholarship disbursement and school admissions.",
    related: "/network",
  },
  {
    term: "Shared Jurisdiction",
    definition: "A connection type where two issues fall under the same responsible institution, indicating systemic failure within that institution.",
    related: "/network",
  },
  {
    term: "Steelman",
    definition: "The strongest possible version of an argument, presented in good faith. Politik's debate system requires steelman positions for both sides of every contested issue.",
    related: "/civic-ledger",
  },
  {
    term: "Tractability",
    definition: "A vote signal measuring whether a realistic intervention can address the issue. High tractability means solutions exist and are implementable; low tractability suggests systemic or structural barriers.",
    related: "/severity-calc",
  },
  {
    term: "Trajectory",
    definition: "The direction of a metric's trend: improving (positive change), stagnating (no change), deteriorating (negative change), volatile (unpredictable), recovering (improving after decline).",
    related: "/country-dashboard",
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[900px] px-6 pt-20 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Glossary</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {glossary.length} terms used across Politik, with definitions and related pages
          </p>
        </div>

        <div className="space-y-3">
          {glossary.map((item) => (
            <div key={item.term} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">{item.term}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">{item.definition}</p>
                </div>
                <Link href={item.related}
                  className="shrink-0 flex items-center gap-1 rounded border border-[var(--color-border)] px-2 py-1 text-[9px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]">
                  <BookOpen className="h-2.5 w-2.5" />
                  Related
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
