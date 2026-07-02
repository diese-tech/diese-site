import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContributionCalendarGrid } from '@/components/contribution-calendar';
import type { ContributionCalendar, ContributionDay } from '@/lib/github';

function makeCalendar(weekCount: number, startISO = '2026-01-04'): ContributionCalendar {
  const start = new Date(`${startISO}T00:00:00`);
  const weeks: ContributionDay[][] = [];
  let total = 0;
  for (let w = 0; w < weekCount; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * 86400000);
      const level = ((w + d) % 5) as ContributionDay['level'];
      total += level;
      week.push({ date: date.toISOString().slice(0, 10), count: level, level });
    }
    weeks.push(week);
  }
  return { total, weeks };
}

describe('ContributionCalendarGrid', () => {
  it('renders one cell per day', () => {
    const calendar = makeCalendar(4);
    const { container } = render(<ContributionCalendarGrid calendar={calendar} />);
    expect(container.querySelectorAll('span[title]')).toHaveLength(28);
  });

  it('shows the localized total', () => {
    const calendar = makeCalendar(4);
    render(<ContributionCalendarGrid calendar={calendar} />);
    expect(
      screen.getByText(`${calendar.total.toLocaleString()} contributions in the last year`)
    ).toBeInTheDocument();
  });

  it('pluralizes day tooltips correctly', () => {
    const calendar = makeCalendar(1);
    const { container } = render(<ContributionCalendarGrid calendar={calendar} />);
    const titles = Array.from(container.querySelectorAll('span[title]')).map((el) =>
      el.getAttribute('title')
    );
    expect(titles.some((t) => t?.startsWith('0 contributions'))).toBe(true);
    expect(titles.some((t) => t?.startsWith('1 contribution on'))).toBe(true);
  });

  it('renders month labels without crowding', () => {
    // 10 weeks spanning Jan -> Mar
    render(<ContributionCalendarGrid calendar={makeCalendar(10)} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
  });

  it('renders the less/more legend', () => {
    const { container } = render(<ContributionCalendarGrid calendar={makeCalendar(2)} />);
    expect(container.textContent).toContain('Less');
    expect(container.textContent).toContain('More');
  });
});
