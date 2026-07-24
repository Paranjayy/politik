# Politik Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add About page, expand country data, export functionality, and keyboard shortcuts to the Politik civic intelligence platform.

**Architecture:** Each feature is independent and can be implemented in parallel. The About page is a new static page with detailed content. Country data expansion follows existing patterns. Export is client-side JSON generation. Keyboard shortcuts use React useEffect with global event listeners.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, lucide-react icons

---

### Task 1: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create the About page with all required sections**

```tsx
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Shield,
  Eye,
  Users,
  Search,
  FileText,
  Globe,
  Zap,
  Lock,
  Scale,
  TrendingUp,
  Target,
  Database,
  GitBranch,
} from "lucide-react";

const principles = [
  {
    id: "01",
    title: "Issue-first, not personality-first",
    description:
      "Every entry begins with a problem, not a person. This prevents political tribalism from hijacking civic attention.",
  },
  {
    id: "02",
    title: "Evidence before virality",
    description:
      "Claims are tagged with confidence levels (verified-fact, reported-claim, disputed-claim). Speed of spread never outranks quality of proof.",
  },
  {
    id: "03",
    title: "Transparent edit history",
    description:
      "Every change to an issue or report is logged. No silent edits, no revisionist narratives.",
  },
  {
    id: "04",
    title: "Separate fact, inference, opinion",
    description:
      "Data is layered: what we know, what we infer, what we believe. Mixing these destroys trust.",
  },
  {
    id: "05",
    title: "Protect vulnerable reporters",
    description:
      "Anonymous and pseudonymous reporting with identity tiers. Whistleblowers and at-risk communities can contribute without exposure.",
  },
  {
    id: "06",
    title: "No single popularity score",
    description:
      "Eight signal dimensions replace upvote/downvote. Popularity is not the same as importance.",
  },
  {
    id: "07",
    title: "Clear jurisdiction mapping",
    description:
      "Every issue maps to the exact bodies responsible for statutory, funding, implementation, and oversight roles. No finger-pointing into the void.",
  },
  {
    id: "08",
    title: "Structured solution comparison",
    description:
      "Proposed interventions are compared on cost, timeline, impact, and feasibility—not rhetoric.",
  },
  {
    id: "09",
    title: "Independent resolution verification",
    description:
      "Closure requires evidence, not just announcements. An independent auditor confirms the fix.",
  },
  {
    id: "10",
    title: "Multi-perspective analysis",
    description:
      "Country reports present government, opposition, civil society, and independent viewpoints side by side.",
  },
];

const lifecycle = [
  { stage: "Reported", description: "Citizen submits issue with evidence" },
  { stage: "Triaged", description: "Severity and domain classified" },
  { stage: "Evidence-requested", description: "Additional proof needed" },
  { stage: "Verified", description: "Evidence chain validated" },
  { stage: "Deduplicated", description: "Related issues merged" },
  { stage: "Classified", description: "Problem type assigned" },
  { stage: "Jurisdiction-assigned", description: "Responsible bodies mapped" },
  { stage: "Response-requested", description: "Official accountability triggered" },
  { stage: "Intervention-proposed", description: "Solutions compared" },
  { stage: "Funded", description: "Resources allocated" },
  { stage: "In-progress", description: "Active implementation" },
  { stage: "Partially-resolved", description: "Partial fix confirmed" },
  { stage: "Resolved", description: "Issue closed with evidence" },
  { stage: "Audited", description: "Independent verification" },
  { stage: "Reopened", description: "If fix fails, cycle restarts" },
];

const roadmap = [
  {
    level: 1,
    title: "Foundation",
    status: "current",
    items: [
      "Issue tracking with evidence chains",
      "Country reports with 7 dimensions",
      "Party profiles and contradiction mapping",
      "Protest lifecycle documentation",
    ],
  },
  {
    level: 2,
    title: "Verification",
    status: "next",
    items: [
      "Cross-reference validation across sources",
      "Automated contradiction detection",
      "Confidence scoring for all claims",
      "Source reliability reputation system",
    ],
  },
  {
    level: 3,
    title: "Participation",
    status: "planned",
    items: [
      "Citizen submission with identity tiers",
      "Collaborative evidence building",
      "Community-driven triage",
      "Local chapter formation tools",
    ],
  },
  {
    level: 4,
    title: "Accountability",
    status: "planned",
    items: [
      "Official response tracking",
      "Commitment-to-action conversion",
      "Budget transparency mapping",
      "Election cycle accountability reports",
    ],
  },
  {
    level: 5,
    title: "Resolution",
    status: "future",
    items: [
      "Intervention comparison framework",
      "Impact measurement protocols",
      "Independent audit network",
      "Cross-jurisdictional benchmarking",
    ],
  },
  {
    level: 6,
    title: "Governance",
    status: "future",
    items: [
      "Policy simulation tools",
      "Participatory budgeting integration",
      "AI-assisted trend analysis",
      "Global civic intelligence network",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:py-28">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
              About Politik
            </span>
          </div>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight lg:text-5xl">
            An open civic operating system
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            That converts scattered complaints, evidence, promises, budgets, and
            official responses into structured, auditable public issues.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Mission
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Politik exists because civic information is fragmented, tribalized,
                and designed for engagement rather than understanding. News cycles
                reward outrage. Social media rewards virality. Political discourse
                rewards tribal loyalty.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                We believe that structured, evidence-linked, jurisdiction-mapped
                information can transform how citizens understand and act on public
                problems—not through opinion, but through verifiable facts and
                transparent processes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: Eye, text: "See problems clearly" },
                { icon: Scale, text: "Measure impact honestly" },
                { icon: Users, text: "Empower collective action" },
                { icon: Shield, text: "Protect democratic accountability" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3"
                >
                  <item.icon className="h-4 w-4 text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 Principles */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            10 Core Principles
          </h2>
          <div className="space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
            {principles.map((p) => (
              <div key={p.id} className="flex gap-4 p-4">
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                  {p.id}
                </span>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-medium text-[var(--color-text)]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Issue Lifecycle */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            How It Works
          </h2>
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Issue Lifecycle
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Every public issue follows a structured lifecycle from initial
                report through independent verification. No issue is closed until
                evidence confirms resolution.
              </p>
              <div className="flex flex-wrap gap-2">
                {lifecycle.map((l, i) => (
                  <div key={l.stage} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] px-2.5 py-1 text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-text-muted)]">
                        {i + 1}.
                      </span>
                      {l.stage}
                    </span>
                    {i < lifecycle.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-[var(--color-text-muted)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                What Makes It Different
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "vs. Reddit/Social Media",
                    description:
                      "No upvotes, no karma, no viral mechanics. Eight signal dimensions replace popularity with multi-dimensional importance scoring.",
                  },
                  {
                    title: "vs. News Media",
                    description:
                      "Structured data, not narrative. Every claim tagged with confidence levels. No editorial slant, no clickbait incentives.",
                  },
                  {
                    title: "vs. Government Portals",
                    description:
                      "Citizen-driven, not bureaucratic. Evidence-linked, not form-based. Transparent timelines, not black-box processing.",
                  },
                  {
                    title: "vs. Petition Platforms",
                    description:
                      "Issues, not signatures. Jurisdiction mapping, not just demand delivery. Resolution tracking, not just attention collection.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-[var(--color-border)] pb-3"
                  >
                    <h4 className="mb-1 text-xs font-medium text-[var(--color-accent)]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <h2 className="mb-6 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Roadmap
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((r) => (
              <div
                key={r.level}
                className={`rounded border p-5 ${
                  r.status === "current"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                    Level {r.level}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)] ${
                      r.status === "current"
                        ? "bg-[var(--color-accent)] text-white"
                        : r.status === "next"
                          ? "bg-[var(--color-severity-medium)] text-white"
                          : "bg-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <h3 className="mb-3 text-sm font-medium text-[var(--color-text)]">
                  {r.title}
                </h3>
                <ul className="space-y-1.5">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-text-muted)]" />
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="mx-auto max-w-[1400px] text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
          politik v0.1 - computational public-interest intelligence
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Add About link to the navigation in layout.tsx**

