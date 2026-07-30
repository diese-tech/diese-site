export type ProjectFactRecord = {
  projectName: string;
  projectType: string;
  created: '2026';
  whyIStartedIt: string;
  whatCurrentlyWorks: string[];
  whatIsPartiallyBuilt: string[];
  whatIsPlanned: string[];
  techActuallyUsed: string[];
  myRole: string;
  whoHasUsedIt: string;
  currentStatus: string;
  liveUrl?: string;
  repository: string;
  factsIAmComfortableStating: string[];
  claimsThatMustNotBeMade: string[];
};

export type Project = {
  slug: string;
  ref: string;
  title: string;
  label: string;
  domain: string;
  stackShort: string;
  stack: string[];
  summary: string;
  cardDescription: string;
  introduction: string;
  features: string[];
  stillWorkingOn: string[];
  technicalNote: string;
  usageNote?: string;
  verifyQuestions: string[];
  facts: ProjectFactRecord;
};

export const featuredProjects: Project[] = [
  {
    slug: 'swiftdispatch',
    ref: 'R-001',
    title: 'SwiftDispatch',
    label: 'Dispatch workflow demo',
    domain: 'Field Service',
    stackShort: 'Next.js · Supabase · Twilio',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Twilio', 'Vitest'],
    summary:
      'A dispatch app I am building to follow an HVAC job from the first customer request through updates, quotes, and invoices.',
    cardDescription:
      'A live demo with customer intake, a dispatch board, technician updates, quotes, and invoices.',
    introduction:
      'SwiftDispatch came from wanting to understand everything that has to happen between a customer calling in and a job getting wrapped up. I built the office, technician, and customer sides so I could work through the whole flow instead of only designing one piece of it. There is a public demo now, and I keep coming back to what it would need for a private beta.',
    features: [
      'Drag-and-drop dispatch board with job creation, assignment, and status changes',
      'Public customer intake and token-based job status pages',
      'Technician login and token-based status actions',
      'Quote creation, customer approval or decline, and printable invoices',
      'Seeded demo workspace with reset tooling',
      'SMS queue, consent checks, and failed-message retry controls',
    ],
    stillWorkingOn: [
      'Building out the full private beta flow',
      'Tightening account and workspace permissions',
      'Taking the Twilio, Supabase, and Square pieces beyond the demo',
      'Adding email updates and customer accounts',
    ],
    technicalNote:
      'I built it with Next.js, TypeScript, Supabase, PostgreSQL, and Twilio. Tests cover the job flow, sign-in, payments, and text messaging.',
    verifyQuestions: [
      '[VERIFY] Has anyone outside the demo environment completed the full job workflow?',
      '[VERIFY] Is any HVAC company currently testing the app?',
    ],
    facts: {
      projectName: 'SwiftDispatch',
      projectType: 'Personal software project and live demo',
      created: '2026',
      whyIStartedIt:
        'I wanted to explore a structured HVAC dispatch workflow from customer intake through job completion.',
      whatCurrentlyWorks: [
        'The repository contains a dispatch board, customer intake, technician status actions, quote flows, invoices, analytics views, SMS queue code, and a seeded demo.',
        'The public marketing site and sign-in route are deployed at swiftdispatch.app.',
      ],
      whatIsPartiallyBuilt: [
        'The Phase 1 private beta workflow is marked in progress.',
        'Tenant isolation, authorization coverage, token expiry behavior, and provider checks still have open launch items.',
      ],
      whatIsPlanned: [
        'Email notifications',
        'Customer accounts',
        'Additional payment and mobile work',
      ],
      techActuallyUsed: [
        'Next.js',
        'React',
        'TypeScript',
        'Supabase',
        'PostgreSQL',
        'Twilio',
        'Vitest',
        'Zod',
        'Sentry',
      ],
      myRole: 'Builder',
      whoHasUsedIt:
        'A public demo is deployed. Use by an HVAC company or other outside users is [VERIFY].',
      currentStatus: 'A public demo I keep working on when time allows.',
      liveUrl: 'https://swiftdispatch.app',
      repository: 'https://github.com/diese-tech/SwiftDispatch',
      factsIAmComfortableStating: [
        'The code includes the listed dispatch, intake, technician, quote, invoice, demo, and SMS surfaces.',
        'The project has a deployed public site and demo entry point.',
      ],
      claimsThatMustNotBeMade: [
        'HVAC companies currently use SwiftDispatch.',
        'The full workflow has passed private beta.',
        'The app is ready for live operations.',
        'The app has produced business results or customer adoption.',
      ],
    },
  },
  {
    slug: 'serpent-ascension-league',
    ref: 'R-002',
    title: 'Serpent Ascension League',
    label: 'Community league platform',
    domain: 'Community Operations',
    stackShort: 'Next.js · Supabase · Discord',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Discord OAuth', 'Playwright'],
    summary:
      'A home for a Smite 2 league, with the public season pages and the admin work behind them.',
    cardDescription:
      'Schedules, standings, teams, player pages, registration, match tools, and league administration in one site.',
    introduction:
      'I wanted the Serpent Ascension League to have its own place on the web. I started with the public pages for schedules, standings, teams, players, and rules. Then I added the less visible work behind them, like registration, rosters, matches, announcements, and imports. I still come back to the draft side when time allows.',
    features: [
      'Public home, standings, schedule, teams, players, rules, and watch pages',
      'Discord sign-in, profile claiming, and player registration flows',
      'Admin tools for seasons, teams, rosters, matches, announcements, and imports',
      'Match reporting and review tools',
      'Draft rooms and a draft board',
    ],
    stillWorkingOn: [
      'Finishing the draft views for players, captains, spectators, and admins',
      'Cleaning up a few admin pieces',
    ],
    technicalNote:
      'I built the site with Next.js, TypeScript, Supabase, and PostgreSQL. The database contract and migrations live in a separate repository.',
    verifyQuestions: [
      '[VERIFY] Which public and admin workflows are used during the current season?',
      '[VERIFY] How many people outside the admin team have used site registration or draft tools?',
    ],
    facts: {
      projectName: 'Serpent Ascension League',
      projectType: 'Community league operations platform',
      created: '2026',
      whyIStartedIt:
        'I wanted to build a public site and admin workspace for the Serpent Ascension League community.',
      whatCurrentlyWorks: [
        'The public site has live routes for standings, schedules, teams, players, rules, and viewing league activity.',
        'The repository contains Discord authentication, registration, admin, match reporting, and draft surfaces.',
        'The database contract and migrations are maintained in a separate repository.',
      ],
      whatIsPartiallyBuilt: [
        'Draft-platform remediation is active.',
        'Audience-specific production views and some database recovery gates remain unfinished.',
      ],
      whatIsPlanned: [
        'Complete the draft production board and audience-specific views',
        'Remove the temporary password fallback',
      ],
      techActuallyUsed: [
        'Next.js',
        'React',
        'TypeScript',
        'Supabase',
        'PostgreSQL',
        'Discord OAuth',
        'Vitest',
        'Playwright',
        'GitHub Actions',
      ],
      myRole: 'Builder',
      whoHasUsedIt:
        'The site is deployed for the SAL community. Exact usage by players, captains, spectators, and admins is [VERIFY].',
      currentStatus: 'Live for SAL and still growing with the league.',
      liveUrl: 'https://sal-draft-league.vercel.app',
      repository: 'https://github.com/diese-tech/sal-site',
      factsIAmComfortableStating: [
        'The site is deployed and identifies an active SAL season.',
        'The listed public, authentication, registration, admin, match, and draft code exists in the repository.',
      ],
      claimsThatMustNotBeMade: [
        'The league previously relied on spreadsheets or Discord messages.',
        'Every admin or draft workflow is complete.',
        'All league members use the site.',
        'A test count or usage metric is current without checking it again.',
      ],
    },
  },
  {
    slug: 'threetails-booking',
    ref: 'R-003',
    title: 'ThreeTails Booking',
    label: 'Booking workflow',
    domain: 'Hospitality',
    stackShort: 'HTML · Supabase · Square',
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'EmailJS', 'Square Sandbox'],
    summary:
      'A custom cafe booking flow with capacity limits, guest changes, and separate staff and owner views.',
    cardDescription:
      'A pre-launch booking flow with time slots, guest limits, sandbox payments, and booking management.',
    introduction:
      'This started with a pretty specific question: what would a booking flow look like if it matched the cafe rules instead of forcing everything into a generic form? I built the guest flow along with separate staff and owner views. It is still pre-launch, and payments are using Square Sandbox for now.',
    features: [
      'Rules acknowledgement before booking',
      'Date, time-slot, guest-count, and capacity selection',
      'Sandbox payments and refunds through Square',
      'Customer cancellation and rescheduling page',
      'Staff view for check-in, no-show, and walk-in handling',
      'Owner view with filters, booking details, and cancel or refund controls',
    ],
    stillWorkingOn: [
      'Finishing the Square and email setup',
      'Tightening the staff and owner sign-in flow',
      'Moving pricing and capacity checks behind the scenes',
      'Adding buffer rules, a waitlist, calendar sync, and private events',
    ],
    technicalNote:
      'I built it with HTML, CSS, JavaScript, Supabase, EmailJS, Square Sandbox, and Vercel functions.',
    verifyQuestions: [
      '[VERIFY] Has the business accepted any real reservation through this system?',
      '[VERIFY] Has anyone outside the project team tested the staff or owner views?',
    ],
    facts: {
      projectName: 'ThreeTails Booking',
      projectType: 'Deployed pre-launch booking system',
      created: '2026',
      whyIStartedIt:
        'I wanted to build a booking flow around rules, capacity, payment, and booking management for Three Tails Cafe.',
      whatCurrentlyWorks: [
        'The deployed guest page contains rules, date and time selection, guest counts, and a payment step.',
        'The repository contains booking, cancellation, rescheduling, staff, owner, sandbox payment, and refund code.',
      ],
      whatIsPartiallyBuilt: [
        'Square is connected to sandbox endpoints.',
        'Provider credentials, update permissions, admin credentials, and final mobile testing still have open items.',
      ],
      whatIsPlanned: [
        'Buffer rules',
        'Waitlist',
        'Google Calendar sync',
        'Private event booking',
      ],
      techActuallyUsed: [
        'HTML',
        'CSS',
        'JavaScript',
        'Supabase',
        'EmailJS',
        'Square Sandbox',
        'Vercel',
      ],
      myRole: 'Builder',
      whoHasUsedIt:
        'A public deployment exists. Real guest reservations and business use are [VERIFY].',
      currentStatus: 'Pre-launch, with the main booking flow in place.',
      liveUrl: 'https://book.threetailscafe.com',
      repository: 'https://github.com/diese-tech/threetails-booking',
      factsIAmComfortableStating: [
        'The guest, staff, owner, cancellation, rescheduling, sandbox payment, and refund code exists.',
        'The public booking page is deployed.',
      ],
      claimsThatMustNotBeMade: [
        'Three Tails Cafe currently uses the system for real reservations.',
        'Square is processing real payments.',
        'The system is secure or ready for live operations.',
        'This was paid client work.',
      ],
    },
  },
];

