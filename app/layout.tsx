import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { ThemeScript } from '@/components/theme-script';
import { site } from '@/content/site';
export const metadata: Metadata = { title: { default: 'Dustin Nieves / Diese — Product-minded frontend developer', template: '%s | Diese' }, description: site.description, metadataBase: new URL('https://diese.tech'), openGraph: { title: 'Dustin Nieves / Diese', description: site.description, type: 'website' } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><head><ThemeScript /></head><body><Header />{children}<Footer /></body></html>; }
