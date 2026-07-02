import type { Metadata } from 'next';
import { Geologica, Google_Sans_Code } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { CursorBloom } from '@/components/cursor-bloom';
import { ThemeScript } from '@/components/theme-script';
import { site } from '@/content/site';

const geologica = Geologica({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geologica',
  display: 'swap',
});

const googleSansCode = Google_Sans_Code({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-gsc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Dustin Nieves — Software for real workflows',
    template: '%s | Dustin Nieves',
  },
  description: site.description,
  metadataBase: new URL('https://diese.tech'),
  openGraph: {
    title: 'Dustin Nieves',
    description: site.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dustin Nieves',
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geologica.variable} ${googleSansCode.variable}`}
    >
      <body>
        <ThemeScript />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <CursorBloom />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
