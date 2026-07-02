import type { ContributionCalendar } from '@/lib/github';

const CELL_CLASSES = [
  'bg-paper-sunk/70',
  'bg-signal/25',
  'bg-signal/45',
  'bg-signal/70',
  'bg-signal',
] as const;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthLabels(weeks: ContributionCalendar['weeks']) {
  const labels: { index: number; label: string }[] = [];
  let last = -1;
  weeks.forEach((week, i) => {
    const first = week[0];
    if (!first) return;
    const month = new Date(`${first.date}T00:00:00`).getMonth();
    if (month !== last) {
      // Skip a label that would crowd the previous one
      if (labels.length === 0 || i - labels[labels.length - 1].index >= 3) {
        labels.push({ index: i, label: MONTHS[month] });
      }
      last = month;
    }
  });
  return labels;
}

/** GitHub-style contribution heatmap in the site's rust scale (issue #20). */
export function ContributionCalendarGrid({ calendar }: { calendar: ContributionCalendar }) {
  const labels = monthLabels(calendar.weeks);

  return (
    <div className="overflow-x-auto px-6 py-5">
      <div className="min-w-[720px]">
        {/* Month labels */}
        <div className="relative h-4 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">
          {labels.map(({ index, label }) => (
            <span key={`${label}-${index}`} className="absolute" style={{ left: `${index * 13}px` }}>
              {label}
            </span>
          ))}
        </div>
        {/* Grid: one column per week */}
        <div className="flex gap-[3px]">
          {calendar.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                  className={`h-[10px] w-[10px] rounded-[2px] ${CELL_CLASSES[day.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Footer: total + legend */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.06em] uppercase text-ink-faint">
          <span>{calendar.total.toLocaleString()} contributions in the last year</span>
          <span className="flex items-center gap-1.5">
            Less
            {CELL_CLASSES.map((cls) => (
              <span key={cls} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
            ))}
            More
          </span>
        </div>
      </div>
    </div>
  );
}
