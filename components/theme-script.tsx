export function ThemeScript() {
  // Dark-first: new visitors get dark regardless of OS preference; the
  // toggle persists an explicit choice in localStorage. A ?theme= query
  // param overrides for that load (handy for sharing/debugging).
  const code = `try{const q=new URLSearchParams(location.search).get('theme');const t=q||localStorage.getItem('theme');document.documentElement.classList.toggle('dark', t !== 'light')}catch(e){document.documentElement.classList.add('dark')}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
