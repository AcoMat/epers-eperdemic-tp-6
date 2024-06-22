import './App.css';
import AppTemplate from './template/AppTemplate';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './utils/theme';

function App() {
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
