import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Unified emerald/teal healthcare theme
const colors = {
  primary: {
    main: '#059669',    // emerald-600
    light: '#34d399',   // emerald-400
    dark: '#047857',    // emerald-700
  },
  secondary: {
    main: '#0d9488',    // teal-600
    light: '#2dd4bf',   // teal-400
    dark: '#0f766e',    // teal-700
  },
  success: {
    main: '#10b981',
    light: '#6ee7b7',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fcd34d',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#fca5a5',
    dark: '#dc2626',
  },
  info: {
    main: '#0ea5e9',
    light: '#7dd3fc',
    dark: '#0284c7',
  },
  background: {
    default: '#f8faf9',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  }
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...colors,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), "Inter", system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #047857 0%, #0f766e 100%)',
          },
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        },
      },
    },
  }
};

export const theme = responsiveFontSizes(createTheme(themeOptions));