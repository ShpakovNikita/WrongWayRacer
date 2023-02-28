import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Saira } from '@next/font/google';
import { CSSProperties } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const saira = Saira({
  variable: '--font-saira',
  subsets: ['latin']
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ['var(--font-saira)', 'sans-serif'].join(','),
    subtitle3: {
      lineHeight: 1,
      fontSize: 8,
      fontWeight: 200
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${saira.variable} font-saira`}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    </>
  );
}
