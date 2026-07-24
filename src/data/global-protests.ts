// === GLOBAL PROTEST WIKI DATASET ===
// Comprehensive dataset of 61 major protests from around the world
// All data sourced from historical records, academic sources, and verified reporting

export type ProtestRegion =
  | "South Asia"
  | "East Asia"
  | "Southeast Asia"
  | "Middle East"
  | "Europe"
  | "Americas"
  | "Africa";

export type ProtestCategory =
  | "pro-democracy"
  | "economic"
  | "environmental"
  | "social"
  | "anti-corruption"
  | "labor"
  | "ethnic-rights"
  | "anti-war"
  | "religious";

export type ProtestSignificance = "landmark" | "major" | "notable" | "regional";

export interface GlobalProtest {
  id: string;
  name: string;
  location: string;
  country: string;
  region: ProtestRegion;
  startDate: string;
  endDate: string | null;
  category: ProtestCategory;
  demands: string[];
  participantEstimate: string;
  stateResponse: string;
  outcome: string;
  deaths: number | null;
  keyFigures: string[];
  significance: ProtestSignificance;
}

export const globalProtests: GlobalProtest[] = [
  // ===========================
  // SOUTH ASIA
  // ===========================
  {
    id: "GP-001",
    name: "Bangladesh Quota Protests",
    location: "Dhaka + nationwide",
    country: "Bangladesh",
    region: "South Asia",
    startDate: "2024-07-01",
    endDate: "2024-08-05",
    category: "pro-democracy",
    demands: [
      "Abolish quota system for government jobs",
      "Accountability for police killings",
      "Restore internet access",
      "Release detained protesters",
    ],
    participantEstimate: "Hundreds of thousands; nationwide mobilisation",
    stateResponse:
      "Heavy police and military crackdown, internet blackout, curfews, mass arrests (10,000+), live ammunition used.",
    outcome:
      "PM Sheikh Hasina fled to India on August 5. Interim government formed under Nobel laureate Muhammad Yunus. Quota system reformed.",
    deaths: 1400,
    keyFigures: [
      "Muhammad Yunus",
      "Sheikh Hasina",
      "Nahid Islam",
      "Asif Mahmud",
    ],
    significance: "landmark",
  },
  {
    id: "GP-002",
    name: "Sri Lanka Aragalaya",
    location: "Colombo (Galle Face) + nationwide",
    country: "Sri Lanka",
    region: "South Asia",
    startDate: "2022-03-15",
    endDate: "2022-07-22",
    category: "economic",
    demands: [
      "Resignation of President Gotabaya Rajapaksa",
      "End Rajapaksa family dynasty",
      "Economic relief",
      "Accountability for corruption",
    ],
    participantEstimate: "Hundreds of thousands at peak; nationwide sustained movement",
    stateResponse:
      "State of emergency, military deployed, social media blocks, first shootings of protesters, eventually President fled country.",
    outcome:
      "President fled to Singapore and resigned. PM replaced. IMF deal secured. New government formed.",
    deaths: 9,
    keyFigures: [
      "Gotabaya Rajapaksa",
      "Mahinda Rajapaksa",
      "Ranil Wickremesinghe",
    ],
    significance: "landmark",
  },
  {
    id: "GP-003",
    name: "Nepal Gen Z Anti-Corruption Protests",
    location: "Kathmandu",
    country: "Nepal",
    region: "South Asia",
    startDate: "2025-09-08",
    endDate: "2025-09-12",
    category: "anti-corruption",
    demands: [
      "Lift social media ban",
      "End systemic corruption",
      "PM KP Sharma Oli to resign",
      "Accountability for misgovernance",
    ],
    participantEstimate: "Tens of thousands in Kathmandu; solidarity protests in other cities",
    stateResponse:
      "Internet shutdowns, tear gas, water cannons. Government attempted to ban TikTok and Facebook, further inflaming anger.",
    outcome:
      "PM KP Sharma Oli resigned. Multiple politicians' houses and party offices burned. New government formation negotiations began.",
    deaths: 19,
    keyFigures: ["KP Sharma Oli", "Sushila Karki"],
    significance: "major",
  },
  {
    id: "GP-004",
    name: "India Farmers' Protest",
    location: "Delhi borders (Singhu, Tikri, Ghazipur)",
    country: "India",
    region: "South Asia",
    startDate: "2020-11-26",
    endDate: "2021-12-09",
    category: "labor",
    demands: [
      "Repeal three farm laws",
      "MSP guarantee law",
      "Stop electricity amendment bill",
      "Stop stubble burning penalty on farmers",
    ],
    participantEstimate: "200,000–300,000 at borders; millions mobilised nationally",
    stateResponse:
      "Initially ignored, then internet shutdowns, water cannons, barricading, tear gas at borders.",
    outcome:
      "Laws repealed December 2021. MSP guarantee demand unresolved.",
    deaths: 700,
    keyFigures: [
      "Rakesh Tikait",
      "Darshan Pal",
      "Gurnam Singh Chaduni",
    ],
    significance: "landmark",
  },
  {
    id: "GP-005",
    name: "Shaheen Bagh Protests (CAA-NRC)",
    location: "Shaheen Bagh, Delhi + nationwide",
    country: "India",
    region: "South Asia",
    startDate: "2019-12-15",
    endDate: "2020-03-24",
    category: "social",
    demands: [
      "Repeal Citizenship Amendment Act",
      "No National Register of Citizens",
      "Protect constitutional secularism",
    ],
    participantEstimate: "Thousands daily at Shaheen Bagh; solidarity protests in 20+ cities",
    stateResponse:
      "Delhi Police eventually cleared the site (COVID-19 pretext). Northeast Delhi riots in February 2020 killed 53.",
    outcome:
      "CAA not repealed. NRC not implemented nationally. Protest suppressed.",
    deaths: 53,
    keyFigures: ["Sharjeel Imam", "Amit Shah"],
    significance: "major",
  },
  {
    id: "GP-006",
    name: "Pakistan PTI Protests",
    location: "Islamabad + nationwide",
    country: "Pakistan",
    region: "South Asia",
    startDate: "2024-11-24",
    endDate: "2024-11-27",
    category: "pro-democracy",
    demands: [
      "Release of Imran Khan",
      "Reverse crackdown on PTI",
      "Restore political rights",
    ],
    participantEstimate: "Tens of thousands marching on Islamabad",
    stateResponse:
      "Roads barricaded, container walls, tear gas, water cannons, internet shutdowns, mass arrests.",
    outcome:
      "Protesters dispersed after violent clashes. Imran Khan remained imprisoned. Crackdown on PTI intensified.",
    deaths: 12,
    keyFigures: ["Imran Khan", "Bushra Bibi", "Ali Amin Gandapur"],
    significance: "major",
  },
  {
    id: "GP-007",
    name: "Maldives 'India Out' Movement",
    location: "Malé + nationwide",
    country: "Maldives",
    region: "South Asia",
    startDate: "2020-04-01",
    endDate: "2024-12",
    category: "anti-war",
    demands: [
      "Withdraw Indian military personnel",
      "End Indian influence over sovereignty",
    ],
    participantEstimate: "Thousands at rallies; widespread social media mobilisation",
    stateResponse:
      "Government initially suppressed movement under Solih; embraced it under Muizzu. Diplomatic tensions with India.",
    outcome:
      "India agreed to replace military personnel with civilians. Political realignment toward China.",
    deaths: null,
    keyFigures: ["Mohamed Muizzu", "Abdulla Yameen"],
    significance: "notable",
  },
  {
    id: "GP-008",
    name: "Myanmar Spring Revolution",
    location: "Nationwide",
    country: "Myanmar",
    region: "Southeast Asia",
    startDate: "2021-02-01",
    endDate: null,
    category: "pro-democracy",
    demands: [
      "Restore civilian government",
      "Release Aung San Suu Kyi",
      "End military dictatorship",
      "Abolish 2008 constitution",
    ],
    participantEstimate: "Millions participated in general strikes and protests",
    stateResponse:
      "Mass killings (5,000+), aerial bombings of towns, arbitrary arrests, torture, burning of villages.",
    outcome:
      "Military consolidated control. Nationwide civil war ongoing. NUG government-in-exile formed. ASEAN diplomacy ineffective.",
    deaths: 5000,
    keyFigures: [
      "Aung San Suu Kyi",
      "Min Aung Hlaing",
      "Mahn Win Khaing Than",
    ],
    significance: "landmark",
  },

  // ===========================
  // MIDDLE EAST
  // ===========================
  {
    id: "GP-009",
    name: "Iran Mahsa Amini Protests (Woman, Life, Freedom)",
    location: "Nationwide, Iran",
    country: "Iran",
    region: "Middle East",
    startDate: "2022-09-16",
    endDate: "2023-03",
    category: "social",
    demands: [
      "End mandatory hijab law",
      "End morality police",
      "Political reform",
      "Women's bodily autonomy",
    ],
    participantEstimate: "Millions participated across 150+ cities",
    stateResponse:
      "Mass arrests (22,000+), internet shutdowns, lethal force (500+ killed including 70 children), mass executions.",
    outcome:
      "No formal policy change. Morality police enforcement reduced in practice. Hijab law remains but enforcement weakened.",
    deaths: 551,
    keyFigures: [
      "Mahsa Amini",
      "Nika Shakarami",
      "Kian Pirfak",
    ],
    significance: "landmark",
  },
  {
    id: "GP-010",
    name: "Arab Spring — Tunisia",
    location: "Tunis + nationwide",
    country: "Tunisia",
    region: "Middle East",
    startDate: "2010-12-17",
    endDate: "2011-01-14",
    category: "pro-democracy",
    demands: [
      "End of Ben Ali regime",
      "Jobs and economic opportunity",
      "Political freedom",
      "End of corruption",
    ],
    participantEstimate: "Hundreds of thousands in Tunis; nationwide",
    stateResponse:
      "Initial crackdown with live ammunition, then military refused to fire on protesters.",
    outcome:
      "President Ben Ali fled to Saudi Arabia after 23 years in power. Transition to democracy began. Constituent Assembly elected.",
    deaths: 338,
    keyFigures: ["Zine El Abidine Ben Ali", "Mohamed Bouazizi"],
    significance: "landmark",
  },
  {
    id: "GP-011",
    name: "Arab Spring — Egypt",
    location: "Cairo (Tahrir Square) + nationwide",
    country: "Egypt",
    region: "Middle East",
    startDate: "2011-01-25",
    endDate: "2011-02-11",
    category: "pro-democracy",
    demands: [
      "End of Mubarak regime",
      "Democracy and free elections",
      "Economic opportunity",
      "End of emergency law",
    ],
    participantEstimate: "Millions across Egypt; 1.7 million in Tahrir Square on Feb 1",
    stateResponse:
      "Initial violent crackdown (Camel Battle), then military took over from police.",
    outcome:
      "Mubarak resigned after 18 days. Military council (SCAF) ruled. Democratic elections followed.",
    deaths: 846,
    keyFigures: ["Hosni Mubarak", "Wael Ghonim", "Mohamed ElBaradei"],
    significance: "landmark",
  },
  {
    id: "GP-012",
    name: "Libya Civil War / Revolution",
    location: "Benghazi + nationwide",
    country: "Libya",
    region: "Middle East",
    startDate: "2011-02-15",
    endDate: "2011-10-23",
    category: "pro-democracy",
    demands: [
      "End of Gaddafi regime",
      "Democracy",
      "Human rights",
    ],
    participantEstimate: "Hundreds of thousands; armed insurgency",
    stateResponse:
      "Gaddafi ordered lethal force. Civil war erupted. NATO intervention.",
    outcome:
      "Gaddafi killed. Transitional government formed. Country descended into factional conflict.",
    deaths: 10000,
    keyFigures: ["Muammar Gaddafi", "Mustafa Abdul Jalil"],
    significance: "landmark",
  },
  {
    id: "GP-013",
    name: "Yemen Revolution",
    location: "Sana'a + nationwide",
    country: "Yemen",
    region: "Middle East",
    startDate: "2011-01-27",
    endDate: "2011-11-23",
    category: "pro-democracy",
    demands: [
      "End of Saleh regime",
      "Political transition",
      "Economic reform",
    ],
    participantEstimate: "Hundreds of thousands at Change Square, Sana'a",
    stateResponse:
      "Snipers fired on protesters, over 200 killed. Saleh injured in mosque bombing.",
    outcome:
      "Saleh signed GCC initiative, transferred power to VP Hadi. Transition collapsed into civil war by 2014.",
    deaths: 200,
    keyFigures: ["Ali Abdullah Saleh", "Tawakkol Karman", "Abd Rabbuh Mansur Hadi"],
    significance: "major",
  },
  {
    id: "GP-014",
    name: "Bahrain Uprising",
    location: "Manama (Pearl Roundabout)",
    country: "Bahrain",
    region: "Middle East",
    startDate: "2011-02-14",
    endDate: "2011-03-18",
    category: "pro-democracy",
    demands: [
      "Constitutional monarchy",
      "End of sectarian discrimination",
      "Release of political prisoners",
    ],
    participantEstimate: "Tens of thousands at peak",
    stateResponse:
      "Saudi-led GCC forces intervened. Pearl Roundabout demolished. Mass arrests, torture, revocation of citizenship.",
    outcome:
      "Uprising crushed. Minimal reforms. Opposition leader Sheikh Ali Salman imprisoned.",
    deaths: 100,
    keyFigures: ["Sheikh Ali Salman", "King Hamad bin Isa Al Khalifa"],
    significance: "major",
  },
  {
    id: "GP-015",
    name: "Syrian Revolution",
    location: "Daraa + nationwide",
    country: "Syria",
    region: "Middle East",
    startDate: "2011-03-15",
    endDate: null,
    category: "pro-democracy",
    demands: [
      "End of Assad regime",
      "Democracy and human rights",
      "Release of political prisoners",
    ],
    participantEstimate: "Millions participated before descent into civil war",
    stateResponse:
      "Systematic torture, mass killings, barrel bombs, chemical weapons attacks. Over 500,000 killed.",
    outcome:
      "Protests evolved into civil war. Multiple foreign interventions. Assad fell in December 2024. Transitional government formed.",
    deaths: 500000,
    keyFigures: ["Bashar al-Assad", "Abu Mohammad al-Julani"],
    significance: "landmark",
  },
  {
    id: "GP-016",
    name: "Iraq Tishreen Protests",
    location: "Baghdad (Tishreen Square) + southern cities",
    country: "Iraq",
    region: "Middle East",
    startDate: "2019-10-01",
    endDate: "2019-11-07",
    category: "anti-corruption",
    demands: [
      "End of sectarian quota system",
      "Jobs and basic services",
      "End Iranian interference",
      "Accountability for corruption",
    ],
    participantEstimate: "Millions across Iraq",
    stateResponse:
      "Snipers targeted protesters, 700+ killed, 29,000+ injured. Internet shutdowns.",
    outcome:
      "PM Adel Abdul-Mahdi resigned. Electoral law reformed. But fundamental sectarian system remained.",
    deaths: 700,
    keyFigures: [
      "Adel Abdul-Mahdi",
      "Muqtada al-Sadr",
    ],
    significance: "major",
  },
  {
    id: "GP-017",
    name: "Lebanon October Revolution",
    location: "Beirut (Martyrs' Square) + nationwide",
    country: "Lebanon",
    region: "Middle East",
    startDate: "2019-10-17",
    endDate: "2019-11-13",
    category: "anti-corruption",
    demands: [
      "Resignation of all political leaders",
      "End of sectarian system",
      "Accountability for corruption",
      "Economic reforms",
    ],
    participantEstimate: "Over 1 million in Beirut (1/4 of population); nationwide",
    stateResponse:
      "Tear gas, rubber bullets. Internet shut down. Initial concession on WhatsApp tax, then deeper cracks in political class.",
    outcome:
      "PM Saad Hariri resigned. Government formed months later but failed to implement reforms. 2020 Beirut port explosion compounded crisis.",
    deaths: null,
    keyFigures: ["Saad Hariri", "Hassan Diab"],
    significance: "major",
  },
  {
    id: "GP-018",
    name: "Israel Judicial Reform Protests",
    location: "Tel Aviv + nationwide",
    country: "Israel",
    region: "Middle East",
    startDate: "2023-01-07",
    endDate: "2023-03-27",
    category: "pro-democracy",
    demands: [
      "Stop judicial overhaul",
      "Protect Supreme Court independence",
      "Preserve democratic checks and balances",
    ],
    participantEstimate: "Over 500,000 at peak; largest protests in Israeli history",
    stateResponse:
      "PM Netanyahu pushed legislation through Knesset despite mass opposition.",
    outcome:
      "Government paused reform. Supreme Court struck down reasonableness law. Political crisis ongoing.",
    deaths: null,
    keyFigures: ["Benjamin Netanyahu", "Isaac Herzog"],
    significance: "major",
  },
  {
    id: "GP-019",
    name: "Iran Fuel Protests (Aban protests)",
    location: "Nationwide",
    country: "Iran",
    region: "Middle East",
    startDate: "2019-11-15",
    endDate: "2019-11-20",
    category: "economic",
    demands: [
      "Reverse fuel price hikes",
      "Economic relief",
      "Political reform",
    ],
    participantEstimate: "Millions in 100+ cities",
    stateResponse:
      "Near-total internet shutdown. Security forces used lethal force. Over 1,500 killed.",
    outcome:
      "Fuel price increases maintained. Government survived. Crackdown continued for months.",
    deaths: 1500,
    keyFigures: ["Ali Khamenei"],
    significance: "major",
  },

  // ===========================
  // EUROPE
  // ===========================
  {
    id: "GP-020",
    name: "Ukraine Euromaidan",
    location: "Kyiv (Maidan Nezalezhnosti) + western Ukraine",
    country: "Ukraine",
    region: "Europe",
    startDate: "2013-11-21",
    endDate: "2014-02-23",
    category: "pro-democracy",
    demands: [
      "EU association agreement",
      "Resignation of President Yanukovych",
      "End of corruption",
      "Closer ties with Europe",
    ],
    participantEstimate: "800,000 in Kyiv at peak; protests across western Ukraine",
    stateResponse:
      "Riot police (Berkut) attacked protesters. Snipers fired on crowds. Over 100 killed (Heavenly Hundred).",
    outcome:
      "Yanukovych fled to Russia. New pro-Western government formed. Russia annexed Crimea and war in Donbas began.",
    deaths: 108,
    keyFigures: [
      "Viktor Yanukovych",
      "Petro Poroshenko",
      "Arseniy Yatsenyuk",
    ],
    significance: "landmark",
  },
  {
    id: "GP-021",
    name: "France Yellow Vests (Gilets Jaunes)",
    location: "Paris + nationwide",
    country: "France",
    region: "Europe",
    startDate: "2018-11-17",
    endDate: "2019-01-05",
    category: "economic",
    demands: [
      "Reverse fuel tax hike",
      "Increase minimum wage",
      "RIC (Citizens' Initiative Referendum)",
      "Wealth tax reinstatement",
    ],
    participantEstimate: "282,000 at peak; sustained weekly protests",
    stateResponse:
      "Massive police brutality, 2,500+ injured, 12,000+ arrested. Use of rubber bullets (LBD) caused eye injuries.",
    outcome:
      "Fuel tax cancelled. Macron held national debate. Some concessions but core economic grievances unaddressed.",
    deaths: 11,
    keyFigures: ["Emmanuel Macron", "Christophe Castaner"],
    significance: "major",
  },
  {
    id: "GP-022",
    name: "France Pension Reform Protests",
    location: "Paris + nationwide",
    country: "France",
    region: "Europe",
    startDate: "2023-01-19",
    endDate: "2023-06-23",
    category: "labor",
    demands: [
      "Withdraw pension reform bill",
      "Maintain retirement age at 62",
      "General strike",
    ],
    participantEstimate: "1.28 million at peak; sustained rolling strikes",
    stateResponse:
      "Government used Article 49.3 to bypass parliament. Police crackdown on demonstrations.",
    outcome:
      "Reform passed. Unions vowed continued resistance. Political damage to Macron.",
    deaths: null,
    keyFigures: ["Emmanuel Macron", "Élisabeth Borne", "Laurent Berger"],
    significance: "major",
  },
  {
    id: "GP-023",
    name: "Belarus Protests",
    location: "Minsk + nationwide",
    country: "Belarus",
    region: "Europe",
    startDate: "2020-08-09",
    endDate: "2021-03",
    category: "pro-democracy",
    demands: [
      "Annul rigged election results",
      "Release political prisoners",
      "New free and fair elections",
    ],
    participantEstimate: "Up to 400,000 in Minsk at peak; largest protests in Belarusian history",
    stateResponse:
      "Mass arrests (35,000+), torture in detention centers, forced confessions, internet shutdowns.",
    outcome:
      "Lukashenko remained in power with Russian support. Opposition leader Sviatlana Tsikhanouskaya exiled. Ongoing repression.",
    deaths: 4,
    keyFigures: [
      "Alexander Lukashenko",
      "Sviatlana Tsikhanouskaya",
      "Maria Kolesnikova",
    ],
    significance: "major",
  },
  {
    id: "GP-024",
    name: "Georgia Rose Revolution",
    location: "Tbilisi",
    country: "Georgia",
    region: "Europe",
    startDate: "2003-11-02",
    endDate: "2003-11-23",
    category: "pro-democracy",
    demands: [
      "Resignation of President Shevardnadze",
      "Fair elections",
      "Anti-corruption reforms",
    ],
    participantEstimate: "100,000 in Tbilisi",
    stateResponse:
      "Shevardnadze declared state of emergency; resigned when protesters entered parliament.",
    outcome:
      "Shevardnadze resigned. Mikheil Saakashvili won presidential election. Sweeping reforms followed.",
    deaths: null,
    keyFigures: [
      "Eduard Shevardnadze",
      "Mikheil Saakashvili",
      "Nino Burjanadze",
    ],
    significance: "landmark",
  },
  {
    id: "GP-025",
    name: "Georgia EU Protests",
    location: "Tbilisi",
    country: "Georgia",
    region: "Europe",
    startDate: "2024-04-15",
    endDate: "2024-05",
    category: "pro-democracy",
    demands: [
      "Retract 'foreign agent' law",
      "Maintain EU integration path",
    ],
    participantEstimate: "Over 100,000 in Tbilisi; largest protests since 2003",
    stateResponse:
      "Parliament passed law despite mass protests. Police used water cannons and tear gas.",
    outcome:
      "Law passed. EU suspended Georgia's accession process. Political crisis deepened after disputed elections.",
    deaths: null,
    keyFigures: ["Bidzina Ivanishvili", "Salome Zourabichvili"],
    significance: "major",
  },
  {
    id: "GP-026",
    name: "Serbia Protests",
    location: "Belgrade + nationwide",
    country: "Serbia",
    region: "Europe",
    startDate: "2024-11-01",
    endDate: "2025-03",
    category: "anti-corruption",
    demands: [
      "Accountability for Novi Sad railway station canopy collapse (15 dead)",
      "Resignation of government officials",
      "Press freedom",
      "End of corruption",
    ],
    participantEstimate: "Over 300,000 in Belgrade at peak; nationwide protests",
    stateResponse:
      "Violent crackdowns, pro-government rallies organized, media blackout, arrests of student protesters.",
    outcome:
      "PM Vučević resigned January 2025. Broader anti-corruption movement continued. Snap elections called.",
    deaths: null,
    keyFigures: ["Aleksandar Vučić", "Miloš Vučević"],
    significance: "major",
  },
  {
    id: "GP-027",
    name: "UK Poll Tax Riots",
    location: "London + nationwide",
    country: "United Kingdom",
    region: "Europe",
    startDate: "1990-03-31",
    endDate: "1990-03-31",
    category: "economic",
    demands: [
      "Abolish poll tax",
      "Fairer taxation",
    ],
    participantEstimate: "200,000+ in Trafalgar Square; riots across England",
    stateResponse:
      "Mounted police charged crowd. 340+ arrested in London. Widespread disorder.",
    outcome:
      "Poll tax abandoned. PM Margaret Thatcher resigned. Replaced with Council Tax.",
    deaths: null,
    keyFigures: ["Margaret Thatcher", "John Major"],
    significance: "landmark",
  },
  {
    id: "GP-028",
    name: "Iceland Kitchenware Revolution",
    location: "Reykjavík",
    country: "Iceland",
    region: "Europe",
    startDate: "2008-10-11",
    endDate: "2009-04-25",
    category: "economic",
    demands: [
      "Resignation of government after banking collapse",
      "Constitutional reform",
      "Accountability for bankers",
    ],
    participantEstimate: "10,000+ in Reykjavík (1/3 of capital population)",
    stateResponse:
      "PM Geir Haarde referred to court. Constitutional convention convened.",
    outcome:
      "Government fell. New coalition elected. New constitution drafted (though later blocked). Bankers prosecuted.",
    deaths: null,
    keyFigures: ["Geir Haarde", "Jóhanna Sigurðardóttir"],
    significance: "notable",
  },
  {
    id: "GP-029",
    name: "Spain Indignados (15-M Movement)",
    location: "Madrid (Puerta del Sol) + nationwide",
    country: "Spain",
    region: "Europe",
    startDate: "2011-05-15",
    endDate: "2011-06-12",
    category: "economic",
    demands: [
      "Real democracy now",
      "End austerity",
      "Housing rights",
      "Political reform",
    ],
    participantEstimate: "6 million across Spain at peak",
    stateResponse:
      "Police evicted occupied squares. Mass arrests. But movement reshaped political landscape.",
    outcome:
      "Catalysed Podemos party. Shifted political discourse leftward. Inspired Occupy movement globally.",
    deaths: null,
    keyFigures: ["Juan Carlos Monedero", "Pablo Iglesias"],
    significance: "major",
  },
  {
    id: "GP-030",
    name: "Greece Anti-Austerity Protests",
    location: "Athens (Syntagma Square) + nationwide",
    country: "Greece",
    region: "Europe",
    startDate: "2010-05-05",
    endDate: "2012-06",
    category: "economic",
    demands: [
      "Reject troika austerity terms",
      "Protect pensions and wages",
      "Sovereignty over economic policy",
    ],
    participantEstimate: "Millions over multiple waves; largest in Greek history",
    stateResponse:
      "Tear gas, rubber bullets. Police violence widely documented. Three years of rolling general strikes.",
    outcome:
      "Austerity imposed. SYRIZA elected in 2015 but ultimately accepted third bailout. Deep social damage.",
    deaths: 5,
    keyFigures: ["Alexis Tsipras", "Yanis Varoufakis"],
    significance: "major",
  },
  {
    id: "GP-031",
    name: "Poland Black Protests (Abortion)",
    location: "Warsaw + nationwide",
    country: "Poland",
    region: "Europe",
    startDate: "2020-10-22",
    endDate: "2020-11",
    category: "social",
    demands: [
      "Defend abortion rights",
      "Reject constitutional tribunal ruling",
      "Women's rights",
    ],
    participantEstimate: "Over 400,000 across Poland; largest since Solidarity",
    stateResponse:
      "Government dismissed protests. Police used tear gas and arrested protesters.",
    outcome:
      "Abortion ban upheld by government. But protests mobilised progressive voters who voted PiS out in 2023.",
    deaths: null,
    keyFigures: ["Andrzej Duda", "Julia Przyłębska"],
    significance: "major",
  },
  {
    id: "GP-032",
    name: "Netherlands Farmer Protests",
    location: "The Hague + nationwide",
    country: "Netherlands",
    region: "Europe",
    startDate: "2022-01-01",
    endDate: "2022-10",
    category: "environmental",
    demands: [
      "Reverse nitrogen emission reduction plan",
      "Protect family farms",
      "Fair compensation",
    ],
    participantEstimate: "Tens of thousands; tractor convoys on highways",
    stateResponse:
      "Farmers blocked highways with tractors. Government maintained policy. Some arrests.",
    outcome:
      "Policy partially modified. Farmers' Party (BBB) won Senate seats in 2023 elections. Coalition politics shifted.",
    deaths: null,
    keyFigures: ["Carla Dik-Faber", "Thierry Baudet"],
    significance: "notable",
  },

  // ===========================
  // AMERICAS
  // ===========================
  {
    id: "GP-033",
    name: "US Capitol Breach (January 6)",
    location: "Washington D.C.",
    country: "United States",
    region: "Americas",
    startDate: "2021-01-06",
    endDate: "2021-01-06",
    category: "pro-democracy",
    demands: [
      "Overturn 2020 election results",
      "Pressure VP Pence to reject electoral votes",
    ],
    participantEstimate: "2,000–2,500 entered the Capitol; tens of thousands at rally",
    stateResponse:
      "National Guard deployment delayed. Capitol Police overwhelmed. Congress evacuated.",
    outcome:
      "5 deaths, 140+ officers injured. Over 1,200 charged. Trump impeaned (acquitted by Senate). Electoral certification completed.",
    deaths: 5,
    keyFigures: ["Donald Trump", "Mike Pence", "Nancy Pelosi"],
    significance: "landmark",
  },
  {
    id: "GP-034",
    name: "US George Floyd / Black Lives Matter",
    location: "Minneapolis + nationwide (2,000+ cities)",
    country: "United States",
    region: "Americas",
    startDate: "2020-05-26",
    endDate: "2020-09",
    category: "social",
    demands: [
      "End police brutality",
      "Defund police",
      "Racial justice",
      "Prosecute killer cops",
    ],
    participantEstimate: "15–26 million Americans; largest protests in US history",
    stateResponse:
      "National Guard deployed in 30+ states. Tear gas, rubber bullets, mass arrests (14,000+). Curfews in major cities.",
    outcome:
      "Derek Chauvin convicted of murder. Some police reforms passed. National reckoning on race, but systemic change limited.",
    deaths: 19,
    keyFigures: ["George Floyd", "Derek Chauvin", "Patrisse Cullors"],
    significance: "landmark",
  },
  {
    id: "GP-035",
    name: "Occupy Wall Street",
    location: "New York (Zuccotti Park) + 900+ cities worldwide",
    country: "United States",
    region: "Americas",
    startDate: "2011-09-17",
    endDate: "2011-11-15",
    category: "economic",
    demands: [
      "End corporate influence on democracy",
      "Economic justice",
      "Wealth redistribution",
    ],
    participantEstimate: "Tens of thousands in NYC; millions globally",
    stateResponse:
      "Zuccotti Park cleared by NYPD. Pepper spray incidents. Police brutality documented.",
    outcome:
      "Cleared without concrete policy wins. Shifted discourse on inequality. Inspired protest movements worldwide.",
    deaths: null,
    keyFigures: ["David Graeber", "Kalle Lasn"],
    significance: "landmark",
  },
  {
    id: "GP-036",
    name: "Chile Estallido Social",
    location: "Santiago + nationwide",
    country: "Chile",
    region: "Americas",
    startDate: "2019-10-18",
    endDate: "2020-03-15",
    category: "social",
    demands: [
      "New constitution",
      "End of Pinochet-era economic model",
      "Pension reform",
      "Healthcare and education reform",
    ],
    participantEstimate: "Over 1.2 million in Santiago at peak; nationwide mobilisation",
    stateResponse:
      "State of emergency, military deployed (first since Pinochet), curfews, 30+ killed, 460+ eye injuries from rubber bullets.",
    outcome:
      "Plebiscite approved constitutional rewrite. Constitutional convention elected. However, new constitution rejected in 2022 and 2023 referendums.",
    deaths: 34,
    keyFigures: ["Sebastián Piñera", "Giorgio Jackson"],
    significance: "landmark",
  },
  {
    id: "GP-037",
    name: "Brazil Protests (Jornada de Junho)",
    location: "São Paulo + 100+ cities",
    country: "Brazil",
    region: "Americas",
    startDate: "2013-06-17",
    endDate: "2013-07-01",
    category: "economic",
    demands: [
      "Reject bus fare hikes",
      "Better public services",
      "End of corruption",
      "Political reform",
    ],
    participantEstimate: "Over 1 million across Brazil at peak",
    stateResponse:
      "Police tear gas and rubber bullets. Mass arrests. Escalated from transit protests to systemic grievances.",
    outcome:
      "Bus fare reversal. Exposed deep dissatisfaction with political class. Catalysed right-wing mobilisation in 2016.",
    deaths: null,
    keyFigures: ["Dilma Rousseff", "Aécio Neves"],
    significance: "major",
  },
  {
    id: "GP-038",
    name: "Colombia National Strike",
    location: "Bogotá + nationwide",
    country: "Colombia",
    region: "Americas",
    startDate: "2019-11-21",
    endDate: "2021-07",
    category: "economic",
    demands: [
      "Withdrawal of tax reform",
      "Economic equity",
      "Peace accord implementation",
      "End of police violence",
    ],
    participantEstimate: "Millions mobilised over two years",
    stateResponse:
      "Police crackdowns, 80+ killed, 2,400+ eye injuries from rubber bullets, mass arrests.",
    outcome:
      "Tax reform withdrawn. National dialogue initiated. Peace accords partially implemented. Electoral shift leftward.",
    deaths: 80,
    keyFigures: ["Iván Duque", "Gustavo Petro"],
    significance: "major",
  },
  {
    id: "GP-039",
    name: "Argentina Cacerolazos",
    location: "Buenos Aires + nationwide",
    country: "Argentina",
    region: "Americas",
    startDate: "2001-12-20",
    endDate: "2001-12-21",
    category: "economic",
    demands: [
      "End of corralito (bank freeze)",
      "Resignation of President De la Rúa",
      "Economic justice",
    ],
    participantEstimate: "Hundreds of thousands; spontaneous mass mobilisation",
    stateResponse:
      "State of siege declared. Police repression killed 39. President fled by helicopter.",
    outcome:
      "President De la Rúa resigned. Five presidents in two weeks. IMF bailout model discredited. Piquetero movement rose.",
    deaths: 39,
    keyFigures: ["Fernando de la Rúa", "Eduardo Duhalde"],
    significance: "landmark",
  },
  {
    id: "GP-040",
    name: "Canada Freedom Convoy",
    location: "Ottawa + border crossings",
    country: "Canada",
    region: "Americas",
    startDate: "2022-01-22",
    endDate: "2022-02-23",
    category: "social",
    demands: [
      "End vaccine mandates",
      "Remove COVID restrictions",
      "Resignation of PM Trudeau",
    ],
    participantEstimate: "Thousands in Ottawa; convoy of trucks",
    stateResponse:
      "Invoked Emergencies Act for first time. Bank accounts frozen. Police cleared convoy.",
    outcome:
      "Emergency measures upheld by court as justified. Mandates gradually ended. Political fallout continued.",
    deaths: null,
    keyFigures: ["Justin Trudeau", "Tamara Lich", "Pat King"],
    significance: "notable",
  },
  {
    id: "GP-041",
    name: "Honduras Coup Protests",
    location: "Tegucigalpa + nationwide",
    country: "Honduras",
    region: "Americas",
    startDate: "2009-06-28",
    endDate: "2009-09",
    category: "pro-democracy",
    demands: [
      "Restore President Zelaya",
      "Reject military coup",
      "Constitutional order",
    ],
    participantEstimate: "Tens of thousands at peak",
    stateResponse:
      "Military crackdown, curfews, media blackout. Zelaya exiled to Costa Rica.",
    outcome:
      "Zelaya not restored. Coup leader Porfirio Lobo elected. Democracy weakened. Human rights deteriorated.",
    deaths: 2,
    keyFigures: ["Manuel Zelaya", "Roberto Micheletti"],
    significance: "notable",
  },
  {
    id: "GP-042",
    name: "Bolivia Water War",
    location: "Cochabamba",
    country: "Bolivia",
    region: "Americas",
    startDate: "2000-02",
    endDate: "2000-04",
    category: "economic",
    demands: [
      "Revoke water privatization to Bechtel",
      "Affordable water access",
    ],
    participantEstimate: "100,000 in Cochabamba",
    stateResponse:
      "Martial law declared. 17-year-oldVictor Hugo Daza killed. 200+ injured.",
    outcome:
      "Bechtel contract cancelled. Water returned to public control. Precedent for resource nationalization.",
    deaths: 6,
    keyFigures: ["Evo Morales", "Oscar Olivera"],
    significance: "notable",
  },

  // ===========================
  // AFRICA
  // ===========================
  {
    id: "GP-043",
    name: "Sudan Revolution",
    location: "Khartoum + nationwide",
    country: "Sudan",
    region: "Africa",
    startDate: "2018-12-19",
    endDate: "2019-04-11",
    category: "pro-democracy",
    demands: [
      "End of al-Bashir regime",
      "Civilian government",
      "Economic reform",
      "End of ethnic conflict",
    ],
    participantEstimate: "Millions across Sudan",
    stateResponse:
      "Live ammunition used. 200+ killed. Sit-in at military HQ dispersed with massacre (June 3, 100+ killed).",
    outcome:
      "Al-Bashir overthrown. Transitional government formed. Military-civilian power sharing. Coup in October 2021. Civil war since April 2023.",
    deaths: 200,
    keyFigures: ["Omar al-Bashir", "Abdalla Hamdok", "Mohamed Hamdan Dagalo"],
    significance: "landmark",
  },
  {
    id: "GP-044",
    name: "South Africa #FeesMustFall",
    location: "Cape Town, Johannesburg + nationwide universities",
    country: "South Africa",
    region: "Africa",
    startDate: "2015-10-14",
    endDate: "2016-02",
    category: "social",
    demands: [
      "Free tertiary education",
      "End fee increases",
      "Decolonize curriculum",
    ],
    participantEstimate: "Tens of thousands of students across universities",
    stateResponse:
      "Police deployed on campuses. Rubber bullets, tear gas. 800+ arrested. Campuses shut.",
    outcome:
      "0% fee increase for 2016. Fee-free education for poor students implemented. But universal free education remains unfulfilled.",
    deaths: null,
    keyFigures: ["Mmusi Maimane", "Nompendulo Mkhatshwa"],
    significance: "major",
  },
  {
    id: "GP-045",
    name: "Nigeria #EndSARS",
    location: "Lagos (Lekki Toll Gate) + nationwide + diaspora",
    country: "Nigeria",
    region: "Africa",
    startDate: "2020-10-07",
    endDate: "2020-10-20",
    category: "social",
    demands: [
      "Disband SARS (Special Anti-Robbery Squad)",
      "End police brutality",
      "Prosecute killer cops",
      "Police reform",
    ],
    participantEstimate: "Millions across Nigeria; diaspora support worldwide",
    stateResponse:
      "Lekki massacre on October 20: soldiers opened fire on peaceful protesters at toll gate. Internet shutdown.",
    outcome:
      "SARS formally disbanded. #EndSARS judicial panels set up (largely unimplemented). No accountability for Lekki shooting.",
    deaths: 56,
    keyFigures: ["Buhari", "Sanwo-Olu", "Aisha Yesufu"],
    significance: "landmark",
  },
  {
    id: "GP-046",
    name: "Kenya Finance Bill Protests",
    location: "Nairobi (Parliament) + nationwide",
    country: "Kenya",
    region: "Africa",
    startDate: "2024-06-18",
    endDate: "2024-06-27",
    category: "economic",
    demands: [
      "Reject Finance Bill 2024",
      "End unjust taxation",
      "Accountability for corruption",
    ],
    participantEstimate: "Hundreds of thousands; youth-led",
    stateResponse:
      "Police fired live ammunition. 23+ killed. Parliament stormed and set on fire. President Ruto deployed military.",
    outcome:
      "President Ruto withdrew the bill. Cabinet reshuffled. Gen Z political consciousness emerged.",
    deaths: 23,
    keyFigures: ["William Ruto", "Martha Karua"],
    significance: "major",
  },
  {
    id: "GP-047",
    name: "Ethiopia Protests (Oromo Protests)",
    location: "Oromia + Amhara regions",
    country: "Ethiopia",
    region: "Africa",
    startDate: "2015-11",
    endDate: "2018-04",
    category: "ethnic-rights",
    demands: [
      "End Oromo marginalization",
      "Political reform",
      "Release political prisoners",
      "End of land grabs",
    ],
    participantEstimate: "Millions across Oromia and Amhara",
    stateResponse:
      "State of emergency, mass arrests (60,000+), internet shutdowns, military operations.",
    outcome:
      "PM Hailemariam Desalegn resigned. Abiy Ahmed became PM. Released political prisoners. Won Nobel Peace Prize. But Tigray war followed.",
    deaths: 1600,
    keyFigures: ["Abiy Ahmed", "Hailemariam Desalegn"],
    significance: "major",
  },
  {
    id: "GP-048",
    name: "DRC Protests",
    location: "Kinshasa + eastern DRC",
    country: "DR Congo",
    region: "Africa",
    startDate: "2023-12",
    endDate: "2024-02",
    category: "pro-democracy",
    demands: [
      "Respect election results",
      "End Kabila's extended rule",
      "Democratic transition",
    ],
    participantEstimate: "Tens of thousands in Kinshasa",
    stateResponse:
      "Internet shutdown, opposition offices raided, mass arrests.",
    outcome:
      "Félix Tshisekedi inaugurated for second term. Opposition rejected results. Governance challenges continued.",
    deaths: null,
    keyFigures: ["Félix Tshisekedi", "Martin Fayulu"],
    significance: "notable",
  },
  {
    id: "GP-049",
    name: "Zimbabwe August Strikes",
    location: "Harare + nationwide",
    country: "Zimbabwe",
    region: "Africa",
    startDate: "2019-01-14",
    endDate: "2019-01-16",
    category: "economic",
    demands: [
      "End fuel price hikes",
      "Economic reform",
      "Reverse austerity",
    ],
    participantEstimate: "Tens of thousands; nationwide shutdown",
    stateResponse:
      "Military deployed. 17 killed, 600+ arrested. Internet shutdown for 5 days.",
    outcome:
      "Fuel prices maintained. Mnangagwa government continued repression. Economic crisis deepened.",
    deaths: 17,
    keyFigures: ["Emmerson Mnangagwa"],
    significance: "notable",
  },

  // ===========================
  // EAST ASIA
  // ===========================
  {
    id: "GP-050",
    name: "Hong Kong Pro-Democracy Protests",
    location: "Hong Kong Island, Kowloon, New Territories",
    country: "Hong Kong",
    region: "East Asia",
    startDate: "2019-03-31",
    endDate: "2020-06-30",
    category: "pro-democracy",
    demands: [
      "Withdraw extradition bill",
      "Full universal suffrage",
      "Independent investigation into police violence",
      "Release of arrested protesters",
    ],
    participantEstimate: "2 million (June 16); sustained occupation for months",
    stateResponse:
      "Tear gas, rubber bullets, mass arrests (10,000+). National Security Law imposed June 2020.",
    outcome:
      "Extradition bill withdrawn. But NSL effectively ended protest movement. Mass emigration. Opposition crushed.",
    deaths: 11,
    keyFigures: [
      "Joshua Wong",
      "Nathan Law",
      "Carrie Lam",
    ],
    significance: "landmark",
  },
  {
    id: "GP-051",
    name: "Thailand Pro-Democracy Protests",
    location: "Bangkok + nationwide",
    country: "Thailand",
    region: "Southeast Asia",
    startDate: "2020-07-18",
    endDate: "2021-03",
    category: "pro-democracy",
    demands: [
      "Reform monarchy",
      "New constitution",
      "Dissolve parliament",
      "End intimidation of dissidents",
    ],
    participantEstimate: "Tens of thousands at peak",
    stateResponse:
      "Emergency decrees, mass arrests, lèse-majesté charges (up to 15 years prison).",
    outcome:
      "Protests suppressed. Core demands unmet. Youth political consciousness sustained. Progressive party dissolved.",
    deaths: null,
    keyFigures: ["Prayut Chan-o-cha", "Pannika Wanich"],
    significance: "major",
  },
  {
    id: "GP-052",
    name: "Taiwan Sunflower Movement",
    location: "Taipei (Legislative Yuan)",
    country: "Taiwan",
    region: "East Asia",
    startDate: "2014-03-18",
    endDate: "2014-04-10",
    category: "pro-democracy",
    demands: [
      "Reject Cross-Strait Service Trade Agreement",
      "Transparent legislative process",
      "Ratify CSSTA only after oversight legislation",
    ],
    participantEstimate: "500,000 in Taipei at peak; 300,000 in other cities",
    stateResponse:
      "Initial eviction attempt. Police eventually allowed occupation to end peacefully.",
    outcome:
      "CSSTA review blocked. Oversight legislation passed. DPP won presidency in 2016. Civil society revitalized.",
    deaths: null,
    keyFigures: ["Chen Wei-ting", "Lin Fei-fan", "Huang Kuo-chang"],
    significance: "landmark",
  },
  {
    id: "GP-053",
    name: "Mongolia Protests",
    location: "Ulaanbaatar",
    country: "Mongolia",
    region: "East Asia",
    startDate: "2022-12-05",
    endDate: "2022-12",
    category: "anti-corruption",
    demands: [
      "Resignation of government over lost mining wealth",
      "Accountability for corruption",
      "Economic relief",
    ],
    participantEstimate: "Tens of thousands in Ulaanbaatar",
    stateResponse:
      "Parliament building stormed. Government offered partial concessions.",
    outcome:
      "PM Oyn-Erdene initially survived. Partial reforms enacted. Political instability continued.",
    deaths: null,
    keyFigures: ["Luvsannamsrain Oyn-Erdene"],
    significance: "notable",
  },
  {
    id: "GP-054",
    name: "Philippines EDSA Revolution",
    location: "EDSA Highway, Manila",
    country: "Philippines",
    region: "Southeast Asia",
    startDate: "1986-02-22",
    endDate: "1986-02-25",
    category: "pro-democracy",
    demands: [
      "End Marcos dictatorship",
      "Restore democracy",
      "Resign Marcos",
    ],
    participantEstimate: "2–3 million on EDSA highway",
    stateResponse:
      "Military defections. Soldiers refused orders to fire on crowds. Marcos fled to Hawaii.",
    outcome:
      "Corazon Aquino became president. Democracy restored. Marcos regime ended after 20 years.",
    deaths: null,
    keyFigures: [
      "Corazon Aquino",
      "Fidel Ramos",
      "Enrile",
      "Ferdinand Marcos",
    ],
    significance: "landmark",
  },
  {
    id: "GP-055",
    name: "Indonesia Reformasi",
    location: "Jakarta + nationwide",
    country: "Indonesia",
    region: "Southeast Asia",
    startDate: "1998-05-12",
    endDate: "1998-05-21",
    category: "pro-democracy",
    demands: [
      "End of Suharto's New Order regime",
      "Democratization",
      "Economic reform",
    ],
    participantEstimate: "Hundreds of thousands in Jakarta",
    stateResponse:
      "Military shot protesters at Trisakti University (4 killed). Riots erupted. Chinese community targeted.",
    outcome:
      "Suharto resigned after 32 years. Democratization began. East Timor gained independence.",
    deaths: 1000,
    keyFigures: ["Suharto", "Megawati Sukarnoputri"],
    significance: "landmark",
  },
  {
    id: "GP-056",
    name: "South Korea Candlelight Revolution",
    location: "Seoul (Gwanghwamun Square) + nationwide",
    country: "South Korea",
    region: "East Asia",
    startDate: "2016-10-29",
    endDate: "2017-03-10",
    category: "anti-corruption",
    demands: [
      "Impeach President Park Geun-hye",
      "End of Choi Soon-sil influence",
      "Political reform",
    ],
    participantEstimate: "1.5 million at peak; 17 consecutive weekends",
    stateResponse:
      "Peaceful mass protests. Constitutional Court upheld impeachment.",
    outcome:
      "Park Geun-hye impeached (first president). Sentenced to 24 years (later pardoned). Moon Jae-in elected.",
    deaths: null,
    keyFigures: ["Park Geun-hye", "Choi Soon-sil", "Moon Jae-in"],
    significance: "landmark",
  },
  {
    id: "GP-057",
    name: "Japan Anti-Nuclear Protests",
    location: "Tokyo (outside PM residence) + nationwide",
    country: "Japan",
    region: "East Asia",
    startDate: "2011-03-11",
    endDate: "2012-07",
    category: "environmental",
    demands: [
      "Shut down nuclear power plants",
      "Phase out nuclear energy",
      "Transparency about Fukushima disaster",
    ],
    participantEstimate: "Tens of thousands; largest protests since 1960s",
    stateResponse:
      "Government continued restart plans despite protests.",
    outcome:
      "All reactors temporarily shut down. Some restarted under strict safety reviews. Japan reduced nuclear dependence.",
    deaths: null,
    keyFigures: ["Naoto Kan"],
    significance: "notable",
  },
  {
    id: "GP-058",
    name: "China Tiananmen Square Protests",
    location: "Beijing (Tiananmen Square) + nationwide",
    country: "China",
    region: "East Asia",
    startDate: "1989-04-15",
    endDate: "1989-06-04",
    category: "pro-democracy",
    demands: [
      "Democratization",
      "Freedom of press",
      "End of corruption",
      "Dialogue with government",
    ],
    participantEstimate: "1 million in Beijing; millions nationwide in 400+ cities",
    stateResponse:
      "Martial law declared. PLA units moved into Beijing. June 4 massacre: troops opened fire on civilians.",
    outcome:
      "Protests crushed. Estimates of 200–3,000 killed. Leaders fled or imprisoned. CCP tightened control. Topic remains censored.",
    deaths: 2600,
    keyFigures: [
      "Zhao Ziyang",
      "Wang Dan",
      "Chai Ling",
      "Deng Xiaoping",
    ],
    significance: "landmark",
  },
  {
    id: "GP-059",
    name: "China White Paper Protests (A4 Revolution)",
    location: "Major cities: Beijing, Shanghai, Chengdu, Guangzhou",
    country: "China",
    region: "East Asia",
    startDate: "2022-11-26",
    endDate: "2022-12",
    category: "pro-democracy",
    demands: [
      "End zero-COVID lockdowns",
      "Freedom of speech",
      "Xi Jinping step down",
    ],
    participantEstimate: "Tens of thousands across major cities",
    stateResponse:
      "Police dispersed protesters. Some arrested. Then abruptly ended zero-COVID policy.",
    outcome:
      "Zero-COVID policy lifted December 2022. Protest leaders detained. Demonstrated limits of surveillance state.",
    deaths: null,
    keyFigures: ["Xi Jinping"],
    significance: "major",
  },

  // ===========================
  // SOUTHEAST ASIA
  // ===========================
  {
    id: "GP-060",
    name: "Malaysia Reformasi",
    location: "Kuala Lumpur + nationwide",
    country: "Malaysia",
    region: "Southeast Asia",
    startDate: "1998-09-20",
    endDate: "1999-11",
    category: "pro-democracy",
    demands: [
      "Release Anwar Ibrahim",
      "End crony capitalism",
      "Political reform",
    ],
    participantEstimate: "Tens of thousands; multi-ethnic movement",
    stateResponse:
      "Anwar beaten by police chief. Tear gas, water cannons. Reformasi movement formed.",
    outcome:
      "Anwar convicted (later acquitted). Reformasi energized opposition. Pakatan Rakyat coalition formed. Anwar eventually became PM in 2022.",
    deaths: null,
    keyFigures: ["Anwar Ibrahim", "Mahathir Mohamad"],
    significance: "landmark",
  },
  {
    id: "GP-061",
    name: "Myanmar 8888 Uprising",
    location: "Rangoon + nationwide",
    country: "Myanmar",
    region: "Southeast Asia",
    startDate: "1988-03-12",
    endDate: "1988-09-18",
    category: "pro-democracy",
    demands: [
      "End military dictatorship",
      "Democracy and human rights",
      "Economic reform",
    ],
    participantEstimate: "Hundreds of thousands; millions on August 8",
    stateResponse:
      "Military crackdown. 3,000+ killed. Aung San Suu Kyi placed under house arrest.",
    outcome:
      "Military junta (SLORC) took power. Suu Kyi won 1990 election (results annulled). Decades of military rule followed.",
    deaths: 3000,
    keyFigures: ["Aung San Suu Kyi", "Ne Win", "Saw Maung"],
    significance: "landmark",
  },
];

// === AGGREGATE STATISTICS ===
export const regions: ProtestRegion[] = [
  "South Asia",
  "East Asia",
  "Southeast Asia",
  "Middle East",
  "Europe",
  "Americas",
  "Africa",
];

export const categories: ProtestCategory[] = [
  "pro-democracy",
  "economic",
  "environmental",
  "social",
  "anti-corruption",
  "labor",
  "ethnic-rights",
  "anti-war",
  "religious",
];

export const significanceLevels: ProtestSignificance[] = [
  "landmark",
  "major",
  "notable",
  "regional",
];

export function getDecades(): string[] {
  const decades = new Set<string>();
  globalProtests.forEach((p) => {
    const year = new Date(p.startDate).getFullYear();
    const decade = `${Math.floor(year / 10) * 10}s`;
    decades.add(decade);
  });
  return [...decades].sort();
}

export function getDecadeForDate(date: string): string {
  const year = new Date(date).getFullYear();
  return `${Math.floor(year / 10) * 10}s`;
}
