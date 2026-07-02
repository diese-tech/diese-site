export type CaseStudyExhibit = {
  title: string;
  caption: string;
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  problem: string;
  users: string;
  solution: string;
  keyFeatures: string[];
  technicalDecisions: string[];
  challenges: string[];
  improvements: string[];
  exhibits?: CaseStudyExhibit[];
  links?: CaseStudyLink[];
};

export type Project = {
  slug: string;
  ref: string;
  title: string;
  label: string;
  domain: string;
  year: string;
  role: string;
  status: 'active' | 'archived' | 'placeholder';
  stackShort: string;
  stack: string[];
  summary: string;
  synopsis: string;
  outcomes: string[];
  metric?: string;
  live?: string;
  repo?: string;
  caseStudy?: CaseStudy;
};

export const featuredProjects: Project[] = [
  {
    slug: 'swiftdispatch',
    ref: 'R-001',
    title: 'SwiftDispatch',
    label: 'Small-business operations software',
    domain: 'Field Service',
    year: '2025',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'Next · Supabase · Twilio',
    stack: ['Next.js', 'Supabase', 'Twilio', 'Vercel'],
    live: 'https://swiftdispatch.app',
    summary: 'Dispatch software for small HVAC teams outgrowing calls, texts, and whiteboards.',
    synopsis:
      'Small HVAC teams were coordinating jobs through calls, texts, and whiteboard schedules — a process that fragments under volume and breaks the moment anyone is off-shift. SwiftDispatch replaces that with a structured routing system: jobs flow from customer intake through quote approval, technician assignment, and completion, with real-time SMS updates and a back-office view that gives dispatch staff a single operational picture.',
    outcomes: [
      'Live dispatch workflow with job status and state-machine logic',
      'Customer intake, quote approval, and technician SMS updates',
      'Analytics and background job processing via Supabase and Twilio',
    ],
    caseStudy: {
      problem:
        'Small HVAC teams coordinate work through calls, texts, and whiteboard schedules. Under real volume that process fragments: jobs get double-booked or dropped, quote approvals stall in an inbox, and the moment the person holding the whiteboard is off-shift, nobody can see the state of the day. The teams that need dispatch software most are the ones enterprise field-service suites price out.',
      users:
        'Owner-operators and dispatch staff at small HVAC companies, the technicians they assign in the field, and the customers waiting on arrival windows and quote approvals.',
      solution:
        'I built the dispatch system around the actual lifecycle of a job. Work flows from customer intake through quote approval, technician assignment, and completion, with each transition enforced by state-machine logic rather than convention. Dispatch staff get a single back-office view of the day; technicians and customers get real-time SMS updates without installing anything.',
      keyFeatures: [
        'Live dispatch board with job status driven by explicit state-machine logic',
        'Customer intake and quote approval flow',
        'Technician assignment with real-time SMS updates via Twilio',
        'Analytics on job volume and status across the pipeline',
        'Background processing so SMS delivery never blocks a dispatch action',
      ],
      technicalDecisions: [
        'Next.js on Vercel with Supabase as the primary backend — an infrastructure footprint one engineer can operate',
        'Job lifecycle modeled as an explicit state machine, so invalid transitions are impossible rather than merely discouraged',
        'Twilio SMS routed through background jobs to keep message delivery out of the request path',
        'Supabase handling auth, data, and analytics queries to avoid a separate services layer',
      ],
      challenges: [
        'Matching job states to how dispatchers actually work — the model went through several revisions when real workflows like rescheduling and partial completion broke the first design',
        'Keeping SMS delivery observable (failures, retries, cost) without building a full messaging dashboard',
      ],
      improvements: [
        'Technician-facing mobile view for status updates from the field',
        'Route-aware scheduling suggestions during assignment',
        'Customer self-service rescheduling',
      ],
      exhibits: [
        { title: 'Dispatch board', caption: 'Back-office dispatch view — screenshot pending' },
        { title: 'Job lifecycle', caption: 'State flow from intake to completion — diagram pending' },
      ],
    },
  },
  {
    slug: 'serpent-ascension-league',
    ref: 'R-002',
    title: 'Serpent Ascension League',
    label: 'Community league operations platform',
    domain: 'Community Ops',
    year: '2024',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'React · TypeScript · Discord',
    stack: ['React', 'TypeScript', 'Discord Auth', 'Testing'],
    live: 'https://sal-draft-league.vercel.app',
    summary: 'A public league hub and admin system for seasons, standings, rosters, drafts, and match operations.',
    synopsis:
      'A competitive gaming league was managing seasons, standings, and draft operations through Discord messages and spreadsheets — a workflow that could not scale to real player registration or public-facing results. This platform structures that into a proper operations system: public standings and schedules, admin tooling, Discord-based authentication, and multi-season draft management.',
    outcomes: [
      'Public standings, schedule, teams, players, and watch pages',
      'Admin tooling, registrations, Discord auth, and draft tooling',
      'Production-readiness audit and league workflow domain modeling',
    ],
    caseStudy: {
      problem:
        'A competitive gaming league was run out of Discord messages and spreadsheets: registrations tracked by hand, standings recalculated manually, drafts coordinated live in voice chat with no durable record. Each season the admin load grew, and public-facing results lagged what had actually happened.',
      users:
        'League admins running seasons and drafts, competing players and team captains, and spectators who want current standings and schedules without joining the Discord server.',
      solution:
        'I built the league a proper operations platform. A public hub serves standings, schedules, teams, players, and watch pages, backed by admin tooling for registrations, season management, and multi-season drafts. Discord stays the community home — authentication is Discord-based — but the operational record lives in the platform instead of scroll-back.',
      keyFeatures: [
        'Public standings, schedule, teams, players, and watch pages',
        'Player registration with Discord-based authentication',
        'Admin tooling for seasons, divisions, rosters, and match operations',
        'Multi-season draft management',
      ],
      technicalDecisions: [
        'React and TypeScript throughout, with league domain modeling (seasons, divisions, matches, rosters, draft flows) done before UI work',
        'Discord OAuth as the single identity source, since every participant already lives there',
        'Test coverage and a production-readiness audit completed before opening public registration',
      ],
      challenges: [
        'League rules are dense with edge cases — mid-season roster changes, forfeits, tiebreakers — and the domain model had to absorb them without special-casing the UI',
        'Balancing public pages anyone can read against admin operations that need strict access control',
      ],
      improvements: [
        'Automated match reporting from game APIs where available',
        'Historical player and team stats across seasons',
        'Self-service roster management for team captains',
      ],
      exhibits: [
        { title: 'Standings hub', caption: 'Public standings and schedule — screenshot pending' },
        { title: 'Draft tooling', caption: 'Multi-season draft admin view — screenshot pending' },
      ],
    },
  },
  {
    slug: 'threetails-booking',
    ref: 'R-003',
    title: 'ThreeTails Booking',
    label: 'Custom booking and payment workflow',
    domain: 'Hospitality',
    year: '2024',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'Next · Square',
    stack: ['Next.js', 'Square', 'Email', 'Calendar UX'],
    summary: 'A booking flow for a cat cafe concept with business-specific rules and checkout logic.',
    synopsis:
      'A cat cafe concept needed booking logic that no off-the-shelf tool handles: time-of-day blocks, party-size caps, a legally required agreements flow before checkout, and a specific payment integration. Rather than bending a generic SaaS tool into shape, ThreeTails Booking is built exactly around those constraints — clean calendar UX, rule enforcement at each step, and Square checkout.',
    outcomes: [
      'Rules agreement flow and custom booking UX',
      'Smart calendar logic with party-size and time-of-day constraints',
      'Square checkout and automated email confirmations',
    ],
    caseStudy: {
      problem:
        'A cat cafe concept needed booking logic no off-the-shelf scheduler handles: time-of-day blocks instead of free-form slots, party-size caps per block, a legally required agreements step before payment, and Square as the processor. Generic booking SaaS either could not express those rules or buried them behind workarounds the owner would have to police by hand.',
      users:
        'Guests booking visits — usually on a phone — and the owner, who needs the business rules enforced automatically rather than by reading every reservation after the fact.',
      solution:
        'I built the booking flow exactly around the business rules. The calendar only surfaces valid options: time-of-day blocks with capacity remaining and party sizes within limits. Guests acknowledge the rules agreement before checkout, pay through Square, and receive automated email confirmations. Invalid bookings are unselectable, not merely rejected.',
      keyFeatures: [
        'Smart calendar that only offers bookable time-of-day blocks with remaining capacity',
        'Party-size and time-of-day constraints enforced at selection time, not at review time',
        'Required rules-agreement flow ahead of checkout',
        'Square checkout integration',
        'Automated email confirmations',
      ],
      technicalDecisions: [
        'Next.js app with booking rules centralized in a single constraint layer, so the calendar UI, validation, and checkout can never disagree',
        'Square for payments because the business already operated on Square',
        'Email confirmations driven by booking events rather than manual follow-up',
      ],
      challenges: [
        'Encoding the rules so the UI itself enforces them — making invalid states unselectable instead of validating after submission',
        'Keeping the calendar UX simple on mobile while it carries block, capacity, and party-size logic',
      ],
      improvements: [
        'Owner-facing dashboard to manage blocks and capacity without a deploy',
        'Waitlist for full blocks',
        'SMS reminders ahead of visits',
      ],
      exhibits: [
        { title: 'Booking calendar', caption: 'Block and party-size selection — screenshot pending' },
        { title: 'Agreements flow', caption: 'Pre-checkout rules agreement — screenshot pending' },
      ],
    },
  },
];