Open `src/app/layout.tsx` and add an About link to the navigation bar:

```tsx
// In the nav div, add this after the Search link
<a href="/about" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
  About
</a>
```

- [ ] **Step 3: Verify the page renders**

Run: `npm run build`
Expected: Build succeeds, About page available at `/about`

---

### Task 2: Expand Country Data

**Files:**
- Modify: `src/data/countries.ts`

- [ ] **Step 1: Add Germany to the countries array**

Add this object before the closing `];` of the countries array:

```typescript
{
  id: "germany",
  name: "Germany",
  flag: "🇩🇪",
  population: "84 million",
  capital: "Berlin",
  governmentType: "Federal parliamentary republic",
  lastElection: "2025 (CDU/CSU coalition victory)",
  humanOutcomes: [
    { metric: "Life expectancy", value: "81.2 years", trend: "stagnating", confidence: "high" },
    { metric: "Literacy rate", value: "~99%", trend: "stagnating", confidence: "high" },
    { metric: "Infant mortality", value: "3.1 per 1,000", trend: "improving", confidence: "high" },
    { metric: "Maternal mortality", value: "4 per 100,000", trend: "stagnating", confidence: "high" },
    { metric: "Hunger prevalence", value: "Very low", trend: "stagnating", confidence: "high" },
  ],
  economicStructure: [
    { metric: "GDP (nominal)", value: "$4.5 trillion", trend: "stagnating", confidence: "high" },
    { metric: "GDP per capita", value: "$54,000", trend: "stagnating", confidence: "high" },
    { metric: "Unemployment", value: "5.8%", trend: "stagnating", confidence: "high" },
    { metric: "Informal labour share", value: "~12%", trend: "stagnating", confidence: "medium" },
    { metric: "Gini coefficient", value: "0.31", trend: "stagnating", confidence: "high" },
    { metric: "Inflation (CPI)", value: "~2.4%", trend: "improving", confidence: "high" },
  ],
  governmentCapacity: [
    { metric: "Tax-to-GDP ratio", value: "38.8%", trend: "stagnating", confidence: "high" },
    { metric: "Infrastructure grade", value: "B+ (aging but maintained)", trend: "stagnating", confidence: "medium" },
    { metric: "Bureaucratic efficiency", value: "Moderate (digital backlog)", trend: "stagnating", confidence: "medium" },
    { metric: "Energy transition cost", value: "€500B+ committed", trend: "improving", confidence: "medium" },
  ],
  institutions: [
    { metric: "Press freedom index", value: "Rank 10/180 (2024)", trend: "improving", confidence: "high" },
    { metric: "Corruption perception", value: "Top 15 globally", trend: "stagnating", confidence: "high" },
    { metric: "Judicial independence", value: "Very high", trend: "stagnating", confidence: "high" },
    { metric: "EU integration", value: "Core member, leadership role", trend: "stagnating", confidence: "high" },
  ],
  freedomParticipation: [
    { metric: "Speech freedom", value: "Strong legal protections", trend: "stagnating", confidence: "high" },
    { metric: "Internet access", value: "93%", trend: "improving", confidence: "high" },
    { metric: "Voter participation", value: "~76%", trend: "improving", confidence: "high" },
    { metric: "Protest rights", value: "Strongly protected", trend: "stagnating", confidence: "high" },
  ],
  livedExperience: [
    { metric: "Happiness index", value: "Rank 16/143 (2024)", trend: "stagnating", confidence: "medium" },
    { metric: "Social trust", value: "High", trend: "stagnating", confidence: "medium" },
    { metric: "Integration challenges", value: "Ongoing", trend: "stagnating", confidence: "medium" },
  ],
  environment: [
    { metric: "CO2 emissions", value: "1.8% of global", trend: "improving", confidence: "high" },
    { metric: "Renewable energy share", value: "~52% (2024)", trend: "improving", confidence: "high" },
    { metric: "Nuclear phase-out", value: "Complete (2023)", trend: "stagnating", confidence: "high" },
    { metric: "Circular economy", value: "Advanced", trend: "improving", confidence: "medium" },
  ],
  historicalTrajectory: "stagnating",
},
```

