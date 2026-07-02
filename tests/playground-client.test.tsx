import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';

// Stub the heavy 3D scene: renders a marker and reports ready, like the real
// scene's first physics frame does.
vi.mock('next/dynamic', () => ({
  default: () =>
    function SceneStub({ onReady }: { onReady?: () => void }) {
      useEffect(() => {
        onReady?.();
      }, [onReady]);
      return <div data-testid="scene" />;
    },
}));

import { PlaygroundClient } from '@/components/playground/playground-client';
import { featuredProjects } from '@/content/projects';

function mockMatchMedia({ coarse = false, reduce = false }: { coarse?: boolean; reduce?: boolean }) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('coarse') ? coarse : query.includes('reduce') ? reduce : false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('PlaygroundClient capability gate', () => {
  it('falls back to the poster without WebGL (jsdom has none)', async () => {
    mockMatchMedia({});
    window.history.replaceState(null, '', '/playground');
    render(<PlaygroundClient />);
    await waitFor(() =>
      expect(screen.getByText(/a drivable 3d playground lives here/i)).toBeInTheDocument()
    );
    // Poster exposes direct case-file links for every featured project
    for (const project of featuredProjects) {
      expect(screen.getByRole('link', { name: new RegExp(project.title, 'i') })).toHaveAttribute(
        'href',
        `/projects/${project.slug}`
      );
    }
  });

  it('falls back to the poster under reduced motion even when forced off-path', async () => {
    mockMatchMedia({ reduce: true });
    window.history.replaceState(null, '', '/playground');
    render(<PlaygroundClient />);
    await waitFor(() =>
      expect(screen.getByText(/a drivable 3d playground lives here/i)).toBeInTheDocument()
    );
  });

  it('honors ?force=scene and renders the HUD around the scene', async () => {
    mockMatchMedia({});
    window.history.replaceState(null, '', '/playground?force=scene');
    render(<PlaygroundClient />);
    await waitFor(() => expect(screen.getByTestId('scene')).toBeInTheDocument());
    expect(screen.getByText(/wasd \/ arrows to drive/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /exit playground/i })).toHaveAttribute('href', '/');
  });

  it('shows touch controls for coarse pointers once the scene is ready', async () => {
    mockMatchMedia({ coarse: true });
    window.history.replaceState(null, '', '/playground?force=scene');
    render(<PlaygroundClient />);
    await waitFor(() => expect(screen.getByTestId('scene')).toBeInTheDocument());
    await waitFor(() => {
      for (const key of ['forward', 'backward', 'left', 'right']) {
        expect(screen.getByRole('button', { name: key })).toBeInTheDocument();
      }
    });
    expect(screen.getByText(/use the on-screen controls/i)).toBeInTheDocument();
  });

  it('honors ?force=poster on a capable device', async () => {
    mockMatchMedia({});
    window.history.replaceState(null, '', '/playground?force=poster');
    render(<PlaygroundClient />);
    await waitFor(() =>
      expect(screen.getByText(/a drivable 3d playground lives here/i)).toBeInTheDocument()
    );
    expect(screen.queryByTestId('scene')).toBeNull();
  });
});
