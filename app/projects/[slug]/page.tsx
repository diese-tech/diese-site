import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MacWindow } from '@/components/mac-window';
import { allProjects } from '@/content/projects';

type ProjectPageParams = Promise<{ slug: string }>;

function findProject(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

function getNextProject(slug: string) {
  const idx = allProjects.findIndex((project) => project.slug === slug);
  return allProjects[(idx + 1) % allProjects.length];
}

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: ProjectPageParams }) {
  const { slug } = await params;
  const project = findProject(slug);
  return {
    title: project ? `${project.title} | Project` : 'Project',
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: { params: ProjectPageParams }) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  const next = getNextProject(slug);
  const links = [
    ...(project.live ? [{ label: 'Live site', href: project.live }] : []),
    { label: 'Source repository', href: project.repo },
  ];

  return (
    <main className="mx-auto max-w-content px-6 md:px-10 py-10 md:py-12">
      <div className="mb-8">
        <Link
          href="/#work"
          className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
        >
          ← Projects
        </Link>
      </div>

      <MacWindow
        title={`project | ${project.ref}`}
        toolbar={
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faint">
            Created {project.year} · {project.domain}
          </span>
        }
      >
        <div className="relative overflow-hidden p-7 md:p-12">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal-stamp mb-4">
            {project.label}
          </div>

          <h1
            className="font-grotesk font-semibold leading-[0.95] tracking-[-0.02em] text-ink mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
          >
            {project.title}
          </h1>

          <p className="font-sans text-lg leading-[1.6] text-ink-muted max-w-[60ch] mb-10">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 mb-10 border-t border-b border-rule divide-y md:divide-y-0 md:divide-x divide-rule">
            <div className="py-5 md:pr-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                My role
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">{project.role}</div>
            </div>
            <div className="py-5 md:px-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Created
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">{project.year}</div>
            </div>
            <div className="py-5 md:pl-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Status
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">
                {project.facts.currentStatus}
              </div>
            </div>
          </div>

          <section className="mb-10 border-t border-rule pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
              Why I built it
            </h2>
            <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[70ch]">
              {project.introduction}
            </p>
          </section>

          <section className="mb-10 border-t border-rule pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-2">
              What works right now
            </h2>
            <div className="flex flex-col">
              {project.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex gap-5 py-4 border-b border-rule last:border-b-0 items-start"
                >
                  <span className="font-mono text-[11px] text-signal flex-none w-6 pt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans text-[15px] leading-[1.55] text-ink-muted">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {project.stillWorkingOn.length > 0 && (
            <section className="mb-10 border-t border-rule pt-6">
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Still working on
              </h2>
              <div className="flex flex-col">
                {project.stillWorkingOn.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 py-4 border-b border-rule last:border-b-0 items-start"
                  >
                    <span className="font-mono text-[11px] text-ink-faint flex-none w-6 pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-[15px] leading-[1.55] text-ink-muted">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10 border-t border-rule pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
              Under the hood
            </h2>
            <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[70ch]">
              {project.technicalNote}
            </p>
          </section>

          {project.usageNote && (
            <section className="mb-10 border-t border-rule pt-6">
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
                Used by
              </h2>
              <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[70ch]">
                {project.usageNote}
              </p>
            </section>
          )}

          <section className="mb-10 border-t border-rule pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
              Links
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-[0.06em] uppercase">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-rule pt-6">
            <div className="flex flex-wrap gap-4 font-mono text-[11px] text-ink-faint uppercase tracking-[0.04em]">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="font-grotesk font-semibold text-sm text-ink border-b-2 border-signal pb-0.5 hover:text-signal transition-colors duration-[120ms] shrink-0"
              >
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </MacWindow>
    </main>
  );
}
