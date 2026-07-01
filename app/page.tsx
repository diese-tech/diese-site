import Link from 'next/link';
import { BuilderConsole } from '@/components/builder-console';
import { PremiumEntrypoint } from '@/components/premium-entrypoint';
import { Reveal } from '@/components/reveal';
import { allProjects, featuredProjects } from '@/content/projects';
import { site } from '@/content/site';

const featured = featuredProjects[0];

export default function Home() {
  return (
    <main>
      {/* ===== MASTHEAD ===== */}
      <section className="border-b border-rule-strong">
        <div className="mx-auto max-w-content px-6 md:px-10">
          {/* Doc-header bar */}
          <div className="flex justify-between items-baseline py-5 border-b border-rule font-mono text-[11px] tracking-[0.06em] uppercase text-ink-muted">
            <span>Portfolio · Engineer</span>
            <span className="hidden sm:block">Operations → Software · 2021–2026</span>
          </div>

          {/* Heading block */}
          <div className="py-14 md:py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-signal mb-6">
                Dustin Nieves · Portfolio
              </div>
              <h1 className="font-grotesk font-semibold text-[28px] md:text-[34px] tracking-[-0.015em] leading-[1.1] text-ink mb-6 max-w-[26ch]">
                Software for the systems that actually run.
              </h1>
              <p className="font-sans text-base md:text-lg leading-[1.6] text-ink-muted max-w-[60ch]">
                Operations Analyst background, software developer in practice. I build tools,
                dashboards, and SaaS products around real business workflows — the unglamorous
                plumbing that keeps teams running.
              </p>
            </div>
            <BuilderConsole />
          </div>

          {/* Metadata strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-rule font-mono">
            <div className="py-5 pr-6 border-r border-rule">
              <div className="text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1.5">
                Background
              </div>
              <div className="text-[13px] text-ink">Operations → Software</div>
            </div>
            <div className="py-5 px-6 border-r border-rule">
              <div className="text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1.5">
                Builds
              </div>
              <div className="text-[13px] text-ink">Tools · Dashboards · SaaS</div>
            </div>
            <div className="py-5 px-6 border-r border-rule">
              <div className="text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1.5">
                Systems
              </div>
              <div className="text-[13px] text-ink">{allProjects.length - 1} shipped</div>
            </div>
            <div className="py-5 pl-6">
              <div className="text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1.5">
                Status
              </div>
              <div className="text-[13px] text-ok">● Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORK — PREMIUM ENTRYPOINT ===== */}
      <section id="work" className="border-b border-rule-strong">
        <Reveal>
          <PremiumEntrypoint
          kicker="§ Featured Work"
          headline="Production systems, not portfolio pieces."
          subheadline="Three flagship builds — dispatch software, league operations, and custom booking — each running a real business workflow today."
          watermarks={featuredProjects.map((project) => project.ref)}
          cards={featuredProjects.map((project) => ({
            kicker: `${project.ref} / ${project.domain}`,
            title: project.title,
            description: project.summary,
            meta: `${project.stackShort} · ${project.year}`,
            href: `/projects/${project.slug}`,
          }))}
          primaryCta={{
            label: `Open the ${featured.title} case file`,
            href: `/projects/${featured.slug}`,
          }}
          secondaryCta={{ label: 'Get in touch', href: '#contact' }}
          />
        </Reveal>
      </section>

      {/* ===== INDEX OF WORK ===== */}
      <section className="border-b border-rule-strong">
        <Reveal className="mx-auto max-w-content px-6 md:px-10">
          {/* Table header bar */}
          <div className="flex justify-between items-baseline py-5 border-b border-rule font-mono">
            <span className="text-xs font-medium tracking-[0.06em] uppercase text-ink">
              Index of Work
            </span>
            <span className="text-xs tracking-[0.04em] text-ink-muted">
              {allProjects.length} records · 2023–2025
            </span>
          </div>

          {/* Column headers (desktop only) */}
          <div className="hidden md:grid grid-cols-[64px_1.4fr_1fr_80px_100px] gap-4 py-2.5 font-mono text-[10px] tracking-[0.06em] uppercase text-ink-faint border-b border-rule">
            <span>Ref</span>
            <span>System</span>
            <span>Stack</span>
            <span>Year</span>
            <span className="text-right">Status</span>
          </div>

          {/* Rows */}
          {allProjects.map((project) =>
            project.status === 'placeholder' ? (
              <div
                key={project.slug}
                className="block border-b border-rule last:border-b-0 opacity-50 cursor-default"
              >
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-[64px_1.4fr_1fr_80px_100px] gap-4 py-4 items-center font-mono text-sm">
                  <span className="text-xs text-ink-faint">{project.ref}</span>
                  <span className="font-grotesk font-medium text-sm text-ink-muted">
                    {project.title}
                  </span>
                  <span className="text-xs text-ink-faint">{project.stackShort}</span>
                  <span className="text-xs text-ink-faint">{project.year}</span>
                  <span className="text-xs text-right text-ink-faint">○ Private</span>
                </div>
                {/* Mobile */}
                <div className="md:hidden py-4 font-mono">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <span className="text-[10px] text-ink-faint">{project.ref}</span>
                      <span className="font-grotesk font-medium text-sm text-ink-muted">
                        {project.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-ink-faint">○ Private</span>
                  </div>
                  <div className="mt-1 text-[11px] text-ink-faint">
                    {project.stackShort} · {project.year}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group ledger-row block border-b border-rule last:border-b-0"
              >
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-[64px_1.4fr_1fr_80px_100px] gap-4 py-4 items-center font-mono text-sm text-ink-muted">
                  <span className="ledger-ref text-xs text-signal transition-colors duration-[120ms]">
                    {project.ref}
                  </span>
                  <span className="font-grotesk font-medium text-sm text-ink">{project.title}</span>
                  <span className="text-xs">{project.stackShort}</span>
                  <span className="text-xs">{project.year}</span>
                  <span
                    className={`text-xs text-right ${project.status === 'active' ? 'text-ok' : 'text-ink-faint'}`}
                  >
                    {project.status === 'active' ? '● Active' : '○ Archived'}
                  </span>
                </div>
                {/* Mobile row */}
                <div className="md:hidden py-4 font-mono">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <span className="text-[10px] text-signal">{project.ref}</span>
                      <span className="font-grotesk font-medium text-sm text-ink">
                        {project.title}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] ${project.status === 'active' ? 'text-ok' : 'text-ink-faint'}`}
                    >
                      {project.status === 'active' ? '● Active' : '○ Arch'}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-ink-muted">
                    {project.stackShort} · {project.year}
                  </div>
                </div>
              </Link>
            )
          )}
        </Reveal>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="border-b border-rule-strong">
        <Reveal className="mx-auto max-w-content px-6 md:px-10 py-14 md:py-16 grid md:grid-cols-[200px_1fr] gap-8 md:gap-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
              § About
            </div>
            <h2 className="font-grotesk font-semibold text-[22px] mt-2 leading-[1.1] text-ink">
              {site.name}
            </h2>
          </div>
          <div className="max-w-[64ch]">
            <p className="font-sans text-base leading-[1.6] text-ink-muted">
              Operations Analyst turned software developer. The background in ops means the
              problem-framing comes first — I map the messy workflow before writing a line of code.
              I build tools, dashboards, automation systems, and SaaS products that run actual
              business processes, not demos.
            </p>
            <p className="font-sans text-base leading-[1.6] text-ink-muted mt-4">
              Current focus: full-stack web development with a bias toward maintainable systems,
              clean data modeling, and shipping software that earns its place in a team&apos;s daily
              workflow.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact">
        <Reveal className="mx-auto max-w-content px-6 md:px-10 py-14 md:py-16 grid md:grid-cols-[200px_1fr] gap-8 md:gap-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
              § Contact
            </div>
            <h2 className="font-grotesk font-semibold text-[22px] mt-2 leading-[1.1] text-ink">
              Get in touch
            </h2>
          </div>
          <div className="max-w-[64ch]">
            <p className="font-sans text-base leading-[1.6] text-ink-muted mb-8">
              Open to product-minded development roles and select freelance projects — particularly
              workflow-heavy applications, internal tools, and operational software.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs tracking-[0.06em] uppercase">
              <a
                href={`mailto:${site.email}`}
                className="text-signal border-b-2 border-signal pb-px"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
              >
                LinkedIn
              </a>
              <a
                href={site.github}
                className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
              >
                GitHub
              </a>
              <a
                href={site.resume}
                className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
              >
                Resume PDF
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
