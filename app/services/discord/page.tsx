import type { Metadata } from 'next';
import { allProjects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Discord work',
  description: 'Discord setup, automation, and focused bot work.',
};

const offerings = [
  [
    'Server setup',
    'Roles, channels, permissions, and the small choices that make a server easier to use.',
  ],
  [
    'Automation',
    'Tickets, announcements, reminders, role menus, and repeated work that is easier to let a bot handle.',
  ],
  [
    'Bot work',
    'Bots for randomizers, signups, matches, and the odd community idea that needs its own command.',
  ],
];

const exampleSlugs = new Set(['godforge', 'yaphub', 'serpent-ascension-league']);
const examples = allProjects.filter((project) => exampleSlugs.has(project.slug));

export default function DiscordServices() {
  return (
    <main className="mx-auto max-w-content px-6 md:px-10 py-12 md:py-16">
      <div className="border-b border-rule-strong pb-12 mb-12">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-signal mb-5">
          Discord work
        </div>
        <h1 className="font-grotesk font-semibold text-[28px] md:text-[34px] tracking-[-0.015em] leading-[1.1] text-ink mb-6 max-w-[28ch]">
          I build Discord tools for gaming communities.
        </h1>
        <p className="font-sans text-base md:text-lg leading-[1.6] text-ink-muted max-w-[60ch] mb-8">
          Most of these projects started because I wanted something specific and could not find a
          bot that handled it the way I wanted. That has included temporary voice rooms,
          randomizers, drafts, league tools, and the setup work around them.
        </p>
        <div className="flex flex-wrap gap-5 font-mono text-xs tracking-[0.06em] uppercase">
          <a
            href="mailto:nievesdustinl@yahoo.com"
            className="text-signal border-b-2 border-signal pb-px"
          >
            Email me
          </a>
          <a
            href="#examples"
            className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
          >
            View examples
          </a>
        </div>
      </div>

      <section className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-6">
          What I work on
        </div>
        <div className="border-t border-rule">
          {offerings.map(([title, body]) => (
            <div
              key={title}
              className="grid md:grid-cols-[200px_1fr] gap-4 py-6 border-b border-rule items-start"
            >
              <div className="font-grotesk font-semibold text-[18px] text-ink">{title}</div>
              <p className="font-sans text-[15px] leading-[1.6] text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="examples" className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-6">
          Example projects
        </div>
        <div className="flex flex-col border-t border-rule">
          {examples.map((project, index) => (
            <div
              key={project.slug}
              className="flex gap-5 py-5 border-b border-rule last:border-b-0 items-start"
            >
              <span className="font-mono text-[11px] text-signal flex-none w-6 pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <a
                  href={`/projects/${project.slug}`}
                  className="font-grotesk font-semibold text-[16px] text-ink border-b border-rule hover:text-signal hover:border-signal"
                >
                  {project.title}
                </a>
                <p className="font-sans text-[15px] leading-[1.55] text-ink-muted mt-2">
                  {project.cardDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-rule bg-paper-panel p-7 md:p-10">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
          Contact
        </div>
        <p className="font-sans text-base leading-[1.6] text-ink-muted max-w-[56ch] mb-7">
          If you have a Discord project in mind, send me a short note about what you are trying
          to make.
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
