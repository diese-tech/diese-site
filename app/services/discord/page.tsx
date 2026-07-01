import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discord automation services',
  description:
    'Discord automation and setup help for gaming communities, streamers, amateur leagues, and online groups.',
};

const offerings = [
  [
    'Server Cleanup',
    'Clean up messy roles, channels, permissions, categories, and onboarding so your server feels easier to use.',
    'Starting at $75',
  ],
  [
    'Automation Setup',
    'Set up tickets, welcome flows, announcements, event reminders, role menus, moderation helpers, and repeatable admin workflows.',
    'Starting at $150',
  ],
  [
    'Mini Custom Bot',
    'Build a focused Discord bot feature — a randomizer, signup tracker, match helper, leaderboard, or command workflow.',
    'Starting at $250',
  ],
];

const examples = [
  'GodForge — a Discord bot for gaming communities with randomization, draft helpers, role-based commands, and match support.',
  'League Draft Tools — draft and league management experiments for amateur competitive gaming communities.',
  'ForgeLens — match and stat tracking for Smite 2 communities managing results, seasons, and player data.',
];

export default function DiscordServices() {
  return (
    <main className="mx-auto max-w-content px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <div className="border-b border-rule-strong pb-12 mb-12">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-signal mb-5">
          Services · Discord
        </div>
        <h1 className="font-grotesk font-semibold text-[28px] md:text-[34px] tracking-[-0.015em] leading-[1.1] text-ink mb-6 max-w-[28ch]">
          I help Discord communities stop doing admin work manually.
        </h1>
        <p className="font-sans text-base md:text-lg leading-[1.6] text-ink-muted max-w-[60ch] mb-8">
          I set up clean Discord servers, roles, channels, onboarding, ticket systems, announcements,
          and lightweight custom bot workflows for gaming groups, streamers, leagues, and online
          communities.
        </p>
        <div className="flex flex-wrap gap-5 font-mono text-xs tracking-[0.06em] uppercase">
          <a
            href="mailto:nievesdustinl@yahoo.com"
            className="text-signal border-b-2 border-signal pb-px"
          >
            Request a quick audit
          </a>
          <a
            href="#examples"
            className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
          >
            View examples
          </a>
        </div>
      </div>

      {/* Offerings */}
      <section className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-6">
          What I can help with
        </div>
        <div className="border-t border-rule">
          {offerings.map(([title, body, price]) => (
            <div
              key={title}
              className="grid md:grid-cols-[200px_1fr_120px] gap-4 py-6 border-b border-rule items-start"
            >
              <div className="font-grotesk font-semibold text-[18px] text-ink">{title}</div>
              <p className="font-sans text-[15px] leading-[1.6] text-ink-muted">{body}</p>
              <div className="font-mono text-xs tracking-[0.04em] text-signal md:text-right">
                {price}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-6">
          Example projects
        </div>
        <div className="flex flex-col border-t border-rule">
          {examples.map((item, i) => (
            <div
              key={i}
              className="flex gap-5 py-5 border-b border-rule last:border-b-0 items-start"
            >
              <span className="font-mono text-[11px] text-signal flex-none w-6 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-sans text-[15px] leading-[1.55] text-ink-muted">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border border-rule bg-paper-panel p-7 md:p-10">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
          Quick audit
        </div>
        <h2 className="font-grotesk font-semibold text-[22px] md:text-[26px] tracking-[-0.01em] text-ink mb-4">
          Want a quick Discord audit?
        </h2>
        <p className="font-sans text-base leading-[1.6] text-ink-muted max-w-[56ch] mb-7">
          Send me your goal, what feels messy, and what you wish your server or bot could handle
          automatically. I&apos;ll recommend the simplest fix first.
        </p>
        <a
          href="mailto:nievesdustinl@yahoo.com"
          className="font-mono text-xs tracking-[0.06em] uppercase text-signal border-b-2 border-signal pb-px"
        >
          Contact me →
        </a>
      </section>
    </main>
  );
}
