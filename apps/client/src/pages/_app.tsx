import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Saira } from '@next/font/google';

const saira = Saira({
  variable: '--font-saira',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={saira.variable}>
      <Component {...pageProps} />
    </div>
  );
}