- [ ] **Step 2: Add Brazil to the countries array**

Add this object after Germany:

```typescript
{
  id: "brazil",
  name: "Brazil",
  flag: "🇧🇷",
  population: "215 million",
  capital: "Brasília",
  governmentType: "Federal presidential republic",
  lastElection: "2022 (Lula da Silva victory)",
  humanOutcomes: [
    { metric: "Life expectancy", value: "76.4 years", trend: "improving", confidence: "high" },
    { metric: "Literacy rate", value: "94%", trend: "improving", confidence: "high" },
    { metric: "Infant mortality", value: "12.4 per 1,000", trend: "improving", confidence: "high" },
    { metric: "Maternal mortality", value: "60 per 100,000", trend: "improving", confidence: "medium" },
    { metric: "Hunger prevalence", value: "~33 million (2024)", trend: "improving", confidence: "high" },
  ],
  economicStructure: [
    { metric: "GDP (nominal)", value: "$2.2 trillion", trend: "improving", confidence: "high" },
    { metric: "GDP per capita", value: "$10,200", trend: "improving", confidence: "high" },
    { metric: "Unemployment", value: "~7.4%", trend: "improving", confidence: "high" },
    { metric: "Informal labour share", value: "~40%", trend: "stagnating", confidence: "medium" },
    { metric: "Gini coefficient", value: "0.49", trend: "stagnating", confidence: "high" },
    { metric: "Inflation (CPI)", value: "~4.2%", trend: "improving", confidence: "high" },
  ],
  governmentCapacity: [
    { metric: "Tax-to-GDP ratio", value: "32.5%", trend: "improving", confidence: "high" },
    { metric: "Infrastructure grade", value: "D+ (significant gaps)", trend: "stagnating", confidence: "medium" },
    { metric: "Digital government", value: "Improving (PIX, Gov.br)", trend: "improving", confidence: "high" },
    { metric: "Fiscal discipline", value: "Constrained (spending floor)", trend: "stagnating", confidence: "medium" },
  ],
  institutions: [
    { metric: "Press freedom index", value: "Rank 82/180 (2024)", trend: "stagnating", confidence: "medium" },
    { metric: "Corruption perception", value: "Rank 104/180 (2024)", trend: "improving", confidence: "medium" },
    { metric: "Judicial independence", value: "High (STF active)", trend: "stagnating", confidence: "high" },
    { metric: "Democratic recovery", value: "Post-2023 restoration", trend: "improving", confidence: "high" },
  ],
  freedomParticipation: [
    { metric: "Speech freedom", value: "Protected, polarized", trend: "stagnating", confidence: "medium" },
    { metric: "Internet access", value: "84%", trend: "improving", confidence: "high" },
    { metric: "Voter participation", value: "~79%", trend: "stagnating", confidence: "high" },
    { metric: "Protest rights", value: "Legally protected", trend: "stagnating", confidence: "medium" },
  ],
  livedExperience: [
    { metric: "Happiness index", value: "Rank 48/143 (2024)", trend: "improving", confidence: "medium" },
    { metric: "Social trust", value: "Low-moderate", trend: "stagnating", confidence: "low" },
    { metric: "Violence/homicide", value: "~42,000/year", trend: "improving", confidence: "high" },
  ],
  environment: [
    { metric: "Amazon deforestation", value: "Down 50% (2024)", trend: "improving", confidence: "high" },
    { metric: "Renewable energy share", value: "~48% (hydro dominant)", trend: "improving", confidence: "high" },
    { metric: "CO2 emissions", value: "~2.8% of global", trend: "stagnating", confidence: "high" },
    { metric: "Biodiversity", value: "Highest globally, under threat", trend: "improving", confidence: "medium" },
  ],
  historicalTrajectory: "recovering",
},
```

