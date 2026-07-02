import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const useReducedMotionMock = vi.fn();
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return { ...actual, useReducedMotion: () => useReducedMotionMock() };
});

import { Reveal } from '@/components/reveal';

describe('Reveal', () => {
  it('renders a motion wrapper with the noscript-recoverable marker', () => {
    useReducedMotionMock.mockReturnValue(false);
    const { container } = render(
      <Reveal className="wrapper">
        <p>content</p>
      </Reveal>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
    const wrapper = container.querySelector('[data-reveal]');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('wrapper');
  });

  it('renders a plain div for reduced-motion users', () => {
    useReducedMotionMock.mockReturnValue(true);
    const { container } = render(
      <Reveal className="wrapper">
        <p>content</p>
      </Reveal>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(container.querySelector('[data-reveal]')).toBeNull();
    expect(container.querySelector('div.wrapper')).not.toBeNull();
  });
});
