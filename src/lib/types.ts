// === CIVIC LEDGER TYPES ===

export type IssueStatus =
  | "reported"
  | "triaged"
  | "evidence-requested"
  | "verified"
  | "deduplicated"
  | "classified"
  | "jurisdiction-assigned"
  | "response-requested"
  | "intervention-proposed"
  | "funded"
  | "in-progress"
  | "partially-resolved"
  | "resolved"
  | "audited"
  | "reopened";

export type EvidenceClass =
  | "direct"
  | "testimonial"
  | "institutional"
  | "journalistic"
  | "academic"
  | "inference";

export type EvidenceConfidence =
  | "verified-fact"
  | "reported-claim"
  | "disputed-claim"
  | "expert-assessment"
  | "statistical-estimate"
  | "model-inference"
  | "opinion";

export type IdentityLevel =
  | "public-verified"
  | "verified-pseudonym"
  | "anonymous"
  | "institutional";

export interface Evidence {
  id: string;
  type: EvidenceClass;
  confidence: EvidenceConfidence;
  title: string;
  source: string;
  date: string;
  description: string;
}

export interface VoteSignals {
  confirmation: number; // Have you personally observed this?
  impact: number;       // How many people affected?
  severity: number;     // How harmful?
  urgency: number;      // How quickly must action occur?
  confidence: number;   // How strong is the evidence?
  neglect: number;      // How long unresolved?
  tractability: number; // Can realistic intervention address it?
  support: number;      // Do people endorse proposed solution?
}

export interface TimelineEvent {
  date: string;
  event: string;
  actor: string;
  type: "report" | "response" | "action" | "verification" | "status-change";
}

export interface Jurisdiction {
  statutory: string;
  funding: string;
  implementation: string;
  regulatory: string;
  maintenance: string;
  oversight: string;
}

export interface Issue {
  id: string;
  title: string;
  location: string;
  country: string;
  state: string;
  district: string;
  ward?: string;
  coordinates?: { lat: number; lng: number };
  domain: string;
  problemType: string;
  severity: "low" | "medium" | "high" | "critical";
  urgency: "low" | "medium" | "high" | "critical";
  affectedPopulation: number;
  sensitiveInstitutions?: string[];
  description: string;
  status: IssueStatus;
  firstReported: string;
  lastUpdated: string;
  reporterIdentity: IdentityLevel;
  evidence: Evidence[];
  votes: VoteSignals;
  timeline: TimelineEvent[];
  jurisdiction: Jurisdiction;
  relatedIssues: string[];
  recurrenceCount: number;
  estimatedCost?: string;
  officialResponses: string[];
  resolutionEvidence?: string;
}

// === CIVIC INTEL TYPES ===

export type WellbeingDimension =
  | "material-capacity"
  | "security"
  | "agency"
  | "subjective-wellbeing";

export type GovernmentTrend =
  | "improving"
  | "stagnating"
  | "deteriorating"
  | "volatile"
  | "recovering";

export interface DimensionScore {
  metric: string;
  value: string;
  trend: GovernmentTrend;
  confidence: "high" | "medium" | "low";
}

export interface CountryReport {
  id: string;
  name: string;
  flag: string;
  population: string;
  capital: string;
  governmentType: string;
  lastElection: string;
  humanOutcomes: DimensionScore[];
  economicStructure: DimensionScore[];
  governmentCapacity: DimensionScore[];
  institutions: DimensionScore[];
  freedomParticipation: DimensionScore[];
  livedExperience: DimensionScore[];
  environment: DimensionScore[];
  historicalTrajectory: GovernmentTrend;
}

export interface PartyProfile {
  id: string;
  name: string;
  shortName: string;
  founded: string;
  ideology: string[];
  country: string;
  currentSeats?: number;
  totalSeats?: number;
  voteShare?: string;
  leadership: string;
  governancePeriods: string[];
  keyPolicies: string[];
  internalDemocracy: "high" | "medium" | "low";
  transparency: "high" | "medium" | "low";
  contradictions: string[];
}

export interface ProtestEvent {
  id: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
  endDate?: string;
  organizers: string[];
  demands: string[];
  participantEstimate: string;
  stateResponse: string;
  outcome: string;
  longTermImpact: string;
  timeline: { date: string; event: string }[];
}
