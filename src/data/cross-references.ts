export interface CrossReference {
  partyId: string;
  issueId: string;
  connection: string;
  relevance: "direct" | "indirect" | "tangential";
}

// Mock cross-references linking party governance periods to civic-ledger issues
export const crossReferences: CrossReference[] = [
  // BJP — currently in governance (2014–present), links to national-level issues
  {
    partyId: "bjp",
    issueId: "ISS-004",
    connection:
      "BJP government's Aadhaar-seeding policy for scholarships is the direct cause of disbursement failures in 312 districts.",
    relevance: "direct",
  },
  {
    partyId: "bjp",
    issueId: "ISS-005",
    connection:
      "BJP-led expansion of Aadhaar-based welfare delivery created the systemic digital infrastructure gap now affecting rural students.",
    relevance: "direct",
  },
  {
    partyId: "bjp",
    issueId: "ISS-006",
    connection:
      "BJP-led central government formed the Commission for Air Quality Management (CAQM) in 2021, but the commission's action plans remain unimplemented across Punjab and Haryana — both BJP-allied or opposition-governed states.",
    relevance: "indirect",
  },
  // INC — last in central governance 2004–2014, historical linkages
  {
    partyId: "inc",
    issueId: "ISS-004",
    connection:
      "INC's MNREGA and RTI framework created the welfare infrastructure that BJP's Aadhaar overlay disrupted. Post-matric scholarship scheme originates from INC-era policy.",
    relevance: "indirect",
  },
  {
    partyId: "inc",
    issueId: "ISS-005",
    connection:
      "INC initiated Aadhaar (Nandan Nilekani's appointment, 2009) and established the UIDAI framework now causing rural verification failures.",
    relevance: "indirect",
  },
  // AAP — governed Delhi 2015–2025, directly relevant to ISS-006
  {
    partyId: "aap",
    issueId: "ISS-006",
    connection:
      "AAP governed Delhi during repeated air quality crises (2015–2025). Despite promises of odd-even schemes and pollution control, Delhi's AQI worsened under their tenure. AAP's focus on school/health infrastructure did not extend to environmental governance.",
    relevance: "direct",
  },
  {
    partyId: "aap",
    issueId: "ISS-001",
    connection:
      "AAP expanded to Punjab (2022–present) where stubble burning — a contributor to Delhi's air crisis — is widespread. Punjab under AAP has seen mixed results on crop-residue management.",
    relevance: "indirect",
  },
  // TMC — West Bengal governance
  {
    partyId: "tmc",
    issueId: "ISS-003",
    connection:
      "TMC's governance model in West Bengal shows parallels to GSRTC's service degradation — state transport corporations under regional parties often face budget neglect and fleet underinvestment.",
    relevance: "tangential",
  },
  // Left Front — historical governance
  {
    partyId: "left",
    issueId: "ISS-004",
    connection:
      "Left parties championed the post-matric scholarship scheme and RTI framework. Their decline in national influence reduced legislative pressure on Aadhaar-linked welfare delivery failures.",
    relevance: "indirect",
  },
  {
    partyId: "left",
    issueId: "ISS-005",
    connection:
      "CPI(M) and Left unions have vocally opposed Aadhaar-linked welfare delivery as a 'digital barrier to rights,' aligning with findings about rural verification failures.",
    relevance: "indirect",
  },
];
