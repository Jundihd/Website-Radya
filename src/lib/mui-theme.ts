'use client';

import { createTheme } from '@mui/material/styles';

export const radyaMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1793E8',
      light: '#29B6F6',
      dark: '#0F172A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#43D3A4',
      contrastText: '#0F172A',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: ['Plus Jakarta Sans', 'Inter', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          fontWeight: 700,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '16px !important',
          marginBottom: 12,
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});
