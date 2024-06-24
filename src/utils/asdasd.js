import { createTheme } from "@mui/material";

const themee = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#702b67',
        },
        secondary: {
            main: '#FFD9E1'
        },
        background: {
            default: true === 'light' ? '#eddded' : '#423741'
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "white"
                },
                colorSecondary: {
                    borderColor: "white"
                },
                focused: {
                    borderColor: "white"
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                secondaryAction: {
                    backgroundColor: "white"
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                secondary: {
                    color: "red",
                    backgroundColor: "white"
                },

            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "red"
                },
                disabled: true
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
                    color: theme.palette.primary.light
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
        MuiIcon: {
            styleOverrides: {
                colorSecondary: {
                    backgrndColor: "red"
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