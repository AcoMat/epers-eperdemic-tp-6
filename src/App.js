import './App.css';
import AppTemplate from './template/AppTemplate';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useMemo, useState } from 'react';
import getDesignToken from './utils/theme';
import { createTheme } from '@mui/material';

function App() {
  const [mode, setMode] = useState('dark')
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark': 'light')
    }
  }))

  const theme = useMemo(() => createTheme(getDesignToken(mode)), [mode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <AppTemplate>
            <AppRoutes />
          </AppTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
