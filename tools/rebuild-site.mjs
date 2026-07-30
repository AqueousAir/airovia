import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const year = 2026;
let currentFile = "";

const nav = [
  { label: "Home", href: "index.html" },
  {
    label: "Company",
    href: "company.html",
    items: [
      ["About AIROVIA", "company.html"],
      ["Development Stage", "development-stage.html"],
      ["Partners", "partners.html"],
      ["Investors", "investors/"],
    ],
  },
  {
    label: "Infrastructure",
    href: "solution.html",
    items: [
      ["AIROVIA Solution", "solution.html"],
      ["Facilities", "facilities.html"],
      ["Technology", "technology.html"],
      ["Energy", "energy.html"],
      ["Operations Platform", "monitoring-platform.html"],
      ["Capacity and Performance", "capacity-performance.html"],
    ],
  },
  {
    label: "Applications",
    href: "use-cases.html",
    items: [
      ["Data Centers", "data-centers/"],
      ["Industrial Facilities", "industrial-facilities.html"],
      ["Government Water Resilience", "government-water-resilience.html"],
      ["Remote Infrastructure", "remote-infrastructure.html"],
      ["Agriculture", "agriculture.html"],
      ["Destination Developments", "destination-developments.html"],
    ],
  },
  {
    label: "Resources",
    href: "how-it-works.html",
    items: [
      ["How It Works", "how-it-works.html"],
      ["Infrastructure Brief", "infrastructure-brief.html"],
      ["Sustainability Indicators", "sustainability.html"],
      ["Technical Library", "technical-library.html"],
      ["Project Development", "project-development.html"],
    ],
  },
  { label: "Contact", href: "contact.html" },
];

const commonDisclaimer = "Actual production and energy consumption depend on temperature, relative humidity, dew point, configuration, operating conditions, operating schedule and site engineering.";

const facilityFormats = [
  ["Purpose-Built Industrial Facility", "A dedicated steel, concrete or hybrid facility designed around airflow, equipment access, treatment, storage, electrical systems and maintenance.", "images/home/Purpose-Built.png"],
  ["Existing-Building Integration", "AIROVIA process systems installed within warehouses, utility buildings, industrial compounds or existing infrastructure facilities.", "images/home/Existing-Building.png"],
  ["Modular Facility", "Prefabricated process modules designed for phased deployment, faster installation and scalable capacity.", "images/home/Modular-Facility.png"],
  ["Custom Architectural Facility", "A purpose-designed structure created with architects, governments, developers or major infrastructure owners.", "images/home/Custom-Architectural.png"],
  ["AIROVIA Air House", "The signature AIROVIA architectural format for high-visibility, public-facing and landmark deployments.", "air-house.png"],
];

const processSteps = ["Ambient Air Intake", "Moisture Extraction", "Water Collection", "Purification", "Mineral Stabilization", "Storage", "Distribution", "Intelligent Operations"];
const technologySteps = ["Ambient Air Intake", "Air Filtration", "Moisture Extraction", "Thermal and Refrigeration Management", "Condensate Collection", "Water Purification", "Mineral Stabilization", "Storage and Distribution", "Intelligent Controls"];
const developmentSteps = ["Water Demand Definition", "Climate and Site Assessment", "Pre-Feasibility", "Concept Engineering", "Energy and Utility Assessment", "Commercial Proposal", "Detailed Engineering", "Manufacturing and Procurement", "Civil Works and Installation", "Commissioning", "Performance Validation", "Operations and Lifecycle Support"];

const applications = [
  ["Data Centers", "data-centers/", "Campus water resilience, selected makeup water, emergency reserve and non-potable site applications.", "Pilot production line or campus atmospheric water facility.", "Cooling makeup buffer tanks, BMS/DCIM interfaces, storage, treatment and external utilities.", "Redundancy, water quality approval, energy availability, operator validation."],
  ["Industrial Facilities", "industrial-facilities.html", "Operational sites need resilient support water where municipal, trucked or remote supply is constrained.", "Standalone facility, integrated facility or modular production lines.", "Process-support water, cleaning, sanitary demand, cooling makeup and storage.", "Required water quality, uptime, maintenance access and energy profile."],
  ["Government Water Resilience", "government-water-resilience.html", "Public agencies need diversified localized supply for resilience, pilots and remote communities.", "Purpose-built public facility, Air House, modular facility or distributed network.", "Municipal resilience plans, emergency reserves, public infrastructure and innovation districts.", "Procurement, regulation, community interface, validation and lifecycle governance."],
  ["Remote Infrastructure", "remote-infrastructure.html", "Remote sites face water logistics, transport cost, storage exposure and intermittent access.", "Modular facility, integrated utility building or custom off-grid plant.", "Camps, border facilities, islands, research stations and infrastructure corridors.", "Energy availability, service intervals, climate envelope and logistics."],
  ["Agriculture and Controlled-Environment Farming", "agriculture.html", "Water quality and local supply can matter most in controlled-environment farming.", "Integrated facility or modular plant beside greenhouse, hydroponic or nursery operations.", "Irrigation blending, nutrient systems, storage, treatment and farm utilities.", "Economic fit, crop value, water quality and energy demand."],
  ["Hospitality and Destination Developments", "destination-developments.html", "Remote resorts and landmark developments need visible, resilient utility strategies.", "Air House, custom architectural facility or integrated utility plant.", "Guest-facing infrastructure, irrigation, cleaning, emergency reserve and sustainability campuses.", "Visual integration, permitting, water classification and operational reliability."],
  ["Emergency and Strategic Reserve", "government-water-resilience.html", "Programs may need localized production capacity for disruption planning.", "Modular or distributed facilities with storage and controlled operation.", "Reserve tanks, emergency distribution and public-sector command structures.", "Validation, stock management, energy backup and water quality control."],
  ["New Cities and Infrastructure Corridors", "remote-infrastructure.html", "Large developments need utility options during early phases and long-term expansion.", "Distributed network, purpose-built facility or phased modular plant.", "District utilities, construction water, operations support and strategic reserves.", "Demand growth, multi-site governance, civil works and energy planning."],
];

const pageData = {
  "index.html": {
    title: "AIROVIA | AI-Powered Atmospheric Water Infrastructure",
    description: "AIROVIA engineers configurable industrial atmospheric water facilities for industrial sites, critical infrastructure and strategic water-resilience programs.",
    current: "Home",
    heroClass: "hero-home",
    kicker: "AI-Powered Atmospheric Water Infrastructure",
    h1: "Industrial Water Production from Air",
    lede: "AIROVIA engineers atmospheric water facilities for industrial sites, critical infrastructure and strategic water-resilience programs.",
    ctas: [["Explore the Infrastructure", "solution.html"], ["Discuss a Facility", "contact.html"]],
    sections: [
      infrastructureSystemSection(),
      facilityFormatsSection("One process architecture. Multiple facility formats.", facilityFormats.map(([title, text, img]) => [title, text, "facilities.html", img])),
      capacitySection(),
      pillarsSection(),
      applicationTeaserSection("Atmospheric water facilities configured for specific operating contexts.", applications.slice(0, 6)),
      projectDevelopmentSection(),
      cta("Plan an atmospheric water facility", "Discuss your water demand, project location, operating conditions and infrastructure requirements with AIROVIA.", "Start a Facility Discussion", "contact.html"),
    ],
  },
  "company.html": {
    title: "About AIROVIA | Atmospheric Water Infrastructure Company",
    description: "AIROVIA is an atmospheric water infrastructure company engineering integrated facilities for industrial, institutional and strategic applications.",
    current: "Company",
    heroClass: "company-identity-hero",
    kicker: "About AIROVIA",
    h1: "About AIROVIA",
    lede: "AIROVIA is an atmospheric water infrastructure company. We engineer integrated facilities that convert humidity in ambient air into treated water for industrial, institutional and strategic applications.",
    sections: [companyIdentitySection()],
  },
  "development-stage.html": {
    title: "Development Stage | AIROVIA",
    description: "A transparent overview of AIROVIA development-stage activities, engineering progress and validation boundaries.",
    current: "Company",
    heroClass: "development-stage-hero",
    kicker: "Development Stage",
    h1: "Development Stage",
    lede: "AIROVIA is currently progressing through engineering, supplier engagement and project-development activities. Final technical and commercial performance remains subject to validation, site conditions and detailed engineering.",
    sections: [developmentStageSection(), disclaimer(commonDisclaimer)],
  },
  "partners.html": {
    title: "Partner with AIROVIA | Infrastructure Collaboration",
    description: "Partnership pathways for OEMs, EPC contractors, MEP consultants, architects, energy developers, governments and research collaborators.",
    current: "Company",
    heroClass: "partners-ecosystem-hero",
    kicker: "Partner with AIROVIA",
    h1: "Partner with AIROVIA",
    lede: "AIROVIA is developing an ecosystem of engineering, manufacturing, project-development, controls, energy and water-treatment partners.",
    sections: [partnersEcosystemSection()],
  },
  "solution.html": {
    title: "The AIROVIA Infrastructure Solution",
    description: "The AIROVIA Infrastructure Solution integrates atmospheric water production, facility architecture, treatment, storage, energy systems, digital controls and lifecycle operations.",
    current: "Infrastructure",
    heroClass: "solution-architecture-hero",
    kicker: "AIROVIA Solution",
    h1: "AIROVIA Solution",
    lede: "AIROVIA is a coordinated system integrating atmospheric water production, facility architecture, water treatment, storage, energy systems, digital controls and lifecycle operations.",
    sections: [solutionArchitectureSection(), disclaimer(commonDisclaimer)],
  },
  "facilities.html": {
    title: "AIROVIA Facilities | Atmospheric Water Infrastructure",
    description: "AIROVIA facilities are atmospheric water infrastructure formats engineered around site conditions, capacity requirements and operating needs.",
    current: "Infrastructure",
    heroClass: "facilities-portfolio-hero",
    kicker: "AIROVIA Facilities",
    h1: "AIROVIA Facilities",
    lede: "AIROVIA can be integrated into purpose-built industrial buildings, conventional steel-frame facilities, concrete utility buildings, existing warehouses, modular prefabricated plants, custom architectural facilities or the AIROVIA Air House.",
    sections: [facilitiesPortfolioSection()],
  },
  "air-house.html": {
    title: "AIROVIA Air House | Signature Facility Format",
    description: "The AIROVIA Air House is a signature architectural format for atmospheric water infrastructure and one deployment option within the wider facility portfolio.",
    current: "Infrastructure",
    kicker: "AIROVIA Air House",
    h1: "AIROVIA Air House",
    lede: "The AIROVIA Air House is one deployment format within the wider AIROVIA facility portfolio, suited to sites where visibility, identity and public engagement matter.",
    ctas: [["Explore Other Facility Formats", "facilities.html"], ["Discuss an Air House", "contact.html"]],
    sections: [
      listSection("Designed to Support", "The Air House may be appropriate for high-profile and visitor-facing deployments.", ["Government demonstration programs", "Public water-resilience centers", "Innovation districts", "Sustainability campuses", "Visitor-facing infrastructure", "Signature developments", "Educational and public-engagement facilities", "High-profile pilots"]),
      statement("Strategic Positioning", "AIROVIA is not the dome. AIROVIA is the complete atmospheric water facility system.", "The same process architecture can be configured within conventional industrial buildings, modular plants, existing infrastructure buildings or custom architectural facilities.", ""),
      disclaimer(commonDisclaimer),
    ],
  },
  "technology.html": {
    title: "AIROVIA Technology | Atmospheric Water Process",
    description: "An industrial process explanation of AIROVIA atmospheric water production, treatment, storage, controls and performance variables.",
    current: "Infrastructure",
    heroClass: "technology-process-hero",
    kicker: "Technology",
    h1: "AIROVIA Technology",
    lede: "AIROVIA facilities are designed around airflow, moisture extraction, thermal management, purification, storage, distribution and intelligent controls.",
    sections: [
      technologyProcessSection(),
      disclaimer("Final water production, power demand and water quality depend on site climate, inlet-air conditions, operating schedule, process configuration and engineering validation."),
    ],
  },
  "capacity-performance.html": {
    title: "Capacity and Performance | AIROVIA",
    description: "AIROVIA capacity and performance terminology, key production factors and validation boundaries for atmospheric water facilities.",
    current: "Infrastructure",
    kicker: "Capacity and Performance",
    h1: "Capacity and Performance",
    lede: "AIROVIA facility capacity is configured around demand, climate, energy availability, operating schedule and final engineering validation.",
    sections: [
      capacityPerformanceSection(),
      capacityGraphicSection("Indicative Facility Classes", "Indicative configuration ranges only. Final output depends on climate, facility design, operating schedule and engineering validation.", "contact.html"),
      capacityPerformanceDriversSection(),
      capacityValidationSection(),
      disclaimer("All production and energy figures are indicative until validated for the specific site and final facility configuration."),
    ],
  },
  "energy.html": {
    title: "Energy Architecture | AIROVIA",
    description: "Energy architecture for atmospheric water facilities, including grid connection, renewables, storage, backup power and kWh/L performance variables.",
    current: "Infrastructure",
    heroClass: "energy-architecture-hero",
    kicker: "Energy Architecture",
    h1: "Energy Architecture",
    lede: "Energy planning is central to facility feasibility because kWh per liter is the primary measure used to evaluate atmospheric water energy performance.",
    sections: [energyArchitectureSection()],
  },
  "monitoring-platform.html": {
    title: "AIROVIA Agentic Operations Platform",
    description: "The intelligent operations layer for atmospheric water infrastructure, being developed for monitoring, advisory intelligence and controlled autonomy.",
    current: "Infrastructure",
    heroClass: "agentic-platform-hero",
    kicker: "AIROVIA Agentic Operations Platform",
    h1: "Agentic Operations Platform",
    lede: "The platform is being developed to support monitoring, advisory intelligence and progressively controlled autonomy across atmospheric water facilities.",
    sections: [agenticOperationsSection()],
  },
  "use-cases.html": {
    title: "Applications | AIROVIA",
    description: "Applications for AIROVIA atmospheric water facilities across data centers, industrial facilities, government resilience, remote infrastructure, agriculture and destination developments.",
    current: "Applications",
    kicker: "Applications",
    h1: "AIROVIA Applications",
    lede: "AIROVIA applications are evaluated through water challenge, facility format, integration points, engineering considerations and project pathway.",
    sections: [applicationsSection()],
  },
  "infrastructure-brief.html": {
    title: "Infrastructure Brief | AIROVIA",
    description: "AIROVIA infrastructure brief covering atmospheric water production, modular process architecture, facility integration, energy and lifecycle governance.",
    current: "Resources",
    heroClass: "infrastructure-brief-hero",
    kicker: "Infrastructure Brief",
    h1: "Infrastructure Brief",
    lede: "AIROVIA is evaluated as a complete atmospheric water facility system rather than a single building form.",
    sections: [
      infrastructureBriefSection(),
      disclaimer(commonDisclaimer),
    ],
  },
  "sustainability.html": {
    title: "Sustainability Indicators | AIROVIA",
    description: "AIROVIA intends to measure sustainability through transparent operating indicators rather than unsupported environmental claims.",
    current: "Resources",
    heroClass: "sustainability-hero",
    kicker: "Sustainability",
    h1: "Sustainability Indicators",
    lede: "Facility sustainability should be measured through operating data, site context and transparent reporting boundaries.",
    sections: [
      sustainabilityIndicatorsSection(),
    ],
  },
  "how-it-works.html": {
    title: "How It Works | AIROVIA",
    description: "A visual overview of the complete AIROVIA atmospheric water infrastructure process.",
    current: "Resources",
    heroClass: "how-it-works-hero",
    kicker: "How It Works",
    h1: "How AIROVIA Works",
    lede: "The AIROVIA process connects air intake, extraction, treatment, storage, distribution and operations into one facility architecture.",
    sections: [howItWorksSection()],
  },
  "project-development.html": {
    title: "Project Development Workflow | AIROVIA",
    description: "AIROVIA project-development workflow from demand assessment through commissioning, validation and lifecycle operations.",
    current: "Resources",
    kicker: "Project Development",
    h1: "Project Development",
    lede: "Atmospheric water infrastructure requires demand definition, climate assessment, energy planning, engineering, commissioning and performance validation.",
    sections: [
      projectDevelopmentSection(),
      projectDevelopmentOutputsSection(),
    ],
  },
  "technical-library.html": {
    title: "Technical Library | AIROVIA",
    description: "Structured AIROVIA technical document library with current and coming-soon resources.",
    current: "Resources",
    kicker: "Technical Library",
    h1: "Technical Library",
    lede: "A structured library for infrastructure briefs, engineering frameworks, deployment references and validation resources.",
    sections: [
      technicalLibrarySection(),
    ],
  },
  "latest-updates.html": {
    title: "Development Updates | AIROVIA",
    description: "A framework for dated factual AIROVIA development updates without fabricated milestones.",
    current: "Resources",
    kicker: "Development Updates",
    h1: "Development Updates",
    lede: "AIROVIA will use this page for dated, concrete milestones. Generic positioning statements are not published as news.",
    sections: [statement("No Published Development Entries", "No verified dated development updates are available in the current approved website content.", "When updates are published, each entry will include date, title, concrete milestone, summary, why it matters and optional related material.", "")],
  },
  "team.html": {
    title: "Build with AIROVIA",
    description: "Future employment opportunities, engineering collaborators, advisors, project partners and research collaborators.",
    current: "Company",
    kicker: "Build with AIROVIA",
    h1: "Build with AIROVIA",
    lede: "AIROVIA welcomes relevant conversations with engineering collaborators, advisors, project partners and research collaborators. Open roles will be listed only when formally available.",
    sections: [cardsSection("Collaboration Paths", "Current pathways do not imply open employment roles.", ["Future employment opportunities", "Engineering collaborators", "Advisors", "Project partners", "Research collaborators"].map((x) => card(x, "Use the contact form to share relevant background and collaboration context.", "contact.html")))],
  },
};

