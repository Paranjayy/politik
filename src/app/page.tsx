import {
  FileText,
  Globe,
  Building2,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Civic Issue Ledger",
    description:
      "Track real-world problems with evidence, jurisdiction mapping, and resolution timelines. Issue-first, not personality-first.",
    href: "/civic-ledger",
    color: "#ef4444",
  },
  {
    icon: Globe,
    title: "Civic Intel",
    description:
      "Government observatory with layered country reports, party profiles, protest tracking, and wellbeing measures.",
    href: "/civic-intel",
    color: "#3b82f6",
  },
  {
    icon: Building2,
    title: "Institutional Memory",
    description:
      "Promises tracked against outcomes. Budgets traced to delivery. Jurisdiction mapped to responsibility.",
    href: "/civic-intel",
    color: "#a855f7",
  },
  {
    icon: AlertTriangle,
    title: "Protest Observatory",
    description:
      "Beyond the viral moment. Track demands, state responses, outcomes, and long-term impact over years.",
    href: "/civic-intel",
    color: "#f59e0b",
  },
];

const principles = [
  "Issue-first, not personality-first",
  "Evidence before virality",
  "Transparent history",
  "Separate fact, inference, and opinion",
  "Protect vulnerable reporters",
  "No single popularity score",
  "Clear jurisdiction and responsibility",
  "Structured solution comparison",
  "Independent resolution verification",
  "Open standards and exportable data",
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef4444]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#18181b] px-4 py-1.5 text-xs text-[#a1a1aa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            open civic infrastructure — v0.1
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Structured
            <br />
            <span className="text-[#ef4444]">public intelligence</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
            A transparent, evidence-linked system for understanding how
            governments and societies actually function — without propaganda or
            one misleading score.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="/civic-ledger"
              className="group flex items-center gap-2 rounded-lg bg-[#ef4444] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#dc2626]"
            >
              Explore Issues
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/civic-intel"
              className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181b] px-6 py-3 text-sm font-medium text-[#a1a1aa] transition-all hover:border-[#3f3f46] hover:text-white"
            >
              Country Reports
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#27272a] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Two products. One mission.
            </h2>
            <p className="max-w-xl text-[#a1a1aa]">
              Convert scattered complaints, evidence, promises, and official
              responses into structured, auditable public records.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <a
                key={f.title}
                href={f.href}
                className="group rounded-xl border border-[#27272a] bg-[#18181b] p-8 transition-all hover:border-[#3f3f46] hover:bg-[#1f1f23]"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon className="h-5 w-5" style={{ color: f.color }} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#a1a1aa]">
                  {f.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[#27272a] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-[#ef4444]" />
            <h2 className="text-2xl font-bold tracking-tight">
              Core principles
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-[#27272a] bg-[#18181b] p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#ef4444]/10 text-[10px] font-bold text-[#ef4444]">
                  {i + 1}
                </span>
                <span className="text-sm text-[#d4d4d8]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-[#71717a]">
          <p>
            Politik — computational public-interest intelligence. Built to
            convert scattered civic data into structured public knowledge.
          </p>
          <p className="mt-2">
            v0.1 · Static prototype · No backend · Open data
          </p>
        </div>
      </footer>
    </div>
  );
}
