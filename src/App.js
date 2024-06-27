import './App.css';
import AppTemplate from './template/AppTemplate';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useMemo, useState } from 'react';
import getDesignToken from './utils/theme';
import { Dialog, createTheme } from '@mui/material';
import AuthContextProvider from './auth/AuthContextProvider';
import ColorModeContext from './theme/ColorModeContext'
import DialogContextProvider from './dialogs/DialogContextProvider';
import { getLastThemeMode, setTheme } from './utils/lastThemeMode';

function App() {
  const [mode, setMode] = useState(getLastThemeMode())
  const toggleMode = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === 'light' ? 'dark': 'light'
      setTheme(nextMode)
      return nextMode}
    )
  } 

  const theme = useMemo(() => createTheme(getDesignToken(mode)), [mode])

  return (
    <AuthContextProvider>
      <ColorModeContext.Provider value={{mode, toggleMode}}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <DialogContextProvider>
                <AppTemplate>
                  <AppRoutes />
                </AppTemplate>
              </DialogContextProvider>
            </ThemeProvider>
          </BrowserRouter>
      </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
