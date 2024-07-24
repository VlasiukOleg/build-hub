import clsx from 'clsx';

import type { Metadata } from 'next';

import { Montserrat } from 'next/font/google';
import './globals.css';

import Header from '@/layout/Header';
import Footer from '@/layout/Footer/Footer';

import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'BudStock',
  description: 'Матеріали для машиної та ручної штукатурки',
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={clsx(
            montserrat.className,
            'flex h-full min-h-screen flex-col overflow-x-hidden'
          )}
        >
          <Header />
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
