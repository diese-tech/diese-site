import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allProjects } from '@/content/projects';

type ProjectPageParams = Promise<{ slug: string }>;

const activeProjects = allProjects.filter((p) => p.status !== 'placeholder');

export function generateStaticParams() {
  return activeProjects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return activeProjects.find((project) => project.slug === slug);
}

function getNextProject(slug: string) {
  const idx = activeProjects.findIndex((p) => p.slug === slug);
  return activeProjects[(idx + 1) % activeProjects.length];
}

export async function generateMetadata({ params }: { params: ProjectPageParams }) {
  const { slug } = await params;
  const project = findProject(slug);
  return {
    title: project ? `${project.title} — Case File` : 'Project',
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
  const fileNumber = project.ref.replace('R-', '').padStart(3, '0');

  return (
    <main className="mx-auto max-w-content px-6 md:px-10 py-10 md:py-12">
      {/* Back nav */}
      <div className="mb-8">
        <Link
          href="/#work"
          className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
        >
          ← Index of work
        </Link>
      </div>

      {/* Dossier frame */}
      <div
        className="border border-rule bg-paper-panel relative overflow-hidden"
        style={{ borderTop: '3px solid #1b1a17' }}
      >
        <div className="p-7 md:p-12">
          {/* Case file header row */}
          <div className="flex justify-between items-baseline border-b border-rule pb-5 mb-7 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted">
            <span>Case File No. {fileNumber}</span>
            <span className="hidden sm:block">
              Opened {project.year} · {project.domain}
            </span>
          </div>

          {/* Category kicker */}
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal-stamp mb-4">
            {project.label}
          </div>

          {/* Display title */}
          <h1
            className="font-grotesk font-semibold leading-[0.95] tracking-[-0.02em] text-ink mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
          >
            {project.title}
          </h1>

          {/* Synopsis */}
          <p className="font-sans text-lg leading-[1.6] text-ink-muted max-w-[60ch] mb-10">
            {project.synopsis}
          </p>

          {/* Fact strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-10 border-t border-b border-rule divide-y md:divide-y-0 md:divide-x divide-rule">
            <div className="py-5 md:pr-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Engagement
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">{project.role}</div>
            </div>
            <div className="py-5 md:px-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Stack
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">
                {project.stack.join(' · ')}
              </div>
            </div>
            <div className="py-5 md:pl-6">
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Year
              </div>
              <div className="font-grotesk font-medium text-[16px] text-ink">
                {project.year}
                {project.status === 'active' ? ' — present' : ''}
              </div>
            </div>
          </div>

          {/* What was built */}
          <div className="mb-10">
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-5">
              What was built
            </div>
            <div className="flex flex-col">
              {project.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex gap-5 py-5 border-b border-rule last:border-b-0 items-start"
                >
                  <span className="font-mono text-[11px] text-signal flex-none w-6 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans text-[15px] leading-[1.55] text-ink-muted">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-rule pt-6">
            <div className="flex flex-wrap gap-4 font-mono text-[11px] text-ink-faint uppercase tracking-[0.04em]">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
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

        {/* Stamp */}
        <div
          className="absolute font-mono font-semibold text-signal-stamp border-2 border-signal-stamp tracking-[0.12em] text-[13px] px-3.5 py-2 pointer-events-none"
          style={{ top: '88px', right: '-4px', transform: 'rotate(-9deg)', opacity: 0.85 }}
          aria-hidden="true"
        >
          CASE FILE
        </div>
      </div>
    </main>
  );
}
