import { describe, expect, it } from 'vitest';
import { act, render } from '@testing-library/react';
import { CursorBloom } from '@/components/cursor-bloom';

function mockMatchMedia({ fine, reduce }: { fine: boolean; reduce: boolean }) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('fine') ? fine : query.includes('reduce') ? reduce : false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('CursorBloom', () => {
  it('paints the glow for fine pointers', async () => {
    mockMatchMedia({ fine: true, reduce: false });
    const { container } = render(<CursorBloom />);
    const bloom = container.firstElementChild as HTMLElement;
    expect(bloom).toHaveAttribute('aria-hidden', 'true');
    expect(bloom.className).toContain('pointer-events-none');
    // Initial paint happens synchronously in the effect
    expect(bloom.style.background).toContain('radial-gradient');
  });

  it('stays inert for touch-only devices', () => {
    mockMatchMedia({ fine: false, reduce: false });
    const { container } = render(<CursorBloom />);
    const bloom = container.firstElementChild as HTMLElement;
    expect(bloom.style.background).toBe('');
  });

  it('stays inert under reduced motion', () => {
    mockMatchMedia({ fine: true, reduce: true });
    const { container } = render(<CursorBloom />);
    const bloom = container.firstElementChild as HTMLElement;
    expect(bloom.style.background).toBe('');
  });

  it('follows pointer movement', async () => {
    mockMatchMedia({ fine: true, reduce: false });
    const { container } = render(<CursorBloom />);
    const bloom = container.firstElementChild as HTMLElement;
    await act(async () => {
      window.dispatchEvent(new MouseEvent('pointermove', { clientX: 321, clientY: 123 }));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });
    expect(bloom.style.background).toContain('321px 123px');
  });
});
