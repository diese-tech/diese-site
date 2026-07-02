import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

describe('brand icons', () => {
  it.each([
    ['GithubIcon', GithubIcon],
    ['LinkedinIcon', LinkedinIcon],
  ] as const)('%s renders a decorative, sized svg', (_name, Icon) => {
    const { container } = render(<Icon size={20} className="text-signal" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg!.getAttribute('class')).toContain('text-signal');
  });
});
