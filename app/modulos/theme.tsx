// Se define el entorno ------------------------------------------------------

// Se importan los modulos de mui
import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
      light: {
        palette: {
          background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
          },
          primary: {
            main: '#000000',
            dark: '#000000',
          },
        },
      },
      dark: {
        palette: {
          background: {
            default: '#000000',
            paper: '#000000',
          },
          primary: {
            main: '#FFFFFF',
            dark: '#FFFFFF',
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });