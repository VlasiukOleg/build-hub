import clsx from 'clsx';

import type { Metadata } from 'next';

import { metaData } from '@/data';

import { Montserrat } from 'next/font/google';
import './globals.css';

import { Providers } from '../provider';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer/Footer';
import configuration from '@/utils/configuration';

import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  metadataBase: new URL(configuration.BASE_APP_URL as string),
  title: metaData.mainTitle,
  description: metaData.description,
  keywords: metaData.keywords,
  icons: metaData.icons,
  openGraph: {
    type: 'website',
    url: configuration.BASE_APP_URL,
    title: metaData.ogTitle,
    description: metaData.ogDescription,
    siteName: metaData.ogSiteName,
    images: [
      {
        url: metaData.image.url,
        width: 1200,
        height: 630,
        alt: metaData.image.alt,
      },
    ],
  },
  other: {
    'color-scheme': 'light',
  },
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <StoreProvider>
        <body
          className={clsx(
            montserrat.className,
            'flex h-full min-h-screen flex-col overflow-x-hidden'
          )}
        >
          <Providers>
            <Header />
            <main className="flex-1 flex items-center justify-center">
              {children}
            </main>
            <Footer />
          </Providers>
        </body>
      </StoreProvider>
    </html>
  );
}
