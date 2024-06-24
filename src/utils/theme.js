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
            card: mode === 'light' ? '#eddded' : '#423741',
            default: mode === 'light' ? '#f3f0f3' : '#1c181c',
        }
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: ({theme}) => ({
                    backgroundColor: mode === "dark" ? theme.palette.secondary.light : theme.palette.primary.light
                })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: ({theme}) => ({
                    borderColor: mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
                }),
                input: ({theme}) => ({
                    color: mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main
                }),
                root: ({theme}) => ({
                    "&:hover > .MuiOutlinedInput-notchedOutline" : {
                        borderColor : mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main
                    },
                    '& .MuiSvgIcon-root': {
                        fill: mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main
                    },
                    backgroundColor: theme.palette.background.default
                })
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: ({theme}) => ({
                    color: mode === 'dark' ? theme.palette.secondary.main : "black"
                }),
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: ({theme}) => ({
                    '& .MuiListItemSecondaryAction-root .MuiSvgIcon-root': {
                        fill: mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main
                    }
                })
            }
        },
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    backgroundColor: theme.palette.background.card
                })
            }
        },
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
                    background: theme.palette.background.card
                })}
            }
        }
});

export default getDesignToken;