const simpleApplicationPages = {};

for (const [file, [title, lede, contexts, uses, note]] of Object.entries(simpleApplicationPages)) {
  pageData[file] = {
    title,
    description: lede,
    current: "Applications",
    kicker: "Application",
    h1: title,
    lede,
    sections: [
      listSection("Relevant Contexts", "Typical operating environments for evaluation.", contexts),
      listSection("Potential Uses", "Use cases remain subject to water-quality requirements and engineering review.", uses),
      disclaimer(note),
    ],
  };
}

pageData["industrial-facilities.html"] = {
  title: "AIROVIA for Industrial Facilities",
  description: "Atmospheric water facilities for industrial sites, logistics hubs, remote operations and support-side utility needs.",
  current: "Applications",
  heroClass: "industrial-facilities-hero",
  kicker: "AIROVIA for Industrial Facilities",
  h1: "Industrial Facilities",
  lede: "AIROVIA supports industrial facilities with localized water production, treatment, storage and operations intelligence for support-side applications where supply resilience, logistics or quality control matter.",
  sections: [
    industrialFacilitiesApplicationSection(),
    disclaimer("Final suitability depends on required water quality, process-specific engineering, site utilities, redundancy expectations, maintenance access and operating conditions."),
  ],
};

pageData["government-water-resilience.html"] = {
  title: "AIROVIA for Government Water Resilience",
  description: "Localized atmospheric water capacity for strategic resilience, remote communities, pilots and public infrastructure programs.",
  current: "Applications",
  heroClass: "government-resilience-hero",
  kicker: "AIROVIA for Government Water Resilience",
  h1: "Government Water Resilience",
  lede: "AIROVIA supports government and public-sector programs with atmospheric water facilities configured for diversified local production, emergency reserve, remote community support and validation-led infrastructure planning.",
  sections: [
    governmentResilienceApplicationSection(),
    disclaimer("AIROVIA is designed to complement conventional public water systems by adding localized production capacity where resilience, diversification or remote availability is strategically valuable. Final deployment requires procurement, regulatory, water-quality and engineering review."),
  ],
};

pageData["remote-infrastructure.html"] = {
  title: "AIROVIA for Remote Infrastructure",
  description: "Atmospheric water facilities for remote operations, islands, infrastructure corridors and access-constrained sites.",
  current: "Applications",
  heroClass: "remote-infrastructure-hero",
  kicker: "AIROVIA for Remote Infrastructure",
  h1: "Remote Infrastructure",
  lede: "AIROVIA supports remote infrastructure programs with atmospheric water facilities configured around logistics reduction, on-site support water, reserve storage and operational continuity where conventional supply is difficult or intermittent.",
  sections: [
    remoteInfrastructureApplicationSection(),
    disclaimer("Project feasibility depends on climate envelope, energy availability, logistics, service intervals, maintenance access, storage strategy, water-quality requirements and environmental conditions."),
  ],
};

pageData["agriculture.html"] = {
  title: "AIROVIA for Agriculture",
  description: "Atmospheric water facilities for controlled-environment agriculture, high-value crops and remote agricultural operations.",
  current: "Applications",
  heroClass: "agriculture-hero",
  kicker: "AIROVIA for Agriculture",
  h1: "Agricultural Infrastructure",
  lede: "AIROVIA supports controlled-environment agriculture and high-value remote operations with atmospheric water facilities configured around local production, quality control, storage and farm-utility resilience.",
  sections: [
    agricultureApplicationSection(),
    disclaimer("AIROVIA is most relevant where water quality, local production, resilience or controlled-environment operations justify the energy and capital requirements. Final fit depends on crop value, climate, energy cost, water-quality targets and operating model."),
  ],
};

pageData["destination-developments.html"] = {
  title: "AIROVIA for Destination Developments",
  description: "Atmospheric water infrastructure for resorts, remote hospitality, islands, landmark developments and sustainability campuses.",
  current: "Applications",
  heroClass: "destination-developments-hero",
  kicker: "AIROVIA for Destination Developments",
  h1: "Destination Developments",
  lede: "AIROVIA supports resorts, remote hospitality and destination developments with atmospheric water facilities configured around guest-facing utility strategy, reserve capacity, irrigation, cleaning and operational resilience.",
  sections: [
    destinationDevelopmentsApplicationSection(),
    disclaimer("The AIROVIA Air House may be appropriate where architecture and public visibility matter. Final suitability depends on permitting, water classification, treatment requirements, energy profile, visual integration and operational reliability."),
  ],
};

pageData["data-centers/index.html"] = {
  title: "AIROVIA for Data Centers",
  description: "Dedicated atmospheric water facilities for campus water resilience, validation and selected data-center support applications.",
  current: "Applications",
  heroClass: "data-centers-hero",
  kicker: "AIROVIA for Data Centers",
  h1: "Data Centers",
  lede: "AIROVIA supports data center developers and operators with atmospheric water facilities designed for validation, selected support-side applications and campus resilience planning.",
  sections: [
    dataCenterApplicationSection(),
    disclaimer("Final integration into mission-critical infrastructure requires engineering review, redundancy analysis, water-quality approval and operational validation."),
  ],
};

pageData["investors/index.html"] = {
  title: "Investors | AIROVIA",
  description: "AIROVIA investment thesis centered on atmospheric water engineering, configurable industrial facilities, energy integration and AI-driven operations software.",
  current: "Company",
  heroClass: "investor-brief-hero",
  kicker: "Investors",
  h1: "Investors",
  lede: "AIROVIA's opportunity is broader than a single architectural format: engineering capability, configurable facilities, modular process architecture, energy integration, AI-driven operations and lifecycle services.",
  sections: [investorBriefSection()],
};

pageData["contact.html"] = {
  title: "Discuss an Atmospheric Water Facility | AIROVIA",
  description: "Contact AIROVIA for facility feasibility, industrial projects, government programs, data centers, partnerships, energy integration, investment and media inquiries.",
  current: "Contact",
  heroClass: "contact-facility-hero",
  kicker: "Contact",
  h1: "Contact AIROVIA",
  lede: "Share the demand profile, project context and operating conditions behind your atmospheric water infrastructure inquiry.",
  sections: [contactForm()],
};

pageData["terms.html"] = {
  title: "Terms | AIROVIA",
  description: "AIROVIA Terms of Use governing global access to the website, public information, technical content, inquiries and legal limitations.",
  current: "Resources",
  heroClass: "legal-terms-hero",
  kicker: "Legal",
  h1: "Terms of Use",
  lede: "These Terms govern access to AIROVIA's website, public materials, inquiry channels and digital content wherever the website is accessed.",
  sections: [legalTermsSection()],
  comment: "TODO: Insert formal legal entity, registered address and governing jurisdiction after corporate legal structuring is complete.",
};

pageData["privacy.html"] = {
  title: "Privacy Policy | AIROVIA",
  description: "AIROVIA Privacy Policy describing website data collection, inquiry processing, analytics, international access, retention, security and privacy rights.",
  current: "Resources",
  kicker: "Privacy",
  h1: "Privacy Policy",
  lede: "This policy explains how AIROVIA handles information submitted through the website, inquiry channels, analytics tools and public digital services.",
  sections: [legalPrivacySection()],
};

pageData["data-protection.html"] = {
  title: "Data Protection and Governance | AIROVIA",
  description: "AIROVIA corporate security and data-governance overview for website and future operations.",
  current: "Resources",
  kicker: "Data Protection",
  h1: "Corporate Security and Data Governance",
  lede: "This page is retained as a separate governance overview and does not replace the Privacy Policy.",
  sections: [legalSection("Governance Scope", ["Website form data should be handled only for inquiry routing and follow-up.", "Future operational platform data will require defined security controls, access management, retention rules and provider agreements.", "Formal data-controller information and processor details remain to be finalized."])],
};

pageData["404.html"] = {
  title: "Page Not Found | AIROVIA",
  description: "The requested AIROVIA page could not be found.",
  current: "Home",
  kicker: "404",
  h1: "Page not found.",
  lede: "The page may have moved as AIROVIA's site architecture shifted toward atmospheric water infrastructure.",
  ctas: [["Go Home", "index.html"], ["View Facilities", "facilities.html"]],
  sections: [],
};

function statement(kicker, title, text, extra) {
  return `<section class="infra-section"><div class="infra-split reveal"><div><p class="eyebrow">${kicker}</p><h2>${title}</h2></div><div><p>${text}</p>${extra || ""}</div></div></section>`;
}

function infrastructureSystemSection() {
  return `<section id="infrastructure-system" class="infra-section infra-section-infrastructure-system">
    <div class="infrastructure-system reveal">
      <div class="infrastructure-system-copy">
        <p class="eyebrow">Infrastructure System</p>
        <h2>Atmospheric water is not a machine. It is a complete infrastructure system.</h2>
        <p>AIROVIA integrates atmospheric water production, treatment, energy, storage, distribution and intelligent operations into one engineered facility.</p>
      </div>
      <div class="infrastructure-flow" aria-label="AIROVIA infrastructure process flow">
        <div class="infrastructure-flow-core">
          <span>AIROVIA</span>
          <strong>Integrated Facility System</strong>
        </div>
        ${processSteps.map((step, index) => `<article class="flow-node flow-node-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${step}</strong></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function card(title, text, href = "contact.html", img = "") {
  const media = img ? `<div class="infra-card-media" style="background-image:url('${asset(img)}')" role="img" aria-label="${escapeAttr(title)}"></div>` : "";
  return `<article class="infra-card">${media}<div><h3>${title}</h3><p>${text}</p><a href="${href}">Explore</a></div></article>`;
}

function cardsSection(kicker, title, cards) {
  return `<section class="infra-section infra-section-${slug(kicker)}"><div class="infra-heading reveal"><p class="eyebrow">${kicker}</p><h2>${title}</h2></div><div class="infra-card-grid reveal">${cards.join("")}</div></section>`;
}

function capacitySection() {
  return capacityGraphicSection("Capacity", "Capacity engineered around demand.", "capacity-performance.html") + disclaimer("Indicative configuration ranges only. Final output depends on climate, facility design, operating schedule and engineering validation.");
}

