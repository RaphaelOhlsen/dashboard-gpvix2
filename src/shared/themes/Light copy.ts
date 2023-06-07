import { createTheme } from '@mui/material';
import { cyan, red } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#141937',
      dark: '#0d1025',
      light: '#21295c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: red[500],
      dark: red[400],
      light: cyan[200],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    }
  }
});