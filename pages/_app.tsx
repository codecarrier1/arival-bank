import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from '@/providers/auth.context';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