function capacityPerformanceSection() {
  const terms = [
    ["Rated production", "Published planning class used to frame facility scale."],
    ["Design production", "Output target derived from climate, site basis and system configuration."],
    ["Expected production", "Estimated operating output under defined assumptions."],
    ["Actual production", "Measured delivered output during facility operation."],
    ["Annual theoretical", "Modeled output before operational losses and availability adjustments."],
    ["Annual validated", "Verified production after site testing and operating review."],
  ];
  return `<section class="infra-section capacity-command-section"><div class="capacity-command reveal"><div class="capacity-command-copy"><p class="eyebrow">Performance Framework</p><h2>Capacity is a facility design outcome, not a fixed machine rating.</h2><p>AIROVIA evaluates capacity through demand profile, climate conditions, operating schedule, energy availability, treatment losses, storage strategy and final engineering validation.</p><div class="capacity-command-metrics"><span>Demand-led sizing</span><span>Climate-dependent output</span><span>Validated operating basis</span></div></div><div class="capacity-command-panel"><div class="capacity-stack-head"><span>AIROVIA</span><strong>Capacity planning stack</strong></div><div class="capacity-stack-flow"><article><span>01</span><b>Demand</b></article><article><span>02</span><b>Climate</b></article><article><span>03</span><b>Energy</b></article><article><span>04</span><b>Treatment</b></article><article><span>05</span><b>Storage</b></article><article><span>06</span><b>Validation</b></article></div></div></div></section>
<section class="infra-section capacity-terms-section"><div class="capacity-terms reveal"><div><p class="eyebrow">Production Terms</p><h2>Six terms separate planning, design and verified output.</h2></div><div class="capacity-terms-grid">${terms.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function capacityGraphicSection(kicker, title, href) {
  const ranges = [
    ["Community Scale", "200,000", "L/day", "Community"],
    ["District Scale", "500,000", "L/day", "District"],
    ["City Scale", "2,000,000", "L/day", "City"],
    ["Regional Scale", "3,000,000", "L/day", "Regional"],
    ["National Scale", "5,000,000+", "L/day", "National"],
  ];
  return `<section class="infra-section infra-section-capacity"><div class="infra-heading reveal"><p class="eyebrow">${kicker}</p><h2>${title}</h2></div><div class="capacity-graphic reveal" aria-label="Indicative AIROVIA facility capacity classes"><div class="capacity-rail" aria-hidden="true"></div>${ranges.map(([name, value, unit, label], index) => `<article style="--i:${index}"><div class="capacity-marker"><span>${String(index + 1).padStart(2, "0")}</span></div><div class="capacity-card-head"><span>${label}</span><h3>${name}</h3></div><div class="capacity-value"><strong>${value}</strong><em>${unit}</em></div></article>`).join("")}<a class="capacity-link" href="${href}">Review performance framework</a></div></section>`;
}

function capacityPerformanceDriversSection() {
  const drivers = [
    ["Climate", "Temperature, relative humidity and dew point define the realistic production envelope."],
    ["Airflow", "Air volume, filtration and equipment loading influence extractable moisture."],
    ["Energy", "Electrical capacity, tariff, renewable contribution and backup strategy shape operating economics."],
    ["Process efficiency", "Extraction pathway, thermal management and component efficiency affect kWh/L."],
    ["Water treatment", "Purification, stabilization and losses depend on the intended water use."],
    ["Operations", "Operating hours, maintenance windows, storage reserve and platform monitoring affect delivered output."],
  ];
  return `<section class="infra-section capacity-drivers-section"><div class="capacity-drivers reveal"><div class="capacity-drivers-visual" aria-hidden="true"><span>kWh/L</span><strong>Primary energy metric</strong></div><div class="capacity-drivers-copy"><p class="eyebrow">Main Performance Factors</p><h2>Performance is governed by climate, energy and operating conditions.</h2><div class="capacity-driver-list">${drivers.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join("")}</div></div></div></section>`;
}

function capacityValidationSection() {
  const items = ["Site climate file", "Demand profile", "Energy basis", "Treatment framework", "Storage reserve", "Operating schedule", "Commissioning data", "Water-quality review"];
  return `<section class="infra-section capacity-validation-section"><div class="capacity-validation reveal"><div><p class="eyebrow">Validation Boundary</p><h2>Published capacity remains indicative until site-specific testing.</h2><p>AIROVIA will not treat output curves, energy curves or annual production as validated until the relevant site data, final configuration and commissioning evidence are confirmed.</p></div><div class="capacity-validation-grid">${items.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function infrastructureBriefSection() {
  const layers = [
    ["01", "Atmospheric Water Production", "Air intake, conditioning, extraction and condensate collection shaped by climate and operating schedule."],
    ["02", "Modular Process Architecture", "Standardized production, treatment, control and utility modules configured around required capacity."],
    ["03", "Facility and Site Integration", "Building form, intake/exhaust strategy, storage, access, civil works and site interfaces."],
    ["04", "Energy and Utility Infrastructure", "Power availability, energy strategy, redundancy, controls and operating-cost assumptions."],
    ["05", "Digital Operations and Lifecycle Governance", "Monitoring, validation, maintenance planning and performance documentation across the facility lifecycle."],
  ];
  const governance = [
    ["Climate", "Temperature, humidity and dew point conditions define realistic production bands."],
    ["Capacity", "Daily output is sized around demand profile, storage strategy and operating schedule."],
    ["Quality", "Treatment and stabilization requirements are defined by intended water use."],
    ["Lifecycle", "Operation, maintenance, validation and reporting are part of the facility model."],
  ];
  return `<section class="infra-section infrastructure-brief-section"><div class="brief-command reveal"><div class="brief-command-copy"><p class="eyebrow">Brief Scope</p><h2>One reference for evaluating AIROVIA as infrastructure.</h2><p>The brief frames AIROVIA as a complete facility system: production process, process modules, building integration, energy, controls, storage, treatment and lifecycle operations.</p><div class="brief-command-metrics"><span>05 layers</span><span>04 evaluation lenses</span><span>01 facility system</span></div></div><div class="brief-command-visual" role="img" aria-label="AIROVIA atmospheric water infrastructure facility"><span>Infrastructure Brief</span><strong>Facility system evaluation</strong></div></div></section>
<section class="infra-section infrastructure-layers-section"><div class="infra-heading reveal"><p class="eyebrow">Infrastructure Layers</p><h2>The current evaluation framework.</h2></div><div class="brief-layer-stack reveal">${layers.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section infrastructure-architecture-section"><div class="brief-architecture reveal"><div class="brief-architecture-media" role="img" aria-label="AIROVIA configurable facility architecture"></div><div class="brief-architecture-copy"><p class="eyebrow">Facility Architecture</p><h2>Standardized process modules. Configurable buildings.</h2><p>AIROVIA's standardized process modules can be configured within purpose-built industrial facilities, existing buildings, prefabricated structures or custom architectural enclosures.</p><p>The facility format is selected around demand, site conditions, access, utilities, construction strategy, visibility and lifecycle operating model.</p></div></div></section>
<section class="infra-section infrastructure-governance-section"><div class="brief-governance reveal"><div><p class="eyebrow">Evaluation Discipline</p><h2>Technical claims stay tied to operating conditions.</h2></div><div class="brief-governance-grid">${governance.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function pillarsSection() {
  const pillars = ["Atmospheric Water Production", "Facility and Site Integration", "Water Treatment and Storage", "Energy and Utility Infrastructure", "AIROVIA Agentic Operations Platform"];
  return `<section class="infra-section infra-section-system"><div class="infra-split reveal"><div><p class="eyebrow">The AIROVIA System</p><h2>Five major system pillars.</h2></div><div class="system-diagram" aria-label="AIROVIA system pillars"><div class="system-core"><span>AIROVIA</span><strong>Facility System</strong></div>${pillars.map((x, index) => `<a class="system-node system-node-${index + 1}" href="${x.includes("Platform") ? "monitoring-platform.html" : "solution.html"}"><span>0${index + 1}</span>${x}</a>`).join("")}</div></div></section>`;
}

function solutionArchitectureSection() {
  const layers = [
    ["01", "Atmospheric Water Production", "Air handling, filtration, conditioning and moisture extraction configured around operating climate."],
    ["02", "Facility and Site Integration", "Purpose-built, integrated, modular or architectural facilities selected around the site and construction strategy."],
    ["03", "Treatment and Storage", "Purification, stabilization, tankage, pumping and distribution aligned to intended water use."],
    ["04", "Energy and Utilities", "Electrical capacity, load profile, controls, renewable integration and utility support engineered with the facility."],
    ["05", "Agentic Operations", "Monitoring, optimization, lifecycle support and operational intelligence connected to the AIROVIA platform."],
  ];
  const deployment = [
    ["Standalone Facility", "A complete atmospheric water plant developed on a dedicated site.", "facilities.html", "facility.png"],
    ["Integrated Facility", "Process systems installed within an existing building or utility environment.", "facilities.html", "Infrastructure-Architecture.png"],
    ["Distributed Network", "Multiple sites coordinated through operations intelligence and lifecycle visibility.", "monitoring-platform.html", "Monitors-platform.png"],
  ];
  const sequence = [
    ["Demand", "Water requirement, use case, quality target and operating schedule."],
    ["Site", "Climate, utilities, access, civil works and local constraints."],
    ["System", "Production, treatment, storage, energy and controls configured together."],
    ["Operate", "Monitoring, validation, maintenance and optimization over the facility lifecycle."],
  ];
  return `<section class="infra-section solution-command-section"><div class="solution-command reveal"><div class="solution-command-copy"><p class="eyebrow">System Architecture</p><h2>Water production is only one part of the facility.</h2><p>The AIROVIA solution connects atmospheric water production with treatment, storage, distribution, energy planning, facility architecture and digital operations.</p><div class="solution-command-metrics"><span>05 system layers</span><span>03 deployment models</span><span>01 operating platform</span></div></div><div class="solution-command-visual" role="img" aria-label="AIROVIA integrated atmospheric water infrastructure system"><span>AIROVIA</span><strong>Integrated Infrastructure System</strong></div></div></section>
<section class="infra-section solution-stack-section"><div class="infra-heading reveal"><p class="eyebrow">Integrated Stack</p><h2>Five disciplines engineered as one infrastructure system.</h2></div><div class="solution-stack reveal">${layers.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}<div class="solution-stack-flow" aria-hidden="true"></div></div></section>
<section class="infra-section solution-deployment-section"><div class="solution-deployment reveal"><div class="solution-deployment-copy"><p class="eyebrow">Deployment Logic</p><h2>Configurable capacity, not fixed building-count scaling.</h2><p>AIROVIA scales through additional process modules, expanded production lines, larger facilities, distributed facilities or multi-site deployment.</p></div><div class="solution-deployment-grid">${deployment.map(([title, text, href, img], index) => `<a class="solution-deployment-card" href="${href}"><div class="solution-deployment-media" style="background-image:url('${asset(img)}')" role="img" aria-label="${escapeAttr(title)}"></div><div class="solution-deployment-card-copy"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></div></a>`).join("")}</div></div></section>
<section class="infra-section solution-sequence-section"><div class="solution-sequence reveal"><div><p class="eyebrow">Planning Sequence</p><h2>From demand definition to lifecycle operation.</h2></div><div class="solution-sequence-track">${sequence.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function companyIdentitySection() {
  const disciplines = [
    ["01", "Feasibility", "Climate, site, demand and operating-context assessment."],
    ["02", "Engineering", "Atmospheric water process, treatment, storage, energy and controls architecture."],
    ["03", "Integration", "Facility format, site works, utilities, access and delivery coordination."],
    ["04", "Validation", "Commissioning, performance review, water-quality framework and operating assumptions."],
    ["05", "Lifecycle", "Monitoring, maintenance, operations support and long-term optimization."],
  ];
  const principles = [
    ["Infrastructure First", "AIROVIA is positioned around complete facility systems, not standalone consumer devices."],
    ["Site Specific", "Each project is evaluated against climate, demand, utilities, access, use case and operating schedule."],
    ["Validation Discipline", "Technical and commercial claims stay tied to engineering validation and defined conditions."],
    ["Partner Delivery", "Facilities depend on coordinated OEM, EPC, energy, treatment, controls and project partners."],
  ];
  return `<section class="infra-section company-command-section"><div class="company-command reveal"><div class="company-command-copy"><p class="eyebrow">Company Position</p><h2>AIROVIA develops atmospheric water as infrastructure.</h2><p>The company works across technology, facility configuration, project development, partner coordination, controls and lifecycle operations so atmospheric water can be planned like critical infrastructure.</p><div class="company-command-metrics"><span>Facility systems</span><span>Engineering-led</span><span>Lifecycle focused</span></div></div><div class="company-command-visual" role="img" aria-label="AIROVIA atmospheric water infrastructure company"><span>AIROVIA</span><strong>Atmospheric Water Infrastructure</strong></div></div></section>
<section class="infra-section company-role-section"><div class="company-role reveal"><div class="company-role-media" role="img" aria-label="AIROVIA facility engineering and operations"></div><div class="company-role-copy"><p class="eyebrow">Company Role</p><h2>Engineering, integration and lifecycle discipline.</h2><p>AIROVIA works across atmospheric water production, facility configuration, energy architecture, controls, treatment and project development so each facility can be evaluated against site-specific demand and operating conditions.</p><p>The company’s role is to connect the technical system with the project pathway: feasibility, engineering, facility delivery, validation and lifecycle support.</p></div></div></section>
<section class="infra-section company-disciplines-section"><div class="infra-heading reveal"><p class="eyebrow">Delivery Disciplines</p><h2>What AIROVIA brings into a facility discussion.</h2></div><div class="company-disciplines reveal">${disciplines.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section company-principles-section"><div class="company-principles reveal"><div><p class="eyebrow">Operating Principles</p><h2>Built around engineering clarity.</h2></div><div class="company-principles-grid">${principles.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section company-pathway-section"><div class="company-pathway reveal"><div><p class="eyebrow">Next Step</p><h2>Route the discussion through the right pathway.</h2><p>Share project location, intended water use, demand range and operating context so AIROVIA can route the discussion toward feasibility, partnership or project development.</p></div><div class="company-pathway-actions"><a href="development-stage.html">View Development Stage</a><a href="partners.html">Partner with AIROVIA</a><a href="contact.html">Contact AIROVIA</a></div></div></section>`;
}

function developmentStageSection() {
  const tracks = [
    ["01", "Concept and Architecture", "System concept, facility framing, process architecture and deployment-format logic."],
    ["02", "Preliminary Engineering", "Atmospheric water process assumptions, treatment framework, energy profile and facility integration scope."],
    ["03", "Industrial Design", "Facility appearance, modular configuration, service access, installation approach and operating environment."],
    ["04", "Partner Engagement", "Supplier, OEM, EPC, controls, energy and project-development discussions."],
    ["05", "Pilot and Validation", "Prototype or pilot planning, performance validation, water-quality review and operating-condition evidence."],
    ["06", "Commercial Readiness", "Commercial proposal structure, deployment pathway, lifecycle support and project-stage readiness."],
  ];
  const boundaries = [
    ["Performance", "Final output remains dependent on climate, dew point, configuration, operating schedule and facility design."],
    ["Energy", "Energy consumption remains subject to operating conditions, energy architecture and validated process configuration."],
    ["Water Quality", "Treatment and stabilization requirements depend on intended use, local rules and project-specific water-quality framework."],
    ["Deployment", "Commercial readiness depends on site conditions, partners, permitting, civil works, utilities and detailed engineering."],
  ];
  return `<section class="infra-section development-command-section"><div class="development-command reveal"><div class="development-command-copy"><p class="eyebrow">Development Transparency</p><h2>Progress is communicated with validation boundaries.</h2><p>AIROVIA is advancing engineering, supplier engagement, industrial design, operations-platform work and project-development discussions while keeping final claims tied to validation and detailed engineering.</p><div class="development-command-metrics"><span>06 progress tracks</span><span>04 validation boundaries</span><span>01 development-stage company</span></div></div><div class="development-command-visual" role="img" aria-label="AIROVIA engineering and development stage"><span>AIROVIA</span><strong>Engineering progress under validation</strong></div></div></section>
<section class="infra-section development-tracks-section"><div class="infra-heading reveal"><p class="eyebrow">Progress Tracks</p><h2>Current development activity is organized across six tracks.</h2></div><div class="development-tracks reveal">${tracks.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section development-validation-section"><div class="development-validation reveal"><div><p class="eyebrow">Validation Discipline</p><h2>What remains subject to confirmation.</h2><p>AIROVIA avoids presenting unvalidated deployment readiness, certifications, guaranteed output or commercial economics as final public claims.</p></div><div class="development-validation-grid">${boundaries.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section development-pathway-section"><div class="development-pathway reveal"><div class="development-pathway-media" role="img" aria-label="AIROVIA facility development pathway"></div><div class="development-pathway-copy"><p class="eyebrow">Readiness Pathway</p><h2>From engineering activity to commercial deployment readiness.</h2><p>Development-stage work progresses through concept architecture, preliminary engineering, supplier alignment, pilot planning, project discussions and validation-driven readiness.</p><a href="project-development.html">Review project development workflow</a></div></div></section>`;
}

function partnersEcosystemSection() {
  const lanes = [
    ["01", "Technology and OEM", "Process equipment, atmospheric water systems, sensors, treatment, storage, controls and industrial components."],
    ["02", "Engineering and Delivery", "EPC contractors, MEP consultants, civil works, integration partners, architects and project delivery teams."],
    ["03", "Energy and Utilities", "Renewable-energy developers, electrical infrastructure, utility planning, battery systems and energy optimization."],
    ["04", "Markets and Projects", "Governments, utilities, project developers, infrastructure programs, industrial sites and strategic water-resilience initiatives."],
  ];
  const categories = [
    ["OEM and Manufacturing", "Equipment supply, modular production systems, fabrication and assembly strategy."],
    ["EPC and MEP", "Engineering delivery, site integration, utilities, installation and commissioning support."],
    ["Water Treatment", "Purification, stabilization, water-quality framework and monitoring support."],
    ["Energy Developers", "Electrical architecture, renewable integration, energy profile and utility strategy."],
    ["Controls and Automation", "Facility controls, telemetry, dashboards, optimization and agentic operations integration."],
    ["Governments and Utilities", "Program-level water resilience, pilots, public infrastructure and strategic reserve planning."],
    ["Project Developers", "Site development, commercial pathway, permitting, civil works and operating model."],
    ["Research and Technology", "Validation programs, performance evidence, climate response, methods and applied research."],
  ];
  const pathway = [
    ["01", "Fit", "Partner category, geography, technical scope and project-stage relevance."],
    ["02", "Scope", "Delivery responsibility, technical interface, timeline and validation requirements."],
    ["03", "Coordinate", "Engineering, commercial, operational and project-development alignment."],
  ];
  return `<section class="infra-section partners-command-section"><div class="partners-command reveal"><div class="partners-command-copy"><p class="eyebrow">Partner Ecosystem</p><h2>Infrastructure delivery requires coordinated partners.</h2><p>AIROVIA is developing relationships across manufacturing, engineering, project development, water treatment, energy, controls and public infrastructure programs.</p><div class="partners-command-metrics"><span>04 ecosystem lanes</span><span>08 partner categories</span><span>01 facility objective</span></div></div><div class="partners-command-visual" role="img" aria-label="AIROVIA infrastructure partner ecosystem"><span>AIROVIA</span><strong>Coordinated delivery network</strong></div></div></section>
<section class="infra-section partners-lanes-section"><div class="infra-heading reveal"><p class="eyebrow">Ecosystem Lanes</p><h2>Partners connect into the facility delivery model.</h2></div><div class="partners-lanes reveal">${lanes.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section partners-categories-section"><div class="partners-categories reveal"><div><p class="eyebrow">Partnership Categories</p><h2>Specialized roles across the infrastructure value chain.</h2></div><div class="partners-category-grid">${categories.map(([title, text], index) => `<a href="contact.html"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section partners-pathway-section"><div class="partners-pathway reveal"><div class="partners-pathway-media" role="img" aria-label="AIROVIA partner delivery coordination"></div><div class="partners-pathway-copy"><p class="eyebrow">Collaboration Pathway</p><h2>Start with fit, then define scope.</h2><p>Partnership discussions should begin with partner category, project relevance, delivery role, technical interface and validation requirements.</p><div class="partners-pathway-steps">${pathway.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div><a href="contact.html">Start a partnership inquiry</a></div></div></section>`;
}

function investorBriefSection() {
  const thesis = [
    ["01", "Infrastructure Category", "Atmospheric water positioned as engineered facility infrastructure for strategic, industrial and institutional contexts."],
    ["02", "Configurable Facilities", "Purpose-built, integrated, modular, custom architectural and Air House deployment formats."],
    ["03", "Technology Stack", "Atmospheric water process, treatment, storage, energy architecture, controls and lifecycle operations."],
    ["04", "Software Layer", "Monitoring, optimization, telemetry, maintenance support and AIROVIA Agentic Operations Platform."],
  ];
  const capabilities = [
    ["Engineering Progress", "Technology architecture, facility framing, preliminary engineering and validation planning."],
    ["Industrial Design", "Facility format, modular process architecture, installation logic and service access."],
    ["Partner Network", "OEM, EPC, MEP, controls, energy, treatment and project-development partner pathways."],
    ["Project Development", "Demand assessment, feasibility, commercial proposal, deployment workflow and lifecycle support."],
    ["Operations Platform", "Telemetry, dashboards, monitoring, optimization and controlled agentic operations roadmap."],
    ["Validation Discipline", "Performance, energy, water quality and commercial economics tied to defined conditions."],
  ];
  const boundaries = [
    ["No Fabricated Traction", "Customer deployments, contracts, revenue, certifications and final economics are not invented in public materials."],
    ["Condition-Based Performance", "Output and energy claims remain tied to climate, configuration, operating schedule and engineering validation."],
    ["Development-Stage Framing", "Investment discussions should account for remaining validation, partner delivery, permitting and site-specific work."],
  ];
  return `<section class="infra-section investor-command-section"><div class="investor-command reveal"><div class="investor-command-copy"><p class="eyebrow">Investor Brief</p><h2>A development-stage infrastructure platform, not a single-product story.</h2><p>AIROVIA is building toward an infrastructure stack that combines atmospheric water engineering, configurable facilities, energy integration, partner delivery and software-enabled lifecycle operations.</p></div><div class="investor-command-visual" role="img" aria-label="AIROVIA investor infrastructure platform"><span>AIROVIA</span><strong>Atmospheric water infrastructure stack</strong></div></div></section>
<section class="infra-section investor-thesis-section"><div class="infra-heading reveal"><p class="eyebrow">Investment Thesis</p><h2>Development-stage capabilities across the infrastructure value chain.</h2></div><div class="investor-thesis reveal">${thesis.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section investor-capabilities-section"><div class="investor-capabilities reveal"><div><p class="eyebrow">Capability Buildout</p><h2>What is being developed before commercial readiness.</h2></div><div class="investor-capability-grid">${capabilities.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section investor-boundaries-section"><div class="investor-boundaries reveal"><div class="investor-boundaries-media" role="img" aria-label="AIROVIA development stage validation boundaries"></div><div class="investor-boundaries-copy"><p class="eyebrow">Disclosure Discipline</p><h2>Investor materials stay tied to validation status.</h2><p>AIROVIA presents the opportunity without fabricating commercial traction, guaranteed performance, certifications or deployment readiness.</p><div class="investor-boundary-list">${boundaries.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></div></section>
<section class="infra-section investor-pathway-section"><div class="investor-pathway reveal"><div><p class="eyebrow">Investor Pathway</p><h2>Start with stage, scope and validation context.</h2><p>Investor conversations should be routed with an understanding of AIROVIA's development-stage position, technical validation boundaries and infrastructure delivery model.</p></div><div class="investor-pathway-actions"><a href="../development-stage.html">View Development Stage</a><a href="../technical-library.html">Review Technical Library</a><a href="../contact.html">Investor Inquiry</a></div></div></section>`;
}

function facilityFormatsSection(title, items) {
  return `<section class="infra-section infra-section-facility-formats"><div class="infra-heading reveal"><p class="eyebrow">Facility Formats</p><h2>${title}</h2></div><div class="facility-showcase reveal">${items.map(([name, text, href, img], index) => `<article class="facility-row"><div class="facility-row-media" style="background-image:url('${asset(img)}')" role="img" aria-label="${escapeAttr(name)}"></div><div class="facility-row-copy"><span>${String(index + 1).padStart(2, "0")}</span><h3>${name}</h3><p>${text}</p><a href="${href}">Explore format</a></div></article>`).join("")}</div></section>`;
}

function facilitiesPortfolioSection() {
  const architecture = [
    ["01", "Air and Extraction", "Ambient air intake zones, filtration systems, moisture extraction and thermal process systems."],
    ["02", "Water Treatment", "Raw-water collection, purification, mineralization, storage, pumping and distribution."],
    ["03", "Utilities and Access", "Electrical rooms, maintenance corridors, safety systems and service access."],
    ["04", "Operations Platform", "Control systems, monitoring, lifecycle support and AIROVIA Operations Platform integration."],
  ];
  return `<section class="infra-section facilities-command-section"><div class="facilities-command reveal"><div class="facilities-command-copy"><p class="eyebrow">Facility Portfolio</p><h2>One process architecture. Multiple facility formats.</h2><p>The external building form is selected around demand, site conditions, utilities, construction strategy, visibility and lifecycle operations.</p><div class="facilities-command-metrics"><span>05 formats</span><span>Shared process core</span><span>Site engineered</span></div></div><div class="facilities-command-visual" role="img" aria-label="AIROVIA atmospheric water facility portfolio"><span>AIROVIA Facilities</span><strong>Configured around the site</strong></div></div></section>
<section class="infra-section facilities-format-section"><div class="infra-heading reveal"><p class="eyebrow">Facility Formats</p><h2>The external building shape is not fixed.</h2></div><div class="facilities-portfolio reveal">${facilityFormats.map(([name, text, img], index) => `<a class="facilities-card facilities-card-${index + 1}" href="${name.includes("Air House") ? "air-house.html" : "contact.html"}"><div class="facilities-card-media" style="background-image:url('${asset(img)}')" role="img" aria-label="${escapeAttr(name)}"></div><div class="facilities-card-copy"><span>${String(index + 1).padStart(2, "0")}</span><h3>${name}</h3><p>${text}</p></div></a>`).join("")}</div></section>
<section class="infra-section facilities-airhouse-section"><div class="facilities-airhouse reveal"><div class="facilities-airhouse-visual" role="img" aria-label="AIROVIA Air House signature facility"></div><div class="facilities-airhouse-copy"><p class="eyebrow">AIROVIA Air House</p><h2>Signature architecture for visible infrastructure.</h2><p>The Air House combines industrial atmospheric water production with a recognizable architectural enclosure for sites where visibility, identity and public engagement matter.</p><p>The Air House is not required for deployment. The same process architecture can be integrated into conventional industrial buildings, modular plants or custom facilities.</p><a href="air-house.html">Explore Air House</a></div></div></section>
<section class="infra-section facilities-architecture-section"><div class="facilities-architecture reveal"><div><p class="eyebrow">Shared Facility Architecture</p><h2>Every format is organized around the same facility systems.</h2></div><div class="facilities-architecture-grid">${architecture.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function processStrip(steps) {
  return `<div class="infra-process-strip" aria-label="Process flow">${steps.map((s, i) => `<div><span>${String(i + 1).padStart(2, "0")}</span><strong>${s}</strong></div>`).join("")}</div>`;
}

function processSection(steps) {
  return `<section class="infra-section"><div class="infra-heading reveal"><p class="eyebrow">Process</p><h2>Technical process diagram.</h2></div><div class="infra-process reveal">${steps.map((s, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><h3>${s}</h3></article>`).join("")}</div></section>`;
}

function howItWorksSection() {
  const stages = [
    ["01", "Air Intake", "Ambient air enters the facility through controlled intake and filtration paths."],
    ["02", "Conditioning", "Air is filtered, conditioned and routed through the production process."],
    ["03", "Moisture Extraction", "Moisture is extracted under defined climate and operating conditions."],
    ["04", "Collection", "Condensate is collected and transferred into the treatment train."],
    ["05", "Purification", "Water is purified according to intended use and project requirements."],
    ["06", "Stabilization", "Minerals are stabilized as required by the water-quality framework."],
    ["07", "Storage", "Treated water is stored with capacity aligned to demand profile."],
    ["08", "Distribution", "Water is distributed to defined facility or site use points."],
    ["09", "Operations", "The facility is monitored, optimized and maintained through lifecycle operations."],
  ];
  const lanes = [
    ["Production", "Air intake, conditioning, extraction and condensate collection."],
    ["Treatment", "Purification, stabilization and water-quality monitoring."],
    ["Infrastructure", "Storage, distribution, energy, controls and site integration."],
    ["Operations", "Monitoring, maintenance, validation and performance optimization."],
  ];
  return `<section class="infra-section how-process-section"><div class="how-process-command reveal"><div class="how-process-copy"><p class="eyebrow">Process Architecture</p><h2>One continuous facility workflow.</h2><p>The AIROVIA process is organized as a facility architecture, not a standalone device. Air handling, extraction, water treatment, storage, distribution and operations are connected into one engineered workflow.</p><div class="how-process-metrics"><span>09 process steps</span><span>04 operating lanes</span><span>01 integrated facility</span></div></div><div class="how-process-visual" role="img" aria-label="AIROVIA atmospheric water process facility"><span>AIROVIA</span><strong>Air to treated water</strong></div></div></section>
<section class="infra-section how-sequence-section"><div class="infra-heading reveal"><p class="eyebrow">Technical Sequence</p><h2>From air handling to intelligent operations.</h2></div><div class="how-sequence reveal" aria-label="AIROVIA process flow"><svg class="how-flow-lines" viewBox="0 0 1200 620" aria-hidden="true" focusable="false"><path class="how-flow-track" d="M120 110 H600 H980 C1100 110 1100 310 980 310 H600 H220 C100 310 100 510 220 510 H600 H980"/><path class="how-flow-energy" d="M120 110 H600 H980 C1100 110 1100 310 980 310 H600 H220 C100 310 100 510 220 510 H600 H980"/></svg>${stages.map(([number, title, text], index) => `<article class="how-step how-step-${index + 1}"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section how-lanes-section"><div class="how-lanes reveal"><div><p class="eyebrow">Operating Lanes</p><h2>The process is managed across facility disciplines.</h2></div><div class="how-lane-grid">${lanes.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function agenticOperationsSection() {
  const telemetry = [
    ["Production", "Water output, storage, distribution and operating schedule."],
    ["Energy", "kWh/L, equipment load, utility status and energy strategy."],
    ["Climate", "Temperature, humidity, dew point and production correlation."],
    ["Quality", "Treatment status, stabilization, alerts and validation records."],
  ];
  const layers = [
    ["01", "Operations Dashboard", "Facility visibility across production, energy, climate, equipment, water quality, alerts, maintenance, storage and distribution."],
    ["02", "AI Insights Engine", "Production forecasting, climate-performance correlation, anomaly detection, efficiency analysis and predictive maintenance support."],
    ["03", "Agentic Operations Layer", "Operator recommendations, automated work-order creation, production scheduling, sequencing support and controlled autonomous actions."],
  ];
  const modes = [
    ["Monitoring", "Observe facility state, alarms, production, quality and energy performance."],
    ["Advisory", "Recommend actions, identify anomalies, support root-cause review and maintenance planning."],
    ["Controlled Autonomy", "Future actions remain subject to engineering validation, operator policy and control-system approval."],
  ];
  return `<section class="infra-section agentic-command-section"><div class="agentic-command reveal"><div class="agentic-command-copy"><p class="eyebrow">Operations Layer</p><h2>Facility intelligence for atmospheric water operations.</h2><p>The platform is planned as the digital operating layer that connects facility telemetry, production logic, energy performance, maintenance signals and operator decision support.</p><div class="agentic-command-metrics"><span>Multi-facility view</span><span>Telemetry driven</span><span>Operator governed</span></div></div><div class="agentic-dashboard" role="img" aria-label="AIROVIA operations dashboard"></div></div></section>
<section class="infra-section agentic-telemetry-section"><div class="agentic-telemetry reveal"><div><p class="eyebrow">Telemetry Domains</p><h2>One operational view across facility signals.</h2></div><div class="agentic-signal-grid">${telemetry.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section agentic-stack-section"><div class="infra-heading reveal"><p class="eyebrow">Three Internal Layers</p><h2>A structured operating stack for visibility, intelligence and future controlled autonomy.</h2></div><div class="agentic-stack reveal">${layers.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}<div class="agentic-stack-flow" aria-hidden="true"></div></div></section>
<section class="infra-section agentic-modes-section"><div class="agentic-modes reveal"><div><p class="eyebrow">Operating Modes</p><h2>Digital support progresses under operator governance.</h2></div><ol>${modes.map(([title, text], index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong><p>${text}</p></li>`).join("")}</ol></div></section>`;
}

function energyArchitectureSection() {
  const systems = [
    ["01", "Grid Connection", "Utility interface, capacity, tariff, reliability and interconnection constraints."],
    ["02", "Renewables", "Solar, wind or hybrid generation evaluated against site resources and operating profile."],
    ["03", "Storage and Backup", "Battery storage, backup generation and reserve strategy sized around continuity requirements."],
    ["04", "Load Management", "Equipment sequencing, process loading and energy-management controls."],
  ];
  const path = ["Grid", "Transformer", "Switchgear", "Process Systems", "Treatment", "Storage and Pumping", "Controls"];
  const variables = [
    ["Climate", "Temperature, humidity and dew point affect production efficiency."],
    ["Process", "Extraction technology, airflow and plant loading shape kWh/L."],
    ["Recovery", "Heat recovery, thermal storage and equipment efficiency influence demand."],
    ["Treatment", "Water-quality requirements add treatment and pumping loads."],
  ];
  return `<section class="infra-section energy-command-section"><div class="energy-command reveal"><div class="energy-command-copy"><p class="eyebrow">Power System</p><h2>Energy architecture is part of the facility design.</h2><p>AIROVIA energy planning connects utility supply, renewables, storage, backup power, load management and operating strategy so production can be evaluated against kWh/L and reliability requirements.</p><div class="energy-command-metrics"><span>kWh/L focused</span><span>Site engineered</span><span>Reliability driven</span></div></div><div class="energy-command-visual" role="img" aria-label="AIROVIA energy infrastructure"><span>Energy Architecture</span><strong>Power matched to production</strong></div></div></section>
<section class="infra-section energy-systems-section"><div class="energy-systems reveal"><div><p class="eyebrow">Facility Energy Architecture</p><h2>Each site requires power-system engineering around reliability, cost and operating profile.</h2></div><div class="energy-system-grid">${systems.map(([number, title, text]) => `<article><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section energy-flow-section"><div class="infra-heading reveal"><p class="eyebrow">Power Path</p><h2>Energy moves through the facility as a managed operating system.</h2></div><div class="energy-flow reveal" aria-label="AIROVIA facility power path"><svg viewBox="0 0 1200 260" aria-hidden="true" focusable="false"><path class="energy-flow-track" d="M80 130 H1120"/><path class="energy-flow-live" d="M80 130 H1120"/></svg>${path.map((label, index) => `<article class="energy-flow-step energy-flow-step-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${label}</strong></article>`).join("")}</div></section>
<section class="infra-section energy-variables-section"><div class="energy-variables reveal"><div><p class="eyebrow">Variables Affecting kWh/L</p><h2>Specific energy consumption changes with climate, equipment and operating choices.</h2></div><div class="energy-variable-grid">${variables.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section energy-renewable-section"><div class="energy-renewable reveal"><div class="energy-renewable-visual" role="img" aria-label="Renewable energy integration for AIROVIA facilities"></div><div class="energy-renewable-copy"><p class="eyebrow">Renewable Integration</p><h2>Renewables are evaluated site by site.</h2><p>Renewable integration is evaluated according to site resources, land availability, capital cost, operating profile and required reliability.</p><p>Renewable energy does not automatically eliminate the need for grid or backup capacity.</p></div></div></section>`;
}

function technologyProcessSection() {
  const stages = [
    ["01", "Ambient Air Intake", "Controlled air entry shaped by facility location, airflow strategy and maintenance access."],
    ["02", "Air Filtration", "Filtration protects process equipment and prepares air for extraction."],
    ["03", "Moisture Extraction", "Moisture is extracted according to selected technology and climate envelope."],
    ["04", "Thermal Management", "Refrigeration or thermal systems manage process temperature and efficiency."],
    ["05", "Condensate Collection", "Collected water is routed into treatment and stabilization systems."],
    ["06", "Water Purification", "Treatment is configured around intended use and project requirements."],
    ["07", "Mineral Stabilization", "Mineral balance is stabilized when required by the water-quality framework."],
    ["08", "Storage and Distribution", "Treated water is stored and distributed to defined facility or site use points."],
    ["09", "Intelligent Controls", "Controls monitor production, energy, equipment state and operating performance."],
  ];
  const pathways = [
    ["Condensation", "Baseline pathway where site climate, air volume and cooling efficiency support production."],
    ["Adsorption or Desiccant", "May be evaluated for lower-humidity conditions or specialized process requirements."],
    ["Hybrid Systems", "May be explored where technical and economic conditions justify combined approaches."],
  ];
  const factors = [
    ["Climate", "Dew point, temperature and relative humidity define production envelope."],
    ["Process", "Extraction pathway, airflow, thermal efficiency and redundancy shape output."],
    ["Quality", "Treatment, stabilization and storage requirements influence configuration."],
    ["Operations", "Maintainability, monitoring and validation define lifecycle performance."],
  ];
  return `<section class="infra-section technology-command-section"><div class="technology-command reveal"><div class="technology-command-copy"><p class="eyebrow">Process Architecture</p><h2>Atmospheric water production is an engineered system.</h2><p>The technology architecture connects air handling, extraction, thermal management, treatment, storage, distribution and intelligent controls into a validated facility process.</p><div class="technology-command-metrics"><span>09 process stages</span><span>Site-specific pathway</span><span>Validated performance</span></div></div><div class="technology-command-visual" role="img" aria-label="AIROVIA atmospheric water technology process"><span>AIROVIA Technology</span><strong>Airflow, extraction, treatment and controls</strong></div></div></section>
<section class="infra-section technology-flow-section"><div class="infra-heading reveal"><p class="eyebrow">Technical Process</p><h2>The production path is managed as one facility process.</h2></div><div class="technology-flow reveal" aria-label="AIROVIA technology process flow"><svg viewBox="0 0 1200 560" aria-hidden="true" focusable="false"><path class="technology-flow-track" d="M100 90 H600 H1030 C1130 90 1130 280 1030 280 H600 H170 C80 280 80 470 170 470 H600 H1030"/><path class="technology-flow-live" d="M100 90 H600 H1030 C1130 90 1130 280 1030 280 H600 H170 C80 280 80 470 170 470 H600 H1030"/></svg>${stages.map(([number, title, text], index) => `<article class="technology-step technology-step-${index + 1}"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section technology-pathways-section"><div class="technology-pathways reveal"><div><p class="eyebrow">Technology Pathways</p><h2>Different extraction pathways may be evaluated by site.</h2><p>These pathways remain subject to technical and economic validation for each project.</p></div><div class="technology-pathway-grid">${pathways.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
<section class="infra-section technology-factors-section"><div class="technology-factors reveal"><div><p class="eyebrow">Performance Factors</p><h2>Technology selection and output depend on measurable climate and engineering variables.</h2></div><div class="technology-factor-grid">${factors.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function timelineSection(kicker, title, steps) {
  return `<section class="infra-section infra-section-${slug(kicker)}"><div class="infra-heading reveal"><p class="eyebrow">${kicker}</p><h2>${title}</h2></div><ol class="delivery-rail reveal">${steps.map((s, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><strong>${s}</strong></li>`).join("")}</ol></section>`;
}

function projectDevelopmentSection() {
  const phases = [
    ["Define", "Convert demand, climate and site context into a qualified facility basis.", developmentSteps.slice(0, 3)],
    ["Engineer", "Resolve the concept, utilities and commercial pathway before commitment.", developmentSteps.slice(3, 6)],
    ["Build", "Move from detailed design into manufacturing, procurement and site installation.", developmentSteps.slice(6, 9)],
    ["Operate", "Commission, validate and support the facility through its operating lifecycle.", developmentSteps.slice(9, 12)],
  ];
  return `<section class="infra-section infra-section-project-development"><div class="development-control reveal"><div class="development-control-head"><div><p class="eyebrow">Project Development</p><h2>From project question to operating facility.</h2></div><p>AIROVIA routes each facility discussion through disciplined gates so demand, site conditions, energy, water quality, delivery scope and lifecycle support are aligned before deployment.</p></div><div class="development-control-system" aria-label="AIROVIA project development control pathway"><div class="development-control-spine" aria-hidden="true"><span></span></div><div class="development-control-core"><span>AIROVIA</span><strong>Facility Delivery Control</strong></div>${phases.map(([title, text, steps], index) => `<article class="development-gate development-gate-${index + 1}"><div><h3>${title}</h3><p>${text}</p></div><ul>${steps.map((step) => `<li>${step}</li>`).join("")}</ul></article>`).join("")}</div><div class="development-control-status"><span>Qualified demand basis</span><span>Engineering validation</span><span>Partner delivery</span><span>Lifecycle governance</span></div></div></section>`;
}

function projectDevelopmentOutputsSection() {
  const outputs = [
    ["Demand Basis", "Water volume, use profile, quality target, reserve logic and operating schedule are defined before engineering assumptions are made."],
    ["Site Envelope", "Climate response, utilities, access, civil constraints, energy availability and local operating context are reviewed together."],
    ["Concept Package", "Facility format, production pathway, treatment architecture, storage approach and commercial scope are shaped into a coherent basis."],
    ["Delivery Plan", "Engineering, procurement, manufacturing, installation, commissioning and validation responsibilities are organized before execution."],
    ["Operating Framework", "Monitoring, maintenance, performance review, water-quality governance and lifecycle support are prepared as part of the facility model."],
  ];
  return `<section class="infra-section project-outputs-section"><div class="project-outputs reveal"><div class="project-outputs-copy"><p class="eyebrow">Decision Outputs</p><h2>Each phase narrows uncertainty before deployment.</h2><p>The workflow is intended to turn an early water-resilience question into a practical facility pathway with clearer assumptions, integration boundaries and operating responsibilities.</p></div><div class="project-output-grid">${outputs.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function dataCenterApplicationSection() {
  const deployment = [
    ["Pilot Production Line", "Validate output, energy intensity, water quality and climate response before campus-scale planning.", "../contact.html"],
    ["Campus Facility", "Dedicated atmospheric water infrastructure connected to selected support-side utility systems.", "../facilities.html"],
    ["Expanded Plant", "Additional process lines, treatment capacity and storage planned around demand growth.", "../facilities.html"],
    ["Distributed Facilities", "Multiple production sites coordinated across a campus or data-center zone.", "../monitoring-platform.html"],
  ];
  const uses = [
    "Cooling-system makeup water",
    "Humidification",
    "Cleaning",
    "Landscaping",
    "Sanitary use",
    "Emergency reserve",
    "Non-potable site applications",
    "Potable use only where treatment and regulation permit",
  ];
  const requirements = [
    "Redundancy review",
    "Water-quality approval",
    "Energy availability",
    "BMS or DCIM interface",
    "Reserve storage strategy",
    "Operator validation",
  ];
  return `<section class="infra-section dc-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Campus Water Resilience</p><h2>Support-side water infrastructure for high-demand campuses.</h2><p>AIROVIA is positioned as a dedicated atmospheric water facility layer for validation, resilience planning and selected non-critical support-side water applications.</p><div class="dc-command-metrics"><span>Validation first</span><span>Support-side applications</span><span>Campus-level planning</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility serving a data-center campus"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>AIROVIA does not replace the data-center cooling system.</h2></div><p>Final integration into mission-critical infrastructure requires engineering review, redundancy analysis, water-quality approval and operational validation. The facility is evaluated as a complementary water-production and resilience layer, not as a substitute for thermal engineering.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>Facility and production-line planning.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="AIROVIA data center support water applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Use cases remain subject to water-quality requirements and engineering review.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Reference Configuration</p><h2>Indicative reference only.</h2><p>Reference configurations are planning tools. Final output depends on climate, facility design, operating schedule, redundancy requirements, treatment framework and validated energy performance.</p></div><div class="dc-reference-card"><span>Reference Facility</span><strong>Up to 160 m3/day</strong><p>Under defined climate and design conditions.</p><a href="../capacity-performance.html">Review performance framework</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function industrialFacilitiesApplicationSection() {
  const deployment = [
    ["Site Water Audit", "Define water demand, existing sources, quality requirements, logistics exposure and operating schedule.", "contact.html"],
    ["Integrated Utility Facility", "Plan atmospheric production, treatment, storage and pumping as part of the site utility strategy.", "facilities.html"],
    ["Production Expansion", "Add process lines, treatment capacity and reserve storage as industrial demand grows.", "capacity-performance.html"],
    ["Operations Intelligence", "Connect monitoring, maintenance and performance validation through the AIROVIA operations platform.", "monitoring-platform.html"],
  ];
  const uses = [
    "Process-support water",
    "Cooling-system makeup",
    "Washdown and cleaning",
    "Sanitary demand",
    "Dust suppression",
    "Emergency reserve",
    "Remote site support",
    "Potable use only where treatment and regulation permit",
  ];
  const requirements = [
    "Water-quality targets",
    "Load profile review",
    "Utility interface",
    "Storage and pumping",
    "Maintenance access",
    "Operational validation",
  ];
  return `<section class="infra-section dc-command-section industrial-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Industrial Support Water</p><h2>Localized production for constrained industrial sites.</h2><p>AIROVIA is evaluated as a dedicated facility layer for industrial campuses, processing sites, logistics hubs and remote operations where conventional supply is costly, constrained or strategically fragile.</p><div class="dc-command-metrics"><span>Demand-led sizing</span><span>Utility integration</span><span>Operational resilience</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility for industrial operations"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>Designed around support-side industrial water needs.</h2></div><p>Industrial applications require site-specific review of process sensitivity, quality targets, redundancy, energy availability, maintenance access and operator responsibility. AIROVIA is positioned as a complementary water-production and resilience layer, not as a blanket replacement for process engineering.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>From site demand to operating utility layer.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section industrial-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="Industrial facility water support applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Configured for selected support uses and validated site conditions.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Engineering Basis</p><h2>Industrial suitability is project-specific.</h2><p>Each facility configuration should be reviewed against climate, water-quality targets, operating hours, energy supply, reserve storage, treatment scope, pumping requirements and the site maintenance model.</p></div><div class="dc-reference-card"><span>Planning Focus</span><strong>Support-side utility water</strong><p>Configured around industrial demand, not assumed as a universal process-water substitute.</p><a href="contact.html">Start site review</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function governmentResilienceApplicationSection() {
  const deployment = [
    ["Resilience Assessment", "Map demand, climate, vulnerable supply points, storage needs and target communities or facilities.", "contact.html"],
    ["Pilot Facility", "Validate local atmospheric production, treatment, quality, operations and public-sector reporting requirements.", "facilities.html"],
    ["Strategic Reserve", "Configure production, treatment and storage to support emergency reserve or public infrastructure programs.", "capacity-performance.html"],
    ["Distributed Network", "Coordinate multiple facilities across municipalities, remote communities or strategic public assets.", "monitoring-platform.html"],
  ];
  const uses = [
    "Strategic water reserve",
    "Remote communities",
    "Public infrastructure",
    "Emergency preparedness",
    "Municipal resilience",
    "Distributed public facilities",
    "Pilot programs",
    "Innovation districts",
  ];
  const requirements = [
    "Procurement pathway",
    "Regulatory review",
    "Water-quality approval",
    "Public reporting",
    "Energy backup strategy",
    "Lifecycle governance",
  ];
  return `<section class="infra-section dc-command-section government-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Public Resilience Capacity</p><h2>Atmospheric water production for strategic public programs.</h2><p>AIROVIA can be evaluated as a localized infrastructure layer for agencies seeking diversified water supply, emergency reserve, remote availability and visible resilience pilots.</p><div class="dc-command-metrics"><span>Local production</span><span>Reserve planning</span><span>Public validation</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility supporting public resilience"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>Complementary capacity, not a replacement for public water systems.</h2></div><p>Government programs require careful review of regulation, procurement, water-quality standards, public communications, emergency protocols and long-term operations. AIROVIA is positioned as an additional localized production and resilience layer within a broader public water strategy.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>From resilience study to public operating asset.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section government-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="Government water resilience applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Configured for resilience, reserve and community-support programs.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Program Readiness</p><h2>Public deployment depends on governance as much as engineering.</h2><p>Each program should define operating authority, water-quality targets, reserve protocols, operator responsibility, maintenance access, energy continuity and reporting requirements before facility commitment.</p></div><div class="dc-reference-card"><span>Planning Focus</span><strong>Resilience and reserve capacity</strong><p>Localized atmospheric water production for defined public-sector needs and validated operating conditions.</p><a href="contact.html">Start program review</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function remoteInfrastructureApplicationSection() {
  const deployment = [
    ["Remote Site Basis", "Define demand, access limits, climate envelope, energy availability, storage exposure and service intervals.", "contact.html"],
    ["Modular Production", "Configure atmospheric water production, treatment and storage for the site's utility and operating model.", "facilities.html"],
    ["Reserve Integration", "Align storage, pumping, treatment and distribution with emergency reserve and continuity requirements.", "capacity-performance.html"],
    ["Remote Operations", "Monitor output, performance, maintenance status and site conditions through the AIROVIA operations platform.", "monitoring-platform.html"],
  ];
  const uses = [
    "Remote operations",
    "Islands",
    "Border facilities",
    "Research stations",
    "Infrastructure corridors",
    "Construction camps",
    "Temporary strategic facilities",
    "Emergency support water",
  ];
  const requirements = [
    "Climate envelope",
    "Energy availability",
    "Logistics access",
    "Service intervals",
    "Storage exposure",
    "Remote monitoring",
  ];
  return `<section class="infra-section dc-command-section remote-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Remote Water Logistics</p><h2>On-site production where supply routes are exposed.</h2><p>AIROVIA can be evaluated as a localized water-production layer for islands, infrastructure corridors, remote operations and temporary strategic facilities where trucking, transport cost or intermittent access creates operational risk.</p><div class="dc-command-metrics"><span>Logistics reduction</span><span>On-site reserve</span><span>Remote monitoring</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility supporting remote infrastructure"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>Configured around site access, not generic water demand.</h2></div><p>Remote infrastructure projects require site-specific review of climate, power availability, logistics, service intervals, environmental exposure, water quality and operator capacity. AIROVIA is positioned as a complementary production and reserve layer for defined use cases.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>From logistics constraint to operating site utility.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section remote-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="Remote infrastructure water applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Built for sites where access, storage and continuity matter.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Feasibility Basis</p><h2>Remote projects are governed by operating conditions.</h2><p>Each deployment should define service access, spare parts strategy, energy continuity, operator responsibility, local storage, distribution points and validation requirements before facility commitment.</p></div><div class="dc-reference-card"><span>Planning Focus</span><strong>Operational continuity</strong><p>Localized atmospheric water capacity for remote sites under validated climate, energy and maintenance conditions.</p><a href="contact.html">Start remote site review</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function agricultureApplicationSection() {
  const deployment = [
    ["Crop Water Basis", "Define crop value, water quality targets, irrigation profile, climate envelope and existing supply constraints.", "contact.html"],
    ["Farm Utility Integration", "Configure atmospheric production, treatment, storage and pumping beside greenhouse or nursery operations.", "facilities.html"],
    ["Quality and Blending", "Align purification, mineral stabilization, nutrient systems and blending strategy with the crop-water plan.", "technology.html"],
    ["Production Monitoring", "Track output, storage, water quality, energy performance and maintenance through the AIROVIA operations platform.", "monitoring-platform.html"],
  ];
  const uses = [
    "Controlled-environment agriculture",
    "Greenhouses",
    "Hydroponics",
    "Nurseries",
    "High-value crops",
    "Remote agricultural facilities",
    "Irrigation blending",
    "Reserve storage",
  ];
  const requirements = [
    "Crop value case",
    "Water-quality targets",
    "Energy economics",
    "Nutrient compatibility",
    "Storage strategy",
    "Operator validation",
  ];
  return `<section class="infra-section dc-command-section agriculture-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Controlled Agriculture Water</p><h2>Local production for high-value growing environments.</h2><p>AIROVIA can be evaluated for greenhouses, hydroponics, nurseries and remote agricultural facilities where water quality, supply control and resilience can materially affect operations.</p><div class="dc-command-metrics"><span>Quality control</span><span>Crop-led sizing</span><span>Reserve storage</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility supporting controlled agriculture"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>Configured for agricultural utility needs, not commodity water replacement.</h2></div><p>Agricultural fit depends on crop value, climate, water-quality targets, energy economics, nutrient compatibility, local supply constraints and operating discipline. AIROVIA is positioned as a localized production and quality-control layer for selected agricultural contexts.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>From crop requirement to farm utility system.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section agriculture-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="Agricultural water production applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Most relevant where quality, resilience and controlled production matter.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Agronomic Fit</p><h2>Facility economics should be tied to crop value and water quality.</h2><p>Each deployment should define irrigation profile, reserve storage, water-quality framework, blending plan, energy cost, maintenance model and performance validation before facility commitment.</p></div><div class="dc-reference-card"><span>Planning Focus</span><strong>Controlled water quality</strong><p>Localized atmospheric water capacity for selected high-value or supply-constrained agricultural operations.</p><a href="contact.html">Start agricultural site review</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function destinationDevelopmentsApplicationSection() {
  const deployment = [
    ["Destination Water Basis", "Define guest demand, irrigation, cleaning, reserve, visibility goals and site water constraints.", "contact.html"],
    ["Architectural Integration", "Evaluate Air House, landmark facility, integrated utility plant or distributed production model.", "facilities.html"],
    ["Utility and Reserve Plan", "Align atmospheric production, treatment, storage, pumping and public-facing infrastructure strategy.", "capacity-performance.html"],
    ["Lifecycle Operations", "Monitor output, water quality, storage, maintenance and public-facing performance through AIROVIA operations.", "monitoring-platform.html"],
  ];
  const uses = [
    "Resorts",
    "Eco-destinations",
    "Remote hospitality",
    "Islands",
    "Landmark developments",
    "Sustainability campuses",
    "Guest-facing infrastructure",
    "Emergency reserve",
  ];
  const requirements = [
    "Visual integration",
    "Permitting pathway",
    "Water classification",
    "Guest demand profile",
    "Reserve strategy",
    "Operations reliability",
  ];
  return `<section class="infra-section dc-command-section destination-command-section"><div class="dc-command reveal"><div class="dc-command-copy"><p class="eyebrow">Destination Utility Strategy</p><h2>Water infrastructure that can become part of the place.</h2><p>AIROVIA can be evaluated for resorts, islands, sustainability campuses and landmark developments where water resilience, visible infrastructure and guest-facing utility narratives matter.</p><div class="dc-command-metrics"><span>Visible utility</span><span>Reserve capacity</span><span>Destination fit</span></div></div><div class="dc-command-visual" role="img" aria-label="AIROVIA atmospheric water facility for destination developments"></div></div></section>
<section class="infra-section dc-scope-section"><div class="dc-scope reveal"><div><p class="eyebrow">Responsible Scope</p><h2>Designed for destination context, not generic hospitality supply.</h2></div><p>Destination projects require review of guest demand, public visibility, water classification, permitting, treatment scope, energy strategy, architecture, maintenance and operator responsibility. AIROVIA is positioned as a localized production, reserve and experience-supporting infrastructure layer.</p></div></section>
<section class="infra-section dc-deployment-section"><div class="dc-deployment-shell reveal"><div class="dc-section-title"><p class="eyebrow">Deployment Structure</p><h2>From destination vision to operating utility asset.</h2></div><div class="dc-deployment-map">${deployment.map(([title, text, href]) => `<a href="${href}"><h3>${title}</h3><p>${text}</p></a>`).join("")}</div></div></section>
<section class="infra-section dc-applications-section destination-applications-section"><div class="dc-applications reveal"><div class="dc-applications-media" role="img" aria-label="Destination development water applications"></div><div class="dc-applications-copy"><p class="eyebrow">Possible Applications</p><h2>Most relevant where resilience and visible utility strategy intersect.</h2><div class="dc-use-grid">${uses.map((use) => `<span>${use}</span>`).join("")}</div></div></div></section>
<section class="infra-section dc-reference-section"><div class="dc-reference reveal"><div><p class="eyebrow">Destination Fit</p><h2>Facility format should follow the place, not only the volume.</h2><p>Each project should define architectural role, guest-facing visibility, water-quality framework, reserve storage, energy strategy, maintenance model and long-term operating responsibility before facility commitment.</p></div><div class="dc-reference-card"><span>Planning Focus</span><strong>Visible resilient utility</strong><p>Localized atmospheric water capacity for selected hospitality, landmark and destination-development contexts.</p><a href="contact.html">Start destination review</a></div><div class="dc-requirements">${requirements.map((item) => `<span>${item}</span>`).join("")}</div></div></section>`;
}

function milestoneSection(items) {
  return `<section class="infra-section"><div class="infra-card-grid reveal">${items.map((x) => `<article class="infra-card"><div><h3>${x}</h3><p>Development-stage activity. Status and commercial readiness remain subject to validation and detailed engineering.</p></div></article>`).join("")}</div></section>`;
}

function listSection(kicker, title, items) {
  return `<section class="infra-section"><div class="infra-split reveal"><div><p class="eyebrow">${kicker}</p><h2>${title}</h2></div><ul class="infra-list">${items.map((x) => `<li>${x}</li>`).join("")}</ul></div></section>`;
}

function sustainabilityIndicatorsSection() {
  const indicatorGroups = [
    ["Production and Demand", "Measured local water output, demand served, reserve storage, uptime and distribution profile."],
    ["Energy and Carbon", "kWh/L, renewable contribution, grid or backup mix and carbon intensity per cubic meter."],
    ["Water Quality and Treatment", "Treatment pathway, mineral stabilization, compliance testing, reject-water handling and quality records."],
    ["Lifecycle and Materials", "Filter lifecycle, treatment consumables, refrigerant management, service intervals and equipment lifespan."],
  ];
  const pathway = [
    ["Baseline", "Define the current water source, logistics, quality requirements and operating context."],
    ["Site Model", "Evaluate climate, energy, facility format, treatment needs and storage strategy."],
    ["Operating Data", "Track production, energy intensity, water quality, uptime and maintenance inputs."],
    ["Reporting Boundary", "Separate measured outcomes from assumptions, estimates and future improvement targets."],
  ];
  return `<section class="infra-section sustainability-command-section"><div class="sustainability-command reveal"><div class="sustainability-command-copy"><p class="eyebrow">Measurement Discipline</p><h2>Measure the facility, not the claim.</h2><p>AIROVIA frames sustainability through transparent indicators that can be tied to facility configuration, site conditions, energy source, water quality and lifecycle inputs.</p><div class="sustainability-command-metrics"><span>Operating data</span><span>Site-specific baseline</span><span>Defined reporting boundary</span></div></div><div class="sustainability-command-visual" role="img" aria-label="AIROVIA sustainability indicators and facility monitoring"><span>Sustainability Indicators</span><strong>Production, energy, quality and lifecycle signals.</strong></div></div></section>
<section class="infra-section sustainability-indicator-section"><div class="infra-heading reveal"><p class="eyebrow">Indicator Categories</p><h2>Environmental performance should be quantified by facility and site.</h2></div><div class="sustainability-indicator-grid reveal">${indicatorGroups.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
<section class="infra-section sustainability-pathway-section"><div class="sustainability-pathway reveal"><div><p class="eyebrow">Reporting Pathway</p><h2>Claims become useful only when the boundary is clear.</h2><p>Each project should distinguish measured operating results from estimates, comparison baselines, procurement assumptions and future targets.</p></div><div class="sustainability-pathway-track">${pathway.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function applicationsSection() {
  return `<section class="infra-section infra-section-application-matrix"><div class="application-matrix reveal">${applications.map(([title, href, challenge, format, integration, considerations], index) => `<a class="application-row" href="${href}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${challenge}</p><dl><dt>Format</dt><dd>${format}</dd><dt>Integration</dt><dd>${integration}</dd><dt>Engineering</dt><dd>${considerations}</dd></dl></a>`).join("")}</div></section>`;
}

function applicationTeaserSection(title, items) {
  return `<section class="infra-section infra-section-application-teaser"><div class="infra-heading reveal"><p class="eyebrow">Applications</p><h2>${title}</h2></div><div class="application-radar reveal" aria-label="AIROVIA application sectors"><div class="application-radar-core"><span>AIROVIA</span><strong>Facility Fit</strong></div>${items.map(([name, href, text], index) => `<a class="application-sector application-sector-${index + 1}" href="${href}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${name}</h3><p>${text}</p></a>`).join("")}</div></section>`;
}

function documentsSection(docs) {
  return `<section class="infra-section"><div class="infra-card-grid reveal">${docs.map(([title, status, href]) => `<article class="infra-card"><div><h3>${title}</h3><p>${status}</p>${href ? `<a href="${href}">Open</a>` : `<span class="infra-status">Coming soon</span>`}</div></article>`).join("")}</div></section>`;
}

function technicalLibrarySection() {
  const docs = [
    ["01", "Infrastructure Brief", "Available", "Core infrastructure overview for AIROVIA atmospheric water facilities.", "Brief", "infrastructure-brief.html"],
    ["02", "Corporate Overview", "Coming soon", "Company positioning, delivery role and development-stage summary.", "Overview", ""],
    ["03", "Technology Overview", "Coming soon", "Atmospheric water process architecture, treatment and controls summary.", "Engineering", ""],
    ["04", "Facility Deployment Formats", "Coming soon", "Purpose-built, integrated, modular and landmark facility references.", "Facilities", ""],
    ["05", "Data Center Technical Brief", "Coming soon", "Application notes for campus resilience and selected support-water uses.", "Application", ""],
    ["06", "Energy Methodology", "Coming soon", "Energy planning, operating assumptions and integration methodology.", "Methodology", ""],
    ["07", "Water Quality Framework", "Coming soon", "Treatment, stabilization, monitoring and validation framework.", "Quality", ""],
    ["08", "Pilot Methodology", "Coming soon", "Validation approach for output, climate response, energy and water quality.", "Validation", ""],
  ];
  return `<section class="infra-section technical-library-section"><div class="technical-library-shell reveal"><div class="technical-library-feature"><div><p class="eyebrow">Library Index</p><h2>Engineering references for atmospheric water infrastructure.</h2><p>Documents are published only when available or explicitly marked as coming soon. The library is organized around facility planning, technology, applications, energy, quality and validation.</p></div><a class="technical-library-primary" href="infrastructure-brief.html"><span>Available now</span><strong>Infrastructure Brief</strong></a></div><div class="technical-library-graphic" aria-hidden="true"><div class="technical-library-visual-copy"><span>Resource Classification</span><strong>Planning, engineering, validation and operations references.</strong></div><div class="technical-library-metrics"><span>08 indexed resources</span><span>01 available</span><span>07 scheduled</span></div></div><div class="technical-library-grid">${docs.map(([number, title, status, text, type, href]) => `<article class="technical-library-card ${href ? "is-available" : "is-pending"}"><div class="technical-library-card-head"><span>${number}</span><em>${type}</em></div><h3>${title}</h3><p>${text}</p>${href ? `<a href="${href}">Open resource</a>` : `<span class="infra-status">${status}</span>`}</article>`).join("")}</div></div></section>`;
}

function disclaimer(text) {
  return "";
}

function cta(title, text, label, href) {
  return `<section class="infra-section"><div class="infra-cta reveal"><div><p class="eyebrow">Next Step</p><h2>${title}</h2><p>${text}</p></div><a class="button button-primary" href="${href}">${label}</a></div></section>`;
}

function contactForm() {
  const contacts = [
    ["Corporate Contact", "info@airovia.io", "General company, facility and strategic infrastructure inquiries."],
    ["Media", "media@airovia.io", "Press, editorial, public communications and interview requests."],
    ["Partners", "partners@airovia.io", "EPC, OEM, energy, technology and project collaboration inquiries."],
  ];
  return `<section class="infra-section contact-options-section"><div class="contact-options reveal"><div class="contact-options-head"><p class="eyebrow">Contact Directory</p><h2>Route your inquiry to the right team.</h2><p>Use the relevant channel below, or submit a structured inquiry through the form.</p></div><div class="contact-option-grid">${contacts.map(([title, email, text]) => `<article class="contact-option-card"><span>${title}</span><p>${text}</p><a href="mailto:${email}">${email}</a></article>`).join("")}</div></div></section><section class="infra-section contact-form-section"><div class="contact-form-panel reveal"><div class="contact-form-head"><p class="eyebrow">Inquiry Form</p><h2>Send a structured inquiry.</h2><p>Share only the details needed to route the conversation and evaluate next steps.</p></div><div class="contact-form-shell"><form class="contact-form infra-contact-form" action="https://script.google.com/macros/s/AKfycby6C5fDF-Npt7xVcJ9J6rQNOJOgdDQB90DQ8q6aVxsbe8UZ0Xu0a2zseC80BEXL_3X4/exec" method="post" accept-charset="UTF-8" target="contact-submit-frame" data-contact-form data-success-message="Thank you. Your inquiry was submitted. If you do not receive a response, please email info@airovia.io directly."><input type="hidden" name="source_page" value="AIROVIA Contact"><input type="hidden" name="page_url" value="https://airovia.io/contact.html"><div class="contact-form-columns"><div class="contact-form-column">${field("Subject", "subject", "text", true, "Subject")}${field("First Name", "first_name", "text", true, "First name")}${field("Last Name", "last_name", "text", true, "Last name")}${field("Company", "company", "text", true, "Company")}${field("Designation", "designation", "text", false, "Designation")}${field("Email", "email", "email", true, "Email")}</div><div class="contact-form-column">${phoneField()}<label class="contact-field contact-field-message"><span>How can we help?</span><textarea name="message" rows="10" placeholder="Tell us about your inquiry" required></textarea></label><label class="contact-consent"><input type="checkbox" name="privacy_consent" value="yes" required><span>I consent to submitting information in accordance with AIROVIA's <a href="privacy.html">Privacy Policy</a>.</span></label><div class="contact-form-actions"><button class="button button-primary" type="submit">Submit</button></div></div></div><div class="contact-form-status" aria-live="polite" data-contact-status hidden></div></form><iframe name="contact-submit-frame" class="contact-submit-frame" title="Contact form submission" hidden></iframe></div></div></section>`;
}

function field(label, name, type, required, placeholder = "") {
  return `<label class="contact-field"><span>${label}</span><input type="${type}" name="${name}" ${placeholder ? `placeholder="${placeholder}"` : ""} ${required ? "required" : ""}></label>`;
}

function phoneField() {
  const codes = [
    ["Afghanistan", "+93"],
    ["Albania", "+355"],
    ["Algeria", "+213"],
    ["Andorra", "+376"],
    ["Angola", "+244"],
    ["Antigua and Barbuda", "+1-268"],
    ["Argentina", "+54"],
    ["Armenia", "+374"],
    ["Australia", "+61"],
    ["Austria", "+43"],
    ["Azerbaijan", "+994"],
    ["Bahamas", "+1-242"],
    ["Bahrain", "+973"],
    ["Bangladesh", "+880"],
    ["Barbados", "+1-246"],
    ["Belarus", "+375"],
    ["Belgium", "+32"],
    ["Belize", "+501"],
    ["Benin", "+229"],
    ["Bhutan", "+975"],
    ["Bolivia", "+591"],
    ["Bosnia and Herzegovina", "+387"],
    ["Botswana", "+267"],
    ["Brazil", "+55"],
    ["Brunei", "+673"],
    ["Bulgaria", "+359"],
    ["Burkina Faso", "+226"],
    ["Burundi", "+257"],
    ["Cabo Verde", "+238"],
    ["Cambodia", "+855"],
    ["Cameroon", "+237"],
    ["Canada", "+1"],
    ["Central African Republic", "+236"],
    ["Chad", "+235"],
    ["Chile", "+56"],
    ["China", "+86"],
    ["Colombia", "+57"],
    ["Comoros", "+269"],
    ["Congo", "+242"],
    ["Costa Rica", "+506"],
    ["Cote d'Ivoire", "+225"],
    ["Croatia", "+385"],
    ["Cuba", "+53"],
    ["Cyprus", "+357"],
    ["Czech Republic", "+420"],
    ["Democratic Republic of the Congo", "+243"],
    ["Denmark", "+45"],
    ["Djibouti", "+253"],
    ["Dominica", "+1-767"],
    ["Dominican Republic", "+1-809"],
    ["Ecuador", "+593"],
    ["Egypt", "+20"],
    ["El Salvador", "+503"],
    ["Equatorial Guinea", "+240"],
    ["Eritrea", "+291"],
    ["Estonia", "+372"],
    ["Eswatini", "+268"],
    ["Ethiopia", "+251"],
    ["Fiji", "+679"],
    ["Finland", "+358"],
    ["France", "+33"],
    ["Gabon", "+241"],
    ["Gambia", "+220"],
    ["Georgia", "+995"],
    ["Germany", "+49"],
    ["Ghana", "+233"],
    ["Greece", "+30"],
    ["Grenada", "+1-473"],
    ["Guatemala", "+502"],
    ["Guinea", "+224"],
    ["Guinea-Bissau", "+245"],
    ["Guyana", "+592"],
    ["Haiti", "+509"],
    ["Honduras", "+504"],
    ["Hungary", "+36"],
    ["Iceland", "+354"],
    ["India", "+91"],
    ["Indonesia", "+62"],
    ["Iran", "+98"],
    ["Iraq", "+964"],
    ["Ireland", "+353"],
    ["Israel", "+972"],
    ["Italy", "+39"],
    ["Jamaica", "+1-876"],
    ["Japan", "+81"],
    ["Jordan", "+962"],
    ["Kazakhstan", "+7"],
    ["Kenya", "+254"],
    ["Kiribati", "+686"],
    ["Kuwait", "+965"],
    ["Kyrgyzstan", "+996"],
    ["Laos", "+856"],
    ["Latvia", "+371"],
    ["Lebanon", "+961"],
    ["Lesotho", "+266"],
    ["Liberia", "+231"],
    ["Libya", "+218"],
    ["Liechtenstein", "+423"],
    ["Lithuania", "+370"],
    ["Luxembourg", "+352"],
    ["Madagascar", "+261"],
    ["Malawi", "+265"],
    ["Malaysia", "+60"],
    ["Maldives", "+960"],
    ["Mali", "+223"],
    ["Malta", "+356"],
    ["Marshall Islands", "+692"],
    ["Mauritania", "+222"],
    ["Mauritius", "+230"],
    ["Mexico", "+52"],
    ["Micronesia", "+691"],
    ["Moldova", "+373"],
    ["Monaco", "+377"],
    ["Mongolia", "+976"],
    ["Montenegro", "+382"],
    ["Morocco", "+212"],
    ["Mozambique", "+258"],
    ["Myanmar", "+95"],
    ["Namibia", "+264"],
    ["Nauru", "+674"],
    ["Nepal", "+977"],
    ["Netherlands", "+31"],
    ["New Zealand", "+64"],
    ["Nicaragua", "+505"],
    ["Niger", "+227"],
    ["Nigeria", "+234"],
    ["North Korea", "+850"],
    ["North Macedonia", "+389"],
    ["Norway", "+47"],
    ["Oman", "+968"],
    ["Pakistan", "+92"],
    ["Palau", "+680"],
    ["Palestine", "+970"],
    ["Panama", "+507"],
    ["Papua New Guinea", "+675"],
    ["Paraguay", "+595"],
    ["Peru", "+51"],
    ["Philippines", "+63"],
    ["Poland", "+48"],
    ["Portugal", "+351"],
    ["Qatar", "+974"],
    ["Romania", "+40"],
    ["Russia", "+7"],
    ["Rwanda", "+250"],
    ["Saint Kitts and Nevis", "+1-869"],
    ["Saint Lucia", "+1-758"],
    ["Saint Vincent and the Grenadines", "+1-784"],
    ["Samoa", "+685"],
    ["San Marino", "+378"],
    ["Sao Tome and Principe", "+239"],
    ["Saudi Arabia", "+966"],
    ["Senegal", "+221"],
    ["Serbia", "+381"],
    ["Seychelles", "+248"],
    ["Sierra Leone", "+232"],
    ["Singapore", "+65"],
    ["Slovakia", "+421"],
    ["Slovenia", "+386"],
    ["Solomon Islands", "+677"],
    ["Somalia", "+252"],
    ["South Africa", "+27"],
    ["South Korea", "+82"],
    ["South Sudan", "+211"],
    ["Spain", "+34"],
    ["Sri Lanka", "+94"],
    ["Sudan", "+249"],
    ["Suriname", "+597"],
    ["Sweden", "+46"],
    ["Switzerland", "+41"],
    ["Syria", "+963"],
    ["Taiwan", "+886"],
    ["Tajikistan", "+992"],
    ["Tanzania", "+255"],
    ["Thailand", "+66"],
    ["Timor-Leste", "+670"],
    ["Togo", "+228"],
    ["Tonga", "+676"],
    ["Trinidad and Tobago", "+1-868"],
    ["Tunisia", "+216"],
    ["Turkey", "+90"],
    ["Turkmenistan", "+993"],
    ["Tuvalu", "+688"],
    ["Uganda", "+256"],
    ["Ukraine", "+380"],
    ["United Arab Emirates", "+971"],
    ["United Kingdom", "+44"],
    ["United States", "+1"],
    ["Uruguay", "+598"],
    ["Uzbekistan", "+998"],
    ["Vanuatu", "+678"],
    ["Vatican City", "+379"],
    ["Venezuela", "+58"],
    ["Vietnam", "+84"],
    ["Yemen", "+967"],
    ["Zambia", "+260"],
    ["Zimbabwe", "+263"],
  ];
  return `<label class="contact-field contact-phone-field"><span>Phone Number</span><div class="contact-phone-input"><select name="phone_country_code" aria-label="Phone country code"><option value="" selected>Select code</option>${codes.map(([country, code]) => `<option value="${code}" title="${country}">${code}</option>`).join("")}</select><input type="tel" name="phone_number" placeholder="Enter phone number"></div></label>`;
}

function legalSection(kicker, items) {
  return `<section class="infra-section legal-text-section"><div class="legal-text-document reveal"><header><p class="eyebrow">${kicker}</p><h2>Current public wording.</h2></header>${items.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join("")}</div></section>`;
}

function legalPrivacySection() {
  const sections = [
    ["01", "Scope of This Policy", ["This Privacy Policy applies to AIROVIA's public website, contact forms, inquiry channels, public communications and related digital interactions that link to this policy.", "It does not govern separate commercial contracts, facility operations, employment records, investor documentation, procurement systems or future platform services unless those materials expressly reference this policy."]],
    ["02", "Information You Provide", ["AIROVIA may collect information you submit through website forms or direct communications, including name, work email, company or organization, country, project location, intended water use, daily water requirement, existing water source, available electrical capacity, project stage, desired timeline, inquiry type and message content.", "You should not submit confidential, classified, export-controlled, regulated, sensitive personal or proprietary information unless AIROVIA has agreed in writing to receive it under an appropriate confidentiality or data-processing arrangement."]],
    ["03", "Automatically Collected Information", ["The website may collect technical and usage information such as device type, browser type, approximate location derived from network information, referring pages, pages viewed, session activity, timestamps and similar analytics information.", "The website currently uses Google Analytics as configured in the site code. Analytics providers may process information according to their own terms, controls and privacy documentation."]],
    ["04", "Cookies and Similar Technologies", ["AIROVIA may use cookies, pixels, tags, local storage and similar technologies to support website functionality, analytics, security, performance monitoring and user-experience measurement.", "Your browser or device may allow you to block, delete or limit cookies. Some website functions may not operate as intended if cookies or similar technologies are disabled."]],
    ["05", "How Information Is Used", ["AIROVIA may use collected information to respond to inquiries, evaluate project fit, route facility conversations, prepare internal follow-up, improve website performance, understand audience engagement, maintain security, support compliance and develop corporate communications.", "AIROVIA does not treat website inquiries as binding project requests, technical specifications, procurement instructions or commercial commitments unless confirmed through a separate signed agreement."]],
    ["06", "Legal Bases and Local Requirements", ["Depending on where you are located, AIROVIA may rely on consent, legitimate interests, pre-contractual steps, contract performance, legal obligations or other lawful bases recognized by applicable privacy and data-protection laws.", "Because AIROVIA may receive inquiries from multiple jurisdictions, additional country-specific notices, consent mechanisms, contractual terms or disclosures may apply where required by mandatory local law."]],
    ["07", "Sharing and Service Providers", ["AIROVIA may share information with service providers, advisors, technical vendors, analytics providers, form-processing providers, hosting providers, communications tools, professional consultants and internal personnel who need the information for the purposes described in this policy.", "Contact forms currently submit inquiry information through the configured Google Apps Script endpoint. AIROVIA does not sell personal information through the website as that term is commonly understood, but local privacy laws may define sale, sharing or targeted advertising differently."]],
    ["08", "International Transfers", ["Information submitted through the website may be processed in countries other than the country where you are located. Those countries may have privacy or data-protection laws that differ from local laws in your jurisdiction.", "Where required, AIROVIA will seek to use appropriate transfer safeguards, contractual protections or other lawful transfer mechanisms once corporate entity details, vendor arrangements and applicable jurisdictions are finalized."]],
    ["09", "Retention", ["AIROVIA retains information only for as long as reasonably necessary for inquiry handling, business records, compliance, security, dispute management, analytics and the purposes described in this policy.", "Retention periods may differ depending on the nature of the information, the relationship with AIROVIA, legal requirements, operational needs and whether a separate written agreement applies."]],
    ["10", "Security", ["AIROVIA seeks to use reasonable administrative, technical and organizational safeguards appropriate to the nature of the information processed through the website.", "No website, transmission method, analytics tool, form endpoint or electronic storage system can be guaranteed to be fully secure. Users submit information at their own risk and should avoid sending highly sensitive material through general website forms."]],
    ["11", "Your Privacy Rights", ["Depending on applicable law, you may have rights to request access, correction, deletion, portability, restriction, objection, withdrawal of consent or information about how your personal data is processed.", "AIROVIA will review rights requests according to applicable law, identity verification requirements and any exemptions that may apply. Requests may be submitted through the contact page or by email to info@airovia.io."]],
    ["12", "Updates and Contact", ["AIROVIA may update this Privacy Policy as the website, corporate structure, service providers, platform operations or legal requirements evolve. The updated version applies when posted unless a different effective date is stated.", "Questions about this policy may be directed through the contact page or by email to info@airovia.io. Formal privacy contacts, data-controller information, registered address, representative details and jurisdiction-specific notices should be finalized with counsel before publication."]],
  ];
  return `<section class="infra-section legal-terms-section legal-privacy-section"><div class="legal-terms-shell reveal"><div class="legal-terms-aside"><p class="eyebrow">Corporate Privacy Policy</p><h2>Website privacy for global inquiries and public access.</h2><p>This policy is written for international website use while preserving mandatory local privacy and data-protection rights.</p><div class="legal-terms-meta"><p><span>Effective date</span><strong>July 27, 2026</strong></p><p><span>Scope</span><strong>Website, analytics and inquiries</strong></p><p><span>Contact</span><strong>info@airovia.io</strong></p></div></div><div class="legal-terms-content">${sections.map(([number, title, paragraphs]) => `<section><span>${number}</span><h3>${title}</h3>${paragraphs.map((text) => `<p>${text}</p>`).join("")}</section>`).join("")}</div></div></section>`;
}

function legalTermsSection() {
  const sections = [
    ["01", "Acceptance of Terms", ["By accessing or using this website, you agree to be bound by these Terms of Use, the Privacy Policy and any additional notices displayed on the website.", "If you do not agree with these Terms, you should not use the website or submit information through it."]],
    ["02", "Global Access and Local Law", ["AIROVIA's website may be accessed from many countries and territories. Accessing the website from a particular country does not mean that AIROVIA is incorporated, licensed, registered, authorized or commercially active in that country.", "You are responsible for complying with all laws, regulations, sanctions, export controls, permitting requirements and local restrictions that apply to your access, use, inquiry or proposed project location."]],
    ["03", "No Offer, No Professional Advice", ["Website content is provided for general corporate and informational purposes only. It does not constitute an offer, solicitation, engineering instruction, legal advice, investment advice, environmental claim, public procurement response or binding technical specification.", "Any facility discussion, proposal, pilot, deployment, partnership, investment or commercial arrangement is subject to separate review, validation, negotiation and signed written agreement."]],
    ["04", "Development-Stage Information", ["AIROVIA materials may describe concepts, intended capabilities, facility formats, system architecture, development activities, anticipated functions or future plans.", "Unless expressly stated in a signed agreement, such materials are preliminary, non-binding and subject to change without notice. They should not be relied on as guaranteed availability, regulatory approval, commercial readiness, performance, certification or delivery commitment."]],
    ["05", "Technical Performance and Site Conditions", ["Atmospheric water production depends on climate, temperature, humidity, dew point, energy availability, system configuration, maintenance, operating schedule, water-treatment requirements and site conditions.", "Capacity ranges, reference facilities, energy metrics, water-quality language and performance descriptions are indicative only unless confirmed through project-specific engineering, testing, validation and contractual documentation."]],
    ["06", "Permitted Website Use", ["You may use the website only for lawful, non-commercial, informational and inquiry-related purposes.", "You may not misuse the website, attempt unauthorized access, interfere with security, scrape or harvest content at scale, introduce malicious code, impersonate another person, submit false information or use the website in a way that violates applicable law or third-party rights."]],
    ["07", "Inquiries and Submitted Information", ["If you submit an inquiry, project description, technical context, business information or other material through the website, you represent that you have authority to share it and that it is accurate to the best of your knowledge.", "Do not submit confidential, classified, export-controlled, sensitive personal, regulated or proprietary information unless AIROVIA has first agreed in writing to receive it under an appropriate confidentiality or data-processing arrangement."]],
    ["08", "Intellectual Property", ["The AIROVIA name, brand, logos, website design, text, graphics, images, diagrams, technical descriptions, software interface concepts and other materials are owned by or licensed to AIROVIA and are protected by applicable intellectual-property laws.", "No rights are granted except the limited right to view the website for informational purposes. You may not copy, reproduce, modify, distribute, reverse engineer, create derivative works from or commercially exploit website content without prior written permission."]],
    ["09", "Third-Party Links and Services", ["The website may reference or link to third-party websites, platforms, tools, social media pages, analytics providers, form-processing services or external resources.", "AIROVIA does not control third-party services and is not responsible for their content, availability, security, accuracy, policies or practices. Your use of third-party services is governed by their own terms and policies."]],
    ["10", "No Warranty", ["The website and all public content are provided on an as-is and as-available basis. To the maximum extent permitted by applicable law, AIROVIA disclaims all warranties, representations and conditions, whether express, implied, statutory or otherwise.", "AIROVIA does not warrant that the website will be uninterrupted, error-free, secure, complete, current or free from harmful components."]],
    ["11", "Limitation of Liability", ["To the maximum extent permitted by applicable law, AIROVIA and its affiliates, officers, directors, employees, advisors, contractors, suppliers and partners will not be liable for indirect, incidental, consequential, special, punitive or exemplary damages, or for loss of profits, revenue, data, goodwill, opportunity or business interruption arising from website access, use or reliance.", "Nothing in these Terms limits liability that cannot be excluded or limited under applicable law."]],
    ["12", "International Projects and Separate Agreements", ["Any project, pilot, facility deployment, partnership, investment, distribution relationship, EPC engagement, technology integration or commercial transaction will be governed by separate written agreements.", "Those agreements may include country-specific terms addressing scope, pricing, performance, specifications, warranties, payment, tax, customs, insurance, safety, permitting, data, confidentiality, governing law, dispute resolution and operational responsibility."]],
    ["13", "Changes to Website and Terms", ["AIROVIA may update, suspend, remove or modify website content, product descriptions, technical materials, forms, links or these Terms at any time.", "The updated Terms apply when posted unless a different effective date is stated. Continued use of the website after changes are posted means you accept the revised Terms."]],
    ["14", "Governing Law and Disputes", ["Formal governing law, venue and dispute-resolution provisions will be finalized following corporate legal structuring and may also be set out in separate written agreements.", "Until then, any mandatory consumer, data-protection, public-sector, procurement, export-control, sanctions or local-law rights and obligations that cannot legally be excluded remain unaffected."]],
    ["15", "Contact", ["Questions about these Terms may be directed through the contact page or by email to info@airovia.io.", "Legal notices, procurement notices, service of process and formal contractual communications are not accepted through general website forms unless AIROVIA expressly confirms a permitted method in writing."]],
  ];
  return `<section class="infra-section legal-terms-section"><div class="legal-terms-shell reveal"><div class="legal-terms-aside"><p class="eyebrow">Corporate Legal Terms</p><h2>Global website access. Project terms by written agreement.</h2><p>These Terms are structured for public website use across jurisdictions while preserving mandatory local law and project-specific contract requirements.</p><div class="legal-terms-meta"><p><span>Effective date</span><strong>July 27, 2026</strong></p><p><span>Scope</span><strong>Website and public materials</strong></p><p><span>Contact</span><strong>info@airovia.io</strong></p></div></div><div class="legal-terms-content">${sections.map(([number, title, paragraphs]) => `<section><span>${number}</span><h3>${title}</h3>${paragraphs.map((text) => `<p>${text}</p>`).join("")}</section>`).join("")}</div></div></section>`;
}

function asset(file) {
  return `${prefix()}assets/img/${file}`;
}

function prefix(file = currentFile) {
  return file.includes("/") ? "../" : "";
}

function renderNav(current, file) {
  const p = prefix(file);
  return nav.map((item) => {
    const href = p + item.href;
    const active = current === item.label || (item.label === "Company" && current === "Company") || (item.label === "Infrastructure" && current === "Infrastructure") || (item.label === "Applications" && current === "Applications") || (item.label === "Resources" && current === "Resources");
    if (!item.items) return `<a href="${href}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
    return `<div class="nav-group"><a href="${href}"${active ? ' aria-current="page"' : ""}>${item.label}</a><div class="nav-dropdown">${item.items.map(([label, subHref]) => `<a href="${p}${subHref}">${label}</a>`).join("")}</div></div>`;
  }).join("");
}

function renderFooter(file) {
  const p = prefix(file);
  const socialLinks = [
    ["https://www.linkedin.com/company/airovia", "AIROVIA on LinkedIn", '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"/>'],
    ["#", "AIROVIA on X", '<path d="M18.9 2h3.68l-8.04 9.19L24 22h-7.42l-5.81-7.6L4.12 22H.44l8.6-9.83L0 2h7.61l5.25 6.94L18.9 2Zm-1.29 18.1h2.04L6.5 3.8H4.31L17.61 20.1Z"/>'],
    ["#", "AIROVIA on YouTube", '<path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.37.5A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.13 2.14c1.87.5 9.37.5 9.37.5s7.5 0 9.37-.5a3.02 3.02 0 0 0 2.13-2.14c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.54 15.57V8.43L15.77 12l-6.23 3.57Z"/>'],
  ];
  const socialMarkup = socialLinks.map(([href, label, icon]) => `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg></a>`).join("");
  return `<footer class="site-footer">
    <div class="footer-top"><div class="footer-brand-block"><img class="footer-logo" src="${p}assets/img/brand/logo.png" alt="AIROVIA"></div><div class="footer-message"><h2>AI-Powered Atmospheric Water Infrastructure.</h2></div></div>
    <div class="footer-main"><div class="footer-links-grid">
      <div><h3>Company</h3><a href="${p}company.html">About AIROVIA</a><a href="${p}development-stage.html">Development Stage</a><a href="${p}partners.html">Partners</a><a href="${p}investors/">Investors</a><a href="${p}contact.html">Contact</a></div>
      <div><h3>Infrastructure</h3><a href="${p}solution.html">AIROVIA Solution</a><a href="${p}facilities.html">Facilities</a><a href="${p}technology.html">Technology</a><a href="${p}energy.html">Energy</a><a href="${p}monitoring-platform.html">Operations Platform</a></div>
      <div><h3>Applications</h3><a href="${p}data-centers/">Data Centers</a><a href="${p}industrial-facilities.html">Industrial Facilities</a><a href="${p}government-water-resilience.html">Government Water Resilience</a><a href="${p}remote-infrastructure.html">Remote Infrastructure</a><a href="${p}agriculture.html">Agriculture</a></div>
      <div><h3>Resources</h3><a href="${p}how-it-works.html">How It Works</a><a href="${p}infrastructure-brief.html">Infrastructure Brief</a><a href="${p}sustainability.html">Sustainability Indicators</a><a href="${p}technical-library.html">Technical Library</a></div>
    </div></div>
    <div class="footer-bottom"><p>&copy; ${year} AIROVIA. All rights reserved.</p><nav class="footer-nav" aria-label="Legal"><a href="${p}terms.html">Terms</a><a href="${p}privacy.html">Privacy Policy</a></nav><div class="footer-social">${socialMarkup}</div></div>
  </footer>`;
}

function renderPage(file, data) {
  currentFile = file;
  const p = prefix(file);
  const canonical = `https://airovia.io/${file === "index.html" ? "" : file.replace(/index\.html$/, "")}`;
  const comment = data.comment ? `\n  <!-- ${data.comment} -->` : "";
  const heroKicker = file === "index.html" ? `<p class="hero-kicker">${data.kicker}</p>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <meta name="description" content="${escapeAttr(data.description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeAttr(data.title)}">
  <meta property="og:description" content="${escapeAttr(data.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://airovia.io/assets/img/og-home.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${p}styles.css">
  <link rel="icon" type="image/png" href="${p}assets/img/brand/favicon.png">
  <script type="application/ld+json">${JSON.stringify(orgJson(canonical))}</script>${comment}
</head>
<body class="infra-page">
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="${p}index.html" aria-label="AIROVIA home"><img src="${p}assets/img/brand/logo.png" alt="AIROVIA"></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation"><span></span><span></span></button>
      <nav class="site-nav">${renderNav(data.current, file)}</nav>
    </header>
    <main>
      <section class="infra-hero ${data.heroClass || ""}">
        <div class="infra-hero-media" aria-hidden="true"></div>
        <div class="infra-hero-inner reveal">
          ${heroKicker}
          <h1>${data.h1}</h1>
          <p class="lede">${data.lede}</p>
          ${data.ctas ? `<div class="infra-actions">${data.ctas.map(([label, href], i) => `<a class="button ${i === 0 ? "button-primary" : "button-secondary"}" href="${p}${href.replace(/^\.\.\//, "")}">${label}</a>`).join("")}</div>` : ""}
        </div>
      </section>
      ${(data.sections || []).join("\n")}
    </main>
    ${renderFooter(file)}
  </div>
  <script src="${p}script.js"></script>
</body>
</html>`;
}

function orgJson(url) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIROVIA",
    url: "https://airovia.io/",
    logo: "https://airovia.io/assets/img/brand/logo.png",
    sameAs: ["https://www.linkedin.com/company/airovia"],
    mainEntityOfPage: url,
  };
}

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

for (const [file, data] of Object.entries(pageData)) {
  const out = join(root, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, renderPage(file, data));
}
