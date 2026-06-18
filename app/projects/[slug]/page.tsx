import { notFound } from 'next/navigation';
import { featuredProjects } from '@/content/projects';

type ProjectPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: { params: ProjectPageParams }) {
  const { slug } = await params;
  const project = findProject(slug);

  return {
    title: project ? `${project.title} case study` : 'Project',
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: { params: ProjectPageParams }) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-20">
      <p className="kicker">Case study placeholder</p>
      <h1 className="mt-4 text-5xl font-black">{project.title}</h1>
      <p className="mt-5 text-xl text-slate-600 dark:text-slate-300">{project.summary}</p>
      <div className="surface mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black">Current framing</h2>
        <ul className="mt-4 space-y-3">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>• {outcome}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Screenshots, metrics, and deeper implementation notes are intentionally placeholder-ready until final assets are
          available.
        </p>
      </div>
    </main>
  );
}
