import { describe, expect, it } from 'vitest';
import { LANDMARKS, LANDMARK_RADIUS, nearestLandmark } from '@/components/playground/landmarks';
import { allProjects } from '@/content/projects';

describe('playground landmarks', () => {
  it('every landmark maps to a real project slug', () => {
    const slugs = new Set(allProjects.map((p) => p.slug));
    for (const mark of LANDMARKS) {
      expect(slugs.has(mark.slug), mark.slug).toBe(true);
    }
  });

  it('landmarks are spaced further apart than twice the radius', () => {
    for (let i = 0; i < LANDMARKS.length; i++) {
      for (let j = i + 1; j < LANDMARKS.length; j++) {
        const d = Math.hypot(LANDMARKS[i].x - LANDMARKS[j].x, LANDMARKS[i].z - LANDMARKS[j].z);
        expect(d).toBeGreaterThan(LANDMARK_RADIUS * 2);
      }
    }
  });

  it('returns the slug when standing on a landmark', () => {
    for (const mark of LANDMARKS) {
      expect(nearestLandmark(mark.x, mark.z)).toBe(mark.slug);
    }
  });

  it('returns null at the spawn point', () => {
    expect(nearestLandmark(0, 0)).toBeNull();
  });

  it('respects the radius boundary', () => {
    const mark = LANDMARKS[0];
    expect(nearestLandmark(mark.x + LANDMARK_RADIUS - 0.1, mark.z)).toBe(mark.slug);
    expect(nearestLandmark(mark.x + LANDMARK_RADIUS + 0.1, mark.z)).toBeNull();
  });

  it('honors a custom radius', () => {
    const mark = LANDMARKS[0];
    expect(nearestLandmark(mark.x + 2, mark.z, 1)).toBeNull();
    expect(nearestLandmark(mark.x + 2, mark.z, 3)).toBe(mark.slug);
  });
});