- [ ] **Step 3: Add Japan to the countries array**

Add this object after Brazil:

```typescript
{
  id: "japan",
  name: "Japan",
  flag: "🇯🇵",
  population: "125 million",
  capital: "Tokyo",
  governmentType: "Constitutional monarchy, parliamentary",
  lastElection: "2024 (LDP coalition victory)",
  humanOutcomes: [
    { metric: "Life expectancy", value: "84.8 years", trend: "improving", confidence: "high" },
    { metric: "Literacy rate", value: "~99%", trend: "stagnating", confidence: "high" },
    { metric: "Infant mortality", value: "1.7 per 1,000", trend: "stagnating", confidence: "high" },
    { metric: "Maternal mortality", value: "4 per 100,000", trend: "stagnating", confidence: "high" },
    { metric: "Aging population", value: "29% over 65", trend: "deteriorating", confidence: "high" },
  ],
  economicStructure: [
    { metric: "GDP (nominal)", value: "$4.2 trillion", trend: "stagnating", confidence: "high" },
    { metric: "GDP per capita", value: "$33,800", trend: "stagnating", confidence: "high" },
    { metric: "Unemployment", value: "2.5%", trend: "stagnating", confidence: "high" },
    { metric: "Gini coefficient", value: "0.33", trend: "stagnating", confidence: "high" },
    { metric: "Debt-to-GDP", value: "~263%", trend: "deteriorating", confidence: "high" },
    { metric: "Deflation history", value: "Exiting (2024)", trend: "improving", confidence: "high" },
  ],
  governmentCapacity: [
    { metric: "Tax-to-GDP ratio", value: "33.4%", trend: "improving", confidence: "high" },
    { metric: "Infrastructure grade", value: "A (world-class, aging)", trend: "stagnating", confidence: "high" },
    { metric: "Bureaucratic quality", value: "Very high", trend: "stagnating", confidence: "high" },
    { metric: "Disaster preparedness", value: "World-leading", trend: "stagnating", confidence: "high" },
  ],
  institutions: [
    { metric: "Press freedom index", value: "Rank 70/180 (2024)", trend: "stagnating", confidence: "high" },
    { metric: "Corruption perception", value: "Top 20 globally", trend: "stagnating", confidence: "high" },
    { metric: "Judicial independence", value: "High", trend: "stagnating", confidence: "high" },
    { metric: "LDP dominance", value: "Decades of single-party rule", trend: "stagnating", confidence: "high" },
  ],
  freedomParticipation: [
    { metric: "Speech freedom", value: "Protected, social pressure", trend: "stagnating", confidence: "medium" },
    { metric: "Internet access", value: "93%", trend: "stagnating", confidence: "high" },
    { metric: "Voter participation", value: "~53%", trend: "stagnating", confidence: "high" },
    { metric: "Gender equality", value: "Rank 125/146 (2024)", trend: "improving", confidence: "high" },
  ],
  livedExperience: [
    { metric: "Happiness index", value: "Rank 51/143 (2024)", trend: "stagnating", confidence: "medium" },
    { metric: "Social trust", value: "Moderate-high", trend: "stagnating", confidence: "medium" },
    { metric: "Crime rate", value: "Very low", trend: "stagnating", confidence: "high" },
    { metric: "Work-life balance", value: "Improving (work style reform)", trend: "improving", confidence: "medium" },
  ],
  environment: [
    { metric: "CO2 emissions", value: "~3% of global", trend: "improving", confidence: "high" },
    { metric: "Renewable energy share", value: "~23%", trend: "improving", confidence: "high" },
    { metric: "Nuclear restart", value: "Gradual (post-Fukushima)", trend: "stagnating", confidence: "high" },
    { metric: "Disaster resilience", value: "High", trend: "stagnating", confidence: "high" },
  ],
  historicalTrajectory: "stagnating",
},
```

