import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MacWindow } from '@/components/mac-window';

describe('MacWindow', () => {
  it('renders the title, children, and toolbar', () => {
    render(
      <MacWindow title="about.txt" toolbar={<span>7 shipped</span>}>
        <p>window body</p>
      </MacWindow>
    );
    expect(screen.getByText('about.txt')).toBeInTheDocument();
    expect(screen.getByText('window body')).toBeInTheDocument();
    expect(screen.getByText('7 shipped')).toBeInTheDocument();
  });

  it('hides the traffic lights from assistive tech', () => {
    const { container } = render(<MacWindow title="x">body</MacWindow>);
    const lights = container.querySelector('[aria-hidden="true"]');
    expect(lights).not.toBeNull();
    expect(lights!.children).toHaveLength(3);
  });

  it('applies custom body classes', () => {
    render(
      <MacWindow title="x" bodyClassName="p-6">
        <p>content</p>
      </MacWindow>
    );
    expect(screen.getByText('content').parentElement).toHaveClass('p-6');
  });
});
