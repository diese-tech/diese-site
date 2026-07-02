import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeScript } from '@/components/theme-script';
import { ThemeToggle } from '@/components/theme-toggle';

function runThemeScript() {
  const { container } = render(<ThemeScript />);
  const code = container.querySelector('script')!.innerHTML;
  new Function(code)();
}

beforeEach(() => {
  document.documentElement.classList.remove('dark');
  localStorage.clear();
  window.history.replaceState(null, '', '/');
});

describe('ThemeScript', () => {
  it('defaults to dark for new visitors', () => {
    runThemeScript();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('respects a stored light preference', () => {
    localStorage.setItem('theme', 'light');
    runThemeScript();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('respects a stored dark preference', () => {
    localStorage.setItem('theme', 'dark');
    runThemeScript();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('lets ?theme=light override a stored dark preference for the load', () => {
    localStorage.setItem('theme', 'dark');
    window.history.replaceState(null, '', '/?theme=light');
    runThemeScript();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('lets ?theme=dark override a stored light preference', () => {
    localStorage.setItem('theme', 'light');
    window.history.replaceState(null, '', '/?theme=dark');
    runThemeScript();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

describe('ThemeToggle', () => {
  it('toggles the dark class and persists the choice', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle color theme/i });

    await user.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
