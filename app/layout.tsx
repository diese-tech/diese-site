import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { site } from '@/content/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
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
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
