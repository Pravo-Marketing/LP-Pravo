import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import MetaPixel from '@/components/meta-pixel';
import { siteConfig } from '@/config/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pravo.com.br'),
  title: 'Pravo — Gestão de Meta Ads orientada por dados',
  description: 'Gestão estratégica de Meta Ads para gerar leads e vendas. Aquisição, estrutura digital e performance orientada por dados no Brasil e na América Latina.',
  openGraph: {
    title: 'Pravo — Transformamos atenção em demanda.',
    description: 'Gestão estratégica de Meta Ads para gerar leads e vendas.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Pravo — Transformamos atenção em demanda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pravo — Transformamos atenção em demanda.',
    description: 'Gestão estratégica de Meta Ads para gerar leads e vendas.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <MetaPixel pixelId={siteConfig.metaPixelId} />
      </body>
    </html>
  );
}
