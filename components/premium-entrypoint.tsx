import type { ReactNode } from 'react';
import Link from 'next/link';

export type PremiumEntrypointCard = {
  kicker?: string;
  title: string;
  description?: string;
  meta?: string;
  href: string;
};

export type PremiumEntrypointCta = {
  label: string;
  href: string;
};

export type PremiumEntrypointProps = {
  kicker?: string;
  headline: string;
  subheadline?: string;
  /** Optional hero visual (image, video, interactive). Falls back to a layered editorial backdrop. */
  media?: ReactNode;
  /** Watermark refs rendered into the default backdrop when no media is provided. */
  watermarks?: string[];
  cards: PremiumEntrypointCard[];
  primaryCta: PremiumEntrypointCta;
  secondaryCta?: PremiumEntrypointCta;
};

/**
 * Premium entrypoint section pattern: one emphasized module per page combining
 * a hero band (layered media + headline), a data-driven content band, and a
 * compact CTA band. See issue #10.
 */
export function PremiumEntrypoint({
  kicker,
  headline,
  subheadline,
  media,
  watermarks,
  cards,
  primaryCta,
  secondaryCta,
}: PremiumEntrypointProps) {
  return (
    <div className="relative overflow-hidden bg-void text-cream">
      {/* Hero band */}
      <div className="relative">
        {/* Layered backdrop: media if provided, otherwise gradient + rule grid + ref watermarks */}
        <div className="absolute inset-0" aria-hidden="true">
          {media ?? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(1100px 480px at 78% -10%, rgba(154, 74, 50, 0.32), transparent 65%), radial-gradient(700px 420px at 8% 110%, rgba(154, 143, 122, 0.14), transparent 70%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #f6f4ef 1px, transparent 1px), linear-gradient(to bottom, #f6f4ef 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                }}
              />
              {watermarks && watermarks.length > 0 && (
                <div className="absolute -right-4 top-6 hidden md:flex flex-col items-end font-mono font-semibold leading-[0.9] text-cream/[0.05] select-none text-[110px] tracking-[-0.04em]">
                  {watermarks.map((mark) => (
                    <span key={mark}>{mark}</span>
                  ))}
                </div>
              )}
            </>
          )}
          {/* Readability overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(27,26,23,0) 40%, rgba(27,26,23,0.55))',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-content px-6 md:px-10 py-16 md:py-24">
          {kicker && (
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-signal-stamp mb-6 brightness-150">
              {kicker}
            </div>
          )}
          <h2 className="font-grotesk font-semibold text-[30px] md:text-[44px] tracking-[-0.015em] leading-[1.05] max-w-[22ch]">
            {headline}
          </h2>
          {subheadline && (
            <p className="font-sans text-base md:text-lg leading-[1.6] text-cream/70 max-w-[56ch] mt-5">
              {subheadline}
            </p>
          )}
        </div>
      </div>

      {/* Content band */}
      <div className="relative border-t border-cream/15">
        <div className="mx-auto max-w-content px-6 md:px-10 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Link
                key={card.href + card.title}
                href={card.href}
                className="group border border-cream/15 bg-cream/[0.03] p-5 transition-all duration-[120ms] ease-out hover:border-signal hover:bg-cream/[0.06] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                {card.kicker && (
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-cream/40 group-hover:text-signal-stamp group-hover:brightness-150 transition-colors duration-[120ms] mb-3">
                    {card.kicker}
                  </div>
                )}
                <div className="font-grotesk font-semibold text-lg leading-tight">
                  {card.title}
                </div>
                {card.description && (
                  <p className="font-sans text-[13px] leading-[1.55] text-cream/60 mt-2">
                    {card.description}
                  </p>
                )}
                {card.meta && (
                  <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-cream/40 mt-4">
                    {card.meta}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="relative border-t border-cream/15">
        <div className="mx-auto max-w-content px-6 md:px-10 py-6 md:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            href={primaryCta.href}
            className="font-grotesk font-semibold text-sm bg-cream text-void px-5 py-2.5 hover:bg-signal hover:text-cream transition-colors duration-[120ms]"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="font-mono text-xs tracking-[0.06em] uppercase text-cream/60 border-b border-cream/25 pb-px hover:text-cream hover:border-signal transition-colors duration-[120ms]"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
