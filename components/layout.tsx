import Link from 'next/link';
import { site } from '@/content/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule-strong bg-paper">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 md:px-10 py-4">
        <Link
          href="/"
          className="font-mono text-xs font-medium tracking-[0.12em] uppercase text-ink"
        >
          Diese
        </Link>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-[0.08em] uppercase text-ink-muted">
          <Link href="/#work" className="hover:text-ink transition-colors duration-[120ms]">
            Work
          </Link>
          <Link href="/#about" className="hover:text-ink transition-colors duration-[120ms]">
            About
          </Link>
          <Link href="/#contact" className="hover:text-ink transition-colors duration-[120ms]">
            Contact
          </Link>
          <Link href="/services/discord" className="hover:text-ink transition-colors duration-[120ms]">
            Discord
          </Link>
        </div>
        <a
          href={site.resume}
          className="font-mono text-xs tracking-[0.08em] uppercase text-signal border-b border-signal pb-px hover:border-b-2 transition-all duration-[120ms]"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule-strong mt-20">
      <div className="mx-auto max-w-content px-6 md:px-10 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="font-mono text-xs tracking-[0.08em] uppercase text-ink-faint">
          Dustin Nieves · Diese · {new Date().getFullYear()}
        </div>
        <div className="flex gap-6 font-mono text-xs tracking-[0.06em] text-ink-muted">
          <a href={site.github} className="hover:text-signal transition-colors duration-[120ms]">
            GitHub
          </a>
          <a href={site.linkedin} className="hover:text-signal transition-colors duration-[120ms]">
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-signal transition-colors duration-[120ms]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