export const alsoBuilt: Project[] = [
  {
    slug: 'godforge',
    ref: 'R-004',
    title: 'GodForge',
    label: 'Discord community tool',
    domain: 'Community Tools',
    year: '2023',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'Discord API',
    stack: ['Discord.js', 'Bot workflows'],
    summary: 'A Smite 2 randomizer and community bot for god selection, casual play, and randomized league formats.',
    synopsis:
      'A Discord bot for gaming communities with randomization, draft helpers, role-based commands, and match support — built around the Discord-first workflows a gaming community actually lives in.',
    outcomes: ['Discord-first randomizer and draft workflows for gaming communities'],
  },
  {
    slug: 'yaphub',
    ref: 'R-005',
    title: 'YapHub',
    label: 'Voice workflow utility',
    domain: 'Community Tools',
    year: '2023',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'Discord API',
    stack: ['Discord.js', 'Automation'],
    summary: 'A Discord utility for temporary voice channels and cleaner community voice workflows.',
    synopsis:
      'Voice channel management for Discord communities that want less clutter and less manual admin work — temporary channels that clean themselves up.',
    outcomes: ['Reduced server clutter and manual voice-channel management'],
  },
  {
    slug: 'atlas',
    ref: 'R-006',
    title: 'Atlas',
    label: 'Labs / Experimental',
    domain: 'AI · Homelab',
    year: '2024',
    role: 'Personal',
    status: 'archived',
    stackShort: 'LLM · RAG',
    stack: ['LLM', 'RAG', 'Homelab'],
    summary: 'An early local LLM, RAG, and homelab automation experiment focused on practical personal tooling.',
    synopsis:
      'Exploration of local LLM inference, retrieval-augmented generation, and homelab automation — focused on practical personal tooling rather than demos or overclaiming maturity.',
    outcomes: ['Local AI-assisted workflows without cloud dependency'],
  },
  {
    slug: 'private-ops-tool',
    ref: 'R-007',
    title: 'Internal Ops Tool',
    label: 'Private work',
    domain: 'Internal Ops',
    year: '2024',
    role: 'Sole Engineer',
    status: 'placeholder',
    stackShort: 'Private',
    stack: ['Private'],
    summary: 'Operational software published as a sanitized case study after removing sensitive details.',
    synopsis: 'Confidential operational software. Case study available on request after sanitization.',
    outcomes: ['Placeholder for confidential workflow work'],
  },
  {
    slug: 'brewloop',
    ref: 'R-008',
    title: 'BrewLoop',
    label: 'Cafe ordering and loyalty platform',
    domain: 'Food & Beverage / Hospitality',
    year: '2025',
    role: 'Sole Engineer',
    status: 'active',
    stackShort: 'Next · Supabase · Square',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Square'],
    summary:
      "QR-to-web ordering and loyalty app for independent cafes, replacing paper menus and punch cards without touching the cafe's existing POS.",
    synopsis:
      "Independent cafes run ordering and loyalty on paper menus and punch cards — no order queue, no customer picture, and nothing the owner can change without a reprint. BrewLoop replaces both without touching the cafe's existing POS: a live pilot with an independent cafe (Black Rabbit) covers a public branded menu, mobile ordering with table QR support, a staff order queue, an owner dashboard for menu and rewards management, and phone/email-based visit rewards. Supabase backs it with tenant-aware row-level security and Realtime order updates, Square handles payments, and a credential-free demo mode lets a cafe test the full ordering flow before any backend is configured.",
    outcomes: [
      'Live cafe pilot: branded public menu, table-QR mobile ordering, and staff order queue',
      'Owner dashboard for menu and rewards management with phone/email-based visit rewards',
      'Tenant-aware row-level security and Realtime order updates via Supabase, payments via Square',
      'Credential-free demo mode and architecture decisions tracked in ADRs',
    ],
    repo: 'https://github.com/diese-tech/brewloop',
  },
];

export const allProjects: Project[] = [...featuredProjects, ...alsoBuilt];
