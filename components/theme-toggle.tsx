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
      className="rounded-full border border-slate-300 p-2 dark:border-white/15"
      aria-label="Toggle color theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
