import { describe, expect, it } from 'vitest';
import { experience } from '@/content/experience';
import { site } from '@/content/site';

describe('site config', () => {
  it('has a valid email', () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('links social profiles over https', () => {
    expect(site.github).toMatch(/^https:\/\/github\.com\//);
    expect(site.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  it('serves the resume from a local path', () => {
    expect(site.resume).toMatch(/^\/.+\.pdf$/);
  });
});

describe('experience content', () => {
  it('has entries in reverse-chronological order fields filled', () => {
    expect(experience.length).toBeGreaterThanOrEqual(4);
    for (const entry of experience) {
      expect(entry.org.length).toBeGreaterThan(0);
      expect(entry.role.length).toBeGreaterThan(0);
      expect(entry.summary.length).toBeGreaterThan(0);
      expect(entry.period).toMatch(/^\d{4} — (present|\d{4})$/);
      expect(entry.mark.length).toBeLessThanOrEqual(3);
    }
  });

  it('starts with the current role', () => {
    expect(experience[0].period).toContain('present');
  });
});
