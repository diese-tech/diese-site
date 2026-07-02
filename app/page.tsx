import Link from 'next/link';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { ContributionCalendarGrid } from '@/components/contribution-calendar';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { MacWindow } from '@/components/mac-window';
import { Reveal } from '@/components/reveal';
import { experience } from '@/content/experience';
import { allProjects } from '@/content/projects';
import { site } from '@/content/site';
import { getContributions } from '@/lib/github';

const socials = [
  { label: 'GitHub', href: site.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${site.email}`, Icon: Mail },
  { label: 'Resume', href: site.resume, Icon: FileText },
];

const listedProjects = allProjects.filter((p) => p.status !== 'placeholder');

export default async function Home() {
  const contributions = await getContributions();

  return (
    <main className="mx-auto max-w-content px-6 md:px-10">
      <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
        {/* ===== IDENTITY COLUMN ===== */}
        <aside className="pt-12 pb-4 lg:py-20 lg:sticky lg:top-16 lg:self-start">
          {/* Avatar placeholder (monogram until a headshot exists) */}
          <div className="relative h-24 w-24 rounded-2xl border border-rule bg-gradient-to-br from-signal/80 to-void flex items-center justify-center overflow-hidden">
            <span className="font-grotesk font-bold text-3xl text-cream tracking-tight">DN</span>
          </div>

          <h1 className="font-grotesk font-semibold text-[28px] tracking-[-0.015em] leading-[1.1] text-ink mt-6">
            Dustin Nieves
          </h1>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-signal mt-2">
            Diese · Builder of practical software
          </div>

          <p className="font-sans text-[15px] leading-[1.6] text-ink-muted mt-5 max-w-[38ch]">
            Ops analyst by day, builder the rest of the time. I ship tools and small SaaS
            products that real businesses actually run on.
          </p>

          <div className="flex items-center gap-2 mt-6 font-mono text-[11px] tracking-[0.08em] uppercase">
            <span className="text-ok">●</span>
            <span className="text-ink-muted">Available for interesting work</span>
          </div>

          {/* Social row */}
          <div className="flex gap-2.5 mt-7">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-rule text-ink-muted hover:text-signal hover:border-signal hover:-translate-y-0.5 transition-all duration-[120ms] motion-reduce:hover:translate-y-0"
              >
                <Icon size={16} className="transition-transform duration-[120ms] group-hover:scale-110" />
              </a>
            ))}
          </div>
        </aside>

        {/* ===== WINDOW STACK ===== */}
        <div className="py-10 lg:py-20 flex flex-col gap-7">
          {/* about.txt */}
          <Reveal>
            <div id="about" className="scroll-mt-24" />
            <MacWindow title="about.txt" bodyClassName="p-6 md:p-7">
              <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[68ch]">
                I&apos;m an operations analyst turned software developer. The ops background means
                I frame the problem first — I map the messy workflow before I write a line of
                code.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[68ch] mt-4">
                These days I build tools, dashboards, automation, and small SaaS products that
                run actual business processes: dispatch software for HVAC teams, QR ordering for
                cafes, league operations for a gaming community. Full-stack, biased toward
                maintainable systems and clean data modeling.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[68ch] mt-4">
                Before this: eight years in enterprise IT operations at Disney, and a Marine
                Corps tour as a systems administrator before that. That&apos;s where the respect
                for software that just works comes from.
              </p>
            </MacWindow>
          </Reveal>

          {/* projects/ */}
          <Reveal>
            <div id="work" className="scroll-mt-24" />
            <MacWindow
              title="projects/"
              toolbar={
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faint">
                  {listedProjects.length} shipped
                </span>
              }
            >
              <ul>
                {listedProjects.map((project) => (
                  <li key={project.slug} className="border-b border-rule last:border-b-0">
                    <div className="group relative flex items-start gap-4 px-6 py-5 transition-colors duration-[120ms] hover:bg-paper-sunk/40">
                      <span className="font-mono text-[10px] text-ink-faint pt-1.5 w-12 shrink-0 group-hover:text-signal transition-colors duration-[120ms]">
                        {project.ref}
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-grotesk font-semibold text-[16px] text-ink group-hover:text-signal transition-colors duration-[120ms] after:absolute after:inset-0"
                        >
                          {project.title}
                          <ArrowUpRight
                            size={14}
                            className="inline-block ml-1.5 -mt-0.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-[120ms] motion-reduce:transition-none"
                          />
                        </Link>
                        <p className="font-sans text-[13px] leading-[1.55] text-ink-muted mt-1 max-w-[60ch]">
                          {project.summary}
                        </p>
                        <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-faint mt-2.5">
                          {project.stackShort} · {project.year}
                        </div>
                      </div>
                      <div className="relative z-10 flex gap-1.5 pt-1">
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-rule text-ink-muted hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                          >
                            <GithubIcon size={14} />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live site`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-rule text-ink-muted hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                          >
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </MacWindow>
          </Reveal>

          {/* github.stats — renders only when contribution data is available */}
          {contributions && (
            <Reveal>
              <MacWindow
                title="github.stats"
                toolbar={
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faint hover:text-signal transition-colors duration-[120ms]"
                  >
                    @diese-tech ↗
                  </a>
                }
              >
                <ContributionCalendarGrid calendar={contributions} />
              </MacWindow>
            </Reveal>
          )}

          {/* experience.log */}
          <Reveal>
            <MacWindow title="experience.log" className="scroll-mt-24">
              <ul>
                {experience.map((entry, i) => (
                  <li
                    key={`${entry.role}-${i}`}
                    className="flex items-start gap-4 px-6 py-5 border-b border-rule last:border-b-0"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-paper-sunk/60 font-grotesk font-bold text-[13px] text-ink-muted">
                      {entry.mark}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="font-grotesk font-semibold text-[15px] text-ink">
                          {entry.role}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-faint">
                          {entry.period}
                        </span>
                      </div>
                      <div className="font-sans text-[13px] text-ink-muted mt-0.5">
                        {entry.org}
                        {entry.unit ? ` — ${entry.unit}` : ''}
                      </div>
                      <p className="font-sans text-[13px] leading-[1.55] text-ink-faint mt-1.5 max-w-[60ch]">
                        {entry.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4 border-t border-rule bg-paper-sunk/30">
                <a
                  href={site.resume}
                  className="font-mono text-[11px] tracking-[0.08em] uppercase text-signal border-b border-signal pb-px hover:border-b-2 transition-all duration-[120ms]"
                >
                  Full resume (PDF) ↓
                </a>
              </div>
            </MacWindow>
          </Reveal>

          {/* playground.app teaser */}
          <Reveal>
            <MacWindow
              title="playground.app"
              toolbar={
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ok">
                  ● 3D
                </span>
              }
            >
              <Link href="/playground" className="group block">
                <div className="relative h-[220px] overflow-hidden bg-void">
                  {/* Layered backdrop echoing the ops floor */}
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(500px 260px at 70% 20%, rgba(201, 111, 74, 0.22), transparent 65%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #f6f4ef 1px, transparent 1px), linear-gradient(to bottom, #f6f4ef 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                      transform: 'perspective(400px) rotateX(45deg) translateY(40px) scale(1.6)',
                      transformOrigin: 'center bottom',
                    }}
                  />
                  {/* Block silhouettes */}
                  <div
                    className="absolute right-14 bottom-10 h-10 w-14 bg-signal/80 rounded-[3px] transition-transform duration-[240ms] group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute right-24 bottom-8 h-7 w-8 bg-cream/70 rounded-[3px]"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute right-8 bottom-8 h-6 w-7 bg-cream/30 rounded-[3px]"
                    aria-hidden="true"
                  />
                  {/* Copy */}
                  <div className="relative p-6 md:p-7">
                    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-signal-stamp brightness-150 mb-3">
                      The ops floor
                    </div>
                    <div className="font-grotesk font-semibold text-xl text-cream max-w-[22ch] leading-tight">
                      Drive a forklift. Bump into my projects.
                    </div>
                    <div className="mt-4 inline-block font-grotesk font-semibold text-sm text-cream border-b-2 border-signal pb-0.5 group-hover:text-signal transition-colors duration-[120ms]">
                      Enter the playground →
                    </div>
                    <div className="mt-3 font-mono text-[10px] tracking-[0.08em] uppercase text-cream/40">
                      WebGL · desktop recommended
                    </div>
                  </div>
                </div>
              </Link>
            </MacWindow>
          </Reveal>

          {/* contact */}
          <Reveal>
            <div id="contact" className="scroll-mt-24" />
            <MacWindow title="contact" bodyClassName="p-6 md:p-7">
              <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[62ch]">
                Got a messy workflow, or a team that needs software it&apos;ll actually use?
                I&apos;m open to product-minded development roles and select freelance projects.
                Email is the fastest way to reach me.
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-3 mt-6 font-mono text-xs tracking-[0.06em] uppercase">
                <a
                  href={`mailto:${site.email}`}
                  className="text-signal border-b-2 border-signal pb-px"
                >
                  {site.email}
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                >
                  LinkedIn
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                >
                  GitHub
                </a>
              </div>
            </MacWindow>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
