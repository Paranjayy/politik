export interface SteelmanPosition {
  side: "for" | "against";
  headline: string;
  argument: string;
  strongestEvidence: {
    title: string;
    source: string;
    summary: string;
  }[];
  steelmanSummary: string;
}

export interface SharedFact {
  claim: string;
  source: string;
  confidence: "high" | "medium" | "low";
}

export interface ActualDisagreement {
  point: string;
  forPosition: string;
  againstPosition: string;
}

export interface SourceLink {
  title: string;
  url: string;
  type: "study" | "report" | "news" | "court-order" | "government";
}

export interface Debate {
  issueId: string;
  issueTitle: string;
  lastUpdated: string;
  supporting: SteelmanPosition;
  opposing: SteelmanPosition;
  sharedFacts: SharedFact[];
  actualDisagreements: ActualDisagreement[];
  sources: SourceLink[];
}

export const debates: Record<string, Debate> = {
  "ISS-006": {
    issueId: "ISS-006",
    issueTitle:
      "Delhi air quality emergency — stubble burning attribution debated",
    lastUpdated: "2026-07-20",
    supporting: {
      side: "for",
      headline: "Stubble burning is the primary seasonal accelerant",
      argument:
        "While Delhi's baseline pollution comes from vehicles, construction, and industry, the acute spikes that push AQI past 400 during October–November are overwhelmingly driven by crop-residue burning in Punjab and Haryana. Without addressing stubble burning, incremental gains in other sources cannot prevent the annual health crisis. Satellite data, chemical source-apportionment studies, and the temporal correlation between fire counts and AQI spikes all converge on this conclusion.",
      strongestEvidence: [
        {
          title: "SAFAR source-apportionment study (2025)",
          source: "Ministry of Earth Sciences, SAFAR",
          summary:
            "Attributed 38% of PM2.5 on peak pollution days to stubble burning — the single largest source during the crisis window.",
        },
        {
          title: "NASA FIRMS fire-count data",
          source: "NASA Active Fire Data",
          summary:
            "Satellite-measured fire counts in Punjab/Haryana correlate at r=0.87 with Delhi AQI readings lagged by 1–3 days.",
        },
        {
          title: "IIT Kanpur chemical analysis",
          source: "IIT Kanpur, 2024",
          summary:
            "Biomass-burning tracers (levoglucosan) in Delhi PM2.5 samples spike 4–6x during November, consistent with agricultural residue combustion.",
        },
      ],
      steelmanSummary:
        "The strongest case for stubble burning as the key issue is not that it is the largest annual source of PM2.5, but that it is the largest *preventable seasonal* source. Vehicles and industry contribute year-round, but the acute, life-threatening spikes that trigger SC intervention and hospital surges are temporally locked to the post-harvest burning window. Without eliminating this trigger, all other mitigation is palliative.",
    },
    opposing: {
      side: "against",
      headline:
        "Stubble burning is a convenient scapegoat for year-round structural failures",
      argument:
        "Focusing on stubble burning lets the Delhi government, MCD, and central agencies off the hook for chronic failures: 11 million+ vehicles in NCR, unregulated construction, coal-fired industries, and the complete absence of a year-round air quality management infrastructure. Even in years with low fire counts (2020, during COVID lockdowns), Delhi's AQI remained 'very poor' for months. Stubble burning accounts for ~38% on peak days but only ~8–12% of the annual average. The attribution debate is politically useful but environmentally misleading.",
      strongestEvidence: [
        {
          title: "Delhi 2020 COVID baseline study",
          source: "CSIR-NEERI, 2021",
          summary:
            "During the COVID lockdown with near-zero stubble burning and minimal vehicular traffic, Delhi AQI still reached 'poor' levels (200+), demonstrating that stationary sources alone sustain hazardous air.",
        },
        {
          title: "Annual average vs. peak analysis",
          source: "Centre for Science and Environment (CSE)",
          summary:
            "Stubble burning's share of annual PM2.5 is 8–12%, not 38%. The 38% figure applies only to the worst 15–20 days. Year-round vehicular and industrial emissions are the dominant load.",
        },
        {
          title: "CPCB continuous monitoring data",
          source: "Central Pollution Control Board",
          summary:
            "Delhi's annual average PM2.5 has remained above 100 µg/m³ (6x WHO limit) even in years with significantly reduced crop fires.",
        },
      ],
      steelmanSummary:
        "The strongest case against the stubble-burning narrative is that it functions as political deflection. Multiple state governments and the central government use it to avoid accountability for systemic failures: weak emission standards enforcement, rampant construction without dust controls, a coal-dependent industrial belt, and 11 million vehicles with aging emission profiles. The data shows Delhi fails air quality standards even without stubble burning — the fires merely turn 'very bad' into 'catastrophic.'",
    },
    sharedFacts: [
      {
        claim:
          "Delhi's AQI regularly exceeds 400 (hazardous) during October–November",
        source: "CPCB real-time monitoring data",
        confidence: "high",
      },
      {
        claim:
          "Stubble burning contributes 30–40% of PM2.5 on peak pollution days",
        source: "SAFAR attribution study, 2025",
        confidence: "high",
      },
      {
        claim:
          "Vehicles, construction, and industry collectively contribute 50–60% of Delhi's annual PM2.5 load",
        source: "CSE, CPCB source apportionment",
        confidence: "high",
      },
      {
        claim:
          "Multiple state governments (Delhi, Punjab, Haryana) and the central government share jurisdictional responsibility",
        source: "CAQM statutory framework",
        confidence: "high",
      },
      {
        claim:
          "The Supreme Court has intervened multiple times, calling the situation a 'gas chamber'",
        source: "SC hearing records, Nov 2025",
        confidence: "high",
      },
    ],
    actualDisagreements: [
      {
        point: "What is the primary cause of Delhi's air crisis?",
        forPosition:
          "Stubble burning is the dominant *seasonal* driver that transforms bad air into a health emergency.",
        againstPosition:
          "Year-round vehicular, construction, and industrial emissions are the dominant *annual* load; stubble burning is a politically amplified contributor.",
      },
      {
        point:
          "Who bears primary responsibility for the crisis?",
        forPosition:
          "Punjab and Haryana state governments for failing to enforce crop-residue management alternatives.",
        againstPosition:
          "Delhi government, MCD, and central agencies for failing to regulate year-round sources and build permanent air quality infrastructure.",
      },
      {
        point:
          "Would eliminating stubble burning solve Delhi's air problem?",
        forPosition:
          "It would prevent the acute annual spike and save thousands of lives during the crisis window, even if baseline pollution persists.",
        againstPosition:
          "No — Delhi would still fail WHO standards year-round. Eliminating stubble burning without addressing structural sources is treating a symptom while the disease progresses.",
      },
    ],
    sources: [
      {
        title: "SAFAR Source Apportionment Study 2025",
        url: "https://www.safar.tropmet.res.in",
        type: "study",
      },
      {
        title: "Supreme Court Hearing — Nov 2025",
        url: "https://main.sci.gov.in",
        type: "court-order",
      },
      {
        title: "CAQM Action Plan — Jan 2026",
        url: "https://cpcb.nic.in/caqm",
        type: "government",
      },
      {
        title: "CSE — Air Quality Analysis",
        url: "https://cseindia.org",
        type: "report",
      },
      {
        title: "CPCB Real-Time Monitoring",
        url: "https://app.cpcb.gov.in",
        type: "government",
      },
      {
        title: "NASA FIRMS Active Fire Data",
        url: "https://firms.modaps.eosdis.nasa.gov",
        type: "study",
      },
    ],
  },
};
