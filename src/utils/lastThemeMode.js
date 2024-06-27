const themeKey = 'EPERSDERMICS_THEME'

const getLastThemeMode = () => {
    return localStorage.getItem(themeKey) || 'dark'
}

const setTheme = (theme) => {
    localStorage.setItem(themeKey, theme)
}

export { getLastThemeMode, setTheme }