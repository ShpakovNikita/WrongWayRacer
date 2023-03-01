import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Saira } from '@next/font/google';
import { ThemeProvider } from '@mui/material';
import { theme as muiTheme } from '@/styles/muiTheme';

const saira = Saira({
  variable: '--font-saira',
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${saira.variable} font-saira`}>
        <ThemeProvider theme={muiTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    </>
  );
}
