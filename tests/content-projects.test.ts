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
      expect(p.summary.length, p.slug).toBeGreaterThan(0);
      expect(p.cardDescription.length, p.slug).toBeGreaterThan(0);
      expect(p.introduction.length, p.slug).toBeGreaterThan(0);
      expect(p.stackShort.length, p.slug).toBeGreaterThan(0);
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
      expect(p.features.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.projectName).toBe(p.title);
      expect(p.facts.created).toBe('2026');
    }
  });

  it('uses https URLs for live and repo links', () => {
    for (const p of allProjects) {
      if (p.facts.liveUrl) expect(p.facts.liveUrl, p.slug).toMatch(/^https:\/\//);
      expect(p.facts.repository, p.slug).toMatch(/^https:\/\//);
    }
  });

  it('keeps every public project grounded in a complete fact record', () => {
    for (const p of allProjects) {
      expect(p.facts.projectType.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.whyIStartedIt.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.whatCurrentlyWorks.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.techActuallyUsed.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.myRole.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.whoHasUsedIt.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.currentStatus.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.factsIAmComfortableStating.length, p.slug).toBeGreaterThan(0);
      expect(p.facts.claimsThatMustNotBeMade.length, p.slug).toBeGreaterThan(0);
    }
  });

  it('keeps audit language out of public project copy', () => {
    for (const p of allProjects) {
      const publicCopy = [
        p.summary,
        p.cardDescription,
        p.introduction,
        ...p.features,
        ...p.stillWorkingOn,
        p.technicalNote,
        p.usageNote ?? '',
        p.facts.currentStatus,
      ].join(' ');

      expect(publicCopy, p.slug).not.toContain('[VERIFY]');
      expect(publicCopy, p.slug).not.toContain('—');
    }
  });

  it('shows a usage story only when an audience is confirmed', () => {
    expect(allProjects.filter((p) => p.usageNote).map((p) => p.slug)).toEqual([
      'godforge',
      'yaphub',
    ]);
  });
});
