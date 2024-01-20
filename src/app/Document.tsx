import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

import Providers from './Providers';
import Viewport from './Viewport';

const inter = Inter({ subsets: ['latin'] });

const Document = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0c0a09" />
        <meta name="msapplication-TileColor" content="#0c0a09" />
      </head>
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
        suppressHydrationWarning
      >
        <Providers>
          <Viewport>
            <Toaster richColors position="top-center" duration={3000} />
            {children}
          </Viewport>
        </Providers>
      </body>
    </html>
  );
};

export default Document;