- [ ] **Step 4: Verify the data compiles**

Run: `npm run build`
Expected: Build succeeds with 6 countries total

---

### Task 3: Export Functionality

**Files:**
- Create: `src/components/ExportButton.tsx`
- Modify: `src/app/civic-ledger/page.tsx`
- Modify: `src/app/civic-intel/page.tsx`

- [ ] **Step 1: Create the ExportButton component**

```tsx
"use client";

import { Download } from "lucide-react";
import { useState } from "react";

interface ExportButtonProps {
  type: "issues" | "countries" | "parties" | "protests" | "all";
  label?: string;
}

export function ExportButton({ type, label }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    
    try {
      // Dynamic imports to avoid bundling all data
      let data: Record<string, unknown> = {};
      
      if (type === "issues" || type === "all") {
        const { issues } = await import("@/data/issues");
        data.issues = issues;
      }
      if (type === "countries" || type === "all") {
        const { countries } = await import("@/data/countries");
        data.countries = countries;
      }
      if (type === "parties" || type === "all") {
        const { parties } = await import("@/data/parties");
        data.parties = parties;
      }
      if (type === "protests" || type === "all") {
        const { protests } = await import("@/data/protests");
        data.protests = protests;
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `politik-${type}-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-1.5 text-[10px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] disabled:opacity-50"
    >
      <Download className="h-3 w-3" />
      {exporting ? "Exporting..." : label || `Export ${type}`}
    </button>
  );
}
```

- [ ] **Step 2: Add ExportButton to civic-ledger page**

In `src/app/civic-ledger/page.tsx`, add the import and component:

1. Add import at the top:
```tsx
import { ExportButton } from "@/components/ExportButton";
```

2. Add the button in the header section (around line 425-430), after the "X of Y issues" text:
```tsx
<div className="flex items-center gap-3">
  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
    {filtered.length} of {issues.length} issues
  </span>
  <ExportButton type="issues" label="Export JSON" />
