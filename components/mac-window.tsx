import type { ReactNode } from 'react';

/**
 * macOS-style window chrome: traffic lights + mono title bar. The standard
 * section container for the redesigned site (issue #18).
 */
export function MacWindow({
  title,
  toolbar,
  children,
  className = '',
  bodyClassName = '',
}: {
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-rule bg-paper-panel shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_18px_40px_-24px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-rule bg-paper-sunk/50">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#f2564d]/90" />
          <span className="h-3 w-3 rounded-full bg-[#f6b23e]/90" />
          <span className="h-3 w-3 rounded-full bg-[#3fb950]/80" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.08em] text-ink-faint truncate">
          {title}
        </span>
        {toolbar && <span className="ml-auto flex items-center">{toolbar}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
