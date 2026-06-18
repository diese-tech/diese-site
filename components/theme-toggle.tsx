'use client';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
export function ThemeToggle() {
  const [dark, setDark] = useState(() => true);
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('theme', next ? 'dark' : 'light'); }
  return <button onClick={toggle} className="rounded-full border border-slate-300 p-2 dark:border-white/15" aria-label="Toggle color theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>;
}