</div>
```

- [ ] **Step 3: Add ExportButton to civic-intel page**

In `src/app/civic-intel/page.tsx`, add the import and component:

1. Add import at the top:
```tsx
import { ExportButton } from "@/components/ExportButton";
```

2. Add the button in the main header section (around line 645-655):
```tsx
<div className="mb-6 flex items-end justify-between">
  <div>
    <div className="mb-2 flex items-center gap-2">
      <Globe className="h-4 w-4 text-[var(--color-severity-medium)]" />
      <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
        Civic Intel
      </span>
    </div>
    <h1 className="text-2xl font-bold tracking-tight">
      Government Observatory
    </h1>
  </div>
  <ExportButton type="all" label="Export All Data" />
</div>
```

- [ ] **Step 4: Verify export functionality**

Run: `npm run build`
Expected: Build succeeds with ExportButton integrated

---

### Task 4: Keyboard Shortcuts

**Files:**
- Create: `src/components/KeyboardShortcuts.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the KeyboardShortcuts component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";

const shortcuts = [
  { key: "/", description: "Focus search" },
  { key: "g i", description: "Go to Issues" },
  { key: "g c", description: "Go to Civic Intel" },
  { key: "g h", description: "Go Home" },
  { key: "?", description: "Show shortcuts" },
  { key: "Esc", description: "Close modal" },
];

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Handle pending 'g' key for go-to shortcuts
      if (pendingKey === "g") {
        setPendingKey(null);
        if (e.key === "i") {
          window.location.href = "/civic-ledger";
        } else if (e.key === "c") {
          window.location.href = "/civic-intel";
        } else if (e.key === "h") {
          window.location.href = "/";
        }
        return;
      }

      // Handle ? to show help
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      // Handle Escape to close modal
      if (e.key === "Escape") {
        setShowHelp(false);
        return;
      }

      // Handle / to focus search
      if (e.key === "/") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      // Handle g key for go-to shortcuts
      if (e.key === "g") {
        e.preventDefault();
        setPendingKey("g");
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingKey]);

  if (!showHelp) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--color-text)]">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setShowHelp(false)}
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-2">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between border-b border-[var(--color-border)] py-2 last:border-0"
            >
              <span className="text-xs text-[var(--color-text-secondary)]">
                {s.description}
              </span>
              <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-[10px] text-[var(--color-text-muted)]">
          Press <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)]">?</kbd> or <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)]">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add KeyboardShortcuts to layout**

In `src/app/layout.tsx`, add the import and component:

1. Add import at the top:
```tsx
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
```

2. Add the component inside the `<body>` tag, before `{children}`:
```tsx
<body>
  <KeyboardShortcuts />
  <nav>...</nav>
  <main className="pt-14">{children}</main>
</body>
```

- [ ] **Step 3: Verify keyboard shortcuts work**

Run: `npm run build`
Expected: Build succeeds with KeyboardShortcuts component

---

### Task 5: Final Verification

- [ ] **Step 1: Run full build to verify all features**

```bash
npm run build
```

Expected: Build completes successfully with no errors

- [ ] **Step 2: Verify file structure**

Check that all new files exist:
- `src/app/about/page.tsx`
- `src/components/ExportButton.tsx`
- `src/components/KeyboardShortcuts.tsx`

- [ ] **Step 3: Report completion**

All four features implemented:
1. ✅ About page with mission, principles, lifecycle, and roadmap
2. ✅ Country data expanded with Germany, Brazil, Japan (6 total)
3. ✅ Client-side export functionality with JSON download
4. ✅ Keyboard shortcuts with help modal