export const alsoBuilt: Project[] = [
  {
    slug: 'godforge',
    ref: 'R-004',
    title: 'GodForge',
    label: 'Discord drafting bot',
    domain: 'Community Tools',
    stackShort: 'Python · Discord · SQLite',
    stack: ['Python', 'discord.py', 'SQLite', 'JSON', 'pytest'],
    summary:
      'A Smite 2 Discord bot for random picks, party setup, drafts, game nights, and match history.',
    cardDescription:
      'A Discord bot that handles the moving parts around Smite 2 custom nights.',
    introduction:
      'GodForge started during Season 8 of Frank’s Retirement League. Players picked their opponents’ gods from a curated list the bot generated, so I built it to track those picks and hand out builds for the wacky games that season. I kept adding to it until it became a larger tool for parties, drafts, custom nights, and match history. It works on its own, with ForgeLens kept optional and off by default.',
    features: [
      'Random god, role, team, and item-build commands',
      'Curated opponent god lists and per-player pick tracking',
      'Channel-scoped sessions with reaction-based pick locking',
      'Fearless drafts with bans, picks, undo, game advance, and JSON exports',
      'Party setup, lobbies, queues, waitlists, and ready checks',
      'Scheduled custom nights, team scrims, and temporary coordination rooms',
      'Standalone match results and game-night history',
    ],
    stillWorkingOn: [
      'Making setup easier for other servers',
      'Smoothing out restarts during active sessions',
      'Giving each server more control over its setup',
      'Getting it ready to share with smaller Smite communities and tournaments',
    ],
    technicalNote:
      'I built GodForge with Python, discord.py, SQLite, JSON files, a small Python API, and a static dashboard. Tests cover the main bot and game-night services.',
    usageNote:
      'GodForge was originally built for Season 8 of Frank’s Retirement League, where it handled curated god lists, per-player picks, and builds. SAL uses it for fun now. I would like to share it with smaller Smite communities and tournaments over time.',
    verifyQuestions: [],
    facts: {
      projectName: 'GodForge',
      projectType: 'Discord bot and local dashboard',
      created: '2026',
      whyIStartedIt:
        'I built it for Season 8 of Frank’s Retirement League, where players picked their opponents’ gods from curated lists and used generated builds for the season’s wacky games.',
      whatCurrentlyWorks: [
        'The repository contains randomizer, build, session, fearless draft, party, schedule, scrim, room, result, and history code.',
        'The bot can generate curated god lists, track picks per player, and generate builds.',
        'GodForge works without ForgeLens. The ForgeLens adapter is optional and disabled by default.',
      ],
      whatIsPartiallyBuilt: [
        'The dashboard and API bridge are release-candidate work.',
        'Some older session and draft state remains in memory.',
        'Live Discord and hosting checks are still required.',
      ],
      whatIsPlanned: [
        'Per-server self-service configuration',
        'Further dashboard permission and storage work',
        'Share the bot with smaller Smite communities and tournaments',
      ],
      techActuallyUsed: ['Python', 'discord.py', 'SQLite', 'JSON', 'pytest', 'HTML', 'JavaScript'],
      myRole: 'Builder',
      whoHasUsedIt:
        'Frank’s Retirement League used the original bot during Season 8. SAL currently uses it for fun.',
      currentStatus: 'Used in SAL and still growing when time allows.',
      repository: 'https://github.com/diese-tech/lab-godforge',
      factsIAmComfortableStating: [
        'GodForge was originally designed for Season 8 of Frank’s Retirement League.',
        'SAL currently uses GodForge for fun.',
        'GodForge is standalone and does not require ForgeLens.',
        'The listed bot workflows exist in code and tests.',
        'Economy and betting are not part of the supported product.',
      ],
      claimsThatMustNotBeMade: [
        'GodForge is ready for live operations.',
        'GodForge requires ForgeLens.',
        'Economy, betting, wallets, odds, payouts, or ledgers are current features.',
        'Smaller Smite communities or tournaments currently use it.',
      ],
    },
  },
  {
    slug: 'yaphub',
    ref: 'R-005',
    title: 'YapHub',
    label: 'Temporary voice-room bot',
    domain: 'Community Tools',
    stackShort: 'Python · Discord · SQLite',
    stack: ['Python', 'discord.py', 'SQLite', 'pytest'],
    summary:
      'A Discord bot that gives people temporary voice rooms and cleans them up when everyone leaves.',
    cardDescription:
      'Join a lobby, get a temporary voice room, and control it without needing an admin.',
    introduction:
      'YapHub does one job. Someone joins the lobby, the bot gives them a temporary voice room, and it cleans the room up when everyone leaves. I originally built it to replace VoiceMaster for SAL, where it now handles the league’s temporary channels. I kept it narrow on purpose so it stays easy for people to use without an admin stepping in.',
    features: [
      'Setup and profile commands for one or more join lobbies',
      'Automatic temporary room creation, member move, and cleanup',
      'In-room controls for lock, hide, rename, limit, transfer, permit, and kick',
      'SQLite storage for server profiles and active rooms',
      'Restart reconciliation for stale or empty rooms',
      'Cooldowns and central slash-command error handling',
    ],
    stillWorkingOn: ['Making setup easier so I can share it with smaller communities outside SAL'],
    technicalNote:
      'I built YapHub with Python, discord.py, SQLite, and pytest. The Discord events call smaller services that handle rooms, permissions, ownership, and storage.',
    usageNote:
      'YapHub replaced VoiceMaster for SAL and now handles the league’s temporary voice channels. I would like to share it with smaller communities that want the same setup as they grow.',
    verifyQuestions: [],
    facts: {
      projectName: 'YapHub',
      projectType: 'Discord bot MVP',
      created: '2026',
      whyIStartedIt:
        'I wanted to replace VoiceMaster with a focused temporary voice-room bot for SAL.',
      whatCurrentlyWorks: [
        'The repository contains setup, profile, room lifecycle, owner controls, persistence, and restart reconciliation code.',
        'A documentation page and Discord invite URL exist.',
      ],
      whatIsPartiallyBuilt: [
        'The project is described as an MVP.',
        'The invite adds the bot, but the running service still depends on a configured token and host.',
      ],
      whatIsPlanned: [
        'Make setup easier for smaller communities',
        'Test the bot outside SAL',
        'Share it with smaller communities that want room to grow',
      ],
      techActuallyUsed: ['Python', 'discord.py', 'SQLite', 'pytest'],
      myRole: 'Builder',
      whoHasUsedIt:
        'SAL uses YapHub exclusively for its temporary voice channels. It replaced VoiceMaster for the league.',
      currentStatus: 'Used by SAL for temporary voice channels and still growing.',
      liveUrl: 'https://diese-tech.github.io/lab-yaphub/',
      repository: 'https://github.com/diese-tech/lab-yaphub',
      factsIAmComfortableStating: [
        'YapHub completely replaced VoiceMaster for SAL.',
        'SAL currently uses YapHub for its temporary voice channels.',
        'The listed temporary room and owner-control code exists.',
        'The bot persists configuration and active-room records in SQLite.',
      ],
      claimsThatMustNotBeMade: [
        'Communities outside SAL currently use YapHub.',
        'The public invite proves the bot service is online.',
        'YapHub eliminated server clutter or admin work for real users.',
      ],
    },
  },
  {
    slug: 'atlas',
    ref: 'R-006',
    title: 'Atlas',
    label: 'Local AI and ML experiment',
    domain: 'Personal Tools',
    stackShort: 'Python · Ollama · FastAPI',
    stack: ['Python', 'FastAPI', 'Ollama', 'SQLite', 'scikit-learn'],
    summary:
      'A pair of local experiments with Ollama chat and automated machine-learning runs.',
    cardDescription:
      'Local chat history, model selection, data processing, training, evaluation, and rollback experiments.',
    introduction:
      'Atlas is where I played around with running AI tools locally. One half is a chat app that talks to Ollama and remembers past sessions. The other half runs small machine-learning training and evaluation loops. They are separate experiments that happen to live in the same repository.',
    features: [
      'Local FastAPI chat server with Ollama streaming',
      'Browser chat interface with model selection and saved sessions',
      'SQLite chat history and generated conversation titles',
      'CSV data processing, model training, and evaluation stages',
      'Automated training runs with evaluation and rollback',
      'Saved reports and checks that stop a bad run early',
    ],
    stillWorkingOn: [],
    technicalNote:
      'I built Atlas with Python, FastAPI, SQLite, Ollama, NumPy, pandas, and scikit-learn. It runs locally and does not have a hosted version.',
    verifyQuestions: [
      '[VERIFY] Is Atlas still active, or should it be marked archived?',
      '[VERIFY] Do I still use either local workflow?',
    ],
    facts: {
      projectName: 'Atlas',
      projectType: 'Local AI and machine-learning experiment',
      created: '2026',
      whyIStartedIt:
        'I wanted to explore local model chat and a separate automated training and evaluation loop.',
      whatCurrentlyWorks: [
        'The repository contains a FastAPI and Ollama chat app with SQLite session history.',
        'The repository contains data processing, training, evaluation, decision, rollback, and safety-stop code.',
      ],
      whatIsPartiallyBuilt: [],
      whatIsPlanned: [],
      techActuallyUsed: [
        'Python',
        'FastAPI',
        'Ollama',
        'SQLite',
        'NumPy',
        'pandas',
        'scikit-learn',
      ],
      myRole: 'Builder',
      whoHasUsedIt: 'Built for local personal use. Current use is [VERIFY].',
      currentStatus: 'A local experiment I revisit when time allows.',
      repository: 'https://github.com/diese-tech/project-atlas',
      factsIAmComfortableStating: [
        'The chat app and machine-learning loop exist in the repository.',
        'The project is designed to run locally.',
      ],
      claimsThatMustNotBeMade: [
        'Atlas includes retrieval-augmented generation.',
        'Atlas is a homelab automation system.',
        'Other users rely on Atlas.',
        'The project is actively maintained without verification.',
      ],
    },
  },
  {
    slug: 'brewloop',
    ref: 'R-007',
    title: 'BrewLoop',
    label: 'Cafe ordering prototype',
    domain: 'Food and Hospitality',
    stackShort: 'Next.js · Supabase · Square',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Square', 'Playwright'],
    summary:
      'A cafe ordering and loyalty demo with customer, staff, and owner views.',
    cardDescription:
      'A browser demo for ordering, order tracking, staff queues, menu management, and visit rewards.',
    introduction:
      'I saw a post about QR ordering and loyalty and wanted to see what that might feel like as a full cafe flow. I built the customer, staff, and owner sides around a sample Black Rabbit cafe. Right now, the demo uses browser storage. The Supabase and Square pieces are partly wired, and I come back to them when I have time.',
    features: [
      'Branded cafe menu with pickup and table-order flows',
      'Table QR parameters and an order status page',
      'Simulated checkout and tipping in demo mode',
      'Staff order board with status changes',
      'Owner tools for menu items, tables, staff, customers, and rewards',
      'Browser-storage demo data shared across the flows in one browser',
    ],
    stillWorkingOn: [
      'Taking the Supabase, Twilio, and Square pieces beyond demo mode',
      'Tightening account and workspace boundaries',
      'Adding better recovery and refund tools',
      'Giving owners more control over menus and rewards',
    ],
    technicalNote:
      'The demo uses Next.js, TypeScript, and browser storage. The repository also has Supabase migrations, PostgreSQL functions, Square payment and webhook code, and Playwright tests.',
    verifyQuestions: [
      '[VERIFY] Has anyone outside my own testing used the hosted demo?',
      '[VERIFY] Is Black Rabbit involved beyond serving as the sample pilot data?',
    ],
    facts: {
      projectName: 'BrewLoop',
      projectType: 'Cafe ordering and loyalty prototype',
      created: '2026',
      whyIStartedIt:
        'I wanted to explore QR-to-web ordering and loyalty after seeing the idea described in a Reddit post.',
      whatCurrentlyWorks: [
        'The hosted demo includes customer, staff, and owner views backed by browser storage.',
        'The repository contains menu, order, table, staff, customer, and reward code.',
        'Supabase migrations and Square integration code exist.',
      ],
      whatIsPartiallyBuilt: [
        'The provider-backed path has not been exercised with live Supabase, Twilio Verify, or Square credentials.',
        'Security review, rate limiting, logging, cleanup, backup, restore, and refund work remains.',
      ],
      whatIsPlanned: [
        'Configurable loyalty rules',
        'Customer CSV export',
        'More menu controls',
        'Operational cleanup and recovery tools',
      ],
      techActuallyUsed: [
        'Next.js',
        'React',
        'TypeScript',
        'Supabase',
        'PostgreSQL',
        'Square',
        'Vitest',
        'Playwright',
      ],
      myRole: 'Builder',
      whoHasUsedIt:
        'A hosted demo is deployed. Use by Black Rabbit, another cafe, or outside users is [VERIFY].',
      currentStatus: 'A hosted demo I revisit when time allows.',
      liveUrl: 'https://brewloop.vercel.app',
      repository: 'https://github.com/diese-tech/brewloop',
      factsIAmComfortableStating: [
        'The browser-storage demo flows work in the checked-in Playwright suite.',
        'The provider-backed code exists but has not been exercised with live credentials.',
      ],
      claimsThatMustNotBeMade: [
        'Black Rabbit currently uses BrewLoop.',
        'BrewLoop processes real payments.',
        'The provider-backed path has been verified.',
        'BrewLoop replaced a cafe POS, paper menu, or punch card.',
      ],
    },
  },
];

export const allProjects: Project[] = [...featuredProjects, ...alsoBuilt];
