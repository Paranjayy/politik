import {
  BookOpen,
  Globe,
  Users,
  Building2,
  FileCheck,
  ShieldCheck,
  Swords,
  Copy,
  MapPin,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

const concepts = [
  {
    icon: Globe,
    title: "Xenia",
    subtitle: "The ancient law of hospitality",
    definition:
      "Xenia is the Greek concept of sacred hospitality — the moral obligation of a host to protect and provide for a guest, and the duty of a guest to behave respectfully. In Homer's Odyssey, violating xenia brings divine punishment. It established that how a society treats strangers reveals its moral character.",
    whyItMatters:
      "Civic platforms like Politik inherit this principle. Every person who reports an issue is a 'guest' of the system. Their testimony deserves structured respect — not dismissal, not exploitation. When governments fail to provide for the vulnerable (refugees, the displaced, the unhoused), they violate the modern equivalent of xenia.",
    example:
      "The Gaza humanitarian crisis (ISS-011) is fundamentally a failure of xenia — a population unable to flee, denied basic shelter, food, and medical care. The concept extends beyond borders: every community has a duty of care to those within it.",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: Building2,
    title: "What is a polity?",
    subtitle: "The basic unit of political organization",
    definition:
      "A polity is any organized political community — a city, state, nation, or any entity with a governing structure. It is not synonymous with 'country.' A municipal corporation, a tribal council, a school board, and the United Nations are all polities. Political scientists use the term to analyze governance structures without assuming a particular form of government.",
    whyItMatters:
      "Politik tracks issues across polities of different scales. Understanding that a ward-level sewage problem (ISS-001) and a national energy crisis (ISS-015) are both failures of their respective polities helps citizens identify the right level of governance to hold accountable. A pothole is a municipal failure; a failing power grid is a national one.",
    example:
      "South Africa's Eskom crisis is a failure of a national polity's energy infrastructure. But the consequences are felt at the municipal level, where local governments must manage rolling blackouts without the authority to fix the power grid.",
    relatedLink: "/civic-intel",
    relatedLabel: "Civic Intel",
  },
  {
    icon: Users,
    title: "How protests work",
    subtitle: "The lifecycle of a protest movement",
    definition:
      "Protest movements follow a recognizable lifecycle: spark event, mobilization, escalation, negotiation, and either institutionalization or decline. Effective movements build sustainable organizational structures (committees, spokespeople, demands) during the mobilization phase. Without structure, energy dissipates. With structure, movements can negotiate for concrete outcomes.",
    whyItMatters:
      "Politik captures the structured data that makes protests legible beyond viral moments. A protest is not just a crowd — it has demands, a jurisdiction, an affected population, and a measurable outcome. By tracking these, we can distinguish between performative outrage and genuine movements for change.",
    example:
      "The 2024 South Korean martial law crisis saw massive candlelight vigils that successfully pressured the National Assembly to impeach President Yoon. The movement succeeded because it had clear demands (reversal of martial law) and targeted a specific institution (the National Assembly).",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: FileCheck,
    title: "Understanding government capacity",
    subtitle: "Why some governments fail and others succeed",
    definition:
      "Government capacity is the ability of a government to formulate and implement policies effectively. It depends on five factors: administrative capability (bureaucratic skill), fiscal capacity (revenue collection), political will (leadership commitment), technical expertise (knowledge and tools), and institutional memory (continuity of knowledge). A government can be wealthy but incompetent, or poor but highly capable.",
    whyItMatters:
      "Politik's country-level data tracks government capacity across these dimensions. When you see Turkey's central bank independence at 'severely compromised' or Nigeria's tax-to-GDP ratio at 6%, you are seeing capacity failures that explain why problems persist regardless of which party is in power.",
    example:
      "Turkey's earthquake response failure (ISS-014) was not a resource problem — Turkey has significant capacity. It was a capacity allocation problem: building code enforcement was systematically deprioritized through construction amnesties, and AFAD's emergency response capability was hollowed out by mismanagement.",
    relatedLink: "/civic-intel",
    relatedLabel: "Civic Intel",
  },
  {
    icon: ShieldCheck,
    title: "Evidence types",
    subtitle: "The 6 evidence classes in Politik",
    definition:
      "Politik classifies all evidence into six classes: (1) Direct — first-hand observation, photographs, personal experience; (2) Testimonial — eyewitness accounts, interviews, statements; (3) Institutional — official reports, government data, court records; (4) Journalistic — news reports, investigations, field reporting; (5) Academic — peer-reviewed research, university studies, expert analysis; (6) Inference — logical deductions from established facts. Each class has a confidence level from 'verified-fact' to 'opinion.'",
    whyItMatters:
      "Not all evidence is equal. A government report (institutional) and a citizen's tweet (direct/testimonial) carry different evidentiary weight. By classifying evidence, Politik enables readers to assess the strength of a claim without relying on popularity or virality. This is the difference between information and intelligence.",
    example:
      "The Lahore smog crisis (ISS-010) has institutional evidence (EPD monitoring data), academic evidence (cross-border attribution study), and journalistic evidence (hospital admission surge reports). Together, they build a multi-source case that no single type could provide alone.",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: ShieldCheck,
    title: "Graduated identity",
    subtitle: "Why anonymity matters in civic reporting",
    definition:
      "Graduated identity is Politik's system of four identity levels: public-verified (real name, verified), verified-pseudonym (pseudonym with verified humanity), anonymous (no identity attached), and institutional (organization or government body). Each level serves a different purpose. Some situations require the accountability of a real name; others require the safety of anonymity.",
    whyItMatters:
      "Whistleblowers, abuse victims, and citizens in authoritarian states need anonymity to report truthfully. But anonymous reports carry less weight than verified ones. The graduated system lets reporters choose the level of identity protection appropriate to their situation while preserving the information's utility. It is the structural compromise between safety and accountability.",
    example:
      "A municipal worker reporting corruption in Eskom (ISS-015) may need anonymous identity to protect their job. A citizen photographing a sewage overflow (ISS-001) may be comfortable with a verified pseudonym. Both contribute valuable evidence at appropriate risk levels.",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: Swords,
    title: "The steelman principle",
    subtitle: "Argue the strongest version of opposing views",
    definition:
      "Steelmanning is the opposite of strawmanning. Instead of attacking the weakest version of an opposing argument, you construct and address the strongest possible version. This means representing your opponent's position more charitably and more persuasively than they might represent it themselves. Only after engaging with the best version of an argument should you critique it.",
    whyItMatters:
      "Politik does not endorse political positions. But it does demand that claims be structured and verifiable. The steelman principle is the intellectual discipline that makes structured discourse possible. When you steelman the argument for load shedding (Eskom's fleet genuinely is aging) before critiquing it (but corruption accelerated the decline), you produce more actionable intelligence than raw criticism.",
    example:
      "The strongest argument against Turkey's earthquake reconstruction speed (ISS-014) is that rebuilding 164,000 buildings across 11 provinces during an economic crisis is genuinely difficult. The steelman acknowledges this difficulty before examining whether corruption and lack of accountability are the actual bottlenecks.",
    relatedLink: "/about",
    relatedLabel: "About",
  },
  {
    icon: Copy,
    title: "Issue deduplication",
    subtitle: "Why the same problem appears in many places",
    definition:
      "Issue deduplication is the process of identifying when multiple reports describe the same underlying problem. A water shortage reported by three citizens in the same neighborhood is one issue, not three. Deduplication preserves evidence from all sources while preventing the system from being overwhelmed by duplicate reports. It also enables cross-referencing — linking related but distinct issues to reveal systemic patterns.",
    whyItMatters:
      "Without deduplication, civic platforms become noisy and unreliable. The same pothole gets reported 50 times while a critical infrastructure failure goes unnoticed because it has only one report. Politik's deduplication system preserves the evidence from each reporter while consolidating the issue into a single, more powerful record.",
    example:
      "The California wildfire insurance crisis (ISS-013) involves hundreds of individual complaints about policy non-renewals. Each complaint is real, but they describe one systemic issue: the collapse of the private insurance market in fire-prone areas.",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: MapPin,
    title: "Jurisdiction confusion",
    subtitle: "Why citizens blame the wrong authority",
    definition:
      "Jurisdiction confusion occurs when citizens direct complaints to the wrong level or branch of government. A citizen complains to the city council about a national policy. A voter blames the mayor for a state-level education failure. This confusion is not the citizen's fault — governments deliberately obscure responsibility to avoid accountability. Politik's jurisdiction mapping resolves this by clearly identifying which institution has statutory, funding, implementation, regulatory, maintenance, and oversight responsibility.",
    whyItMatters:
      "Effective civic engagement requires knowing who has the power to act. When citizens target the wrong authority, their energy is wasted and the responsible institution faces no pressure. By mapping jurisdiction precisely, Politik directs civic energy toward the institutions that can actually solve the problem.",
    example:
      "South Africa's load shedding (ISS-015) is often blamed on municipal governments, but the statutory responsibility lies with Eskom (a national utility) and the Department of Mineral Resources and Energy. Citizens complaining to their municipality are exercising civic energy without targeting the right institution.",
    relatedLink: "/civic-ledger",
    relatedLabel: "Civic Ledger",
  },
  {
    icon: TrendingDown,
    title: "Institutional degradation",
    subtitle: "How governments slowly fail",
    definition:
      "Institutional degradation is the gradual erosion of a government's ability to function. Unlike a coup or collapse, it happens slowly: positions go unfilled, maintenance is deferred, corruption becomes normalized, expertise leaves, and accountability weakens. Each year the institution appears functional; five years later it cannot perform its core functions. The pattern is predictable: fiscal stress leads to austerity, austerity leads to deferred maintenance, deferred maintenance leads to failure, failure leads to crisis.",
    whyItMatters:
      "Politik's temporal tracking (timelines, recurrence counts, status changes) makes institutional degradation visible. A single failed inspection is an event. A pattern of deferred maintenance over 10 years is institutional degradation. By tracking issues over time, Politik reveals the slow-motion failures that lead to catastrophic events.",
    example:
      "Eskom's load shedding (ISS-015) did not begin in 2023. It began in 2008 as a warning sign of decades of deferred maintenance, corruption, and capacity erosion. The pattern is visible in Politik's timeline: from initial warning to systemic failure over 18 years. Turkey's earthquake building code failures (ISS-014) followed the same trajectory: decades of unenforced codes leading to catastrophic collapse.",
    relatedLink: "/civic-intel",
    relatedLabel: "Civic Intel",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
              Learn
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Political Concepts Reference
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Key ideas referenced throughout Politik, explained clearly. Each concept
            connects to the platform&apos;s data so you can see it in action.
          </p>
        </div>

        {/* Concept Grid */}
        <div className="space-y-6">
          {concepts.map((concept, i) => (
            <div
              key={concept.title}
              className="border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6"
            >
              {/* Concept Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                  <concept.icon className="h-4 w-4 text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-text)]">
                      {concept.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-muted)]">
                    {concept.subtitle}
                  </span>
                </div>
              </div>

              {/* Definition */}
              <div className="mb-4 border-l-2 border-[var(--color-accent)] pl-4">
                <div className="mb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  Definition
                </div>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {concept.definition}
                </p>
              </div>

              {/* Why it matters */}
              <div className="mb-4 border-l-2 border-[var(--color-severity-high)] pl-4">
                <div className="mb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-severity-high)]">
                  Why it matters for civic engagement
                </div>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {concept.whyItMatters}
                </p>
              </div>

              {/* Example */}
              <div className="mb-4 border-l-2 border-[var(--color-severity-medium)] pl-4">
                <div className="mb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-severity-medium)]">
                  Real-world example
                </div>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {concept.example}
                </p>
              </div>

              {/* Related Link */}
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  See it in data:
                </span>
                <Link
                  href={concept.relatedLink}
                  className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)] transition-colors hover:text-[var(--color-text)]"
                >
                  {concept.relatedLabel} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
