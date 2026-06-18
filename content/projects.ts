export type Project = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  status?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: 'swiftdispatch',
    title: 'SwiftDispatch',
    label: 'Small-business operations software',
    summary: 'Dispatch software for small HVAC teams outgrowing calls, texts, and whiteboards.',
    outcomes: ['Live dispatch workflow with job status/state-machine thinking', 'Customer intake, quote approval, technician SMS updates, and analytics', 'Supabase, Twilio, Vercel, and background SMS processing integration'],
    stack: ['Next.js', 'Supabase', 'Twilio', 'Vercel'],
  },
  {
    slug: 'serpent-ascension-league',
    title: 'Serpent Ascension League',
    label: 'Community league operations platform',
    summary: 'A public league hub and admin system for seasons, standings, rosters, drafts, and match operations.',
    outcomes: ['Public standings, schedule, teams, players, and watch pages', 'Admin tooling, registrations, Discord auth, and draft tooling', 'Production-readiness audit work and domain modeling for league workflows'],
    stack: ['React', 'TypeScript', 'Discord Auth', 'Testing'],
  },
  {
    slug: 'threetails-booking',
    title: 'ThreeTails Booking',
    label: 'Custom booking and payment workflow',
    summary: 'A client-style booking flow for a cat cafe concept with business-specific rules and checkout logic.',
    outcomes: ['Rules agreement flow and custom booking UX', 'Smart calendar logic with party-size and time-of-day constraints', 'Square checkout and email confirmations'],
    stack: ['Next.js', 'Square', 'Email', 'Calendar UX'],
  },
];

export const alsoBuilt: Project[] = [
  { slug: 'godforge', title: 'GodForge', label: 'Discord community tool', summary: 'A Smite 2 randomizer and community bot for god and item generation, casual play, and randomized league formats.', outcomes: ['Discord-first workflows for gaming communities'], stack: ['Discord', 'Bot workflows'] },
  { slug: 'yaphub', title: 'YapHub', label: 'Voice workflow utility', summary: 'A Discord utility for temporary voice channels and cleaner community voice workflows.', outcomes: ['Reduced server clutter and manual voice-channel management'], stack: ['Discord', 'Automation'] },
  { slug: 'atlas', title: 'Atlas', label: 'Labs / Experimental', summary: 'An early local LLM, RAG, and homelab automation experiment focused on practical personal tooling.', outcomes: ['Explores AI-assisted local workflows without overclaiming maturity'], stack: ['LLM', 'RAG', 'Homelab'] },
  { slug: 'private-ops-tool', title: 'Sanitized internal tool', label: 'Private work / later', summary: 'A future sanitized case study for operational software, published only after removing all sensitive details.', outcomes: ['Placeholder for confidential workflow work'], stack: ['Private', 'Workflow UX'], status: 'Placeholder' },
];
