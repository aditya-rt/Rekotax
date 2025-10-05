import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          fontFamily: "'Open Sans', sans-serif",
        },
        // hard-force everywhere (overrides inline widget defaults)
        '*': {
          fontFamily: "'Open Sans', sans-serif !important",
        },
      },
    },
  },
});

export default theme;
