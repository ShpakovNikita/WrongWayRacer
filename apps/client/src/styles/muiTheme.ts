import { CSSProperties } from 'react';
import { createTheme } from '@mui/material';

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

export const theme = createTheme({
  typography: {
    fontFamily: ['var(--font-saira)', 'sans-serif'].join(','),
    subtitle3: {
      lineHeight: 1,
      fontSize: 8,
      fontWeight: 200
    }
  }
});
