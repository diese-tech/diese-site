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
  repository?: string;
  sourceSheet?: string;
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
    slug: 'ratatoskr',
    ref: 'R-002',
    title: 'Ratatoskr',
    label: 'League operations bot',
    domain: 'Community Operations',
    stackShort: 'TypeScript · Discord · SQLite',
    stack: ['TypeScript', 'Node.js', 'discord.js', 'SQLite', 'Google Sheets API', 'Zod'],
    summary:
      'A Discord bot that runs league operations for the Yggdrasil Smite League, from season setup to roster moves.',
    cardDescription:
      'Server setup, seasons, divisions, scouting, roster transactions, and daily roster audits that survive restarts.',
    introduction:
      'Ratatoskr is the operations bot for the Yggdrasil Smite League. It handles the repeated league work: setting up seasons and divisions, running preseason scouting, and making approved roster moves across Discord and the league roster sheets. I built it for YSL on purpose instead of making a general bot, so every workflow follows how the league actually runs. The part I care most about is that nothing gets lost when Discord or the bot has a bad moment.',
    features: [
      'Server, season, and division setup with plan, repair, and guarded delete steps',
      'Preseason scouting workflows with review, publish, edit, cancel, and recovery',
      'Approved trades, drops, pickups, and name changes applied across Discord and the roster sheets',
      'Roster audits comparing Discord with the private and public sheets, daily and before every transaction',
      'Workflow state saved in SQLite and reconciled after restarts or failed Discord messages',
      'Permission checks at the moment of every change, not just when the button is shown',
    ],
    stillWorkingOn: [
      'Moving storage behind a new layer so it can switch from SQLite to Postgres',
      'Fuller season, match, and team management',
    ],
    technicalNote:
      'I built Ratatoskr with TypeScript, Node.js, discord.js, SQLite, Zod, and the Google Sheets API. League rules live in plain code that is tested without Discord, and CI runs type checks, the build, and the test suite on every change.',
    usageNote:
      'The Yggdrasil Smite League uses Ratatoskr for its live league operations.',
    verifyQuestions: [],
    facts: {
      projectName: 'Ratatoskr',
      projectType: 'Discord operations bot',
      created: '2026',
      whyIStartedIt:
        'I wanted to automate repetitive league operations for the Yggdrasil Smite League while keeping every change explicit and recoverable.',
      whatCurrentlyWorks: [
        'The repository contains server provisioning, division and season lifecycle, Scout, transaction, roster audit, recovery, and help code.',
        'Transactions update Discord and the private and public roster sheets with drift protection.',
        'Workflow state is stored in SQLite and reconciled on startup.',
      ],
      whatIsPartiallyBuilt: [
        'The B5 storage migration is in progress. Production stays on SQLite until the Postgres adapter, verifier, and cutover are complete.',
      ],
      whatIsPlanned: [
        'Fuller season lifecycle management',
        'Team, roster, and match operations',
        'Grounded league-rule lookup from approved canon',
      ],
      techActuallyUsed: [
        'TypeScript',
        'Node.js',
        'discord.js',
        'SQLite',
        'Zod',
        'Google Sheets API',
        'GitHub Actions',
        'Railway',
      ],
      myRole: 'Builder',
      whoHasUsedIt: 'The Yggdrasil Smite League uses it in live league operations.',
      currentStatus: 'In live use by YSL and still in active development.',
      repository: 'https://github.com/diese-tech/Ratatoskr',
      factsIAmComfortableStating: [
        'Ratatoskr is in live use by the Yggdrasil Smite League.',
        'Ratatoskr is purpose-built for YSL, not a general plug-and-play Discord bot.',
        'The storage migration from SQLite toward Postgres is still in progress.',
      ],
      claimsThatMustNotBeMade: [
        'Ratatoskr is a general-purpose bot ready for any server.',
        'Ratatoskr runs on Postgres in production.',
        'Core league workflows use AI.',
        'Ratatoskr is affiliated with or endorsed by Hi-Rez Studios.',
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
    slug: 'smite-guides',
    ref: 'R-004',
    title: 'SMITE Guides',
    label: 'Sheet-to-site publishing',
    domain: 'Content Publishing',
    stackShort: 'Astro · Google Sheets · Actions',
    stack: ['Astro', 'React', 'TypeScript', 'Node.js', 'Google Sheets', 'GitHub Actions', 'Vercel'],
    summary:
      'A competitive SMITE 2 reference site that publishes itself from a Google Sheet.',
    cardDescription:
      'Edit the sheet, and a nightly sync checks it, snapshots it, and opens a reviewable update to the site.',
    introduction:
      'SMITE Guides is a reference site for competitive SMITE 2, starting with the Support guide. The guide content lives in a Google Sheet, and that sheet stays the source of truth. I built the sync that turns it into the site: it downloads the sheet, checks nothing is missing, saves a snapshot and every icon locally, and opens a pull request with a preview. People who edit the sheet never have to touch code. The site is in beta now.',
    features: [
      'Sync script that reads every guide tab, validates it, and writes a static snapshot',
      'Icons copied locally as WebP so the site never depends on outside sites being up',
      'Nightly and on-demand GitHub workflow that opens a preview pull request or publishes directly',
      'A "Publish to site" menu in the sheet that starts the workflow with a limited token',
      'Tabbed Support guide with filters, search, and deep links per god and item',
      'Homepage scroll tour of the Conquest map with role cards and animated gods',
    ],
    stillWorkingOn: [
      'Guides for the other four roles',
      'Finalizing the visual design and logo',
      'An interactive build crafter',
    ],
    technicalNote:
      'I built it with Astro, React islands, TypeScript, and a Node sync script, deployed on Vercel. Hi-Rez artwork comes from the official SMITE Community Resource Bank and is credited on the site.',
    verifyQuestions: [],
    facts: {
      projectName: 'SMITE Guides',
      projectType: 'Community reference site in beta',
      created: '2026',
      whyIStartedIt:
        'I wanted a fast, readable SMITE 2 reference site that people could keep current by editing a Google Sheet.',
      whatCurrentlyWorks: [
        'The beta site is deployed at smite-guides.vercel.app with the Support guide.',
        'The sheet sync, validation, icon mirroring, and nightly GitHub workflow exist and run.',
      ],
      whatIsPartiallyBuilt: [
        'Only the Support role guide is available.',
        'The design system and logo are working drafts.',
      ],
      whatIsPlanned: ['Carry, Jungle, Mid, and Solo guides', 'Interactive build crafter'],
      techActuallyUsed: [
        'Astro',
        'React',
        'TypeScript',
        'Node.js',
        'ExcelJS',
        'sharp',
        'GitHub Actions',
        'Google Apps Script',
        'Vercel',
      ],
      myRole: 'Builder',
      whoHasUsedIt: 'The beta site is public. Audience size is [VERIFY].',
      currentStatus: 'In public beta with the Support guide.',
      liveUrl: 'https://smite-guides.vercel.app',
      sourceSheet:
        'https://docs.google.com/spreadsheets/d/1vgTM7PvM6DMqVpZkOzIjSGLkyenQuI2T7MzcSOUSMdg/edit',
      factsIAmComfortableStating: [
        'The site is in public beta.',
        'The site content is synced from a Google Sheet by an automated, validated pipeline.',
        'Hi-Rez assets are used from the official Community Resource Bank with credit.',
      ],
      claimsThatMustNotBeMade: [
        'I wrote all of the guide content.',
        'Every role guide is complete.',
        'SMITE Guides is affiliated with or endorsed by Hi-Rez Studios.',
        'The repository is public.',
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
