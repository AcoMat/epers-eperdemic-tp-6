import { Padding } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
        main: '#4d1f47',
    },
    secondary: {
        main: '#FFD9E1'
    }
  },
  components: {
    MuiBottomNavigationAction: {
        styleOverrides: {
            label: ({theme}) => ({
                color: theme.palette.secondary.main
            }),
            root: ({theme}) => ({
                '&.Mui-selected .MuiSvgIcon-root': {
                    backgroundColor: theme.palette.primary.light,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 12
                }
            }),
        },
    },
    MuiBottomNavigation: {
        styleOverrides: {
            root: ({theme}) => ({
                position: "absolute",
                bottom: "16px",
                borderRadius: 16,
                maxWidth: "40%",
                margin: "0 auto",
                left: 0,
                right: 0,
                background: theme.palette.background
            })}
        }
    }
});

export default theme;
