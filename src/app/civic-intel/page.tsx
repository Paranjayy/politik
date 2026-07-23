"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import { parties } from "@/data/parties";
import { protests } from "@/data/protests";
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
  ExternalLink,
} from "lucide-react";

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
    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((d) => (
          <div
            key={d.metric}
            className="flex items-center justify-between rounded-lg bg-[#0a0a0b] px-4 py-3"
          >
            <span className="text-sm text-[#d4d4d8]">{d.metric}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">{d.value}</span>
              {trendIcon[d.trend]}
              <span
                className="rounded px-1.5 py-0.5 text-[10px]"
                style={{
                  color: trendColor[d.trend],
                  background: `${trendColor[d.trend]}15`,
                }}
              >
                {d.trend}
              </span>
              <span
                className="text-[10px]"
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
    </div>
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm text-[#71717a] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to countries
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {country.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                <span>{country.governmentType}</span>
                <span>·</span>
                <span>{country.population}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{
                color: trendColor[country.historicalTrajectory],
                background: `${trendColor[country.historicalTrajectory]}15`,
              }}
            >
              Historical trajectory: {country.historicalTrajectory}
            </span>
          </div>
        </div>

        <div className="space-y-6">
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm text-[#71717a] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to parties
        </button>

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{party.name}</h1>
            <span className="rounded bg-[#ef4444]/10 px-2 py-0.5 text-xs font-medium text-[#ef4444]">
              {party.shortName}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
            <span>Founded {party.founded}</span>
            <span>·</span>
            <span>{party.country}</span>
            {party.currentSeats && (
              <>
                <span>·</span>
                <span>
                  {party.currentSeats}/{party.totalSeats} seats ({party.voteShare})
                </span>
              </>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {party.ideology.map((i) => (
              <span
                key={i}
                className="rounded-md bg-[#27272a] px-2 py-0.5 text-[10px] text-[#a1a1aa]"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Key policies */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
              Key Policies
            </h2>
            <div className="space-y-2">
              {party.keyPolicies.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded bg-[#0a0a0b] px-3 py-2"
                >
                  <span className="mt-0.5 text-[10px] text-[#71717a]">
                    {i + 1}.
                  </span>
                  <span className="text-sm text-[#d4d4d8]">{p}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Governance */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
              Governance Record
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#71717a]">Periods in office</span>
                <span className="text-[#d4d4d8]">
                  {party.governancePeriods.join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">Leadership</span>
                <span className="text-[#d4d4d8]">{party.leadership}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">Internal democracy</span>
                <span
                  className="font-medium"
                  style={{
                    color:
                      party.internalDemocracy === "high"
                        ? "#22c55e"
                        : party.internalDemocracy === "medium"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                >
                  {party.internalDemocracy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">Transparency</span>
                <span
                  className="font-medium"
                  style={{
                    color:
                      party.transparency === "high"
                        ? "#22c55e"
                        : party.transparency === "medium"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                >
                  {party.transparency}
                </span>
              </div>
            </div>
          </section>

          {/* Contradictions */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6 lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ef4444]">
              Contradictions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {party.contradictions.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#27272a] bg-[#0a0a0b] p-4"
                >
                  <p className="text-sm text-[#a1a1aa]">{c}</p>
                </div>
              ))}
            </div>
          </section>
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm text-[#71717a] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to protests
        </button>

        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            {protest.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#a1a1aa]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {protest.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {protest.startDate} — {protest.endDate || "ongoing"}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {protest.participantEstimate}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Demands */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ef4444]">
              Demands
            </h2>
            <div className="space-y-2">
              {protest.demands.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded bg-[#0a0a0b] px-3 py-2"
                >
                  <span className="mt-0.5 text-[10px] text-[#71717a]">
                    {i + 1}.
                  </span>
                  <span className="text-sm text-[#d4d4d8]">{d}</span>
                </div>
              ))}
            </div>
          </section>

          {/* State response */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f59e0b]">
              State Response
            </h2>
            <p className="text-sm leading-relaxed text-[#d4d4d8]">
              {protest.stateResponse}
            </p>
          </section>

          {/* Outcome */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#22c55e]">
              Outcome
            </h2>
            <p className="text-sm leading-relaxed text-[#d4d4d8]">
              {protest.outcome}
            </p>
          </section>

          {/* Long-term impact */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#a855f7]">
              Long-term Impact
            </h2>
            <p className="text-sm leading-relaxed text-[#d4d4d8]">
              {protest.longTermImpact}
            </p>
          </section>

          {/* Timeline */}
          <section className="rounded-xl border border-[#27272a] bg-[#18181b] p-6 lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#71717a]">
              Timeline
            </h2>
            <div className="space-y-3">
              {protest.timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                    {i < protest.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-[#27272a]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="text-xs text-[#71717a]">{t.date}</div>
                    <div className="text-sm text-[#d4d4d8]">{t.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#3b82f6]" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#3b82f6]">
              Civic Intel
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Government Observatory
          </h1>
          <p className="max-w-2xl text-sm text-[#a1a1aa]">
            Layered country reports, party profiles, and protest tracking.
            Evidence-linked, multi-dimensional — no single misleading score.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex gap-1 rounded-lg border border-[#27272a] bg-[#18181b] p-1">
          {([
            { key: "countries", label: "Countries", icon: Globe },
            { key: "parties", label: "Parties", icon: Building2 },
            { key: "protests", label: "Protests", icon: Megaphone },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors ${
                tab === t.key
                  ? "bg-[#3b82f6] text-white"
                  : "text-[#a1a1aa] hover:bg-[#27272a]"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Countries */}
        {tab === "countries" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c)}
                className="group rounded-xl border border-[#27272a] bg-[#18181b] p-6 text-left transition-all hover:border-[#3f3f46] hover:bg-[#1f1f23]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="font-semibold text-white">{c.name}</h3>
                    <p className="text-xs text-[#71717a]">
                      {c.governmentType}
                    </p>
                  </div>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                    style={{
                      color: trendColor[c.historicalTrajectory],
                      background: `${trendColor[c.historicalTrajectory]}15`,
                    }}
                  >
                    {c.historicalTrajectory}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[#71717a]">
                  <div className="flex justify-between">
                    <span>Population</span>
                    <span className="text-[#a1a1aa]">{c.population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last election</span>
                    <span className="text-[#a1a1aa]">{c.lastElection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensions</span>
                    <span className="text-[#a1a1aa]">7 categories</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#3b82f6] opacity-0 transition-opacity group-hover:opacity-100">
                  View report
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Parties */}
        {tab === "parties" && (
          <div className="space-y-3">
            {parties.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedParty(p)}
                className="group w-full rounded-xl border border-[#27272a] bg-[#18181b] p-5 text-left transition-all hover:border-[#3f3f46] hover:bg-[#1f1f23]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{p.name}</h3>
                        <span className="rounded bg-[#ef4444]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#ef4444]">
                          {p.shortName}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-[#71717a]">
                        <span>Founded {p.founded}</span>
                        {p.currentSeats && (
                          <span>
                            {p.currentSeats}/{p.totalSeats} seats ({p.voteShare})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      {p.ideology.slice(0, 2).map((i) => (
                        <span
                          key={i}
                          className="rounded bg-[#27272a] px-2 py-0.5 text-[10px] text-[#a1a1aa]"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#71717a]">
                      <span>Internal democracy:</span>
                      <span
                        className="font-medium"
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
                    <ChevronRight className="h-4 w-4 text-[#71717a] transition-colors group-hover:text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Protests */}
        {tab === "protests" && (
          <div className="space-y-4">
            {protests.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProtest(p)}
                className="group w-full rounded-xl border border-[#27272a] bg-[#18181b] p-6 text-left transition-all hover:border-[#3f3f46] hover:bg-[#1f1f23]"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#71717a]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {p.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {p.startDate} — {p.endDate || "ongoing"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {p.participantEstimate}
                    </span>
                  </div>
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {p.demands.map((d, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#27272a] px-2 py-0.5 text-[10px] text-[#a1a1aa]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid gap-4 text-xs sm:grid-cols-2">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                      Outcome
                    </span>
                    <p className="mt-1 leading-relaxed text-[#a1a1aa]">
                      {p.outcome}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#71717a]">
                      Long-term Impact
                    </span>
                    <p className="mt-1 leading-relaxed text-[#a1a1aa]">
                      {p.longTermImpact}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
