import { createTheme } from '@mui/material/styles';
import { alpha, darken } from '@mui/system';

const theme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: alpha(theme.palette.background.default, 0.7),
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${darken(
            theme.palette.background.default,
            0.1
          )}`,
        }),
      },
    },
  },
});

export default theme;
