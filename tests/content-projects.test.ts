import { describe, expect, it } from 'vitest';
import { allProjects, alsoBuilt, featuredProjects } from '@/content/projects';

describe('projects content integrity', () => {
  it('composes allProjects from featured + alsoBuilt', () => {
    expect(allProjects).toEqual([...featuredProjects, ...alsoBuilt]);
  });

  it('has exactly three featured projects', () => {
    expect(featuredProjects).toHaveLength(3);
  });

  it('has unique slugs', () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has unique, well-formed ref codes', () => {
    const refs = allProjects.map((p) => p.ref);
    expect(new Set(refs).size).toBe(refs.length);
    for (const ref of refs) {
      expect(ref).toMatch(/^R-\d{3}$/);
    }
  });

  it('uses kebab-case slugs safe for URLs', () => {
    for (const p of allProjects) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('fills required display fields on every record', () => {
    for (const p of allProjects) {
      expect(p.title.length, p.slug).toBeGreaterThan(0);
      expect(p.label.length, p.slug).toBeGreaterThan(0);
      expect(p.domain.length, p.slug).toBeGreaterThan(0);
      expect(p.role.length, p.slug).toBeGreaterThan(0);
      expect(p.summary.length, p.slug).toBeGreaterThan(0);
      expect(p.synopsis.length, p.slug).toBeGreaterThan(0);
      expect(p.stackShort.length, p.slug).toBeGreaterThan(0);
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
      expect(p.outcomes.length, p.slug).toBeGreaterThan(0);
      expect(p.year, p.slug).toMatch(/^\d{4}$/);
      expect(['active', 'archived', 'placeholder']).toContain(p.status);
    }
  });

  it('uses https URLs for live and repo links', () => {
    for (const p of allProjects) {
      if (p.live) expect(p.live, p.slug).toMatch(/^https:\/\//);
      if (p.repo) expect(p.repo, p.slug).toMatch(/^https:\/\//);
    }
  });

  it('keeps case studies structurally complete', () => {
    const withCase = allProjects.filter((p) => p.caseStudy);
    expect(withCase.length).toBeGreaterThanOrEqual(3);
    for (const p of withCase) {
      const cs = p.caseStudy!;
      expect(cs.problem.length, p.slug).toBeGreaterThan(0);
      expect(cs.users.length, p.slug).toBeGreaterThan(0);
      expect(cs.solution.length, p.slug).toBeGreaterThan(0);
      expect(cs.keyFeatures.length, p.slug).toBeGreaterThan(0);
      expect(cs.technicalDecisions.length, p.slug).toBeGreaterThan(0);
      expect(cs.challenges.length, p.slug).toBeGreaterThan(0);
      expect(cs.improvements.length, p.slug).toBeGreaterThan(0);
      for (const exhibit of cs.exhibits ?? []) {
        expect(exhibit.title.length, p.slug).toBeGreaterThan(0);
        expect(exhibit.caption.length, p.slug).toBeGreaterThan(0);
      }
    }
  });

  it('only the placeholder record hides from public routes', () => {
    const placeholders = allProjects.filter((p) => p.status === 'placeholder');
    expect(placeholders).toHaveLength(1);
    expect(placeholders[0].slug).toBe('private-ops-tool');
  });
});
