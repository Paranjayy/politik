"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";
import { protests } from "@/data/protests";
import { issues } from "@/data/issues";
import { crossReferences } from "@/data/cross-references";
import type { CountryReport, PartyProfile, ProtestEvent } from "@/lib/types";
import {
  Globe,
  Building2,
  Megaphone,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Link2,
} from "lucide-react";
import { ExportButton } from "@/components/ExportButton";

const trendIcon: Record<string, React.ReactNode> = {
  improving: <TrendingUp className="h-3 w-3 text-[#22c55e]" />,
  stagnating: <Minus className="h-3 w-3 text-[#71717a]" />,
  deteriorating: <TrendingDown className="h-3 w-3 text-[#ef4444]" />,
  volatile: <AlertTriangle className="h-3 w-3 text-[#f59e0b]" />,
  recovering: <TrendingUp className="h-3 w-3 text-[#06b6d4]" />,
};

const trendColor: Record<string, string> = {
  improving: "#22c55e",
  stagnating: "#71717a",
  deteriorating: "#ef4444",
  volatile: "#f59e0b",
  recovering: "#06b6d4",
};

function DimensionSection({
  title,
  data,
}: {
  title: string;
  data: { metric: string; value: string; trend: string; confidence: string }[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
        {title}
      </h2>
      <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
        {data.map((d) => (
          <div
            key={d.metric}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-[var(--color-bg-raised)]"
          >
            <span className="text-xs text-[var(--color-text-secondary)]">
              {d.metric}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[var(--color-text)]">
                {d.value}
              </span>
              {trendIcon[d.trend]}
              <span
                className="rounded px-1.5 py-0.5 text-[9px] font-[family-name:var(--font-mono)]"
                style={{
                  color: trendColor[d.trend],
                  background: `${trendColor[d.trend]}15`,
                }}
              >
                {d.trend}
              </span>
              <span
                className="text-[9px] font-[family-name:var(--font-mono)]"
                style={{
                  color:
                    d.confidence === "high"
                      ? "#22c55e"
                      : d.confidence === "medium"
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              >
                {d.confidence}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountryDetail({
  country,
  onBack,
}: {
  country: CountryReport;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          All countries
        </button>

        {/* Header - asymmetric */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{country.flag}</span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                  {country.name}
                </h1>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>{country.governmentType}</span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span>{country.population}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[10px] font-medium font-[family-name:var(--font-mono)]"
                style={{
                  color: trendColor[country.historicalTrajectory],
                  background: `${trendColor[country.historicalTrajectory]}15`,
                }}
              >
                Historical trajectory: {country.historicalTrajectory}
              </span>
            </div>
          </div>

          {/* Quick stats sidebar */}
          <div className="flex flex-col gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
            {[
              { label: "Capital", value: country.capital },
              { label: "Last election", value: country.lastElection },
              { label: "Population", value: country.population },
              { label: "Dimensions", value: "7 categories" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between bg-[var(--color-bg-raised)] px-4 py-3"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {s.label}
                </span>
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-8">
          <DimensionSection
            title="A. Human Outcomes"
            data={country.humanOutcomes}
          />
          <DimensionSection
            title="B. Economic Structure"
            data={country.economicStructure}
          />
          <DimensionSection
            title="C. Government Capacity"
            data={country.governmentCapacity}
          />
          <DimensionSection
            title="D. Institutions"
            data={country.institutions}
          />
          <DimensionSection
            title="E. Freedom & Participation"
            data={country.freedomParticipation}
          />
          <DimensionSection
            title="F. Lived Experience"
            data={country.livedExperience}
          />
          <DimensionSection
            title="G. Environment"
            data={country.environment}
          />
        </div>
      </div>
    </div>
  );
}

function PartyDetail({
  party,
  onBack,
}: {
  party: PartyProfile;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          All parties
        </button>

        {/* Header - asymmetric */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {party.name}
              </h1>
              <span className="rounded bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                {party.shortName}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span>Founded {party.founded}</span>
              <span className="text-[var(--color-border)]">·</span>
              <span>{party.country}</span>
              {party.currentSeats && (
                <>
                  <span className="text-[var(--color-border)]">·</span>
                  <span>
                    {party.currentSeats}/{party.totalSeats} seats ({party.voteShare})
                  </span>
                </>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {party.ideology.map((i) => (
                <span
                  key={i}
                  className="rounded bg-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-col gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
            {[
              { label: "Leadership", value: party.leadership },
              { label: "Governance", value: party.governancePeriods.join(", ") },
              {
                label: "Internal democracy",
                value: party.internalDemocracy,
                color:
                  party.internalDemocracy === "high"
                    ? "#22c55e"
                    : party.internalDemocracy === "medium"
                      ? "#f59e0b"
                      : "#ef4444",
              },
              {
                label: "Transparency",
                value: party.transparency,
                color:
                  party.transparency === "high"
                    ? "#22c55e"
                    : party.transparency === "medium"
                      ? "#f59e0b"
                      : "#ef4444",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between bg-[var(--color-bg-raised)] px-4 py-3"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {s.label}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: s.color || "var(--color-text)" }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Key policies */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Key Policies
              </h2>
              <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {party.keyPolicies.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[var(--color-bg-raised)]"
                  >
                    <span className="mt-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Governance record */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Governance Record
              </h2>
              <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {[
                  { label: "Periods in office", value: party.governancePeriods.join(", ") },
                  { label: "Leadership", value: party.leadership },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      {s.label}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contradictions */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                Contradictions
              </h2>
              <div className="space-y-2">
                {party.contradictions.map((c, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-[var(--color-accent)] pl-3 text-xs text-[var(--color-text-secondary)]"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </section>

            {/* Related Issues (Cross-references) */}
            {(() => {
              const refs = crossReferences.filter(
                (cr) => cr.partyId === party.id
              );
              if (refs.length === 0) return null;
              return (
                <section>
                  <h2 className="mb-4 flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
                    <Link2 className="h-3 w-3 text-[var(--color-severity-medium)]" />
                    Related Issues
                  </h2>
                  <div className="space-y-2">
                    {refs.map((ref, i) => {
                      const issue = issues.find((iss) => iss.id === ref.issueId);
                      const relevanceColor =
                        ref.relevance === "direct"
                          ? "var(--color-accent)"
                          : ref.relevance === "indirect"
                            ? "var(--color-severity-high)"
                            : "var(--color-text-muted)";
                      return (
                        <div
                          key={i}
                          className="rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                              {ref.issueId}
                            </span>
                            <span
                              className="rounded px-1.5 py-0.5 text-[8px] font-medium uppercase"
                              style={{
                                backgroundColor: `${relevanceColor}15`,
                                color: relevanceColor,
                              }}
                            >
                              {ref.relevance}
                            </span>
                            {issue && (
                              <span
                                className="rounded px-1.5 py-0.5 text-[8px] font-medium"
                                style={{
                                  backgroundColor:
                                    issue.severity === "critical"
                                      ? "rgba(239,68,68,0.1)"
                                      : issue.severity === "high"
                                        ? "rgba(245,158,11,0.1)"
                                        : "rgba(113,113,122,0.1)",
                                  color:
                                    issue.severity === "critical"
                                      ? "#ef4444"
                                      : issue.severity === "high"
                                        ? "#f59e0b"
                                        : "#71717a",
                                }}
                              >
                                {issue.severity}
                              </span>
                            )}
                          </div>
                          {issue && (
                            <div className="text-[10px] font-medium text-[var(--color-text)] mb-1">
                              {issue.title}
                            </div>
                          )}
                          <p className="text-[9px] leading-relaxed text-[var(--color-text-muted)]">
                            {ref.connection}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtestDetail({
  protest,
  onBack,
}: {
  protest: ProtestEvent;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          All protests
        </button>

        {/* Header - asymmetric */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="mb-3 text-2xl font-bold tracking-tight lg:text-3xl">
              {protest.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {protest.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {protest.startDate} — {protest.endDate || "ongoing"}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {protest.participantEstimate}
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-col gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
            {[
              { label: "Country", value: protest.country },
              { label: "Participants", value: protest.participantEstimate },
              { label: "Organizers", value: protest.organizers.join(", ") },
              {
                label: "Duration",
                value: protest.endDate
                  ? `${protest.startDate} — ${protest.endDate}`
                  : `${protest.startDate} — ongoing`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between bg-[var(--color-bg-raised)] px-4 py-3"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {s.label}
                </span>
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Demands */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-accent)]">
                Demands
              </h2>
              <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {protest.demands.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[var(--color-bg-raised)]"
                  >
                    <span className="mt-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="mb-4 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Timeline
              </h2>
              <div className="relative ml-2 border-l border-[var(--color-border)]">
                {protest.timeline.map((t, i) => (
                  <div key={i} className="relative mb-4 pl-6">
                    <div className="absolute left-0 top-1 h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full bg-[var(--color-accent)]" />
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                      {t.date}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {t.event}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* State response */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-high)]">
                State Response
              </h2>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {protest.stateResponse}
              </p>
            </section>

            {/* Outcome */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-status-verified)]">
                Outcome
              </h2>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {protest.outcome}
              </p>
            </section>

            {/* Long-term impact */}
            <section>
              <h2 className="mb-3 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
                Long-term Impact
              </h2>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {protest.longTermImpact}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tab = "countries" | "parties" | "protests";

export default function CivicIntelPage() {
  const [tab, setTab] = useState<Tab>("countries");
  const [selectedCountry, setSelectedCountry] =
    useState<CountryReport | null>(null);
  const [selectedParty, setSelectedParty] = useState<PartyProfile | null>(null);
  const [selectedProtest, setSelectedProtest] =
    useState<ProtestEvent | null>(null);

  if (selectedCountry) {
    return (
      <CountryDetail
        country={selectedCountry}
        onBack={() => setSelectedCountry(null)}
      />
    );
  }
  if (selectedParty) {
    return (
      <PartyDetail
        party={selectedParty}
        onBack={() => setSelectedParty(null)}
      />
    );
  }
  if (selectedProtest) {
    return (
      <ProtestDetail
        protest={selectedProtest}
        onBack={() => setSelectedProtest(null)}
      />
    );
  }

  return (
    <div className="min-h-screen border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[var(--color-severity-medium)]" />
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-severity-medium)]">
                Civic Intel
              </span>
              <a href="/civic-intel/timeline" className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Timeline
              </a>
              <a href="/civic-intel/compare" className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Compare
              </a>
              <a href="/civic-intel/wiki" className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Wiki
              </a>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Government Observatory
            </h1>
          </div>
          <ExportButton data={tab === "countries" ? countries : tab === "parties" ? parties : protests} filename={`civic-intel-${tab}`} />
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex gap-px rounded border border-[var(--color-border)] bg-[var(--color-border)]">
          {([
            { key: "countries", label: "Countries", icon: Globe, count: countries.length },
            { key: "parties", label: "Parties", icon: Building2, count: parties.length },
            { key: "protests", label: "Protests", icon: Megaphone, count: protests.length },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors ${
                tab === t.key
                  ? "bg-[var(--color-bg-raised)] text-[var(--color-text)]"
                  : "bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-text-muted)]">
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Countries - data table */}
        {tab === "countries" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Country Reports
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {countries.length} countries
              </span>
            </div>
            <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
              {countries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c)}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-[var(--color-bg-raised)] -mx-px px-4"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-severity-medium)]">
                        {c.name}
                      </h3>
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] font-medium font-[family-name:var(--font-mono)]"
                        style={{
                          color: trendColor[c.historicalTrajectory],
                          background: `${trendColor[c.historicalTrajectory]}15`,
                        }}
                      >
                        {c.historicalTrajectory}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                      <span>{c.governmentType}</span>
                      <span>{c.population}</span>
                      <span>Last election: {c.lastElection}</span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-3 sm:flex">
                    <div className="text-right">
                      <div className="text-[9px] text-[var(--color-text-muted)]">
                        Dimensions
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-text)]">
                        7
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-severity-medium)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Parties - data rows */}
        {tab === "parties" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Party Profiles
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {parties.length} parties
              </span>
            </div>
            <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
              {parties.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedParty(p)}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-[var(--color-bg-raised)] -mx-px px-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-severity-medium)]">
                        {p.name}
                      </h3>
                      <span className="rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-[9px] font-medium font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                        {p.shortName}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                      <span>Founded {p.founded}</span>
                      {p.currentSeats && (
                        <span>
                          {p.currentSeats}/{p.totalSeats} seats ({p.voteShare})
                        </span>
                      )}
                      <div className="flex gap-1">
                        {p.ideology.slice(0, 2).map((i) => (
                          <span
                            key={i}
                            className="rounded bg-[var(--color-border)] px-1.5 py-0.5 text-[9px] text-[var(--color-text-muted)]"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-4 sm:flex">
                    <div className="text-right">
                      <div className="text-[9px] text-[var(--color-text-muted)]">
                        Democracy
                      </div>
                      <span
                        className="font-[family-name:var(--font-mono)] text-xs font-medium"
                        style={{
                          color:
                            p.internalDemocracy === "high"
                              ? "#22c55e"
                              : p.internalDemocracy === "medium"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {p.internalDemocracy}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-[var(--color-text-muted)]">
                        Transparency
                      </div>
                      <span
                        className="font-[family-name:var(--font-mono)] text-xs font-medium"
                        style={{
                          color:
                            p.transparency === "high"
                              ? "#22c55e"
                              : p.transparency === "medium"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {p.transparency}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-severity-medium)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Protests - data rows with inline metrics */}
        {tab === "protests" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
                Protest Documentation
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]">
                {protests.length} protests
              </span>
            </div>
            <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
              {protests.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProtest(p)}
                  className="group flex w-full items-start gap-4 py-4 text-left transition-colors hover:bg-[var(--color-bg-raised)] -mx-px px-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1">
                      <h3 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5" />
                        {p.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        {p.startDate} — {p.endDate || "ongoing"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-2.5 w-2.5" />
                        {p.participantEstimate}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.demands.map((d, i) => (
                        <span
                          key={i}
                          className="rounded bg-[var(--color-border)] px-1.5 py-0.5 text-[9px] text-[var(--color-text-muted)]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 grid gap-4 sm:grid-cols-2">
                      <div>
                        <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                          Outcome
                        </span>
                        <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                          {p.outcome}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-text-muted)]">
                          Long-term Impact
                        </span>
                        <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                          {p.longTermImpact}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:block">
                    <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
