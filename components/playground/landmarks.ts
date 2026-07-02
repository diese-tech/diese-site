/** Landmark anchor points (x, z) — the set-pieces the forklift can visit. */
export const LANDMARKS: { slug: string; x: number; z: number }[] = [
  { slug: 'brewloop', x: -18, z: -14 },
  { slug: 'swiftdispatch', x: 18, z: -16 },
  { slug: 'serpent-ascension-league', x: 19, z: 15 },
  { slug: 'threetails-booking', x: -17, z: 16 },
];

/** Proximity distance that pops the project card. */
export const LANDMARK_RADIUS = 8;

/** Returns the slug of the nearest landmark within radius, or null. */
export function nearestLandmark(x: number, z: number, radius = LANDMARK_RADIUS): string | null {
  let nearest: string | null = null;
  let best = radius * radius;
  for (const mark of LANDMARKS) {
    const dx = x - mark.x;
    const dz = z - mark.z;
    const d2 = dx * dx + dz * dz;
    if (d2 < best) {
      best = d2;
      nearest = mark.slug;
    }
  }
  return nearest;
}
