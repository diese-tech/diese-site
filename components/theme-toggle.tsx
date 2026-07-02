'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function getCurrentThemeIsDark() {
  if (typeof document === 'undefined') {
    return true;
  }

  return document.documentElement.classList.contains('dark');
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getCurrentThemeIsDark);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDark(getCurrentThemeIsDark());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function toggle() {
    const next = !getCurrentThemeIsDark();

    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink-muted hover:text-signal hover:border-signal transition-colors duration-[120ms]"
      aria-label="Toggle color theme"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
