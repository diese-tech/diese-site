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
    summary: 'A public league hub and admin system for seasons, standings, rosters, drafts, and match operations.',
    synopsis:
      'A competitive gaming league was managing seasons, standings, and draft operations through Discord messages and spreadsheets — a workflow that could not scale to real player registration or public-facing results. This platform structures that into a proper operations system: public standings and schedules, admin tooling, Discord-based authentication, and multi-season draft management.',
    outcomes: [
      'Public standings, schedule, teams, players, and watch pages',
      'Admin tooling, registrations, Discord auth, and draft tooling',
      'Production-readiness audit and league workflow domain modeling',
    ],
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
