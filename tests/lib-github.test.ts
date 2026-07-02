import { afterEach, describe, expect, it, vi } from 'vitest';
import { getContributions } from '@/lib/github';

const validPayload = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 42,
          weeks: [
            {
              contributionDays: [
                { date: '2026-06-01', contributionCount: 0, contributionLevel: 'NONE' },
                { date: '2026-06-02', contributionCount: 2, contributionLevel: 'FIRST_QUARTILE' },
                { date: '2026-06-03', contributionCount: 9, contributionLevel: 'FOURTH_QUARTILE' },
              ],
            },
          ],
        },
      },
    },
  },
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getContributions', () => {
  it('returns null without a GITHUB_TOKEN', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    expect(await getContributions()).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('maps a valid GraphQL response to weeks and levels', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validPayload,
    });
    vi.stubGlobal('fetch', fetchSpy);

    const calendar = await getContributions('someone');
    expect(calendar).not.toBeNull();
    expect(calendar!.total).toBe(42);
    expect(calendar!.weeks).toHaveLength(1);
    expect(calendar!.weeks[0].map((d) => d.level)).toEqual([0, 1, 4]);
    expect(calendar!.weeks[0][1]).toEqual({ date: '2026-06-02', count: 2, level: 1 });

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://api.github.com/graphql');
    expect(init.headers.Authorization).toBe('Bearer test-token');
    expect(JSON.parse(init.body).variables.login).toBe('someone');
  });

  it('returns null on a non-OK response', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    expect(await getContributions()).toBeNull();
  });

  it('returns null on malformed payloads', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { user: null } }) })
    );
    expect(await getContributions()).toBeNull();
  });

  it('returns null when fetch throws', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    expect(await getContributions()).toBeNull();
  });

  it('treats unknown contribution levels as zero', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    const payload = structuredClone(validPayload);
    payload.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].contributionLevel =
      'SOMETHING_NEW';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => payload }));
    const calendar = await getContributions();
    expect(calendar!.weeks[0][0].level).toBe(0);
  });
});
