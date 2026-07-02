export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-content px-6 md:px-10 py-20">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-signal">
        Blog-ready architecture
      </p>
      <h1 className="font-grotesk font-semibold text-3xl text-ink mt-4">
        Writing is not published yet.
      </h1>
      <p className="font-sans text-[15px] leading-[1.6] text-ink-muted mt-4 max-w-[60ch]">
        This hidden route keeps the scaffold ready for future posts without adding blog links to
        the visible navigation.
      </p>
    </main>
  );
}
