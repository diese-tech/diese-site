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
  const caseStudy = project.caseStudy;

  const proseSections: [string, string][] = caseStudy
    ? [
        ['Problem', caseStudy.problem],
        ['Who it serves', caseStudy.users],
        ['Solution', caseStudy.solution],
      ]
    : [];

  const listSections: [string, string[]][] = caseStudy
    ? [
        ['Key features', caseStudy.keyFeatures],
        ['Technical decisions', caseStudy.technicalDecisions],
        ['Challenges & tradeoffs', caseStudy.challenges],
        ['What I would improve next', caseStudy.improvements],
      ]
    : [];

  const links = [
    ...(project.live ? [{ label: 'Live site', href: project.live }] : []),
    ...(project.repo ? [{ label: 'Source repository', href: project.repo }] : []),
    ...(caseStudy?.links ?? []),
  ];

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

          {caseStudy ? (
            <>
              {/* Case study — prose sections */}
              {proseSections.map(([heading, body], i) => (
                <div key={heading} className="mb-10 border-t border-rule pt-6">
                  <div className="flex gap-5 items-baseline mb-4">
                    <span className="font-mono text-[11px] text-signal flex-none w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
                      {heading}
                    </h2>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.6] text-ink-muted max-w-[70ch] md:pl-11">
                    {body}
                  </p>
                </div>
              ))}

              {/* Case study — list sections */}
              {listSections.map(([heading, items], i) => (
                <div key={heading} className="mb-10 border-t border-rule pt-6">
                  <div className="flex gap-5 items-baseline mb-2">
                    <span className="font-mono text-[11px] text-signal flex-none w-6">
                      {String(proseSections.length + i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
                      {heading}
                    </h2>
                  </div>
                  <div className="flex flex-col md:pl-11">
                    {items.map((item, j) => (
                      <div
                        key={j}
                        className="flex gap-5 py-4 border-b border-rule last:border-b-0 items-start"
                      >
                        <span className="font-mono text-[11px] text-ink-faint flex-none w-6 pt-0.5">
                          {String(j + 1).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-[15px] leading-[1.55] text-ink-muted">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Case study — exhibits (intentional placeholders until assets exist) */}
              {caseStudy.exhibits && caseStudy.exhibits.length > 0 && (
                <div className="mb-10 border-t border-rule pt-6">
                  <div className="flex gap-5 items-baseline mb-5">
                    <span className="font-mono text-[11px] text-signal flex-none w-6">
                      {String(proseSections.length + listSections.length + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
                      Exhibits
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:pl-11">
                    {caseStudy.exhibits.map((exhibit, i) => (
                      <div
                        key={exhibit.title}
                        className="border border-dashed border-rule p-5 min-h-[120px] flex flex-col justify-between"
                      >
                        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint">
                          Exhibit {String.fromCharCode(65 + i)}
                        </div>
                        <div>
                          <div className="font-grotesk font-medium text-sm text-ink mt-4">
                            {exhibit.title}
                          </div>
                          <div className="font-mono text-[11px] text-ink-faint mt-1">
                            {exhibit.caption}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </>
          ) : (
            /* What was built */
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
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="mb-10 border-t border-rule pt-6">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint mb-4">
                Links
              </div>
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
            </div>
          )}

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
