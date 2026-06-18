export function ThemeScript() {
  const code = `try{const stored=localStorage.getItem('theme');const prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark', stored ? stored === 'dark' : prefers !== false);}catch(e){document.documentElement.classList.add('dark')}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
