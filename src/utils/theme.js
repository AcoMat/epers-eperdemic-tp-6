const getDesignToken = (mode) => ({
    palette: {
        mode: 'light',
        primary: {
            main: '#a15097',
        },
        secondary: {
            main: '#f3f0e0'
        },
        background: {
            default: mode === 'light' ? '#eddded' : '#423741'
        }
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                label: ({theme}) => ({
                    color: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main
                }),
                root: ({theme}) => ({
                    '&.Mui-selected .MuiSvgIcon-root': {
                        backgroundColor: mode === 'light' ? theme.palette.primary.light : theme.palette.primary.light,
                        paddingLeft: 8,
                        paddingRight: 8,
                        borderRadius: 12,
                        fill: mode === 'light' ? theme.palette.primary.dark : theme.palette.secondary.light
                    },
                    '& .MuiSvgIcon-root': {
                        fill: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light
                    }
                }),
            },
        },
        MuiIcon: {
            styleOverrides: {
                colorSecondary: {
                    backgroundColor: "black"
                }
            }
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
                    background: theme.palette.background.default
                })}
            }
        }
});

export default getDesignToken;
